import React, { FunctionComponent, useState, useEffect } from "react";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import moment from "moment";
import Dropzone from "react-dropzone";
import Select from "react-select";
import {
  languageTranslation,
  logger,
  formatFileSize,
  errorFormatter,
} from "../../../../helpers";
import {
  State,
  AcceptedDocumentFile,
  maxFileSize10MB,
  DocumentTempSelect,
} from "../../../../config";
import {
  IWorkingProofFormValues,
  IDocumentInputInterface,
  IReactSelectInterface,
  IQualifications,
} from "../../../../interfaces";
import displaydoc from "../../../assets/img/display-doc.svg";
import upload from "../../../assets/img/upload.svg";
import locked_caregiver from "../../../assets/img/block-caregiver.svg";
import hideoldfile from "../../../assets/img/hide-old-file.svg";
import hidemapped from "../../../assets/img/block-file.svg";
import "./index.scss";
import { FormikProps } from "formik";
import { useMutation, useLazyQuery, useQuery } from "@apollo/react-hooks";
import {
  DocumentUploadMutations,
  DocumentMutations,
} from "../../../../graphql/Mutations";

import { toast } from "react-toastify";
import DocumentPreview from "./DocumentPreview";
import Loader from "../../containers/Loader/Loader";
import PerformedWork from "./PerformedWork";
import { AppointmentsQueries, GET_QUALIFICATION_ATTRIBUTE } from "../../../../graphql/queries";
const [ADD_DOCUMENT] = DocumentUploadMutations;
const [, , , , , , , , , GET_DOCUMENTS_FROM_OUTLOOK] = DocumentMutations;
const [ ,
  ,
  ,
  ,
  ,
  GET_APPOINTMENT_DETAILS_BY_USERID]= AppointmentsQueries;
let toastId: any;

const WorkingProofForm: FunctionComponent<
  FormikProps<IWorkingProofFormValues> & any
> = (props: FormikProps<IWorkingProofFormValues> & any) => {
  const {
    documentList,
    refetch,
    onDelete,
    imageUrls,
    setImageUrl,
    documentUrls,
    setDocumentUrl,
    rowIndex,
    setRowIndex,
    documentType,
    setdocumentType,
    careGiversOptions,
  } = props;

  const handleSelect = (value: any) => {
    setdocumentType(value);
  };
  // qualifications list
  const { data: qualificationList } = useQuery<IQualifications>(GET_QUALIFICATION_ATTRIBUTE);
  // Mutation to upload document
  const [addUserDocuments] = useMutation<
    { addUserDocuments: IWorkingProofFormValues },
    { documentInput: IDocumentInputInterface }
  >(ADD_DOCUMENT);

 // To fetch appointment list by caregiver Id
 const [
  getDataByCaregiverUserId,
  { data: caregiverData, loading: caregiverDataLoading },
] = useLazyQuery<any, any>(GET_APPOINTMENT_DETAILS_BY_USERID, {
  fetchPolicy: "no-cache",
  // notifyOnNetworkStatusChange: true
});


  const [loading, setLoading] = useState<boolean>(false);

  // State for performed work section filter
  const [searchById, setsearchById] = useState<string>("");
  const [caregiverFilter, setcaregiverFilter] = useState<
    IReactSelectInterface | undefined
  >(undefined);
  const [appointmentData, setappointmentData] = useState<any>([]);

  const [
    getWorkProofFromOutlookQuery,
    { data, loading: fetchingLWorkProof, error: outlookError },
  ] = useMutation<
    {
      getWorkProofFromOutlookQuery: any;
    },
    any
  >(GET_DOCUMENTS_FROM_OUTLOOK);
  const handleUpload = async (file: any) => {
    try {
      if (file.length > 0) {
        file = file[0];
        setLoading(true);

        let documentInput: any = {
          isDocumentTemplate: true,
          documentUploadType:
            documentType && documentType.value ? documentType.value : "",
          document: file,
        };

        await addUserDocuments({
          variables: {
            documentInput,
          },
        });
        if (!toast.isActive(toastId)) {
          toast.dismiss();
          toast.success(languageTranslation("DOCUMENT_UPLOAD_SUCCESS"));
        }
        setLoading(false);
        refetch();
      } else {
        return;
      }
    } catch (error) {
      const message = error.message
        .replace("SequelizeValidationError: ", "")
        .replace("Validation error: ", "")
        .replace("GraphQL error: ", "");
      toast.dismiss();
      toast.error(message);
      logger(error);
      setLoading(false);
    }
  };

  const handlePreview = async (document: string, index: number) => {
    setRowIndex(index);
    let sampleFileUrl = "";
    if (process.env.NODE_ENV === "production") {
      sampleFileUrl = document;
    } else {
      sampleFileUrl = process.env.REACT_APP_FILES_ENDPOINT + document;
    }
    if (document.split(".").pop() === "pdf") {
      setDocumentUrl(sampleFileUrl);
      setImageUrl("");
    } else {
      setImageUrl(sampleFileUrl);
      setDocumentUrl("");
    }
  };
  /**
   *
   * @param e
   */
  const getWorkProofFromOutlook = async (e: any): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      await getWorkProofFromOutlookQuery({
        variables: {
          documentType:
            documentType && documentType.value ? documentType.value : "",
        },
      });
      if (!toast.isActive(toastId)) {
        toast.dismiss();
        toast.success(languageTranslation("DOCUEMENT_FETCHED_SUCCESS"));
      }
      refetch();
    } catch (error) {
      const message = errorFormatter(error.message);
      toast.dismiss();
      toast.error(message);
      logger(error);
    }
    setLoading(false);
  };

  // Call when select caregiver in performed work section
  useEffect(() => {
    if(caregiverFilter && caregiverFilter.value){
      getDataByCaregiverUserId({
        variables: {
          userId : caregiverFilter && caregiverFilter.value ? parseInt(caregiverFilter.value) : null
        },
      });
    }
  }, [caregiverFilter]);

  useEffect(() => {
    console.log("efbjdgfvd");
    
    if(caregiverData && caregiverData.getAppointmentDetailsByUserId && caregiverData.getAppointmentDetailsByUserId.length){
      setappointmentData(caregiverData.getAppointmentDetailsByUserId)
    }
  }, [caregiverData]);

  const handleChange = (e: any, name: string) => {
    if (name === "id") {
      console.log("eeee", e.target.value);
      setsearchById(e.target.value);
      setcaregiverFilter(undefined);
    } else {
      console.log("hjdbfhjdv", e);
      setcaregiverFilter(e);
      setsearchById("");
    }
  };
console.log("appointmentData",appointmentData);

  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <div className="sticky-common-header">
            <div className="common-topheader d-flex align-items-center px-2 mb-1">
              <div
                className="header-nav-item"
                onClick={getWorkProofFromOutlook}
              >
                <span className="header-nav-icon">
                  <img src={upload} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("RETRIVE_WORK_PROOF")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={displaydoc} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("DISPLAY_DIFFRENT_HEADER")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={hidemapped} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("HIDE_MAPPED_HEADER")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={locked_caregiver} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("HIDE_LOCKED_CAREGIVER_HEADER")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={hideoldfile} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("HIDE_OLD_FILES_HEADER")}
                </span>
              </div>
            </div>
          </div>
          <div className="common-content flex-grow-1">
            <div>
              <Form className="form-section ">
                <Row>
                  <Col lg={"4"}>
                    <div>
                      <div className="align-items-center d-flex justify-content-between">
                        <h5 className="content-title">
                          {languageTranslation("MENU_DOCUMENT_UPLOADS")}
                        </h5>
                        {/* <div className="user-select">
                          <Select
                            placeholder="Select Type"
                            options={DocumentTempSelect}
                            value={documentType}
                            onChange={(value: any) => {
                              handleSelect(value);
                              setRowIndex(-1);
                              setImageUrl("");
                              setDocumentUrl("");
                            }}
                            classNamePrefix="custom-inner-reactselect"
                            className={"custom-reactselect"}
                          />
                        </div> */}
                      </div>

                      <div className="working-height">
                        <div className="form-section pt-2 px-3">
                          <FormGroup>
                            <Row className="align-items-center">
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("DOCUMENT_TYPE_LABEL")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <Select
                                    placeholder="Select Type"
                                    options={DocumentTempSelect}
                                    value={documentType}
                                    onChange={(value: any) => {
                                      handleSelect(value);
                                      setRowIndex(-1);
                                      setImageUrl("");
                                      setDocumentUrl("");
                                    }}
                                    classNamePrefix="custom-inner-reactselect"
                                    className={"custom-reactselect"}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>

                          {loading ? (
                            <div>
                              <Loader />
                            </div>
                          ) : null}
                          <Dropzone
                            onDrop={(acceptedFiles) => {
                              handleUpload(acceptedFiles);
                            }}
                            maxSize={maxFileSize10MB}
                            accept={AcceptedDocumentFile.join()}
                            multiple={false}
                          >
                            {({
                              getRootProps,
                              getInputProps,
                              isDragActive,
                              isDragReject,
                              rejectedFiles,
                            }) => {
                              let isValidFile = true;
                              if (rejectedFiles.length > 0) {
                                isValidFile = AcceptedDocumentFile.includes(
                                  rejectedFiles[0].type
                                );
                              }
                              const isFileTooLarge =
                                rejectedFiles.length > 0 &&
                                rejectedFiles[0].size > maxFileSize10MB;

                              return (
                                <section>
                                  <div
                                    {...getRootProps()}
                                    className="dropzone-preview"
                                  >
                                    <input
                                      {...getInputProps()}
                                      className="dropzone-input-preview"
                                    />
                                    <div className="icon-upload">
                                      <i className="cui-cloud-upload"></i>
                                    </div>
                                    <span>
                                      {!isDragActive &&
                                        languageTranslation(
                                          "PERSONAL_DOCUMENTS_UPLOAD"
                                        )}
                                    </span>
                                    {isDragActive &&
                                      !isDragReject &&
                                      languageTranslation(
                                        "PERSONAL_DOCUMENTS_DROP_HERE"
                                      )}
                                    {isDragReject || !isValidFile ? (
                                      <>
                                        {(isDragReject || !isValidFile) && (
                                          <div className="text-danger mt-2">
                                            {languageTranslation(
                                              "VALIDATE_DOCUMENT_TYPE"
                                            )}
                                          </div>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {isFileTooLarge && (
                                          <div className="text-danger mt-2">
                                            {languageTranslation(
                                              "VALIDATE_DOCUMENT_SIZE_MAX_10MB"
                                            )}
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </section>
                              );
                            }}
                          </Dropzone>
                        </div>
                        <div className="workingproof-list custom-scrollbar position-relative">
                          <div className="archieve-table-minheight ">
                            <Table bordered hover responsive className="mb-0">
                              <thead className="thead-bg thead-sticky">
                                <tr>
                                  <th className="date-column">
                                    {languageTranslation("DATE")}
                                  </th>
                                  <th className="file-col">
                                    {languageTranslation("FILE_NAME")}
                                  </th>
                                  <th className="filesize-th-column">
                                    {languageTranslation("FILE_SIZE")}
                                  </th>
                                  <th className={"text-center"}>
                                    {languageTranslation(
                                      "TABEL_HEAD_CG_ACTION"
                                    )}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {!props.loadingData ? (
                                  documentList.length > 0 ? (
                                    documentList.map(
                                      (item: any, index: number) => {
                                        return (
                                          <tr
                                            key={index}
                                            className={
                                              rowIndex === index ? "active" : ""
                                            }
                                          >
                                            <td className="date-column ">
                                              {moment(item.createdAt).format(
                                                "DD.MM.YYYY"
                                              )}{" "}
                                            </td>
                                            <td
                                              className="file-col cursor-pointer"
                                              onClick={() => {
                                                handlePreview(
                                                  item.document,
                                                  index
                                                );
                                              }}
                                            >
                                              <div className="view-more-link word-wrap">
                                                {item.fileName}
                                              </div>
                                            </td>
                                            <td>
                                              {formatFileSize(item.fileSize)}
                                            </td>
                                            <td>
                                              <div className={"action-btn"}>
                                                <span
                                                  id={`delete${index}`}
                                                  className={"btn-icon mr-2"}
                                                  onClick={() => {
                                                    onDelete(item.id);
                                                  }}
                                                >
                                                  {item.status === "approve" ? (
                                                    ""
                                                  ) : (
                                                    <UncontrolledTooltip
                                                      placement={"top"}
                                                      target={`delete${index}`}
                                                    >
                                                      {languageTranslation(
                                                        "DOCUMENT_DELETE"
                                                      )}
                                                    </UncontrolledTooltip>
                                                  )}
                                                  <i className="fa fa-trash"></i>
                                                </span>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )
                                  ) : null
                                ) : (
                                  <tr>
                                    <td className={"table-loader"} colSpan={4}>
                                      <Loader />
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={"4"} className="px-lg-0">
                    <DocumentPreview
                      documentUrls={documentUrls}
                      imageUrls={imageUrls}
                    />
                  </Col>
                  <Col lg={"4"}>
                    <PerformedWork
                      careGiversOptions={careGiversOptions}
                      handleChange={handleChange}
                      appointmentList = {appointmentData && appointmentData.length ? appointmentData : []}
                      caregiverDataLoading={caregiverDataLoading}
                      qualificationList={qualificationList && qualificationList.getQualifications && qualificationList.getQualifications.length ? qualificationList.getQualifications : []}
                    />
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkingProofForm;

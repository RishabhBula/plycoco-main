import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Table,
  Button,
  UncontrolledTooltip,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { DocumentMutations } from "../../../../../graphql/Mutations";

import moment from "moment";
import Select from "react-select";
import { languageTranslation, formatFileSize } from "../../../../../helpers";
import { AppConfig, defaultDateTimeFormat } from "../../../../../config";

import Loader from "../../../containers/Loader/Loader";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { DocumentQueries } from "../../../../../graphql/queries";
import { toast } from "react-toastify";
import ExplicitDocument from "./ExplicitDocument";
const [, , , , , , ADD_DOCUMENT_TYPE_CAREINST] = DocumentMutations;
let toastId: any = "";

const DocumentsList: FunctionComponent<any> = (props: any) => {
  const {
    documentListing,
    setStateValueNull,
    setShowDocumentPopup,
    isApproved,
    onDisapprove,
    onApprove,
    documentId,
    handleCheckElement,
    onUpdateDocument,
    onDeleteDocument,
    approveLoading,
    disapproveLoading,
    loading,
    called,
    documentTypeList,
    userId,
    onDeleteDocumentTypes,
    addedDocumentType,
    setaddedDocumentType,
    setDocumentType,
  } = props;
  let allDocDisApp: boolean = true;
  //Add document type
  const [addDocumentType] = useMutation<any>(ADD_DOCUMENT_TYPE_CAREINST, {
    onCompleted({ addDocument }) {
      // refetch();
      toast.dismiss();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation("DOCUMENT_TYPE_ADDED_SUCCESS")
        );
      }
    },
  });
  // Get added document types list
  if (
    documentListing &&
    documentListing.getDocuments &&
    documentListing.getDocuments.length
  ) {
    documentListing.getDocuments.map((data: any) => {
      if (data && data.status === "approve") {
        allDocDisApp = false;
      }
    });
  }

  //on selecting document type
  const handleDocumentType = (selectedType: any) => {
    if (addedDocumentType) {
      addDocumentType({
        variables: {
          id: userId ? userId : "",
          requiredDocuments:
            selectedType && selectedType.length
              ? selectedType.map((document: any) => parseInt(document.value))
              : null,
        },
      });
    }
    setaddedDocumentType(selectedType);
  };
  const explicitTypeDropdown = documentTypeList
    ? documentTypeList.filter(
        (docType: any) =>
          docType.label !== languageTranslation("VARIOUS_DOCUMENTS")
      )
    : undefined;
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [activeRow, setActiveRow] = useState<number>(-1);
  const expandedText = (index: number) => {
    setIsExpand(activeRow === index || activeRow === -1 ? !isExpand : isExpand);
    setActiveRow(activeRow === index ? -1 : index);
  };
  return (
    <>
      <div className="document-upload-section ">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <h5 className="content-title mb-3">
            {languageTranslation("CG_SUB_MENU_DOCUMENTS")}
          </h5>
          <div>
            {isApproved ? (
              <Button
                onClick={() => {
                  onDisapprove();
                }}
                className="btn-common btn-inactive mb-3 mr-3"
                color="link"
              >
                {disapproveLoading ? (
                  <>
                    <i className="fa fa-spinner fa-spin " />{" "}
                    {languageTranslation("DISAPPROVE")}
                  </>
                ) : (
                  languageTranslation("DISAPPROVE")
                )}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  onApprove();
                }}
                disabled={
                  (documentListing &&
                    documentListing.getDocuments &&
                    documentListing.getDocuments.filter(
                      (document: any) =>
                        document.isDefault && document.status !== "approve"
                    ).length) ||
                  loading
                    ? true
                    : false // If any of the required document in not approved by admin
                }
                className="btn-common btn-active mb-3 mr-3 "
                color="link"
              >
                {approveLoading ? (
                  <>
                    <i className="fa fa-spinner fa-spin " />{" "}
                    {languageTranslation("APPROVE")}
                  </>
                ) : (
                  languageTranslation("APPROVE")
                )}
              </Button>
            )}
            <Button
              onClick={() => {
                setStateValueNull();
                setShowDocumentPopup(true);
                setDocumentType(
                  documentTypeList.filter(
                    (docType: any) =>
                    docType.value === "6"
                    // docType.label === languageTranslation("VARIOUS_DOCUMENTS")
                  )[0]
                );
              }}
              className="btn-common mb-3"
              color="primary"
            >
              <i className={"fa fa-upload"} />
              &nbsp;{languageTranslation("UPLOAD_DOCUMENT")}
            </Button>
          </div>
        </div>
        <div className="archieve-table-minheight ">
          <Table bordered responsive>
            <thead className="thead-bg">
              <tr>
                <th className="sno-th-column text-center">
                  {languageTranslation("S_NO")}
                </th>
                <th className="date-th-column">
                  {languageTranslation("DATE")}
                </th>
                <th className="file-th-column">
                  {languageTranslation("FILE_NAME")}
                </th>
                <th className="filetype-th-column">
                  {languageTranslation("TYPE")}
                </th>
                <th>{languageTranslation("REMARKS")}</th>
                <th className="checkbox-th-column ">
                  {languageTranslation("CHECKED")}
                </th>
                <th className="filesize-th-column">
                  {languageTranslation("FILE_SIZE")}
                </th>
                <th className={"text-center action-th-column"}>
                  {languageTranslation("TABEL_HEAD_CG_ACTION")}
                </th>
              </tr>
            </thead>
            <tbody>
              {!called || loading ? (
                <tr>
                  <td className={"table-loader"} colSpan={8}>
                    <Loader />
                  </td>
                </tr>
              ) : documentListing &&
                documentListing.getDocuments &&
                documentListing.getDocuments.length ? (
                documentListing.getDocuments.map((list: any, index: number) => {
                  const documentLength = documentListing.getDocuments.length;

                  return (
                    <tr
                      key={index}
                      className={
                        list.fileName && list.status === "approve"
                          ? "approve-bg"
                          : "table-danger"
                      }
                    >
                      <td className="sno-th-column text-center">{index + 1}</td>
                      <td className="date-th-column">
                        {list && list.createdAt && list.fileName // filename condition to manage missing document
                          ? moment(list.createdAt).format(defaultDateTimeFormat)
                          : "-"}
                      </td>
                      <td>
                        <span
                          onClick={() =>
                            list.fileName
                              ? window.open(
                                  `${AppConfig.FILES_ENDPOINT}${list.document}`,
                                  "_blank"
                                )
                              : ""
                          }
                          className={`word-wrap ${
                            list.fileName
                              ? "view-more-link"
                              : "text-black-50 font-weight-bold cursor-notallowed"
                          }`}
                        >
                          {list && list.fileName
                            ? list.fileName
                            : `---${languageTranslation(
                                "DOCUMENT_MISSING"
                              )}---`}
                        </span>
                      </td>
                      <td>
                        <span>
                          {list && list.document_type && list.document_type.type
                            ? list.document_type.type
                            : "-"}
                        </span>
                      </td>
                      <td className="remark-col">
                        {list && list.remarks ? (
                          list.remarks.length <= 100 ? (
                            list.remarks
                          ) : (
                            <p className="mb-0">
                              {isExpand && activeRow === index
                                ? list.remarks
                                : list.remarks.substr(0, 100)}
                              <span
                                className="view-more-link"
                                onClick={() => expandedText(index)}
                              >
                                {isExpand && activeRow === index
                                  ? `...${languageTranslation("READ_LESS")}`
                                  : `...${languageTranslation("READ_MORE")}`}
                              </span>
                            </p>
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="text-center">
                        <span className=" checkbox-custom ">
                          <input
                            type="checkbox"
                            checked={
                              documentId && documentId.id === list.id
                                ? documentId.checked
                                : list.status === "approve"
                                ? true
                                : false
                            }
                            disabled={list && !list.fileName}
                            onChange={(e: any) => {
                              handleCheckElement(e, list.id, list.status);
                            }}
                            className=""
                          />
                          <label className=""></label>
                        </span>
                      </td>

                      <td>
                        {" "}
                        {list.fileSize ? formatFileSize(list.fileSize) : "-"}
                      </td>
                      <td>
                        <div className={`action-btn`}>
                          <span
                            id={`edit${index}`}
                            className="btn-icon mr-2"
                            onClick={() =>
                              onUpdateDocument(
                                list,
                                list && list.fileName ? false : true // To ensure user try to edit missing document
                              )
                            }
                            // disable={list.status === 'approve'}
                          >
                            <UncontrolledTooltip
                              placement={"top"}
                              target={`edit${index}`}
                            >
                              {languageTranslation("DOCUMENT_EDIT")}
                            </UncontrolledTooltip>
                            <i className="fa fa-pencil"></i>
                          </span>
                          <span
                            id={`delete${index}`}
                            className={`btn-icon mr-2 ${
                              list.status === "approve" ||
                              (list && !list.fileName)
                                ? "disabled-class"
                                : ""
                            }`}
                            onClick={() =>
                              (list && !list.fileName) ||
                              list.status === "approve"
                                ? ""
                                : onDeleteDocument(list.id)
                            }
                          >
                            {(list && !list.fileName) ||
                            list.status === "approve" ? (
                              ""
                            ) : (
                              <UncontrolledTooltip
                                placement={"top"}
                                target={`delete${index}`}
                              >
                                {languageTranslation("DOCUMENT_DELETE")}
                              </UncontrolledTooltip>
                            )}
                            <i className="fa fa-trash"></i>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className={"text-center no-hover-row"}>
                  <td colSpan={8} className={"pt-5 pb-5"}>
                    <div className="no-data-section">
                      <div className="no-data-icon">
                        <i className="icon-ban" />
                      </div>
                      <h4 className="mb-1">
                        {languageTranslation("NO_DATA_IN_DOCUMENTS")}{" "}
                      </h4>
                      <p>{languageTranslation("CLICK_TO_ADD_NEW_DOCUMENT")} </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        {/* <ExplicitDocument
          userId={userId}
          onDeleteDocumentTypes={onDeleteDocumentTypes}
          addedDocumentType={addedDocumentType}
          setaddedDocumentType={setaddedDocumentType}
          handleDocumentType={handleDocumentType}
        /> */}
        <Row>
          <Col lg={4} md={5} sm={12}>
            <h5 className="content-title ">
              {languageTranslation("EXPLICITLY_DOCUMENT")}
            </h5>
            <div className="common-list-wrap">
              <div className="common-list-header d-flex align-items-cente justify-content-between">
                <div className="common-list-title align-middle">
                  {languageTranslation("TYPE")}{" "}
                </div>
              </div>
              <div className="common-list-body custom-scrollbar filetypelist">
                <ul className="common-list list-unstyled mb-0">
                  {addedDocumentType
                    ? addedDocumentType.map((type: any, index: number) => {
                        return (
                          <li
                            className={
                              "cursor-pointer list-item text-capitalize"
                            }
                            key={index}
                          >
                            <span className="list-item-text one-line-text">
                              {type.label}{" "}
                            </span>
                            <span
                              id={`delete${index}`}
                              onClick={() => {
                                onDeleteDocumentTypes(type.value);
                              }}
                              className="list-item-icon"
                            >
                              <i className="fa fa-trash"></i>
                            </span>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </div>
              <div className="common-list-footer form-section ">
                <FormGroup className="mb-0">
                  <Select
                    menuPlacement={"top"}
                    placeholder={languageTranslation("SELECT_TYPE_FROM_LIST")}
                    value={addedDocumentType}
                    isMulti
                    options={explicitTypeDropdown}
                    className="attribute-select"
                    classNamePrefix="attribute-inner-select"
                    onChange={handleDocumentType}
                    styles={{
                      multiValue: (provided, state) => {
                        const display = "none";
                        return { ...provided, display };
                      },
                    }}
                    isClearable={false}
                  />
                </FormGroup>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default DocumentsList;

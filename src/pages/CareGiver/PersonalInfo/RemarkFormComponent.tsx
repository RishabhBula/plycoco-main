import React, { FunctionComponent, useState } from "react";
import { Input, Col, UncontrolledTooltip } from "reactstrap";
import { FormikProps, FieldArray } from "formik";
import { languageTranslation } from "../../../helpers";
import { ICareInstitutionRemarks, ICareGiverValues } from "../../../interfaces";
import moment from "moment";

const RemarkFormComponent: FunctionComponent<FormikProps<ICareGiverValues>> = (
  props: FormikProps<ICareGiverValues>
) => {
  let [addRemark, setRemark] = useState(true);
  let [changeRemark, setchangeRemark] = useState({
    data: "",
    createdAt: "",
    createdBy: ""
  });

  let [isEditRemark, setisEditRemark] = useState(false)
  let [remarkIndex, setisRemarkIndex] = useState(-1)
  let [isRemoveRemark, setRemoveRemark] = useState(false)

  const {
    values: { remarks },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched
  } = props;

  return (
    <Col lg={4}>
      <div className="remark-details">
        <div className="remark-header d-flex align-items-center justify-content-between">
          <h5 className="my-2 text-left activity-title">
            {" "}
            {languageTranslation("REMARKS")}
          </h5>
        </div>
        <div className="remark-body remark-body-max-height ">
          <div className="activity-logs ">
            {addRemark ? (
              <>
                <FieldArray
                  name="remarks"
                  render={arrayHelpers => (
                    <div>
                      <div>
                        <div className="activity-block py-2 ">
                          <div>
                            <div className="remark-section">
                              <Input
                                type="textarea"
                                name={"remarks"}
                                onChange={(e: any) =>
                                  setchangeRemark(
                                    (changeRemark = {
                                      data: e.target.value.trimStart(),
                                      createdAt: moment().format(
                                        "MMMM Do YYYY, h:mm a"
                                      ),
                                      createdBy: "john doe"
                                    })
                                  )
                                }
                                placeholder="Remarks"
                                value={changeRemark.data}
                                className="height-textarea "
                              />
                            </div>
                          </div>
                          <div className="activity-date position-relative">
                            <span>
                              <i className="fa fa-clock-o mr-2"></i>
                              {moment().format("MMMM Do YYYY, h:mm a")}
                            </span>
                            <span>
                              <i className="fa fa-user mr-2"></i>Mark Smith
                            </span>
                            <div className="remark-action-btn">
                              {!isEditRemark ? (
                                <div
                                  className={`add-remark-btn ${
                                    !changeRemark.data ? "disabled-div" : " "
                                    }`}
                                  onClick={e => {
                                    changeRemark && changeRemark.data
                                      ? arrayHelpers.push(changeRemark)
                                      : null;
                                    setchangeRemark(
                                      (changeRemark = {
                                        data: "",
                                        createdAt: "",
                                        createdBy: ""
                                      })
                                    );
                                    null;
                                  }}
                                >
                                  <i className={"fa fa-plus"} />
                                  &nbsp; Add More
                                </div>
                              ) : (
                                  <>
                                    <span
                                      id={`update_remarks`}
                                      className={
                                        "edit-btn btn-theme cursor-pointer"
                                      }
                                      onClick={e => {
                                        changeRemark && changeRemark.data
                                          ? arrayHelpers.push(changeRemark)
                                          : null;
                                        setchangeRemark(
                                          (changeRemark = {
                                            data: "",
                                            createdAt: "",
                                            createdBy: ""
                                          })
                                        );
                                        arrayHelpers.remove(remarkIndex);
                                        null;
                                      }}
                                    >
                                      <UncontrolledTooltip
                                        placement={"top"}
                                        target={`update_remarks`}
                                      >
                                        Update remarks
                                    </UncontrolledTooltip>
                                      <i className="icon-pencil"></i>
                                    </span>
                                    <span
                                      id={`cancel_remarks`}
                                      className={"delete-btn cursor-pointer"}
                                      onClick={() => {
                                        setisEditRemark((isEditRemark = false));
                                        setchangeRemark(
                                          (changeRemark = {
                                            data: "",
                                            createdAt: "",
                                            createdBy: ""
                                          })
                                        );
                                        null;
                                      }}
                                    >
                                      <UncontrolledTooltip
                                        placement={"top"}
                                        target={`cancel_remarks`}
                                      >
                                        cancel remarks
                                    </UncontrolledTooltip>
                                      <i className="fa fa-times"></i>
                                    </span>
                                  </>
                                )}
                            </div>
                          </div>
                          <span className="activity-icon activity-set"></span>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </>
            ) : null}
            {remarks && remarks.length ? (
              <>
                {remarks
                  .reverse()
                  .map((remark: ICareInstitutionRemarks, index: number) => {
                    return (
                      <div className="activity-block py-2 ">
                        <div>
                          <div className="remark-section">{remark.data}</div>
                        </div>
                        <div className=" activity-date position-relative">
                          <span>
                            <i className="fa fa-clock-o mr-2"></i>
                            {remark.createdAt}
                          </span>
                          <span>
                            <i className="fa fa-user mr-2"></i>Mark Smith
                          </span>
                          <div className="remark-action-btn">
                            <span
                              id={`edit${index}`}
                              onClick={() => {
                                setchangeRemark(
                                  (changeRemark = {
                                    data: remark.data,
                                    createdAt: moment(remark.createdAt).format(
                                      "MMMM Do YYYY, h:mm a"
                                    ),
                                    createdBy: "john doe"
                                  })
                                );
                                setisEditRemark((isEditRemark = true));
                                setisRemarkIndex((remarkIndex = index));
                              }}
                              className="edit-btn cursor-pointer"
                            >
                              <UncontrolledTooltip
                                placement={"top"}
                                target={`edit${index}`}
                              >
                                Edit remarks
                              </UncontrolledTooltip>
                              <i className="icon-pencil"></i>
                            </span>
                            <span
                              onClick={() => {
                                setRemoveRemark(isRemoveRemark = true);
                                setisRemarkIndex(remarkIndex = index)
                              }}
                              className="delete-btn cursor-pointer"
                              id={`delete${index}`}
                            >
                              <UncontrolledTooltip
                                placement={"top"}
                                target={`delete${index}`}
                              >
                                Delete remarks
                              </UncontrolledTooltip>
                              <i className="icon-trash"></i>
                            </span>
                          </div>
                        </div>
                        <span className="activity-icon activity-set"></span>
                      </div>
                    );
                  })}
              </>
            ) : (
                ""
              )}

            {remarks && remarks.length
              ? remarks
                .reverse()
                .map((remarkData: ICareInstitutionRemarks, index: number) => {
                  <div className="activity-block py-2 ">
                    <div>
                      <span className="text-capitalize">
                        {remarkData.data}
                        <span className="view-more-link">View More</span>
                      </span>
                    </div>
                    <div className=" activity-date position-relative">
                      <span>
                        <i className="fa fa-clock-o mr-2"></i>
                        {remarkData.createdAt}
                      </span>
                      <span>
                        <i className="fa fa-user mr-2"></i>
                        {remarkData.createdBy}
                      </span>
                    </div>
                    <span className="activity-icon activity-set"></span>
                  </div>;
                })
              : null}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default RemarkFormComponent;

import React, { FunctionComponent, useState, useEffect } from "react";
import Select from "react-select";
import { FormikProps, Field } from "formik";
import moment from "moment";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import classnames from "classnames";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import MaskedInput from "react-text-mask";
import { languageTranslation } from "../../../../../helpers";
import {
  IAppointmentCareInstitutionForm,
  ICareinstitutionFormValue,
  IReactSelectInterface,
} from "../../../../../interfaces";
import {
  ShiftTime,
  TimeMask,
  appointmentDayFormat,
  defaultDateFormat,
  dbAcceptableFormat,
} from "../../../../../config";
import "../index.scss";

const CareinstitutionFormView: FunctionComponent<
  FormikProps<ICareinstitutionFormValue> & IAppointmentCareInstitutionForm & any
> = (
  props: FormikProps<ICareinstitutionFormValue> &
    IAppointmentCareInstitutionForm &
    any
) => {
  useEffect(() => {
    if (props.savingBoth && !timeSlotError) {
      handleSubmit();
    }
  }, [props.savingBoth]);
  const {
    values: {
      appointmentId,
      name,
      shift,
      startTime,
      endTime,
      qualificationId,
      department,
      address,
      contactPerson,
      isWorkingProof,
      departmentBookingRemarks,
      departmentOfferRemarks,
      departmentRemarks,
      offerRemarks,
      bookingRemarks,
      comments,
      status,
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    activeDateCareinstitution,
    selectedCareinstitution,
    qualificationList,
    careInstitutionDepartment,
    setcareInstituionDept,
    careInstitutionTimesOptions,
    setcareInstituionShift,
    selctedRequirement,
    handleQualification,
    onhandleDelete,
    careInstitutionListArr,
    handleSelectUserList,
    addCareinstLoading,
    timeSlotError,
    starMarkCareinstitution,
  } = props;

  let d = moment().format("L");
  let dtStart: any = new Date(d + " " + startTime);
  let dtEnd: any = new Date(d + " " + endTime);
  let difference = dtEnd - dtStart;

  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
    if (name === "department") {
      setcareInstituionDept(selectOption, props.values);
    }
    if (name === "shift") {
      setcareInstituionShift(selectOption, props.values);
    }
  };

  let isRequirment: boolean = false,
    isMatching: boolean = false,
    isContract: boolean = false,
    isConfirm: boolean = false,
    isOffered: boolean = false;

  if (selctedRequirement || status) {
    if (
      (selctedRequirement && selctedRequirement.status === "default") ||
      status === "default"
    ) {
      isRequirment = true;
    } else if (
      (selctedRequirement && selctedRequirement.status === "linked") ||
      status === "linked"
    ) {
      isMatching = true;
    } else if (
      (selctedRequirement && selctedRequirement.status === "contract") ||
      status === "contract"
    ) {
      isContract = true;
    } else if (
      (selctedRequirement && selctedRequirement.status === "confirmed") ||
      status === "confirmed"
    ) {
      isConfirm = true;
    } else if (
      (selctedRequirement && selctedRequirement.status === "offered") ||
      status === "offered"
    ) {
      isOffered = true;
    }
  }

  const handleUserList = (id: string, name: string) => {
    let data: any =
      careInstitutionListArr && careInstitutionListArr.result
        ? careInstitutionListArr.result
        : {};
    if (
      id &&
      !starMarkCareinstitution &&
      careInstitutionListArr &&
      careInstitutionListArr.result
    ) {
      data = careInstitutionListArr.result.filter((x: any) => x.id === id);
    }
    handleSelectUserList(data, name);
  };

  const DepartmentError: any = errors.department;
  const qualificationError: any = errors.qualificationId;
  const shiftOptions =
    careInstitutionTimesOptions && careInstitutionTimesOptions.length
      ? careInstitutionTimesOptions
      : ShiftTime;

  let dateCondition: any;
  if (
    activeDateCareinstitution &&
    activeDateCareinstitution.length &&
    activeDateCareinstitution[0]
  ) {
    let now = moment().format(dbAcceptableFormat);
    let input = moment(activeDateCareinstitution[0]).format(dbAcceptableFormat);
    dateCondition = now <= input;
  }
  return (
    <>
      <div className="form-section ">
        <div
          className={classnames({
            "form-card custom-height custom-scrollbar": true,
            "requirement-bg": isRequirment,
            "matching-bg": isMatching,
            "contract-bg": isConfirm,
            "availability-bg": isOffered,
          })}
        >
          <h5 className="content-title">
            {languageTranslation("MENU_INSTITUTION")}
          </h5>
          <Row>
            {appointmentId ? (
              <Col lg={"12"}>
                <FormGroup>
                  <Row>
                    <Col sm="4">
                      <Label className="form-label col-form-label">
                        {languageTranslation("APPOINTMENT_ID")}
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="required-input appointment-id-width">
                          <Input
                            value={appointmentId}
                            disabled
                            placeholder={languageTranslation("APPOINTMENT_ID")}
                          />
                        </div>
                        <div className="d-flex align-items-center uber-solona whitespace-nowrap mb-1">
                          {languageTranslation("ABOUT_SOLONA")}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            ) : null}
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("NAME")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input">
                      <InputGroup>
                        <Input
                          type="text"
                          name={"name"}
                          placeholder={languageTranslation("NAME")}
                          disabled
                          value={name ? name : languageTranslation("NAME")}
                        />
                        <InputGroupAddon
                          addonType="append"
                          className="cursor-pointer"
                          onClick={() =>
                            name
                              ? handleUserList(
                                  selectedCareinstitution
                                    ? selectedCareinstitution.id
                                    : "",
                                  "careinstitution"
                                )
                              : ""
                          }
                        >
                          <InputGroupText>
                            <i
                              className={
                                starMarkCareinstitution
                                  ? "fa fa-star theme-text"
                                  : "fa fa-star"
                              }
                              aria-hidden="true"
                            ></i>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("DATE")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="text-value one-line-text">
                      {activeDateCareinstitution
                        ? activeDateCareinstitution
                            .map(
                              (dateString: string | undefined, index: number) =>
                                dateString
                                  ? moment(dateString).format(
                                      index !==
                                        activeDateCareinstitution.length - 1
                                        ? "dd DD"
                                        : `${appointmentDayFormat} ${defaultDateFormat}`
                                    )
                                  : null
                            )
                            .join(", ")
                        : null}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            {/* <Col sm={'12'} lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm={'5'}>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('SHIFT')}
                    </Label>
                  </Col>
                  <Col sm={'7'}>
                    <div>
                      <Select
                        placeholder='Select'
                        options={
                          careInstitutionTimesOptions &&
                          careInstitutionTimesOptions.length
                            ? careInstitutionTimesOptions
                            : ShiftTime
                        }
                        value={shift ? shift : undefined}
                        classNamePrefix='custom-inner-reactselect'
                        className={'custom-reactselect'}
                        onChange={(value: any) => handleSelect(value, 'shift')}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col> */}
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("START_WORKING")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                      <div className="required-input clockshift-input">
                        <InputGroup className="flex-nowrap">
                          <Field name={"startTime"}>
                            {({ field }: any) => (
                              <MaskedInput
                                {...field}
                                mask={TimeMask}
                                className={
                                  errors.startTime && touched.startTime
                                    ? "text-input error form-control"
                                    : "text-input form-control"
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={startTime ? startTime : ""}
                              />
                            )}
                          </Field>
                          {errors.startTime && touched.startTime && (
                            <div className="required-tooltip">
                              {errors.startTime}
                            </div>
                          )}
                          <InputGroupAddon addonType="append">
                            <InputGroupText>
                              {languageTranslation("UHR")}
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                      <UncontrolledDropdown className="custom-dropdown">
                        <DropdownToggle
                          className={"add-new-btn"}
                          value={shift ? shift : undefined}
                        >
                          <i className="fa fa-clock-o" aria-hidden="true" />
                        </DropdownToggle>
                        <DropdownMenu>
                          {shiftOptions && shiftOptions.length
                            ? shiftOptions.map(
                                (
                                  option: IReactSelectInterface,
                                  index: number
                                ) => {
                                  return (
                                    <DropdownItem
                                      key={index}
                                      value={option.value}
                                      onClick={(e: any) =>
                                        handleSelect(option, "shift")
                                      }
                                    >
                                      {option.label}
                                    </DropdownItem>
                                  );
                                }
                              )
                            : ""}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("END_WORKING")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input clockshift-input">
                      <InputGroup className="flex-nowrap">
                        <Field name={"endTime"}>
                          {({ field }: any) => (
                            <MaskedInput
                              {...field}
                              mask={TimeMask}
                              className={
                                errors.endTime && touched.endTime
                                  ? "fee-width form-control error"
                                  : "fee-width form-control"
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={endTime ? endTime : ""}
                            />
                          )}
                        </Field>
                        {errors.endTime ? (
                          errors.endTime &&
                          touched.endTime && (
                            <div className="required-tooltip">
                              {errors.endTime}
                            </div>
                          )
                        ) : touched.endTime && difference <= 0 ? (
                          <div className="required-tooltip">
                            {languageTranslation("VALID_TIME_RANGE")}
                          </div>
                        ) : null}
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            {languageTranslation("UHR")}
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("QUALIFICATION")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="postion-relative">
                      <Button
                        className={
                          qualificationId && qualificationId.length
                            ? "add-new-btn arrow-btn"
                            : "add-new-btn arrow-btn disabled-class"
                        }
                        color=""
                        onClick={() => {
                          if (qualificationId && qualificationId.length) {
                            handleQualification(qualificationId);
                          }
                        }}
                      >
                        <i className="fa fa-arrow-up" aria-hidden="true" />
                      </Button>

                      <div
                        className={`custom-select-checkbox select-right-bottom ${
                          errors.qualificationId && touched.qualificationId
                            ? "error"
                            : " "
                        }`}
                      >
                        <ReactMultiSelectCheckboxes
                          options={qualificationList}
                          placeholderButtonLabel={languageTranslation(
                            "CAREGIVER_QUALIFICATION_PLACEHOLDER"
                          )}
                          placeholder={languageTranslation(
                            "CAREGIVER_QUALIFICATION_PLACEHOLDER"
                          )}
                          // placeholder="Select Qualifications"

                          className={
                            errors.qualificationId && touched.qualificationId
                              ? "custom-reactselect error"
                              : "custom-reactselect"
                          }
                          classNamePrefix="custom-inner-reactselect"
                          onChange={(value: any) =>
                            handleSelect(value, "qualificationId")
                          }
                          value={
                            qualificationId && qualificationId.length
                              ? qualificationId
                              : []
                          }
                        />
                        {errors.qualificationId && touched.qualificationId && (
                          <div className="required-tooltip">
                            {qualificationError}
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("DEPARTMENT")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input">
                      <Select
                        placeholder={languageTranslation("SELECT_DEPARTMENT")}
                        options={careInstitutionDepartment}
                        isDisabled={
                          careInstitutionDepartment.length <= 0 ? true : false
                        }
                        classNamePrefix="custom-inner-reactselect"
                        // className={'custom-reactselect'}
                        className={
                          errors.department && touched.department
                            ? "custom-reactselect error"
                            : "custom-reactselect"
                        }
                        onChange={(value: any) =>
                          handleSelect(value, "department")
                        }
                        value={
                          department && department.value ? department : null
                        }
                      />
                      {errors.department && touched.department && (
                        <div className="required-tooltip">
                          {DepartmentError}
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("ADDRESS")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input">
                      <Input
                        type="textarea"
                        name={"address"}
                        disabled={true}
                        placeholder={languageTranslation("ADDRESS")}
                        value={department ? address : ""}
                        className="textarea-custom form-control"
                        rows="2"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("CONTACT_PERSON")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input">
                      <Input
                        type="text"
                        disabled={true}
                        name={"contactPerson"}
                        placeholder={languageTranslation("CONTACT_PERSON")}
                        className="width-common"
                        value={contactPerson ? contactPerson : ""}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("REMARKS_OFFER_DEPARTMENT")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        disabled={true}
                        type="textarea"
                        name="departmentOfferRemarks"
                        id="exampleText"
                        value={
                          departmentOfferRemarks ? departmentOfferRemarks : ""
                        }
                        maxLength={255}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("REMARKS_BOOKING_DEPARTEMENT")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        disabled={true}
                        type="textarea"
                        name="departmentBookingRemarks"
                        id="exampleText"
                        value={
                          departmentBookingRemarks
                            ? departmentBookingRemarks
                            : ""
                        }
                        maxLength={255}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation(
                        "REMARK_DEPARTMENT_VISIBLE_INTERNALLY"
                      )}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        disabled={true}
                        type="textarea"
                        name="departmentRemarks"
                        id="exampleText"
                        value={departmentRemarks ? departmentRemarks : ""}
                        maxLength={255}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("WORKING_PROOF_NECESSARY")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input">
                      <FormGroup check inline>
                        <div className=" checkbox-custom mb-0">
                          <input
                            type="checkbox"
                            id="isWorkingProof"
                            name={"isWorkingProof"}
                            className=""
                            checked={isWorkingProof}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const {
                                target: { checked },
                              } = e;
                              setFieldValue("isWorkingProof", checked);
                            }}
                          />
                          <Label for="isWorkingProof"></Label>
                        </div>
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("REMARK_OFFER")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        type="textarea"
                        name="offerRemarks"
                        id="exampleText"
                        value={offerRemarks ? offerRemarks : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={255}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("REMARK_BOOKING")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        type="textarea"
                        name="bookingRemarks"
                        id="exampleText"
                        value={bookingRemarks ? bookingRemarks : ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={255}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row>
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("COMMENT_ONLY_VISIBLE_INTERNALLY")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div className="required-input">
                      <Input
                        className="textarea-custom form-control"
                        rows="3"
                        type="textarea"
                        name="comments"
                        id="exampleText"
                        value={comments ? comments : ""}
                        onChange={handleChange}
                        maxLength={255}
                        onBlur={handleBlur}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <div className="d-flex align-items-center justify-content-between">
                <Button
                  className={"btn-save"}
                  color="danger"
                  onClick={() =>
                    onhandleDelete("careinstitution", appointmentId)
                  }
                  disabled={!appointmentId}
                >
                  {languageTranslation("DELETE")}
                </Button>
                <Button
                  className="btn-save"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={
                    addCareinstLoading
                      ? true
                      : appointmentId
                      ? false
                      : !dateCondition
                      ? true
                      : false
                  }
                >
                  {addCareinstLoading ? (
                    <i className="fa fa-spinner fa-spin mr-2" />
                  ) : (
                    ""
                  )}
                  {appointmentId
                    ? languageTranslation("UPDATE_BUTTON")
                    : languageTranslation("SAVE_BUTTON")}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CareinstitutionFormView;

import React, { FunctionComponent } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  CustomInput
} from "reactstrap";
import Select from "react-select";
import DayPicker from "react-day-picker";
import { languageTranslation } from "../../../../helpers";
import { Priority } from "../../../../config";
import "react-day-picker/lib/style.css";
import close from "../../../assets/img/cancel.svg";
import closehover from "../../../assets/img/cancel-hover.svg";
import { FormikProps } from "formik";
import { ICreateTodoFormValues } from "../../../../interfaces";



const CreateTodoForm: FunctionComponent<FormikProps<
  ICreateTodoFormValues
> &
  any> = (props: FormikProps<ICreateTodoFormValues> & any) => {
    const {
      // values: {
      //   timeOfDay,
      //   comment,
      // },
      isLoading,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      show,
      handleClose,
      name,
      userRole
    } = props;

    const modifiers = {
      sundays: { daysOfWeek: [0] },
      saturdays: { daysOfWeek: [6] }
    };
    const modifiersStyles = {
      sundays: {
        color: "#ff2d2d",
        backgroundColor: "transparent"
      },
      saturdays: {
        color: "#ff2d2d",
        backgroundColor: "transparent"
      },
      outside: { backgroundColor: "transparent" }
    };
    const externalCloseBtn = (
      <button className="close modal-close" onClick={() => handleClose()}>
        <img src={close} alt="close" className="main-img" />
        <img src={closehover} alt="close" className="hover-img" />
      </button>
    );
    return (
      <div>
        <Modal isOpen={show} className="reminder-modal" size="lg" centered>
          <ModalHeader close={externalCloseBtn}>
            {" "}
            {languageTranslation("CG_MENU_CREATE_TODO")} for {name}{" "}
          </ModalHeader>
          <ModalBody>
            <div className="">
              <div className="calender-wrapper mb-4">
                <Row>
                  <Col lg={"4"}>
                    <div>
                      <DayPicker
                        selectedDays={new Date()}
                        modifiers={modifiers}
                        modifiersStyles={modifiersStyles}
                      />
                    </div>
                  </Col>
                  <Col lg={"4"}>
                    <div>
                      <DayPicker
                        initialMonth={new Date(2020, 2)}
                        modifiers={modifiers}
                        modifiersStyles={modifiersStyles}
                      />
                    </div>
                  </Col>
                  <Col lg={"4"}>
                    <div>
                      <DayPicker
                        initialMonth={new Date(2020, 3)}
                        modifiers={modifiers}
                        modifiersStyles={modifiersStyles}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <Form className="form-section forms-main-section">
                <Row>
                  <Col lg={"6"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            {languageTranslation("TIME_OF_DAY")}
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"timeOfDay"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              // value={timeOfDay}
                              placeholder={languageTranslation("TIME_OF_DAY")}
                              // className={
                              //   errors.timeOfDay && touched.timeOfDay
                              //     ? "text-input error"
                              //     : "text-input"
                              // }
                            />
                            {/* {errors.timeOfDay && touched.timeOfDay && (
                              <div className="required-tooltip">{errors.timeOfDay}</div>
                            )} */}
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"6"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            {languageTranslation("JURIDICTION")}
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div className="custom-radio-block">
                            <FormGroup check inline>
                              <CustomInput
                                type="radio"
                                id="yes"
                                name="driversLicense"
                                label={languageTranslation("INTERNALLY")}
                              />
                            </FormGroup>
                            <FormGroup check inline>
                              <CustomInput
                                type="radio"
                                id="no"
                                name="driversLicense"
                                label={languageTranslation("EXTERNALLY")}
                              />
                            </FormGroup>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  {userRole === "careInstitution" ? (
                    <Col lg={"6"}>
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              {languageTranslation("CONTACT")}
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div>
                              <Select
                                options={[
                                  { label: "John Doe", value: "John Doe" },
                                  { label: "Mark Doe", value: "Mark Doe" }
                                ]}
                                classNamePrefix="custom-inner-reactselect"
                                className={"custom-reactselect"}
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                  ) : null}
                  <Col lg={"6"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            {languageTranslation("PRIORITY")}
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
                              placeholder={languageTranslation("PRIORITY")}
                              options={Priority}
                              classNamePrefix="custom-inner-reactselect"
                              className={"custom-reactselect"}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="2">
                          <Label className="form-label col-form-label">
                            {languageTranslation("COMMENT")}{" "}
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="10">
                          <div>
                            <Input
                              type="textarea"
                              name={"comment"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              // value={comment}
                              placeholder={languageTranslation("COMMENT")}
                              rows="4"
                              maxLength={250}
                              className={
                                // errors.comment && touched.comment
                                //   ? "textarea-custom error"
                                //   : "textarea-custom"
                                "textarea-custom"
                              }
                            />
                            {/* {errors.comment && touched.comment && (
                              <div className="required-tooltip">{errors.comment}</div>
                            )} */}
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">{languageTranslation("ADD_REMINDER")}</Button>
            <Button color="secondary" onClick={handleClose}>
              {languageTranslation("CANCEL")}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

export default CreateTodoForm;
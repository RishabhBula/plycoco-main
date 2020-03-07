import React, { FunctionComponent, useState } from 'react';

import '../index.scss';
import {
  IAppointmentCareInstitutionForm,
  IDaysArray,
  ICareinstitutionFormValue,
  IReactSelectInterface
} from '../../../../../interfaces';
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';
import '../index.scss';
import { languageTranslation } from '../../../../../helpers';
import MaskedInput from 'react-text-mask';
import {
  NightAllowancePerHour,
  State,
  ShiftTime,
  TimeMask
} from '../../../../../config';
import Select from 'react-select';
import { FormikProps, Field } from 'formik';
import moment from 'moment';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import classnames from 'classnames';

const CareinstitutionFormView: FunctionComponent<FormikProps<
  ICareinstitutionFormValue
> &
  IAppointmentCareInstitutionForm &
  any> = (
  props: FormikProps<ICareinstitutionFormValue> &
    IAppointmentCareInstitutionForm &
    any
) => {
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
      comments
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    activeDateCareinstitution,
    selectedCareinstitution,
    qualificationList,
    careInstitutionDepartment,
    setcareInstituionDept,
    careInstitutionTimesOptions,
    setcareInstituionShift,
    addCareinstitutionRes,
    selctedRequirement,
    secondStarCanstitution
  } = props;

  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
    if (name === 'department') {
      setcareInstituionDept(selectOption, props.values);
    }
    if (name === 'shift') {
      setcareInstituionShift(selectOption, props.values);
    }
  };

  let appintmentId: any = null;
  if (addCareinstitutionRes && addCareinstitutionRes.id) {
    appintmentId = addCareinstitutionRes.id;
  } else if (selctedRequirement && selctedRequirement.id) {
    appintmentId = selctedRequirement.id;
  }

  let isRequirment: boolean = false,
    isMatching: boolean = false,
    isContract: boolean = false;

  if (selctedRequirement) {
    if (selctedRequirement.status === 'requirement') {
      isRequirment = true;
    } else if (selctedRequirement.status === 'linked') {
      isMatching = true;
    } else if (selctedRequirement.status === 'contract') {
      isContract = true;
    }
  }
  console.log('appointmentId', appointmentId);
  return (
    <>
      <div className='form-section '>
        <div
          className={classnames({
            'form-card custom-height custom-scrollbar': true,
            'requirement-bg': isRequirment,
            'matching-bg': isMatching,
            'contract-bg': isContract
          })}
        >
          <h5 className='content-title'>
            {languageTranslation('MENU_INSTITUTION')}
          </h5>
          <Row>
            <Col lg={'12'}>
              <FormGroup>                                                                                                                                           
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('APPOINTMENT_ID')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        type='text'
                        name={'id'}
                        disabled
                        value={appointmentId ? appointmentId : null}
                        placeholder={languageTranslation('APPOINTMENT_ID')}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('NAME')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <InputGroup>
                        <Input
                          type='text'
                          name={'id'}
                          placeholder={languageTranslation('NAME')}
                          disabled
                          value={name ? name : ''}
                        />
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>
                            <i className='fa fa-star' aria-hidden='true'></i>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('DATE')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='text-value mb-1'>
                      {activeDateCareinstitution
                        ? moment(
                            activeDateCareinstitution
                              ? activeDateCareinstitution.isoString
                              : null
                          ).format('dd DD.MM.YYYY')
                        : null}
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col sm={'12'} lg={'12'}>
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
                        value={shift}
                        classNamePrefix='custom-inner-reactselect'
                        className={'custom-reactselect'}
                        onChange={(value: any) => handleSelect(value, 'shift')}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('START_WORKING')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <InputGroup>
                        <Field
                          name={'startTime'}
                          render={({ field }: any) => (
                            <MaskedInput
                              {...field}
                              placeholder={languageTranslation('START_WORKING')}
                              mask={TimeMask}
                              className={
                                errors.startTime && touched.startTime
                                  ? 'text-input error form-control'
                                  : 'text-input form-control'
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={startTime}
                            />
                          )}
                        />
                        {errors.startTime && touched.startTime && (
                          <div className='required-tooltip'>
                            {errors.startTime}
                          </div>
                        )}
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>Uhr</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('END_WORKING')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <InputGroup>
                        <Field
                          name={'endTime'}
                          render={({ field }: any) => (
                            <MaskedInput
                              {...field}
                              placeholder={languageTranslation('END_WORKING')}
                              mask={TimeMask}
                              className={
                                errors.endTime && touched.endTime
                                  ? 'text-input error form-control'
                                  : 'text-input form-control'
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={endTime}
                            />
                          )}
                        />
                        {errors.endTime && touched.endTime && (
                          <div className='required-tooltip'>
                            {errors.endTime}
                          </div>
                        )}
                        <InputGroupAddon addonType='append'>
                          <InputGroupText>Uhr</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('QUALIFICATION')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='postion-relative'>
                      <Button className='add-new-btn arrow-btn' color=''>
                        <i className='fa fa-arrow-up' aria-hidden='true' />
                      </Button>
                      <div className='custom-select-checkbox'>
                        <ReactMultiSelectCheckboxes
                          options={qualificationList}
                          placeholder='Select Qualifications'
                          className={'custom-reactselect '}
                          classNamePrefix='custom-inner-reactselect'
                          // value={qualificationId}
                          onChange={(value: any) =>
                            handleSelect(value, 'qualificationId')
                          }
                        />
                        {/* <Select
                        placeholder='Select Qualifications'
                        options={qualificationList}
                        isMulti={true}
                        classNamePrefix='custom-inner-reactselect'
                        className={'custom-reactselect'}
                        value={qualificationId}
                        onChange={(value: any) =>
                          handleSelect(value, 'qualificationId')
                        }
                      /> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            {/* <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('QUALIFICATION_FOR_BILLING')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <div className='required-input'>
                        <Select
                          placeholder='Select Qualifications'
                          options={State}
                          classNamePrefix='custom-inner-reactselect'
                          className={'custom-reactselect'}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col> */}

            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('DEPARTMENT')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Select
                        placeholder='Select Department'
                        options={careInstitutionDepartment}
                        isDisabled={secondStarCanstitution ? true : false}
                        classNamePrefix='custom-inner-reactselect'
                        className={'custom-reactselect'}
                        onChange={(value: any) =>
                          handleSelect(value, 'department')
                        }
                        value={department ? department : undefined}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('ADDRESS')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        type='textarea'
                        name={'address'}
                        disabled={true}
                        placeholder={languageTranslation('ADDRESS')}
                        className='width-common'
                        value={address}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('CONTACT_PERSON')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        type='text'
                        disabled={true}
                        name={'contactPerson'}
                        placeholder={languageTranslation('CONTACT_PERSON')}
                        className='width-common'
                        value={contactPerson}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('REMARKS_OFFER_DEPARTMENT')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        disabled={true}
                        type='textarea'
                        name='departmentOfferRemarks'
                        id='exampleText'
                        value={departmentOfferRemarks}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('REMARKS_BOOKING_DEPARTEMENT')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        disabled={true}
                        type='textarea'
                        name='departmentBookingRemarks'
                        id='exampleText'
                        value={departmentBookingRemarks}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation(
                        'REMARK_DEPARTMENT_VISIBLE_INTERNALLY'
                      )}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        disabled={true}
                        type='textarea'
                        name='departmentRemarks'
                        id='exampleText'
                        value={departmentRemarks}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('WORKING_PROOF_NECESSARY')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <FormGroup check inline>
                        <div className=' checkbox-custom mb-0'>
                          <input
                            type='checkbox'
                            id='check1'
                            name={'isWorkingProof'}
                            className=''
                            checked={isWorkingProof}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const {
                                target: { checked }
                              } = e;
                              setFieldValue('isWorkingProof', checked);
                            }}
                          />
                          <Label for='check1'></Label>
                        </div>
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('REMARK_OFFER')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        type='textarea'
                        name='offerRemarks'
                        id='exampleText'
                        value={offerRemarks}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('REMARK_BOOKING')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        type='textarea'
                        name='bookingRemarks'
                        id='exampleText'
                        value={bookingRemarks}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <FormGroup>
                <Row>
                  <Col sm='5'>
                    <Label className='form-label col-form-label'>
                      {languageTranslation('COMMENT_ONLY_VISIBLE_INTERNALLY')}
                    </Label>
                  </Col>
                  <Col sm='7'>
                    <div className='required-input'>
                      <Input
                        className='textarea-custom form-control'
                        rows='3'
                        type='textarea'
                        name='comments'
                        id='exampleText'
                        value={comments}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={'12'}>
              <div className='d-flex align-items-center justify-content-between'>
                <Button className='btn-save' color='danger'>
                  {languageTranslation('DELETE')}
                </Button>
                <Button
                  className='btn-save'
                  color='primary'
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <i className='fa fa-spinner fa-spin mr-2' />
                  ) : (
                    ''
                  )}
                  {languageTranslation('SAVE_BUTTON')}
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
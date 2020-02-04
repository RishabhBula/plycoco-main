import React, {
  useState,
  ChangeEvent,
  FunctionComponent,
  useEffect,
} from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { AppBreadcrumb } from '@coreui/react';
import {
  Button,
  FormGroup,
  Card,
  CardHeader,
  Label,
  CardBody,
  Input,
  Col,
  Row,
} from 'reactstrap';
import Select from 'react-select';
import MaskedInput from 'react-text-mask';
import { FormikProps, Form } from 'formik';
import {
  IBANRegex,
  DateMask,
  AppConfig,
  PAGE_LIMIT,
} from '../../../../../config';
import routes from '../../../../../routes/routes';
import {
  IEmployeeFormValues,
  IReactSelectInterface,
  IRegion,
} from '../../../../../interfaces';
import { logger, languageTranslation } from '../../../../../helpers';
import { RegionQueries } from '../../../../../graphql/queries/Region';
const [, GET_REGIONS] = RegionQueries;
const EmployeeFormComponent: FunctionComponent<FormikProps<
  IEmployeeFormValues
> & {
  imageUrl: string;
  countriesOpt: IReactSelectInterface[];
  statesOpt: IReactSelectInterface[];
  getStatesByCountry: any;
}> = (
  props: FormikProps<IEmployeeFormValues> & {
    imageUrl: string;
    countriesOpt: IReactSelectInterface[];
    statesOpt: IReactSelectInterface[];
    getStatesByCountry: any;
  },
) => {
  const {
    values: {
      email,
      firstName,
      lastName,
      userName,
      telephoneNumber,
      accountHolderName,
      bankName,
      IBAN,
      BIC,
      additionalText,
      address1,
      address2,
      country,
      state,
      region,
      city,
      zip,
      joiningDate,
      image,
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    imageUrl,
    countriesOpt,
    statesOpt,
    getStatesByCountry,
    setFieldError,
  } = props;
  const [imagePreviewUrl, setUrl] = useState<string | ArrayBuffer | null>('');
  const [fetchRegionList, { data: RegionData }] = useLazyQuery<any>(
    GET_REGIONS,
  );
  const regionOptions: IReactSelectInterface[] | undefined = [];
  if (RegionData && RegionData.getRegions && RegionData.getRegions.regionData) {
    RegionData.getRegions.regionData.forEach(({ id, regionName }: IRegion) =>
      regionOptions.push({
        label: regionName,
        value: id,
      }),
    );
  }
  useEffect(() => {
    if (imageUrl) {
      setUrl(`${AppConfig.FILES_ENDPOINT}${imageUrl}`);
    }
  }, [imageUrl, country]);
  // Custom function to handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFieldTouched('image', true);
    const {
      target: { files },
    } = e;
    let reader = new FileReader();
    let file: File | null = null;
    if (files) {
      file = files[0];
    }
    if (file) {
      reader.onloadend = () => {
        setUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setFieldValue('image', file);
    }
  };
  useEffect(() => {
    // call query
    fetchRegionList({
      variables: {
        limit: 25,
        sortBy: 3,
      },
    });
  }, []);
  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    logger(selectOption, 'selectOptionvalue');
    setFieldValue(name, selectOption);
    if (name === 'country') {
      setFieldValue('state', { label: '', value: '' });
      getStatesByCountry({
        variables: {
          countryid: selectOption ? selectOption.value : '82',
        }, // default code is for germany
      });
    }
  };
  console.log('errors', errors, touched);

  return (
    <div>
      <Card>
        <CardHeader>
          <AppBreadcrumb appRoutes={routes} className='w-100 mr-3' />
          <Button
            color={'primary'}
            disabled={isSubmitting}
            className={'btn-add'}
            onClick={handleSubmit}
          >
            {isSubmitting ? <i className='fa fa-spinner fa-spin loader' /> : ''}
            {languageTranslation('SAVE_BUTTON')}
          </Button>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs={'12'} lg={'12'}>
              <Form onSubmit={handleSubmit} className='form-section'>
                <Row>
                  <Col lg={'6'}>
                    <div className='form-card minheight-auto'>
                      <Row>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation('FIRST_NAME')}
                                  <span className='required'>*</span>
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Input
                                    type='text'
                                    name={'firstName'}
                                    placeholder={languageTranslation(
                                      'FIRST_NAME',
                                    )}
                                    maxLength={30}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={firstName}
                                    className={
                                      errors.firstName && touched.firstName
                                        ? 'text-input error text-capitalize'
                                        : 'text-input text-capitalize'
                                    }
                                  />
                                  {errors.firstName && touched.firstName && (
                                    <div className='required-tooltip'>
                                      {errors.firstName}
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation(
                                    'EMPLOYEE_SURNAME_LABEL',
                                  )}
                                  <span className='required'>*</span>
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Input
                                    type='text'
                                    name={'lastName'}
                                    placeholder={languageTranslation('SURNAME')}
                                    onChange={handleChange}
                                    maxLength={30}
                                    onBlur={handleBlur}
                                    value={lastName}
                                    className={
                                      errors.lastName && touched.lastName
                                        ? 'text-input error text-capitalize'
                                        : 'text-input text-capitalize'
                                    }
                                  />
                                  {errors.lastName && touched.lastName && (
                                    <div className='required-tooltip'>
                                      {errors.lastName}
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label '>
                                  {languageTranslation(
                                    'EMPLOYEE_EMAIL_ADDRESS_LABEL',
                                  )}
                                  <span className='required'>*</span>
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Input
                                    type='text'
                                    name={'email'}
                                    placeholder={languageTranslation('EMAIL')}
                                    onChange={handleChange}
                                    onBlur={(e: any) => {
                                      //get string before a @ to set username
                                      const setUsername = email
                                        ? email.substring(0, email.indexOf('@'))
                                        : '';
                                      const username = setUsername.replace(
                                        /[`~!@#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi,
                                        '',
                                      );
                                      setFieldValue('userName', username);
                                      setTimeout(() => {
                                        setFieldError('userName', '');
                                      }, 100);
                                      handleBlur(e);
                                    }}
                                    value={email}
                                    className={
                                      errors.email && touched.email
                                        ? 'text-input error'
                                        : 'text-input'
                                    }
                                  />
                                  {errors.email && touched.email && (
                                    <div className='required-tooltip'>
                                      {errors.email}
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label '>
                                  {languageTranslation(
                                    'EMPLOYEE_USER_NAME_LABEL',
                                  )}
                                  <span className='required'>*</span>
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Input
                                    type='text'
                                    name={'userName'}
                                    placeholder={languageTranslation(
                                      'EMPLOYEE_USER_NAME_LABEL',
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={userName}
                                    className={
                                      errors.userName && touched.userName
                                        ? 'text-input error'
                                        : 'text-input'
                                    }
                                  />
                                  {errors.userName && touched.userName && (
                                    <div className='required-tooltip'>
                                      {errors.userName}
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label '>
                                  {languageTranslation(
                                    'EMPLOYEE_TELEPHONE_NUMBER_LABEL',
                                  )}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Input
                                    name={'telephoneNumber'}
                                    placeholder={languageTranslation(
                                      'EMPLOYEE_TELEPHONE_NUMBER_LABEL',
                                    )}
                                    // mask="999-999-9999"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={telephoneNumber}
                                    className={`form-control ${
                                      errors.telephoneNumber &&
                                      touched.telephoneNumber
                                        ? 'text-input error'
                                        : 'text-input'
                                    }`}
                                  />
                                  {errors.telephoneNumber &&
                                    touched.telephoneNumber && (
                                      <div className='required-tooltip'>
                                        {errors.telephoneNumber}
                                      </div>
                                    )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation(
                                    'EMPLOYEE_ADDRESS1_LABEL',
                                  )}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div>
                                  <Input
                                    type='text'
                                    name={'address1'}
                                    maxLength={150}
                                    placeholder={languageTranslation(
                                      'EMPLOYEE_ADDRESS1_LABEL',
                                    )}
                                    onChange={handleChange}
                                    value={address1}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation(
                                    'EMPLOYEE_ADDRESS2_LABEL',
                                  )}
                                </Label>
                              </Col>

                              <Col sm='8'>
                                <div className='custom-radio-block'>
                                  <Input
                                    type='text'
                                    name={'address2'}
                                    maxLength={150}
                                    placeholder={languageTranslation(
                                      'EMPLOYEE_ADDRESS2_LABEL',
                                    )}
                                    onChange={handleChange}
                                    value={address2}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation('EMPLOYEE_ZIP_LABEL')}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Input
                                    name={'zip'}
                                    onChange={handleChange}
                                    maxLength={10}
                                    // className="form-control"
                                    placeholder={languageTranslation(
                                      'EMPLOYEE_ZIP_LABEL',
                                    )}
                                    value={zip}
                                    onBlur={handleBlur}
                                    className={
                                      errors.zip && touched.zip
                                        ? 'text-input error'
                                        : 'text-input'
                                    }
                                  />
                                  {errors.zip && touched.zip && (
                                    <div className='required-tooltip'>
                                      {errors.zip}
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation('EMPLOYEE_CITY_LABEL')}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div>
                                  <Input
                                    name={'city'}
                                    onChange={handleChange}
                                    // className="form-control"
                                    placeholder={languageTranslation(
                                      'EMPLOYEE_CITY_LABEL',
                                    )}
                                    maxLength={100}
                                    value={city}
                                    onBlur={handleBlur}
                                    className={
                                      errors.city && touched.city
                                        ? 'text-input error'
                                        : 'text-input'
                                    }
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation('COUNTRY')}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div>
                                  <Select
                                    placeholder={languageTranslation(
                                      'COUNTRY_PLACEHOLDER',
                                    )}
                                    options={countriesOpt}
                                    value={
                                      country && country.value
                                        ? country
                                        : undefined
                                    }
                                    onChange={(value: any) =>
                                      handleSelect(value, 'country')
                                    }
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation('EMPLOYEE_STATE_LABEL')}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div>
                                  <Select
                                    placeholder={languageTranslation(
                                      'EMPLOYEE_STATE_LABEL',
                                    )}
                                    options={statesOpt}
                                    value={
                                      state && state.value !== '' ? state : null
                                    }
                                    onChange={(value: any) =>
                                      handleSelect(value, 'state')
                                    }
                                    noOptionsMessage={() => {
                                      return 'Select a country first';
                                    }}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation('REGION')}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='text-capitalize'>
                                  <Select
                                    placeholder={languageTranslation(
                                      'EMPLOYEE_REGION_PLACEHOLDER',
                                    )}
                                    isMulti
                                    options={regionOptions}
                                    onChange={(value: any) =>
                                      handleSelect(value, 'region')
                                    }
                                    value={region ? region : undefined}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation(
                                    'EMPLOYEE_JOINING_DATE_LABEL',
                                  )}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Row>
                                    <Col>
                                      <MaskedInput
                                        name={'joiningDate'}
                                        placeholder={languageTranslation(
                                          'EMPLOYEE_JOINING_DATE_PLACEHOLDER',
                                        )}
                                        mask={DateMask}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={joiningDate}
                                        className={`form-control ${
                                          errors.joiningDate &&
                                          touched.joiningDate
                                            ? 'text-input error'
                                            : 'text-input'
                                        }`}
                                      />
                                      {errors.joiningDate &&
                                        touched.joiningDate && (
                                          <div className='required-tooltip'>
                                            {errors.joiningDate}
                                          </div>
                                        )}
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Col>

                  <Col lg={'6'}>
                    <h5 className='main-title '>
                      {languageTranslation('EMPLOYEE_ADD_PROFILE_IMAGE_LABEL')}
                    </h5>
                    <div className=' file-preview-section p-0'>
                      <div className='fileinput-preview d-flex align-items-center justify-content-center'>
                        <div className='file-upload'>
                          <label
                            htmlFor='gallery-photo-add'
                            className='file-upload-label'
                          >
                            {!errors.image &&
                            imagePreviewUrl &&
                            typeof imagePreviewUrl === 'string' ? (
                              <img
                                src={imagePreviewUrl}
                                className={'img-preview'}
                              />
                            ) : (
                              <>
                                <div className='icon-upload'>
                                  <i className='cui-cloud-upload'></i>
                                </div>
                                <div className='icon-text'>
                                  {!image || errors.image
                                    ? languageTranslation('CHOOSE_IMAGE')
                                    : ''}
                                </div>
                              </>
                            )}
                          </label>
                          <input
                            className='file-upload-input'
                            type='file'
                            accept='image/*'
                            id='gallery-photo-add'
                            placeholder={languageTranslation(
                              'EMPLOYEE_ADD_PROFILE_IMAGE_LABEL',
                            )}
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      {errors.image && touched.image && (
                        <div className='file-error-text'>{errors.image}</div>
                      )}
                    </div>
                    <h5 className='main-title '>
                      {languageTranslation('BANK_ACCOUNT_INFORMATION')}
                    </h5>
                    <div className='form-card minheight-auto'>
                      <Row>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label '>
                                  {languageTranslation(
                                    'EMPLOYEE_BANK_NAME_LABEL',
                                  )}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Input
                                    type='text'
                                    name={'bankName'}
                                    placeholder={languageTranslation(
                                      'EMPLOYEE_BANK_NAME_LABEL',
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={bankName}
                                    maxLength={100}
                                    className={`width-common ${
                                      errors.bankName && touched.bankName
                                        ? 'text-input error'
                                        : 'text-input'
                                    }`}
                                  />
                                  {errors.bankName && touched.bankName && (
                                    <div className='required-tooltip'>
                                      {errors.bankName}
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation(
                                    'BANK_ACCOUNT_HOLDER_NAME_LABEL',
                                  )}
                                  {/* Account Holder Name */}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Input
                                    type='text'
                                    name={'accountHolderName'}
                                    placeholder={languageTranslation(
                                      'BANK_ACCOUNT_HOLDER_NAME_LABEL',
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={accountHolderName}
                                    maxLength={50}
                                    className={`width-common ${
                                      errors.accountHolderName &&
                                      touched.accountHolderName
                                        ? 'text-input error'
                                        : 'text-input'
                                    }`}
                                  />
                                  {errors.accountHolderName &&
                                    touched.accountHolderName && (
                                      <div className='required-tooltip'>
                                        {errors.accountHolderName}
                                      </div>
                                    )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label '>
                                  {languageTranslation('BANK_IBAN_LABEL')}
                                  {/* IBAN */}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <MaskedInput
                                    name={'IBAN'}
                                    value={IBAN}
                                    placeholder={languageTranslation(
                                      'BANK_IBAN_LABEL',
                                    )}
                                    mask={IBANRegex}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${
                                      errors.IBAN && touched.IBAN
                                        ? 'text-input error'
                                        : 'text-input'
                                    }`}
                                  />
                                  {errors.IBAN && touched.IBAN && (
                                    <div className='required-tooltip'>
                                      {errors.IBAN}
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label '>
                                  {languageTranslation('BANK_BIC_LABEL')}
                                  {/* BIC */}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Input
                                    type='text'
                                    name={'BIC'}
                                    placeholder={languageTranslation(
                                      'BANK_BIC_LABEL',
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    maxLength={15}
                                    value={BIC}
                                    className={
                                      errors.BIC && touched.BIC
                                        ? 'text-input error'
                                        : 'text-input'
                                    }
                                  />
                                  {errors.BIC && touched.BIC && (
                                    <div className='required-tooltip'>
                                      {errors.BIC}
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={'12'}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label '>
                                  {languageTranslation('ADDITIONAL_TEXT_LABEL')}
                                  &nbsp;
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Input
                                    type='textarea'
                                    name={'additionalText'}
                                    // className="textarea-custom"
                                    placeholder={languageTranslation(
                                      'ADDITIONAL_TEXT_LABEL',
                                    )}
                                    rows='3'
                                    maxLength={255}
                                    onChange={handleChange}
                                    value={additionalText}
                                    className={`textarea-custom ${
                                      errors.additionalText &&
                                      touched.additionalText
                                        ? 'text-input error'
                                        : 'text-input'
                                    }`}
                                  />
                                  {errors.additionalText &&
                                    touched.additionalText && (
                                      <div className='required-tooltip'>
                                        {errors.additionalText}
                                      </div>
                                    )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>

                <div className='d-flex align-items-center justify-content-between'>
                  <div className='mandatory-text'>
                    {languageTranslation('REQUIRED_FIELDS')}
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeFormComponent;
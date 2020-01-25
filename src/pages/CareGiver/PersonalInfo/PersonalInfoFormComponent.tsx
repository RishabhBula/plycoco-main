import React, { useEffect } from "react";
import Select from "react-select";
import { Label, Col, Row, CustomInput, FormGroup, Input } from "reactstrap";
import {
  State,
  Salutation,
  LegalForm,
  Gender,
  DateMask,
  IBANRegex
} from "../../../config";
import { FormikProps, Field } from "formik";
import {
  IReactSelectInterface,
  IStates,
  ICountries,
  ICountry,
  IState,
  IRegion,
  ICareGiverValues
} from "../../../interfaces";
import { FormikTextField } from "../../../common/forms/FormikFields";
import { languageTranslation } from "../../../helpers";
import MaskedInput from "react-text-mask";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { CountryQueries } from "../../../queries";
import { useLocation } from "react-router";
import { RegionQueries } from "../../../queries/Region";

const [, GET_REGIONS] = RegionQueries;
const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

const PersonalInfoFormComponent: any = (
  props: FormikProps<ICareGiverValues> & {
    CareInstitutionList: IReactSelectInterface[] | undefined;
  }
) => {
  const { data, loading, error, refetch } = useQuery<ICountries>(GET_COUNTRIES);
  // To fetch the states of selected contry & don't want to query on initial load
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY
  );
  const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  if (data && data.countries) {
    data.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({
        label: name,
        value: id
      })
    );
  }
  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({ label: name, value: id })
    );
  }

  // Region Data
  const [fetchRegionList, { data: RegionData }] = useLazyQuery<any>(
    GET_REGIONS
  );
  //Region List Data
  const regionOptions: IReactSelectInterface[] | undefined = [];
  if (RegionData && RegionData.getRegions && RegionData.getRegions.regionData) {
    RegionData.getRegions.regionData.forEach(({ id, regionName }: IRegion) =>
      regionOptions.push({
        label: regionName,
        value: id
      })
    );
  }

  let { pathname } = useLocation();
  let PathArray: string[] = pathname.split("/");

  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({
        label: name,
        value: id
      })
    );
  }

  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
    if (name === "country") {
      getStatesByCountry({
        variables: { countryid: selectOption ? selectOption.value : "82" } // default code is for germany
      });
    }
  };

  useEffect(() => {
    // call query
    fetchRegionList({
      variables: {
        limit: 25,
        sortBy: 3
      }
    });
  }, []);

  const {
    values: {
      dateOfBirth,
      id,
      createdAt,
      regionId,
      gender,
      salutation,
      country,
      driverLicenseNumber,
      IBAN,
      state,
      employed,
      driversLicense,
      legalForm,
      vehicleAvailable,
      comments,
      belongTo
    },
    handleChange,
    handleBlur,
    errors,
    setFieldValue,
    touched
  } = props;


  const CreatedAt: Date | undefined | any = createdAt ? createdAt : new Date();
  const RegYear: Date | undefined = CreatedAt.getFullYear();

  return (
    <div className="form-card h-100">
      <Row>
        {PathArray && PathArray[2] !== "add" ? (
          <Col lg={"12"}>
            <FormGroup>
              <Row>
                <Col sm="4">
                  <Label className="form-label col-form-label">
                    {languageTranslation("USER_ID")}
                    <span className="required">*</span>
                  </Label>
                </Col>
                <Col sm="8">
                  <Row className="custom-col inner-no-padding-col">
                    <Col sm="4">
                      <div>
                        <Input
                          type="text"
                          name={"id"}
                          disabled
                          value={id}
                          placeholder={languageTranslation("USER_ID")}
                          className="width-common"
                        />
                      </div>
                    </Col>
                    <Col sm="8">
                      <FormGroup>
                        <Row className="custom-col inner-no-padding-col">
                          <Col sm="6">
                            <Label className="form-label col-form-label inner-label">
                              {languageTranslation("REG_SINCE")}
                              <span className="required">*</span>
                            </Label>
                          </Col>
                          <Col sm="6">
                            <div>
                              <Input
                                type="text"
                                name={"regSince"}
                                disabled
                                value={RegYear}
                                placeholder="Reg Since"
                                className="width-common"
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </FormGroup>
          </Col>
        ) : null}
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">{"Region"}</Label>
              </Col>
              <Col sm="8">
                <div className="field-class">
                  <Select
                    placeholder={languageTranslation("REGION", "STATE")}
                    onChange={(value: any) => handleSelect(value, "regionId")}
                    value={regionId ? regionId : undefined}
                    options={regionOptions}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={"12"}>
          <FormGroup>
            <Row className="">
              <Col sm="4">
                <Label className="form-label col-form-label">
                  {languageTranslation("GENDER")}
                </Label>
              </Col>
              <Col sm="8">
                <Row className="custom-col inner-no-padding-col">
                  <Col sm="5">
                    <div>
                      <Select
                        placeholder={languageTranslation("GENDER")}
                        options={Gender}
                        value={gender && gender.value ? gender : null}
                        onChange={(value: any) => handleSelect(value, "gender")}
                      />
                    </div>
                  </Col>
                  <Col sm="7">
                    <FormGroup>
                      <Row className="custom-col inner-no-padding-col d-flex ">
                        <Col sm="6">
                          <Label className="form-label col-form-label inner-label">
                            {languageTranslation("TITLE")}
                          </Label>
                        </Col>
                        <Col sm="6">
                          <div>
                            <Field
                              component={FormikTextField}
                              name={"title"}
                              placeholder={languageTranslation("TITLE")}
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">
                  {languageTranslation("SALUTATION")}
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Select
                    placeholder={languageTranslation("SALUTATION")}
                    options={Salutation}
                    value={salutation && salutation.value ? salutation : null}
                    onChange={(value: any) => handleSelect(value, "salutation")}
                  />
                </div>
                {/* <Button  className="alfabate-btn btn">S</Button> */}
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">
                  {languageTranslation("FIRST_NAME")}
                  <span className="required">*</span>
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"firstName"}
                    placeholder={languageTranslation("FIRST_NAME")}
                    className="width-common  "
                  />
                </div>
                {/* <Button  className="alfabate-btn btn">N</Button> */}
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">
                  {languageTranslation("SURNAME")}
                  <span className="required">*</span>
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"lastName"}
                    placeholder={languageTranslation("SURNAME")}
                    className="width-common text-capitalize"
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={"12"}>
          <FormGroup>
            <Row className="">
              <Col sm="4">
                <Label className="form-label col-form-label">
                  Birthday Date
                </Label>
              </Col>
              <Col sm="8">
                <Row className="custom-col inner-no-padding-col">
                  <Col sm="7">
                    <div>
                      <Field
                        name={"dateOfBirth"}
                        render={({ field }: any) => (
                          <MaskedInput
                            {...field}
                            placeholder={languageTranslation(
                              "EMPLOYEE_JOINING_DATE_PLACEHOLDER"
                            )}
                            mask={DateMask}
                            className={"form-control"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={dateOfBirth}
                          />
                        )}
                      />
                      {errors.dateOfBirth && touched.dateOfBirth && (
                        <div className="required-error left">
                          {errors.dateOfBirth}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col sm="5">
                    <FormGroup>
                      <Row className="custom-col inner-no-padding-col d-flex ">
                        <Col sm="6">
                          <Label className="form-label col-form-label inner-label">
                            Age
                          </Label>
                        </Col>
                        <Col sm="6">
                          <div>
                            <Field
                              component={FormikTextField}
                              name={"age"}
                              placeholder="Age"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </FormGroup>
        </Col>

        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label ">Street</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"street"}
                    placeholder="Street"
                    className=" width-common"
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
                <Label className="form-label col-form-label ">
                  Postal Code
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"postalCode"}
                    placeholder="Postal Code"
                    className=" width-common"
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
                <Label className="form-label col-form-label ">City</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"city"}
                    placeholder="City"
                    className=" width-common"
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
                <Label className="form-label col-form-label ">Country</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Select
                    placeholder={languageTranslation("COUNTRY")}
                    options={countriesOpt}
                    value={country && country.value ? country : undefined}
                    onChange={(value: any) => handleSelect(value, "country")}
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
                <Label className="form-label col-form-label ">State</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Select
                    placeholder={languageTranslation("STATE")}
                    // placeholder="Bavaria"
                    options={statesOpt}
                    value={state && state.value ? state : undefined}
                    onChange={(value: any) => handleSelect(value, "state")}
                    noOptionsMessage={() => {
                      return "Select a country first";
                    }}
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
                <Label className="form-label col-form-label">Phone</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"phoneNumber"}
                    placeholder=" Phone"
                    className="width-common"
                  />
                </div>
                {/* <Button  className="alfabate-btn btn">M</Button> */}
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">Fax</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"fax"}
                    placeholder=" Fax"
                    className="width-common"
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
                  Mobile Number
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"mobileNumber"}
                    placeholder="Mobile Number"
                    className="width-common"
                  />
                </div>
                {/* <Button  className="alfabate-btn btn">T</Button> */}
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">
                  Email
                  <span className="required">*</span>
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"email"}
                    placeholder=" Email"
                    className="width-common"
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
                <Label className="form-label col-form-label">Tax Number</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"taxNumber"}
                    placeholder="Tax Number"
                    className="width-common"
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
                <Label className="form-label col-form-label">Bank</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"bankName"}
                    placeholder="Bank"
                    className="width-common"
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
                <Label className="form-label col-form-label">IBAN</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field name="payrollIBAN">
                    {({ field }: any) => (
                      <div>
                        <MaskedInput
                          {...field}
                          className={"form-control"}
                          value={IBAN}
                          placeholder={languageTranslation(
                            "BANK_IBAN_PLACEHOLDER"
                          )}
                          name={"IBAN"}
                          mask={IBANRegex}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.IBAN && touched.IBAN && (
                          <div className="required-error">{errors.IBAN}</div>
                        )}
                      </div>
                    )}
                  </Field>
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
                  Username
                  <span className="required">*</span>
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"userName"}
                    placeholder="Username"
                    className="width-common"
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
                <Label className="form-label col-form-label">Belongs to</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Select
                    placeholder="Belongs to"
                    options={props.CareInstitutionList}
                    value={belongTo && belongTo.value ? belongTo : undefined}
                    onChange={(value: any) => handleSelect(value, "belongTo")}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        {console.log("driversLicense", driversLicense)}
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">
                  Driver's license
                </Label>
              </Col>
              <Col sm="8">
                <div className="custom-radio-block">
                  <FormGroup check inline>
                    <CustomInput
                      type="radio"
                      id="driversLicense-1"
                      name="driversLicense"
                      label="Yes"
                      checked={driversLicense === "yes" ? true : false}
                      value={"yes"}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup check inline>
                    <CustomInput
                      type="radio"
                      id="driversLicense-2"
                      name="driversLicense"
                      label="No"
                      checked={driversLicense === "no" ? true : false}
                      value={"no"}
                      onChange={handleChange}
                    />
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
                  Driver's License Number
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"driverLicenseNumber"}
                    placeholder="Driver's License Number"
                    className="width-common"
                    value={driverLicenseNumber}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        {console.log("vehicleAvailable", vehicleAvailable)}
        <Col lg={"12"}>
          <FormGroup>
            <Row>
              <Col sm="4">
                <Label className="form-label col-form-label">
                  Own vehicle available
                </Label>
              </Col>
              <Col sm="8">
                <div className="custom-radio-block">
                  <FormGroup check inline>
                    <CustomInput
                      type="radio"
                      id="vehicleAvailable-1"
                      name="vehicleAvailable"
                      label="Yes"
                      checked={vehicleAvailable === "yes" ? true : false}
                      value={"yes"}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup check inline>
                    <CustomInput
                      type="radio"
                      id="vehicleAvailable-2"
                      name="vehicleAvailable"
                      label="No"
                      checked={vehicleAvailable === "no" ? true : false}
                      value={"no"}
                      onChange={handleChange}
                    />
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
                <Label className="form-label col-form-label">Legal Form</Label>
              </Col>
              <Col sm="8">
                <div>
                  <Select
                    placeholder="Legal Form"
                    options={LegalForm}
                    value={legalForm ? legalForm : undefined}
                    onChange={(value: any) => handleSelect(value, "legalForm")}
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
                  Company Name
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"companyName"}
                    placeholder="Company Name"
                    className="width-common"
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
                  Register Court
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"registerCourt"}
                    placeholder="Register Court"
                    className="width-common"
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
                  Registration Number
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"registrationNumber"}
                    placeholder="Registration Number"
                    className="width-common"
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
                  Executive Director
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Field
                    component={FormikTextField}
                    name={"executiveDirector"}
                    placeholder="Executive Director"
                    className="width-common"
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
                <Label className="form-label col-form-label">Employed</Label>
              </Col>
              <Col sm="8">
                <div>
                  {/*<div className=" checkbox-custom mb-0">
                     <Field
                      component={FormikCheckbox}
                      type='checkbox'
                      name={'employed'}
                    />
                   
                  </div> */}
                  <div className=" checkbox-custom mb-0">
                    <input
                      type="checkbox"
                      id="check"
                      className=""
                      name={"employed"}
                      checked={employed}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const {
                          target: { checked }
                        } = e;
                        setFieldValue("employed", checked);
                      }}
                    />
                    <Label for="check"></Label>
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
                  Comments (Internally)
                </Label>
              </Col>
              <Col sm="8">
                <div>
                  <Input
                    type="textarea"
                    name={"comments"}
                    placeholder="Comments (Internally)"
                    className="textarea-custom"
                    rows="4"
                    value={comments ? comments : undefined}
                    onChange={handleChange}
                    maxLength={255}
                  />
                </div>
              </Col>
            </Row>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalInfoFormComponent;
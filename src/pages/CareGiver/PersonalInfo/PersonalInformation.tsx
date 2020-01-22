import React, {
  Component,
  FunctionComponent,
  useState,
  useEffect
} from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  Card
} from "reactstrap";
import { assignIn } from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps, useParams, useHistory } from "react-router";
import { languageTranslation } from "../../../helpers";
import PersonalInfoFormComponent from "./PersonalInfoFormComponent";
import BillingSettingsFormComponent from "./BillingSettingsFormComponent";
import QualificationFormComponent from "./QualificationFormComponent";
import AttributeFormComponent from "./AttributesFromComponent";
import RemarkFormComponent from "./RemarkFormComponent";
import { Formik, FormikHelpers, Form, FormikProps } from "formik";
import { Mutation, Query } from "@apollo/react-components";
import {
  UPDATE_CAREGIVER,
  GET_CAREGIVER_BY_ID,
  UPDATE_BILLING_SETTINGS,
  GET_BILLING_SETTINGS
} from "../../../queries/CareGiver";
import {
  ICareGiverValues,
  IEditCareGInput,
  IPersonalObject,
  IBillingSettingsValues,
  ICareGiverInput
} from "../../../interfaces";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { AppRoutes } from "../../../config";
import '../caregiver.scss';

export const PersonalInformation: FunctionComponent<any> = (props: any) => {
  let { id } = useParams();
  let history = useHistory();
  const [careGiverData, setCareGiverData] = useState<ICareGiverValues | null>();

  // To update employee details into db
  const [updateCaregiver] = useMutation<
    { updateCaregiver: ICareGiverValues },
    { id: number; careGiverInput: IPersonalObject }
  >(UPDATE_CAREGIVER);

  const [updateBillingSettings] = useMutation<
    { updateBillingSettings: IBillingSettingsValues },
    { id: number; careGiverInput: IPersonalObject }
  >(UPDATE_BILLING_SETTINGS);

  const handleSubmit = async(
    values: ICareGiverValues,
    { setSubmitting, setFieldError }: FormikHelpers<ICareGiverValues>
  ) => {
    // to set submit state to false after successful signup
    const {
      userName,
      stateId,
      registartionSince,
      gender,
      title,
      salutation,
      firstName,
      lastName,
      dateOfBirth,
      age,
      address1,
      address2,
      driversLicense,
      driverLicenseNumber,
      vehicleAvailable,
      qualifications,
      street,
      city,
      postCode,
      countryId,
      phoneNumber,
      fax,
      mobileNumber,
      email,
      taxNumber,
      socialSecurityContribution,
      // bankName: "",
      iban,
      password,
      belongTo,
      legalForm,
      companyName,
      registerCourt,
      registrationNumber,
      executiveDirector,
      employed,
      additionalText,
      status,
      remarks,
      fee,
      weekendAllowancePerHour,
      holidayAllowancePerHourFee,
      nightAllowancePerHour,
      invoiceInterval,
      leasingPrice
    } = values;
    try {
      let careGiverInput: IPersonalObject = {
        userName,
        stateId,
        registartionSince,
        gender,
        title,
        salutation,
        firstName,
        lastName,
        dateOfBirth,
        age,
        address1,
        address2,
        driversLicense,
        driverLicenseNumber,
        vehicleAvailable,
        qualifications: qualifications && qualifications.length
          ? qualifications.map(quali => quali.value)
          : [],
        street,
        city,
        postCode,
        countryId,
        phoneNumber,
        fax,
        mobileNumber,
        email,
        taxNumber,
        socialSecurityContribution,
        // bankName: "",
        iban,
        password,
        belongTo,
        legalForm: legalForm,
        companyName,
        registerCourt,
        registrationNumber,
        executiveDirector,
        employed,
        additionalText,
        status,
        remarks
      };
      // Edit employee details
      if (id) {
        await updateCaregiver({
          variables: {
            id: parseInt(id),
            careGiverInput,
          },
        });
        toast.success(languageTranslation('EMPLOYEE_UPDATE_SUCCESS_MSG'));
      }
      history.push(AppRoutes.CARE_GIVER);
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      toast.error(message);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPositionY = window.scrollY;
    const buttonDiv: HTMLElement | null = document.getElementById(
      'caregiver-add-btn',
    );
    if (buttonDiv) {
      if (scrollPositionY >= 35) {
        buttonDiv.classList.add('sticky-save-btn');
      } else {
        buttonDiv.classList.remove('sticky-save-btn');
      }
    }
  };

  const {
    userName = "",
    stateId = {label:"", value:""},
    registartionSince = "",
    gender = "",
    title = "",
    salutation = {label:"", value:""},
    firstName = "",
    lastName = "",
    dateOfBirth = "",
    age = "",
    address1 = "",
    address2 = "",
    driversLicense = false,
    driverLicenseNumber = "",
    vehicleAvailable = false,
    qualifications = undefined,
    street = "",
    city = "",
    postCode = "",
    countryId = {label:"", value:""},
    phoneNumber = "",
    fax = "",
    mobileNumber = "",
    email = "",
    taxNumber = "",
    socialSecurityContribution = false,
    // bankName: "",
    iban = "",
    password = "",
    belongTo = "",
    legalForm = {label:"", value:""},
    companyName = "",
    registerCourt = "",
    registrationNumber = "",
    executiveDirector = "",
    employed = false,
    additionalText = "",
    status = "active",
    remarks = [],
    workZones = [],
    fee = "",
    weekendAllowancePerHour = "",
    holidayAllowancePerHourFee = "",
    nightAllowancePerHour = "",
    leasingPrice = "",
    invoiceInterval = ""
  } = props.getCaregiver ? props.getCaregiver : {};

  const initialValues: ICareGiverValues = {
    userName,
    stateId,
    registartionSince,
    gender,
    title,
    salutation,
    firstName,
    lastName,
    dateOfBirth,
    age,
    address1,
    address2,
    driversLicense,
    driverLicenseNumber,
    vehicleAvailable,
    qualifications,
    street,
    city,
    postCode,
    countryId,
    phoneNumber,
    fax,
    mobileNumber,
    email,
    taxNumber,
    socialSecurityContribution,
    // bankName: "",
    iban,
    password,
    belongTo,
    legalForm,
    companyName,
    registerCourt,
    registrationNumber,
    executiveDirector,
    employed,
    additionalText,
    status,
    remarks,
    fee,
    weekendAllowancePerHour,
    holidayAllowancePerHourFee,
    nightAllowancePerHour,
    leasingPrice,
    invoiceInterval
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      render={(props: FormikProps<ICareGiverValues>) => {
        return (
          <Form className="form-section forms-main-section">
            <Button
              disabled={false}
              id={'caregiver-add-btn'}
              onClick={props.handleSubmit}
              color={'primary'}
              className={'save-button'}
            >
              {languageTranslation('SAVE_BUTTON')}
            </Button>
            <Row>
              <Col lg={"4"}>
                <PersonalInfoFormComponent {...props} />
              </Col>
              <Col lg={'4'}>
                <div className='common-col'>
                  <BillingSettingsFormComponent {...props} />
                  <div className='quality-attribute-section d-flex flex-column'>
                    <QualificationFormComponent {...props} />
                    <AttributeFormComponent {...props} />
                  </div>
                </div>
              </Col>
              <RemarkFormComponent />
              </Row>
          </Form>
        );
      }}
    />
  );
};


class GetData extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  formatData = (caregiverDetails: any) => {
    assignIn(caregiverDetails, caregiverDetails.caregiverDetails);
    assignIn(caregiverDetails, caregiverDetails.caregiverDetails);
    if (caregiverDetails.bankDetails) {
      assignIn(
        caregiverDetails,
        caregiverDetails,
        caregiverDetails.bankDetails
      );
    }
    if (caregiverDetails.billingSettingDetails) {
      assignIn(
        caregiverDetails,
        caregiverDetails,
        caregiverDetails.billingSettingDetails
      );
    } else {
      assignIn(caregiverDetails, caregiverDetails, {
        fee: "",
        weekendAllowancePerHour: "",
        holidayAllowancePerHourFee: "",
        nightAllowancePerHour: "",
        leasingPrice: "",
        invoiceInterval: ""
      });
    }
    caregiverDetails.salutation = {
      value: caregiverDetails.salutation,
      label: caregiverDetails.salutation
    };
    caregiverDetails.state = {
      value: caregiverDetails.state,
      label: caregiverDetails.state
    };
    caregiverDetails.legalForm = {
      value: caregiverDetails.legalForm,
      label: caregiverDetails.legalForm
    };
    caregiverDetails.workZones = caregiverDetails.workZones && caregiverDetails.workZones.length
      ? caregiverDetails.workZones.map((wz: String) => {
        return { label: wz, value: wz };
      })
      : [];
    delete caregiverDetails.bankDetails;
    delete caregiverDetails.billingSettingDetails;
    delete caregiverDetails.caregiverDetails;
    return caregiverDetails;
  };

  render() {
    return (
      <Query
      query={GET_CAREGIVER_BY_ID}
      fetchPolicy="network-only"
      variables={{ id: parseInt(this.props.Id) }}
    >
      {({ loading, error, data }: any) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>Caught error: {error.message}</div>;
        return (
          <PersonalInformation
            {...this.props}
            getCaregiver={this.formatData(data.getCaregiver)}
          />
        );
      }}
    </Query>
    );
  }
}
export default GetData;

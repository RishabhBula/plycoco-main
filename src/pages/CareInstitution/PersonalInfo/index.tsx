import React, { useEffect } from "react";
import { Form, Button } from "reactstrap";
import { Formik, FormikProps, FormikHelpers } from 'formik';
import CareInstitutionContact from "./CareInstitutionContact";
import "../careinstitution.scss";
import PersonalInfoForm from "./PersonalInfoForm";
import { ICareInstitutionContact, ICareInstitutionFormValues } from "../../../interfaces";
import { CareInstituionValidationSchema } from "../../../validations";
import { useParams } from "react-router";
import { CareInstitutionQueries } from "../../../queries";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { logger } from "../../../helpers";

const [
  GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
  GET_CARE_INSTITUION_BY_ID,
] = CareInstitutionQueries

const PersonalInformation: any = (props: any) => {

  let { id } = useParams();
  const Id: any | undefined = id

  const [updateCareInstitution, { error, data }] = useMutation<{ updateCareInstitution: ICareInstitutionFormValues }>(UPDATE_CARE_INSTITUTION);

  // To get the care instituion details by id
  const [
    getCareInstitutionDetails,
    { data: careInstituionDetails, error: detailsError, refetch },
  ] = useLazyQuery<any>(GET_CARE_INSTITUION_BY_ID);

  useEffect(() => {
    // Fetch details by employee id
    if (id) {
      getCareInstitutionDetails({
        variables: { careInstitutionId: parseInt(Id) },
      });
    }
  }, [])

  const handleContactSubmit = (
    values: ICareInstitutionContact,
    { setSubmitting }: FormikHelpers<ICareInstitutionContact>
  ) => {
    //to set submit state to false after successful signup
    setSubmitting(false);
  };

  const contactFormValues: ICareInstitutionContact = {
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    mobileNumber: "",
    faxNumber: "",
    constactType: "",
    comments: "",
    groupAttributes: "",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const handleSubmit = async (
    values: ICareInstitutionFormValues,
    { setSubmitting }: FormikHelpers<ICareInstitutionFormValues>,
  ) => {
    //to set submit state to false after successful signup
    try {
      const careInstitutionInput: any = {
        genderId: values && values.gender ? values.gender.value : "",
        salutation: values && values.salutation ? values.salutation.value : "",
        firstName: values.firstName,
        lastName: values.lastName,
        shortName: values.shortName,
        companyName: values.companyName,
        address: values.anonymousName,
        address2: values.anonymousName2,
        street: values.street,
        zipCode: values.zipCode,
        countryId: values && values.country ? values.country.value : "",
        statId: values && values.state ? values.state.value : "",
        website: values.website,
        careGiverCommission: values.careGiverCommission,
        doctorCommission: values.doctorCommission,
        invoiceType: values && values.invoiceType ? values.invoiceType.value : "",
        interval: values && values.interval ? values.interval.value : "",
        emailInvoice: values.emailInvoice,
        addressInvoice: values.addressInvoice
      }
      setSubmitting(false);
      console.log("DFSFDSFSFSF", values);
      await updateCareInstitution({
        variables: {
          id: parseInt(Id),
          careInstitutionInput: careInstitutionInput
        }
      })
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      toast.error(message);
      logger(error)
    }

  };
  let values: ICareInstitutionFormValues
  if (careInstituionDetails && careInstituionDetails.getCareInstitution) {
    const { getCareInstitution } = careInstituionDetails
    values = {
      id: Id,
      email: getCareInstitution.email,
      firstName: getCareInstitution.firstName,
      lastName: getCareInstitution.lastName,
      userName: getCareInstitution.userName,
      fax: '',
      shortName: '',
      companyName: '',
      street: '',
      city: '',
    };

  } else {
    values = {
      email: '',
      firstName: '',
      lastName: '',
      userName: '',
      fax: '',
      shortName: '',
      companyName: '',
      street: '',
      city: '',
    };
  }

  return (
    <Form className="form-section forms-main-section">
      <Formik
        initialValues={values}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        children={(props: FormikProps<ICareInstitutionFormValues>) => (
          <PersonalInfoForm {...props} />
        )}
        validationSchema={CareInstituionValidationSchema}
      />

      <Formik
        initialValues={contactFormValues}
        onSubmit={handleContactSubmit}
        children={(props: FormikProps<ICareInstitutionContact>) => (
          <CareInstitutionContact {...props} />
        )}
        validationSchema={""}
      />
    </Form>
  );
};
export default PersonalInformation;

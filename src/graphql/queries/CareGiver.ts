import gql from "graphql-tag";

export const CAREGIVER_PERSONAL_INFO_FIELDS = `
{
    id
    firstName
    lastName
    salutation
    userName
    email
    password
    phoneNumber
    profileImage
    profileThumbnailImage
    isActive
    phoneNumber
    createdAt 
    gender
    caregiver{
      address1
      address2
      attributes
      age
      fax
      workZones
      mobileNumber
      countryId
      stateId
      zipCode
      employed
      salutation
      dateOfBirth
      gender
      comments
      companyName
      registerCourt
      remarks
      registrationNumber
      driversLicense
      driverLicenseNumber
      city
      street
      title
      taxNumber
      belongTo
      legalForm
      nightAllowance
      weekendAllowance
      executiveDirector
      phoneNumber
      fee
      holiday
      invoiceInterval,
      leasingPricingList
      night
    }
    regions{
      id
     regionName
    }
    bankDetails{
      bankName
      IBAN
    }
    qualifications{
      id
      name
    }
}`;

const GET_CAREGIVERS = gql`
  query getCaregivers(
    $searchBy: String
    $sortBy: Int
    $limit: Int
    $page: Int
    $isActive: String
  ) {
    getCaregivers(
      searchBy: $searchBy
      sortBy: $sortBy
      limit: $limit
      page: $page
      isActive: $isActive
    ) {
      result {
        id
        salutation
        firstName
        lastName
        email
        userName
        phoneNumber
        gender
        userRole
        isActive
        createdAt
        qualifications {
          id
          name
        }
        caregiver {
          address1
          address2
          age
          fax
          workZones
          mobileNumber
          countryId
          stateId
          zipCode
          legalForm
          employed
          comments
          companyName
          registerCourt
          driversLicense
          driverLicenseNumber
          city
          street
          title
        }
        regions {
          id
          regionName
        }
      }
      totalCount
    }
  }
`;

const GET_CAREGIVER_BY_ID = gql`
  query getCaregiver($id: Int!) {
    getCaregiver(id: $id) {
      isApproved
      firstName
      lastName
      salutation
      userName
      email
      password
      phoneNumber
      profileImage
      gender
      userRole
      profileThumbnailImage
      isActive
      createdAt
      caregiver {
        address1
        address2
        age
        fax
        workZones
        mobileNumber
        countryId
        stateId
        zipCode
        employed
        comments
        companyName
        registerCourt
        remarks
        registrationNumber
        driversLicense
        driverLicenseNumber
        dateOfBirth
        city
        street
        title
        taxNumber
        belongTo
        legalForm
        nightAllowance
        weekendAllowance
        executiveDirector
        phoneNumber
        fee
        holiday
        invoiceInterval
        attributes
        vehicleAvailable
        night
        leasingPricingList
      }
      qualifications {
        id
        name
      }
      regions {
        id
        regionName
      }
      bankDetails {
        bankName
        IBAN
      }
    }
  }
`;

const GET_LEASING_INFO = gql`
  query getLeasingInformation($userId: Int!) {
    getLeasingInformation(userId: $userId) {
      id
      placeOfBirth
      birthName
      factorChildAllowance
      socialSecurityNumber
      payrollIBAN
      preOccupation
      status
      nationality
      maritalStatus
      religion
      children
      healthInsuranceType
      healthInsuranceProvider
      controlId
      taxBracket
      firstDay
      lastDay
      monthlyWorkingHrs
      weeklyWorkingHrs
    }
  }
`;

const GET_EMAILS = gql`
  query getEmails($userId: Int!, $from: String, $searchBy: String) {
    getEmails(userId: $userId, from: $from, searchBy: $searchBy) {
      id
      userId
      to
      subject
      body
      attachments
      createdAt
    }
  }
`;

const GET_BELONGS_TO = gql`
  query getBelongTo($userId: Int!) {
    getBelongTo(userId: $userId) {
      id
      firstName
      lastName
    }
  }
`;

const GET_CAREGIVER_ATTRIBUTES = gql`
  query getCaregiverAtrribute {
    getCaregiverAtrribute {
      id
      name
      color
    }
  }
`;

const GET_CAREGIVERS_FOR_BULK_EMAIL = gql`
  query getCaregivers(
    $searchBy: String
    $sortBy: Int
    $limit: Int
    $page: Int
    $isActive: String
  ) {
    getCaregivers(
      searchBy: $searchBy
      sortBy: $sortBy
      limit: $limit
      page: $page
      isActive: $isActive
    ) {
      result {
        id
        firstName
        lastName
        email
      }
      totalCount
    }
  }
`;

export const CareGiverQueries = [
  GET_CAREGIVERS,
  GET_CAREGIVER_BY_ID,
  GET_LEASING_INFO,
  GET_EMAILS,
  GET_BELONGS_TO,
  GET_CAREGIVER_ATTRIBUTES,
  GET_CAREGIVERS_FOR_BULK_EMAIL
];

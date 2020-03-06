import gql from 'graphql-tag';

const GET_CARE_INSTITUTION_LIST = gql`
  query(
    $searchBy: String
    $sortBy: Int
    $limit: Int
    $page: Int
    $isActive: String
  ) {
    getCareInstitutions(
      searchBy: $searchBy
      sortBy: $sortBy
      limit: $limit
      page: $page
      isActive: $isActive
    ) {
      totalCount
      careInstitutionData {
        id
        firstName
        lastName
        email
        userName
        phoneNumber
        userRole
        isActive
        createdAt
        canstitution {
          city
          zipCode
          title
          companyName
          shortName
          attributes
        }
      }
    }
  }
`;

const GET_CARE_INSTITUION_BY_ID = gql`
  query getCareInstitution($careInstitutionId: Int!) {
    getCareInstitution(careInstitutionId: $careInstitutionId) {
      createdAt
      firstName
      lastName
      salutation
      email
      userName
      phoneNumber
      id
      userRole
      gender
      isApproved
      canstitution {
        city
        zipCode
        companyName
        shortName
        street
        countryId
        stateId
        remarks
        title
        fax
        linkedTo
        doctorCommission
        leasingPriceListId
        isArchive
        careGiverCommission
        anonymousName
        anonymousName2
        mobileNumber
        remarksViewable
        defaultQualification
        invoiceType
        emailInvoice
        addressInvoice
        interval
        website
        attributes
      }
      qualifications {
        id
        name
      }
      regions {
        id
        regionName
      }
      attributes {
        id
        name
      }
      contact {
        salutation
        firstName
        surName
        gender
        title
        salutation
        firstName
        surName
        countryId
        stateId
        street
        city
        contactTypeId
        phoneNumber
        zip
        phoneNumber2
        fax
        mobileNumber
        email
        remark
        id
        attributes{
          id
          name
        }
        contact_type {
          contactType
        }
      }
    }
  }
`;

const GET_DEPARTMENT_LIST = gql`
  query($userId: Int!, $locked: Boolean) {
    getDivision(userId: $userId, locked: $locked) {
      id
      userId
      name
      anonymousName
      anonymousName2
      address
      contactPerson
      phoneNumber
      faxNumber
      email
      commentsOffer
      commentsCareGiver 
      commentsVisibleInternally
      locked
      times
      qualifications
      attributes
    }
  }
`;

const GET_CAREINSTITUTION_ATTRIBUTES = gql`
  query getCareInstitutionAtrribute {
    getCareInstitutionAtrribute {
      id
      name
      color
    }
  }
`;

const GET_CONTACT_LIST_BY_ID = gql`
  query getContactsByUserID($userId: Int!) {
    getContactsByUserID(userId: $userId) {
      gender
      firstName
      surName
      contactTypeId
      contact_type {
        contactType
      }
      id
      email
    }
  }
`;

const GET_CONTACT_TYPES = gql`
  query getContactType {
    getContactType {
      id
      contactType
    }
  }
`;

const GET_DIVISION_DETAILS_BY_ID = gql`
  query GetDivisionsDetails($id: ID) {
    getDivisionsDetails(id: $id) {
      id
      userId
      name
      anonymousName
      anonymousName2
      address
      contactPerson
      phoneNumber
      faxNumber
      email
      remarks
      commentsOffer
      commentsCareGiver
      commentsVisibleInternally
      locked
      times
      attributes
      qualifications
      createdBy
      updatedBy
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

// query{
//   getDivisionsDetails(id:13){
//     id
//     userId
//     name
//     anonymousName
//     anonymousName2
//     address
//     contactPerson
//     phoneNumber
//     faxNumber
//     email
//     remarks
//     commentsOffer
//     commentsCareGiver
//     commentsVisibleInternally
//     locked
//     times
//     attributes
//     qualifications
//     createdBy
//     updatedBy
//     createdAt
//     updatedAt
//     deletedAt
//   }
//  }
export const CareInstitutionQueries = [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID,
  GET_DEPARTMENT_LIST,
  GET_CAREINSTITUTION_ATTRIBUTES,
  GET_CONTACT_LIST_BY_ID,
  GET_CONTACT_TYPES,
  GET_DIVISION_DETAILS_BY_ID
];

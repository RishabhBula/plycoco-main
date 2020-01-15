import gql from "graphql-tag";

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
        firstName
        lastName
        email
        userName
        phoneNumber
        isActive
        canstitution {
          city
          zipCode
          title
        }
      }
    }
  }
`;

const GET_CARE_INSTITUION_BY_ID = gql`
  query getCareInstitution($careInstitutionId: Int!) {
    getCareInstitution(careInstitutionId: $careInstitutionId) {
      firstName
      lastName
      email
      createdAt
      canstitution {
        city
        zipCode
        companyName
        shortName
      }
    }
  }
`;

const DELETE_CARE_INSTITUTION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;

const ADD_CARE_INSTITUTION = gql`
  mutation AddCareInstitution($careInstitutionInput: CareInstitutionInput) {
    addCareInstitution(careInstitutionInput: $careInstitutionInput) {
      firstName
    }
  }
`;

const UPDATE_CARE_INSTITUTION = gql`
  mutation updateCareInstitution(
    $id: Int!
    $careInstitutionInput: CareInstitutionInput!
  ) {
    updateCareInstitution(
      id: $id
      careInstitutionInput: $careInstitutionInput
    ) {
      id
      firstName
      lastName
    }
  }
`;

export const CareInstitutionQueries = [
  GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
  GET_CARE_INSTITUION_BY_ID
];

import gql from 'graphql-tag';
const GET_USERS_BY_QUALIFICATION_ID = gql`
  query getUserByQualifications(
    $qualificationId: [ID]
    $userRole: String
    $page:Int
    $limit:Int
    $negativeAttributeId: [ID]
    $positiveAttributeId: [ID]
    $gte: String
    $lte: String
  ) {
    getUserByQualifications(
      qualificationId: $qualificationId
      userRole: $userRole
      page: $page
      limit: $limit
      negativeAttributeId: $negativeAttributeId
      positiveAttributeId: $positiveAttributeId
      gte: $gte
      lte: $lte
    ) {
      totalCount
      result {
        firstName
        lastName
        userName
        userRole
        id
        caregiver {
          nightAllowance
          weekendAllowance
          fee
          holiday
          night
        }
        caregiver_avabilities {
          id
          status
          f
          s
          n
          date
          fee
          weekendAllowance
          travelAllowance
          holidayAllowance
          nightFee
          nightAllowance
          workingProofRecieved
          distanceInKM
          feePerKM
          otherExpenses
          remarksCareGiver
          remarksInternal
        }
        careinstitution_requirements {
          id
          name
          f
          s
          n
          address
          status
          bookingRemarks
          comments
          contactPerson
          date
          departmentBookingRemarks
          departmentOfferRemarks
          departmentRemarks
          divisionId
          endTime
          isWorkingProof
          name
          offerRemarks
          qualificationId
          startTime
          userId
        }
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
      }
    }
  }
`;

const GET_CAREGIVER_AVABILITY_LASTTIME_BY_ID = gql`
  query getCareGiverAvabilityLastTimeById($userId: Int!) {
    getCareGiverAvabilityLastTimeById(userId: $userId) {
      id
      fee
      nightFee
      weekendAllowance
      holidayAllowance
    }
  }
`;
// negativeAttributeId:[ID],positiveAttributeId: [ID],gte:String, lte:String
// qualificationId: $qualificationId
//       userRole: $userRole
//        negativeAttributeId: $negativeAttributeId
//         positiveAttributeId: $positiveAttributeId
//          gte:$gte
//          lte:$lte

export const AppointmentsQueries = [
  GET_USERS_BY_QUALIFICATION_ID,
  GET_CAREGIVER_AVABILITY_LASTTIME_BY_ID
];

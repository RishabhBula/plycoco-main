import gql from 'graphql-tag';

const GET_INVOICE_LIST = gql`
  query getAllAppointment(
    $searchBy: String
    $caregiverId: ID
    $careInstitutionId: ID
    $divisionId: ID
    $startDate: String
    $endDate: String
    $page: Int
    $limit: Int
    $attributeId: ID
  ) {
    getAllAppointment(
      searchBy: $searchBy
      caregiverId: $caregiverId
      careInstitutionId: $careInstitutionId
      divisionId: $divisionId
      startDate: $startDate
      endDate: $endDate
      page: $page
      limit: $limit
      attributeId: $attributeId
    ) {
      totalCount
      result {
        id
        avabilityId
        requirementId
        date
        status
        ca {
          userId
          name
          fee
          nightFee
          nightAllowance
          weekendAllowance
          holidayAllowance
          workingHoursFrom
          workingHoursTo
          breakTo
          breakFrom
          f
          n
          s
          distanceInKM
          feePerKM
          otherExpenses
          user {
            id
            caregiver {
              attributes
            }
          }
        }
        cr {
          userId
          divisionId
          name
          division {
            id
            name
          }
          f
          s
          n
          attribute_management {
            id
            moneyPerHour
            basicSalaryPerHour
            qualificationAllowance
          }
          user {
            id
            canstitution {
              leasingPriceListId
            }
          }
        }
      }
    }
  }
`;

const GET_ALL_INVOICE_LIST = gql`
  query getInvoices($status: String,$invoiceType:String, $sortBy: Int, $limit: Int, $page: Int) {
    getInvoices(status: $status,invoiceType: $invoiceType, sortBy: $sortBy, page: $page, limit: $limit) {
      result {
        id
        invoiceNumber
        caregiverId
        careInstitutionId
        appointmentIds
        status
        amount
        tax
        invoiceDate
        dueDdate
        doubtful
        irrecoverable
        paymentMethod
        invoiceType
        subTotal
        careGiverName
        careInstitutionName
        caregiver {
          id
        }
        careinstitution {
          id
        }
      }
      totalCount
    }
  }
`;

export const InvoiceQueries = [GET_INVOICE_LIST, GET_ALL_INVOICE_LIST];

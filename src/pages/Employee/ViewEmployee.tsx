import React, { Component, FunctionComponent, useEffect } from "react";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { EmployeeQueries } from "../../queries";
import { useParams } from "react-router";
import { AppConfig, AppRoutes } from "../../config";
import { IEmployee } from "../../interfaces";
import { languageTranslation } from "../../helpers";
import moment from "moment";
import defaultProfile from "../../assets/avatars/default-profile.png";
import { toast } from "react-toastify";
import { ConfirmBox } from "../../common/ConfirmBox";
import { useHistory, useLocation } from "react-router-dom";

const [, GET_EMPLOYEE_BY_ID, , , UPDATE_EMPLOYEE_STATUS] = EmployeeQueries;
let employee: any;

const ViewEmployee: FunctionComponent = () => {
  let history = useHistory();
  let { id } = useParams();
  // To get the employee details by id
  const [getEmployeeDetails, { data, error, refetch }] = useLazyQuery<any>(
    GET_EMPLOYEE_BY_ID
  );
  const [updateEmployeeStatus] = useMutation<
    { activeStatusEmployee: any },
    { id: string; isActive: boolean }
  >(UPDATE_EMPLOYEE_STATUS);
  console.log("data is", data);
  if (data) {
    employee = data.viewEmployee;
  }
  useEffect(() => {
    // Fetch details by employee id
    if (id) {
      getEmployeeDetails({
        variables: { id }
      });
    }
  }, []); // Pass empty array to only run once on mount. Here it will run when the value of employeeDetails get changed.

  const onStatusUpdate = async (id: string, status: boolean) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation(
        status
          ? "CONFIRM_EMPLOYEE_STATUS_ACTIVATE_MSG"
          : "CONFIRM_EMPLOYEE_STATUS_DISABLED_MSG"
      )
    });
    if (!value) {
      return;
    } else {
      try {
        await updateEmployeeStatus({
          variables: {
            id,
            isActive: status
          }
        });
        toast.success(languageTranslation("EMPLOYEE_STATUS_UPDATE_MSG"));
      } catch (error) {
        const message = error.message
          .replace("SequelizeValidationError: ", "")
          .replace("Validation error: ", "")
          .replace("GraphQL error: ", "");
        toast.error(message);
      }
    }
  };
  const replaceObj: any = {
    ":id": employee && employee.id,
    ":userName": employee && employee.userName
  };
  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="w-100" />
      </CardHeader>
      <CardBody>
        {data ? (
          <div className="employee-details">
            <Row>
              <Col lg={"4"} md={"4"} className="mb-3">
                <div className="employee-title">
                  {languageTranslation("PERSONAL_INFORMATION")}
                </div>
                <div className="user-item">
                  {/* <Button>Edit</Button> */}
                  {employee && employee.firstName ? (
                    <span className="text-label">
                      {languageTranslation("EMPLOYEE_NAME")}
                    </span>
                  ) : (
                    "N/A"
                  )}
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee && employee.firstName
                      ? employee.firstName
                      : "N/A"}
                    &nbsp;&nbsp;
                    {employee && employee.lastName ? employee.lastName : "N/A"}
                  </span>
                </div>
                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("EMPLOYEE_EMAIL_ADDRESS_LABEL")}
                  </span>

                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee && employee.email ? employee.email : "N/A"}
                  </span>
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("CONTACT_NO")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee && employee.phoneNumber
                      ? employee.phoneNumber
                      : "N/A"}
                  </span>
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("EMPLOYEE_USERNAME")}
                  </span>

                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee && employee.userName ? employee.userName : "N/A"}
                  </span>
                </div>
                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("STATUS")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {/* <span
                      className={`status-btn ${
                        employee && employee.isActive ? "active" : "inactive"
                      }`}
                    >
                      {employee && employee.isActive
                        ? languageTranslation("ACTIVE")
                        : languageTranslation("DISABLE")}
                    </span> */}
                    {console.log(employee && employee.id, "employee.id")}
                    <span
                      className={`status-btn ${
                        employee && employee.isActive ? "active" : "inactive"
                      }`}
                      onClick={() =>
                        onStatusUpdate(
                          employee && employee.id,
                          employee && !employee.isActive
                        )
                      }
                    >
                      {employee && employee.isActive
                        ? languageTranslation("ACTIVE")
                        : languageTranslation("DISABLE")}
                    </span>
                  </span>
                </div>
              </Col>

              <Col lg={"4"} md={"4"} className="mb-3">
                <div className="employee-title">
                  {languageTranslation("BANK_ACCOUNT_INFORMATION")}
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("EMPLOYEE_BANK_NAME_LABEL")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee &&
                    employee.bankDetails &&
                    employee.bankDetails.bankName
                      ? employee.bankDetails.bankName
                      : "N/A"}
                  </span>
                </div>
                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("BANK_ACCOUNT_HOLDER_NAME_LABEL")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee &&
                    employee.bankDetails &&
                    employee.bankDetails.accountHolder
                      ? employee.bankDetails.accountHolder
                      : "N/A"}
                  </span>
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("BANK_IBAN_LABEL")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee &&
                    employee.bankDetails &&
                    employee.bankDetails.IBAN
                      ? employee.bankDetails.IBAN
                      : "N/A"}
                  </span>
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("BANK_BIC_LABEL")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee &&
                    employee.bankDetails &&
                    employee.bankDetails.BIC
                      ? employee.bankDetails.BIC
                      : "N/A"}
                  </span>
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("ADDITIONAL_TEXT_LABEL")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee &&
                    employee.bankDetails &&
                    employee.bankDetails.additionalText
                      ? employee.bankDetails.additionalText
                      : "N/A"}
                  </span>
                </div>
              </Col>

              <Col lg={"4"} md={"4"} className="mb-4">
                {/* <div className="employee-title">
                  {languageTranslation("PROFILE_IMAGE")}
                </div> */}
                {/* {employee && employee.profileImage ? ( */}
                <div className="user-item">
                  <button
                    onClick={() =>
                      history.push(
                        AppRoutes.EDIT_EMPLOYEE.replace(
                          /:id|:userName/gi,
                          function(matched) {
                            return replaceObj[matched];
                          }
                        )
                      )
                    }
                  >
                    Edit
                  </button>

                  <span className="text-value">
                    <div className="profile-img">
                      <img
                        src={`${
                          employee && employee.profileImage
                            ? `${AppConfig.FILES_ENDPOINT}${employee.profileImage}`
                            : defaultProfile
                        }`}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </span>
                </div>
              </Col>

              <Col lg={"12"} md={"12"}>
                <div className="employee-title">
                  {languageTranslation("OTHER_INFORMATION")}
                </div>
              </Col>
              <Col lg={"6"} md={"6"} className="mb-3">
                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("REGION")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee && employee.region && employee.region.regionName
                      ? employee.region.regionName
                      : "N/A"}
                  </span>
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("EMPLOYEE_JOINING_DATE_LABEL")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee &&
                    employee.employee &&
                    employee.employee.joiningDate
                      ? moment(employee.employee.joiningDate).format(
                          "Do MMM, YYYY"
                        )
                      : "N/A"}
                  </span>
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("ADDRESS")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee && employee.employee && employee.employee.address1
                      ? employee.employee.address1
                      : "N/A"}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <h2>No Data Found</h2>
        )}
      </CardBody>
    </Card>
  );
};

export default ViewEmployee;

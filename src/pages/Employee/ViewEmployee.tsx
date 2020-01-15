import React, { Component, FunctionComponent, useEffect } from "react";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";
import { useLazyQuery } from "@apollo/react-hooks";
import { EmployeeQueries } from "../../queries";
import { useParams } from "react-router";
import { AppConfig } from "../../config";
import { IEmployee } from "../../interfaces";
const [, GET_EMPLOYEE_BY_ID] = EmployeeQueries;
const ViewEmployee: FunctionComponent = () => {
  let { id } = useParams();
  // To get the employee details by id
  const [getEmployeeDetails, { data, error, refetch }] = useLazyQuery<any>(
    GET_EMPLOYEE_BY_ID
  );
  console.log("data is", data);
  const profileImage =
    data && data.viewEmployee && data.viewEmployee.profileImage;

  useEffect(() => {
    // Fetch details by employee id
    if (id) {
      getEmployeeDetails({
        variables: { id }
      });
    }
  }, []); // Pass empty array to only run once on mount. Here it will run when the value of employeeDetails get changed.
  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="w-100" />
      </CardHeader>
      <CardBody>
        {console.log("data.viewEmployee", data && data.viewEmployee.firstName)}
        {/* {data && data.viewEmployee
          ? data.viewEmployee.map((employee: any, index: number) => {
              const replaceObj: any = {
                ":id": employee.id,
                ":userName": employee.userName
              };
              return ( */}
        <div className="employee-details">
          <Row>
            <Col lg={"4"} md={"4"} className="mb-3">
              <div className="employee-title">Personal Information</div>
              <div className="user-item">
                <span className="text-label">Employee Name</span>
                <span className="text-value">
                  :&nbsp;&nbsp;
                  {data && data.viewEmployee && data.viewEmployee.firstName
                    ? data.viewEmployee.firstName
                    : ""}
                  &nbsp;&nbsp;
                  {data && data.viewEmployee && data.viewEmployee.lastName
                    ? data.viewEmployee.lastName
                    : ""}
                </span>
              </div>
              <div className="user-item">
                <span className="text-label">Email Address</span>
                <span className="text-value">:&nbsp;&nbsp;John@gmail.com</span>
              </div>
              <div className="user-item">
                <span className="text-label">Contact No.</span>
                <span className="text-value">:&nbsp;&nbsp;657689980</span>
              </div>
              <div className="user-item">
                <span className="text-label">Employee Username</span>
                <span className="text-value">:&nbsp;&nbsp;John Doe</span>
              </div>
              <div className="user-item">
                <span className="text-label">Status</span>
                <span className="text-value">
                  :&nbsp;&nbsp;
                  <span className="status-btn">Active</span>
                </span>
              </div>
            </Col>
            <Col lg={"4"} md={"4"} className="mb-3">
              <div className="employee-title">Bank Account Information</div>
              <div className="user-item">
                <span className="text-label">Bank Name</span>
                <span className="text-value">
                  :&nbsp;&nbsp;State Bank of India
                </span>
              </div>
              <div className="user-item">
                <span className="text-label">Account Holder Name</span>
                <span className="text-value">:&nbsp;&nbsp;John Doe</span>
              </div>
              <div className="user-item">
                <span className="text-label">IBAN</span>
                <span className="text-value">:&nbsp;&nbsp;657689980</span>
              </div>
              <div className="user-item">
                <span className="text-label">BIC</span>
                <span className="text-value">:&nbsp;&nbsp;43546768945</span>
              </div>
              <div className="user-item">
                <span className="text-label">Additional text</span>
                <span className="text-value">
                  :&nbsp;&nbsp;Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit.
                </span>
              </div>
            </Col>

            <Col lg={"4"} md={"4"} className="mb-4">
              <div className="employee-title">Profile Image</div>
              <div className="user-item">
                <span className="text-value">
                  <div className="profile-img">
                    <img
                      src={`${AppConfig.FILES_ENDPOINT}${profileImage}`}
                      className="img-fluid"
                    />
                  </div>
                </span>
              </div>
            </Col>

            <Col lg={"12"} md={"12"}>
              <div className="employee-title">Other Information</div>
            </Col>
            <Col lg={"6"} md={"6"} className="mb-3">
              <div className="user-item">
                <span className="text-label">Region</span>
                <span className="text-value">:&nbsp;&nbsp;North Asia</span>
              </div>
              <div className="user-item">
                <span className="text-label">Joining Date</span>
                <span className="text-value">:&nbsp;&nbsp;12/03/2010</span>
              </div>
              <div className="user-item">
                <span className="text-label">Address</span>
                <span className="text-value">
                  :&nbsp;&nbsp;38, Street 8, Mascow Tower, Sydney
                </span>
              </div>
            </Col>
          </Row>
        </div>
        {/* );
            })
          : null} */}
      </CardBody>
    </Card>
  );
};

export default ViewEmployee;

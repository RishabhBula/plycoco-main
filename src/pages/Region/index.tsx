import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Card,
  CardHeader,
  Label,
  CardBody,
  Input,
  Col,
  Row,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from "reactstrap";
import { AppRoutes } from "../../config";
import { RouteComponentProps } from "react-router";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";
const userData = [
  {
    region: "Central Germany",
    canstitution: "1",
    careGiver: "5",
    appointment: "12"
  },
  {
    region: "Frankfurt",
    canstitution: "3",
    careGiver: "2",
    appointment: "10"
  },
  {
    region: "Munich",
    canstitution: "1",
    careGiver: "8",
    appointment: "15"
  },
  {
    region: "North Germany",
    canstitution: "4",
    careGiver: "1",
    appointment: "10"
  },
];
class Region extends Component<RouteComponentProps, any> {
  render() {
    return (
      <Row>
        <Col xs={"12"} lg={"12"}>
          <Card>
            <CardHeader>
              <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
              <Button
                color={"primary"}
                className={"btn-add"}
                id={"add-new-pm-tooltip"}
                onClick={() => this.props.history.push(AppRoutes.ADD_REGION)}
              >
                <i className={"fa fa-plus"} />
                &nbsp; Add New Region
              </Button>
            </CardHeader>
            <CardBody>
              <div className="filter-form form-section">
                <Row>
                  <Col lg={"2"}>
                    <FormGroup>
                      <Label for="search" className="col-form-label">
                        Search:
                      </Label>
                      <Input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search.."
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={"2"}>
                    <FormGroup>
                      <Label for="Selectregion" className="col-form-label">
                        Region:
                      </Label>
                      <Input type="select" name="region" id="Selectregion">
                        <option>Western India</option>
                        <option>East India</option>
                        <option>South India</option>
                        <option>Northeast India</option>
                        <option>Central India</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg={"2"}>
                    <FormGroup>
                      <Label for="Selectregion" className="col-form-label">
                        Sort By:
                      </Label>
                      <Input type="select" name="region" id="Selectregion">
                        <option>Popularity</option>
                        <option>A-Z</option>
                        <option>Z-A</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col lg={"2"}>
                    <div className="label-height"></div>
                    <div className="filter-btn-wrap">
                      <span className="btn-filter mr-2" id="search1">
                        <UncontrolledTooltip placement="top" target="search1">
                          Search
                        </UncontrolledTooltip>
                        <i className="fa fa-search"></i>
                      </span>
                      <span className="btn-filter mr-2" id="reset">
                        <UncontrolledTooltip placement="top" target="reset">
                          Reset
                        </UncontrolledTooltip>
                        <i className="fa fa-refresh "></i>
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>

              <Table bordered hover responsive>
                <thead className="thead-bg">
                  <tr>
                    <th>
                      <div className="table-checkbox-wrap">
                        <div className="btn-group btn-check-action-wrap">
                          <span className="btn">
                            <span className="checkboxli checkbox-custom checkbox-default">
                              <input
                                type="checkbox"
                                id="checkAll"
                                className=""
                              />
                              <label className=""></label>
                            </span>
                          </span>
                          <UncontrolledDropdown className="custom-dropdown">
                            <DropdownToggle caret color="link" />
                            <DropdownMenu>
                              <DropdownItem>Delete</DropdownItem>
                              <DropdownItem>Active</DropdownItem>
                              <DropdownItem>Disable</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </th>
                    <th>Region Name</th>
                    <th className="text-center">Number of Canstitution</th>
                    <th className="text-center">Number of Care Givers</th>
                    <th className="text-center">
                      Current ongoing appointments counter
                    </th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index): any => {
                    return(
                    <tr>
                      <td>
                        <div className="table-checkbox-wrap">
                          <div className="btn-group btn-check-action-wrap">
                            <span className="btn">
                              <span className="checkboxli checkbox-custom checkbox-default">
                                <input
                                  type="checkbox"
                                  id="checkAll"
                                  className=""
                                />
                                <label className=""></label>
                              </span>
                            </span>
                    <span className="checkbox-no">{index+1}</span>
                          </div>
                        </div>
                      </td>
                      <td>{user.region}</td>
                      <td className="text-center">{user.canstitution}</td>
                      <td className="text-center">{user.careGiver}</td>
                      <td className="text-center">{user.appointment}</td>
                      <td>
                        <div className="action-btn">
                          <span className="btn-icon my-2 " id="delete">
                            <UncontrolledTooltip
                              placement="top"
                              target="delete"
                            >
                              Delete
                            </UncontrolledTooltip>
                            <i className="fa fa-trash"></i>
                          </span>
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Region;

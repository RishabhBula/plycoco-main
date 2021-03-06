import React, { Component, FunctionComponent } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  Form
} from "reactstrap";

const AddDepartment: FunctionComponent = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <h4>
            <i className="fa fa-address-book" />
            <span className="ml-1">Add Department</span>
          </h4>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs={"12"} lg={"8"} className="mx-auto">
              <Form className="form-section">
                <FormGroup>
                  <Row>
                    <Col sm="3">
                      <Label className="form-label col-form-label ">
                        Name of Department
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="9">
                      <Input
                        type="text"
                        name={"nameofDepartment"}
                        placeholder="Name of Department"
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <div className={"text-right"}>
                  <Button color="primary" type="submit" className="btn-submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default AddDepartment;

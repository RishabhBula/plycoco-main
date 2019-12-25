import React, { Component } from "react";
import { Button, FormGroup, Label, Input, Col, Row } from "reactstrap";

class AddRegion extends Component {
  render() {
    return (
      <>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
              Name of the region<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"nameofRegion"}
                placeholder="Please Enter Name of the region"
              />
            </Col>
          </Row>
          </FormGroup>
        <div className={"text-right"}>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </div>
      </>
    );
  }
}
export default AddRegion;

import React, { FunctionComponent, useState } from "react";
import {
  Col,
  Row,
  Collapse,
  FormGroup,
  Input,
  UncontrolledTooltip
} from "reactstrap";
import { languageTranslation } from "../../../../../helpers";

const SentEmail: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [opened, setIsOpened] = useState<boolean>(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const onEntered = () => {
    setIsOpened(!opened);
  };
  return (
    <div className="email-section">
      {/* <EmailMenus {...this.props} /> */}
      <div className="email-content">
        <Row>
          <Col lg={"5"}>
            <div className="email-inbox-section">
              <div className="filter-form form-section">
                <Row>
                  <Col lg={"8"} md={"8"} sm={"8"}>
                    <FormGroup className="mb-2">
                      <Input
                        type="text"
                        name="search"
                        id="search"
                        placeholder={languageTranslation("SEARCH_PLACEHOLDER")}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={"4"} md={"4"} sm={"4"}>
                    <div className="filter-btn-wrap mb-2">
                      <span className="btn-filter mr-2" id="search1">
                        <UncontrolledTooltip placement="top" target="search1">
                          {languageTranslation("SEARCH_LABEL")}
                        </UncontrolledTooltip>
                        {languageTranslation("SEARCH_LABEL")}
                      </span>
                      <span className="btn-filter mr-2" id="reset">
                        <UncontrolledTooltip placement="top" target="reset">
                          {languageTranslation("RESET_LABEL")}
                        </UncontrolledTooltip>
                        {languageTranslation("RESET_LABEL")}
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="email-row-wrap align-items-center email-attributes-wrap">
                <div className="email-attributes-content d-flex align-items-center">
                  <i className="fa fa-refresh mr-1"></i>
                  <span> {languageTranslation("REFRESH")}</span>
                </div>
                <span className="email-attributes-seprator">|</span>
                <div className="email-attributes-content">
                  <i className="fa fa-hourglass-end mr-1"></i>
                  <span> {languageTranslation("EXPIRED")}</span>
                </div>
              </div>
              <div className="email-row-wrap email-heading-wrap ">
                <div className="email-date-time-block ">
                  {languageTranslation("DATE")}
                </div>
                <div className="email-subject-block ">
                  <span>{languageTranslation("TO")}</span>
                </div>
                <div className="email-text-wrap">
                  <span>{languageTranslation("SUBJECT")}</span>
                </div>
              </div>
              <ul className="mb-3 mb-lg-0 p-0 list-group custom-scrollbar">
                <li className={`email-wrap `}>
                  <div
                    className={`email-date-block ${
                      opened ? "opened" : "closed"
                    }`}
                    onClick={toggle}
                  >
                    {" "}
                    {languageTranslation("DATE")}: january 2020
                  </div>
                  <Collapse
                    isOpen={isOpen}
                    onEntered={onEntered}
                    onExiting={onEntered}
                  >
                    <div className="email-row-wrap inner-content-wrap">
                      <div className="email-date-time-block">
                        22.01.2020 20.33.33
                      </div>
                      <div className="email-subject-block">Blalock, Jolene</div>
                      <div className="email-text-wrap">Blalock, Jolene</div>
                    </div>
                  </Collapse>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={"7"}>
            <div className="mail-details">
              <div className="mail-body word-wrap">
                <h5 className="mb-3">
                  {" "}
                  Your iBuy.com grocery shopping confirmation
                </h5>
                <div>
                  <span className="gray-color">Posted:</span>{" "}
                  <span>12:20 PM</span>
                </div>
                <div className="mb-3">
                  <span className="gray-color">To:</span>{" "}
                  <span>Justina Achatoh</span>
                </div>
                <p className="mb-1">
                  {" "}
                  -------------------------------------------------
                </p>
                <p> Hello Denis,</p>

                <p>we have the following offer for you: Searched for</p>

                <p>qualification: Elderly care</p>

                <p>
                  01.01. ND 8.0h: old people's home near Bielefeld (code: Q9T3M)
                  Services by arrangement. Accommodation is provided. Double
                  services possible. Please let us know your availability by
                  email ! Fee: freely negotiable Best regards Marc Erdtmann Tel:
                  +49.30.644 99 444 Fax: +49.30.644 99 445 E-Mail:
                  Kontakt@plycoco.de www.plycoco.de Plycoco GmbH Am Borsigturm 6
                  13507 Berlin Entry in the commercial register: Register court
                  : District court Berlin-Charlottenburg, registration number:
                  HRB 150746, managing
                </p>
                <div className="mt-3  mb-1">Thanks and Regards</div>
                <div className="h6">John die</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SentEmail;

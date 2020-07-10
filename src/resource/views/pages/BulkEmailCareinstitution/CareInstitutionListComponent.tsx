import React, { FunctionComponent } from "react";
import { Col, Table } from "reactstrap";
import { ICareGiverListComponentProps } from "../../../../interfaces";
import Loader from "../../containers/Loader/Loader";
import { languageTranslation } from "../../../../helpers";
import InfiniteScroll from "react-infinite-scroll-component";

export const CareInstitutionListComponent: FunctionComponent<
  ICareGiverListComponentProps & any
> = (props: ICareGiverListComponentProps & any) => {
  const {
    careInstitutions,
    handleSelectAll,
    called,
    loading,
    selectedCareGiver,
    handleCheckElement,
    handleInfiniteScroll,
    page,
    bulkcareGivers,
    careInstData,
  } = props;
  console.log('inside renderlist', careInstData ? careInstData.getCareInstitutions : null)

  const handleChecked = (id: string) => {
    if (selectedCareGiver && selectedCareGiver.length) {
      const found = selectedCareGiver.some(
        (el: any) => parseInt(el) === parseInt(id)
      );
      const e = {
        target: {
          checked: !found,
        },
      };
      handleCheckElement(e, id);
    } else {
      const e = {
        target: {
          checked: true,
        },
      };
      handleCheckElement(e, id);
    }
  };

  // const { getCareInstitution = {} } = careInstData ? careInstData : {};
  // console.log('getCareInstitution',getCareInstitution)
  // const {
  //   firstName = "",
  //   lastName = "",
  //   email = "",
  //   id = "",
  //   userId = "",
  //   canstitution = {},
  //   contact = [],
  // } = getCareInstitution ? getCareInstitution : {};
  // const { companyName = "" } = canstitution ? canstitution : {};
  // const temp = [
  //   {
  //     companyName,
  //     contactType: languageTranslation("MAIN_CONTACT"),
  //     name: [lastName, firstName].join(" "),
  //     email,
  //     userId,
  //     id,
  //   },
  // ];

  // if (contact && contact.length) {
  //   contact.forEach((item: any) => {
  //     const {
  //       firstName = "",
  //       surName = "",
  //       email = "",
  //       contact_type = {},
  //       id = "",
  //       userId = "",
  //     } = item ? item : {};
  //     temp.push({
  //       id,
  //       userId,
  //       companyName: "",
  //       contactType:
  //         contact_type && contact_type.contactType
  //           ? contact_type.contactType
  //           : "",
  //       name: [surName, firstName].join(" "),
  //       email,
  //     });
  //   });
  // }

  return (
    <Col lg={"6"} className="pr-lg-0">
      <div className="careinstitution-list custom-scroll">
        <Table bordered hover responsive className="mb-0">
          <thead className="thead-bg">
            <tr>
              <th className="checkbox-th-column"></th>
              <th className="">{languageTranslation("MENU_INSTITUTION")}</th>
              <th className="">{languageTranslation("CONTACT")}</th>
              <th>{languageTranslation("NAME")}</th>
              <th className="">{languageTranslation("EMAIL")}</th>
              {/* <th>{languageTranslation('SALUTATION')}</th> */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className={"table-loader"} colSpan={8}>
                  <Loader />
                </td>
              </tr>
            ) : careInstData && careInstData.getCareInstitutions && careInstData.getCareInstitutions.careInstitutionData ? (
              careInstData.getCareInstitutions.careInstitutionData.map((data: any, index: number) => {
                return (
                  <tr
                    key={index}
                    onClick={(e: any) => {
                      handleChecked(data.id);
                    }}
                    className="cursor-pointer"
                  >
                    <td>
                      <span className=" checkbox-custom  ">
                        <input
                          type="checkbox"
                          id="check"
                          name="checkbox"
                          className=""
                          checked={
                            selectedCareGiver &&
                            selectedCareGiver.length &&
                            selectedCareGiver.indexOf(parseInt(data.id)) > -1
                              ? true
                              : false
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleCheckElement(e, data.id);
                          }}
                        />
                        <label className=""></label>
                      </span>
                    </td>
                    <td>{data.canstitution.companyName}</td>
                    <td>{languageTranslation("MAIN_CONTACT")}</td>
                    <td>{data.firstName + data.lastName}</td>
                    <td>{data.email}</td>
                    {/* <td>{item.salutation}</td> */}
                  </tr>
                );  
              })
            ) : null}
          </tbody>
        </Table>
      </div>
    </Col>
  );
};

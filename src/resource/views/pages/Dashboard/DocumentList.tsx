import React, { FunctionComponent } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table } from "reactstrap";
import { languageTranslation } from "../../../../helpers";
import Loader from "../../containers/Loader/Loader";
import { RouteComponentProps, useHistory } from "react-router-dom";
import {
  defaultDateTimeFormatForDashboard,
  AppRoutes
} from "../../../../config";
import moment from "moment";

const DocumentList: FunctionComponent<RouteComponentProps> = (props: any) => {
  let history = useHistory();
  const { documentListLoading, documentList } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle> {languageTranslation("NEW_DOCUMENT")}</CardTitle>
      </CardHeader>

      <CardBody className="custom-scrollbar">
        <div>
          <Table hover className="mb-0">
            <thead className="thead-bg">
              <tr>
                <th className="thead-sticky"> {languageTranslation("DATE")}</th>
                <th className="thead-sticky">{languageTranslation("NAME")}</th>
                <th className="thead-sticky">{languageTranslation("TYPE")}</th>
              </tr>
            </thead>
            <tbody>
              {documentListLoading ? (
                <tr>
                  <td className={"table-loader"} colSpan={7}>
                    <Loader />
                  </td>
                </tr>
              ) : documentList &&
                documentList.getDashboardNewDocuments.length ? (
                documentList.getDashboardNewDocuments.map(
                  (item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>
                          {" "}
                          {moment(item.createdAt).format(
                            defaultDateTimeFormatForDashboard
                          )}
                        </td>
                        <td>
                          <div
                            className="text-capitalize view-more-link word-wrap"
                            onClick={() =>
                              history.push(
                                item.user.userRole === "caregiver"
                                  ? AppRoutes.CARE_GIVER_VIEW.replace(
                                      /:id/gi,
                                      item.user.id + "?tab=documents"
                                    )
                                  : AppRoutes.CARE_INSTITUION_VIEW.replace(
                                      /:id/gi,
                                      item.user.id + "?tab=documents"
                                    )
                              )
                            }
                          >
                            {item.user.firstName} {item.user.lastName}
                          </div>
                        </td>
                        <td>
                          {item.document_type ? item.document_type.type : null}
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr className={"text-center no-hover-row"}>
                  <td colSpan={5} className={"pt-5 pb-5"}>
                    <div className="no-data-section">
                      <div className="no-data-icon">
                        <i className="icon-ban" />
                      </div>
                      <h4 className="mb-1">
                        Currently there are no documents added.
                      </h4>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};
export default DocumentList;
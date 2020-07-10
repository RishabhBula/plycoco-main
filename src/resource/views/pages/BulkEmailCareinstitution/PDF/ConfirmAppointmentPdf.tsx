import React, { FunctionComponent } from "react";
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
  PDFViewer,
  Link,
} from "@react-pdf/renderer";
import moment from "moment";
import {
  IConfirmAppointmentPdfProps,
  IReactSelectInterface,
} from "../../../../../interfaces";
import { defaultDateFormat } from "../../../../../config";
import { languageTranslation } from "../../../../../helpers";
import timyocLogo from "../../../../assets/img/timyoc.png";

const ConfirmAppointmentPdf: FunctionComponent<IConfirmAppointmentPdfProps> = (
  props: IConfirmAppointmentPdfProps
) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#fff",
      width: "100%",
      paddingRight: "40px",
      paddingLeft: "40px",
      marginRight: "auto",
      marginTop: "20px",
      marginLeft: "auto",
    },
    section: {
      margin: 10,
      padding: 10,
      marginBottom: "0",
      paddingBottom: "0",
      flexGrow: 1,
    },
    name: {
      width: "150px",
      marginBottom: "40px",
      marginTop: "40px",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
      marginBottom: "15px",
    },
    subtext: {
      fontSize: 10,
      color: "#333",
      marginTop: "10px",
      marginBottom: "10px",
    },
    subtextbold: {
      fontSize: 12,
      color: "black",
      marginBottom: "10px",
      paddingBottom: "4px",
      fontWeight: "bold",
      borderBottomWidth: 2,
      borderColor: "black",
      borderStyle: "solid",
    },
    signaturecontainer: {
      flex: 1,
      flexDirection: "row",
      marginBottom: "0",
      flexGrow: 1,
      marginLeft: "10px",
      marginRight: "10px",
    },
    imagediv: {
      width: "50%",
      height: "50px",
      padding: 10,
    },
    image: {
      width: "120px",
    },
    imgtext: {
      borderTopWidth: 1,
      borderColor: "black",
      borderStyle: "solid",
      paddingTop: "10px",
      fontSize: 12,
      fontWeight: "bold",
    },
    footerwrapper: {
      margin: 10,
      textAlign: "center",
      flexGrow: 1,
      justifyContent: "center",
    },
    footertext: {
      fontSize: 10,
      color: "gray",
      marginBottom: "2px",
      textAlign: "center",
    },
  });
  const { selectedCellsCareinstitution } = props;

  // Create Document Component
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image src={timyocLogo} style={styles.name} />
          <Link style={styles.subtext} src="#">
            {languageTranslation("PDF_DIAMOND_PERSONAL_GMBH")}
          </Link>
          {selectedCellsCareinstitution && selectedCellsCareinstitution.length && selectedCellsCareinstitution[0].canstitution ? <><Text style={styles.subtext}>
          {selectedCellsCareinstitution[0].canstitution.companyName || ''}
            {/* {languageTranslation("ARKADIA_PFLEGE")}{" "} */}
          </Text>
          <Text style={styles.subtext}>
            {selectedCellsCareinstitution[0].canstitution.shortName || ''}
            {/* {languageTranslation("SENIOR_NURSING_HOME_PACK")}{" "} */}
          </Text>
          <Text style={styles.subtext}>
          {[selectedCellsCareinstitution[0].canstitution.street, selectedCellsCareinstitution[0].canstitution.city].filter(Boolean).join(', ') || ''}            
            {languageTranslation("SENIOR_NURSING_HOME_PACK")}{" "}
          </Text>
          <Text style={styles.subtext}>{languageTranslation("WERDER")} </Text></> : null}
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>
            {languageTranslation("SUPPLY_TEMPORARY_WORKERS")}{" "}
          </Text>
          <Text style={styles.subtext}>
            {languageTranslation("SUPPLY_TEMPORARY_WORKERS_LEASING_CONTRACT")}{" "}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtextbold}>
            {languageTranslation("WORK_DETAILS")}
          </Text>
          {selectedCellsCareinstitution && selectedCellsCareinstitution.length
            ? selectedCellsCareinstitution.map((cell: any, index: number) => {
                const { item = {}, canstitution } = cell;
                const {companyName='', strret = '', city = ''} = canstitution
                const {
                  id = "",
                  startTime = "",
                  endTime = "",
                  date = "",
                  appointments = [],
                  qualificationId = [],
                } = item ? item : {};
                const { ca = {} } =
                  appointments && appointments.length ? appointments[0] : {};
                console.log(ca, 'ca');
                
                let shiftLabel: string =
                  startTime === "06:00"
                    ? "FD"
                    : startTime === "14:00"
                    ? "SD"
                    : "ND";
                return id ? (
                  <Text style={styles.subtext} key={index}>
                    {date ? moment(date).format(defaultDateFormat) : ""},{" "}
                    {shiftLabel}, {ca && ca.name ? `${languageTranslation("WORKER")}:${ca.name},` : ""}{" "}
                    {languageTranslation("QUALIFICATION")}:{" "}
                    {qualificationId
                      .map((quali: IReactSelectInterface) => quali.label)
                      .filter(Boolean)
                      .join(", ")}
                    , {languageTranslation("PAY_GROUP_TXT")}: 3{" "}
                  </Text>
                ) : null;
              })
            : null}
        </View>

        <View style={styles.signaturecontainer}>
          <View>
            <Text style={styles.imagediv}></Text>
            <Text style={styles.imgtext}>
              {languageTranslation("SIGN_IT_AND_SEND_BACK")}
            </Text>
          </View>
        </View>
        <View style={styles.footerwrapper}>
          <Text style={styles.footertext}>
            TIMyoCY {languageTranslation("TIMyoCY_SERVICE")}{" "}
          </Text>
          <Text style={styles.footertext}>
            {languageTranslation("TEL")}: +49.30.644 99 444{" "}
            {languageTranslation("FAX")}: +49.30. 644 99 445{" "}
          </Text>
          <Text style={styles.footertext}>
            {languageTranslation("SUPERVISORY_AUTHORITY")},{" "}
            {languageTranslation("TEL")}: 0431 709 1010{" "}
          </Text>
          <Text style={styles.footertext}>
            {languageTranslation("ENTRY_IN_COMMERCIAL_REGISTER")}{" "}
          </Text>
          <Text style={styles.footertext}>
            {languageTranslation("REGISTER_NUMBER_PDF")}{" "}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ConfirmAppointmentPdf;

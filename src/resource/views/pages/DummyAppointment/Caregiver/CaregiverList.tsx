import React from "react";
import { getDaysArrayByMonth } from "../../../../../helpers";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import { createSelectable, SelectableGroup } from "react-selectable-fast";
import classname from "classnames";
import moment from "moment";
import { CaregiverRightClickOptions } from "./CaregiverRightClickOptions";
import {
  AppRoutes,
  CaregiverTIMyoCYAttrId,
  deactivatedListColor,
  leasingListColor,
  PAGE_LIMIT,
  selfEmployesListColor,
} from "../../../../../config";
import Loader from "../../../containers/Loader/Loader";
import { Link } from "react-router-dom";

const staticHeader = ["caregiver", "H", "S", "U", "V"];

export const SelectableCell = React.memo(
  createSelectable(
    ({ selectableRef, isSelecting, isSelected, isWeekend, item }: any) => {
      let isMatching: boolean = false,
        isConfirm: boolean = false,
        isContractCancel: boolean = false,
        isContractInitiated: boolean = false,
        isSingleButtonAccepted: boolean = false,
        isTimeSheetPending: boolean = false,
        isInvoiceInitiated: boolean = false;
      if (item.status === "linked") {
        isMatching = true;
      } else if (item.status === "confirmed") {
        isConfirm = true;
      } else if (item.status === "contractCancelled") {
        isContractCancel = true;
      } else if (item.status === "contractInitiated") {
        isContractInitiated = true;
      } else if (item.status === "invoiceInitiated") {
        isInvoiceInitiated = true;
      } else if (item.status === "accepted") {
        isSingleButtonAccepted = true;
      } else if (
        item.status === "timeSheetPending" ||
        item.status === "timeSheetUpdated"
      ) {
        isTimeSheetPending = true;
      }

      // Date condition to not display fsn if date is before today
      let isBeforedate = false;
      if (item && item.date) {
        isBeforedate = moment(item.date).isBefore(moment(), "day");
      }
      return (
        <>
          <span
            className={classname({
              "calender-col": true,
              "text-center": true,
              "custom-appointment-col": true,
              "cursor-pointer": true,
              "selecting-cell-bg": isSelecting || isSelected,
              weekend: isWeekend,
              "contact-initiate-bg":
                isContractInitiated && !isSelected
                  ? isContractInitiated
                  : false,

              "invoice-bg":
                isInvoiceInitiated && !isSelected ? isInvoiceInitiated : false,

              "cancel-contract-bg":
                isContractCancel && !isSelected ? isContractCancel : false,
              "matching-bg": isMatching && !isSelected ? isMatching : false,
              "confirmation-bg":
                isTimeSheetPending && !isSelected ? isTimeSheetPending : false,
              "contract-bg": isConfirm && !isSelected ? isConfirm : false,
              "availability-dark-bg": !isSelected
                ? item
                  ? item.f === "available" ||
                    item.s === "available" ||
                    item.n === "available"
                    ? item && item.status === "default" && isBeforedate
                      ? false
                      : true
                    : false
                  : false
                : false,
              "availability-bg":
                !isSelected && item && item.status === "default" && isBeforedate
                  ? true
                  : false,
            })}
            ref={selectableRef}
          >
            {item.status === "timeSheetPending" ? (
              <i className="fa fa-circle-o"></i>
            ) : item.status === "timeSheetUpdated" ? (
              <i className="fa fa-check"></i>
            ) : item.status === "invoiceInitiated" ? (
              <i className="fa fa-euro"></i>
            ) : item.f === "block" ||
              item.s === "block" ||
              item.n === "block" ? (
              <i className="fa fa-ban"></i>
            ) : item.status === "default" &&
              new Date(item.date).toTimeString() <
                new Date().toTimeString() ? null : (
              <>
                {item.f === "available" ? "f" : null}
                {item.s === "available" ? "s" : null}
                {item.n === "available" ? "n" : null}
              </>
            )}
          </span>
        </>
      );
    }
  )
);

let tempList: any = [];
class CaregiverList extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      days: getDaysArrayByMonth().daysArr,
      selectedCells: [],
      openToggleMenu: false,
      loading: false,
      loadingMore: false,
      listCareGiver: [],
      // loadedAll: this.props.result.length < 30,
    };
  }

  componentDidMount = () => {
    let listData =
      // starCaregiver.isStar || starCaregiver.isSecondStar
      //   ? careGiversList.filter((cg: any) => cg.id === starCaregiver.id)
      //   :
      this.props.caregiverData;

    listData.forEach((element: any) => {
      element.availabilityData.forEach((item: any, row: number) => {
        return tempList.push({ ...element, new: item, row });
      });
    });
    this.setState({
      listCareGiver: tempList,
    });
  };

  componentDidUpdate = ({ caregiverData }: any) => {
    if (caregiverData !== this.props.caregiverData) {
      this.props.caregiverData.forEach((element: any) => {
        element.availabilityData.forEach((item: any, row: number) => {
          return tempList.push({ ...element, new: item, row });
        });
      });
      this.setState({
        loadingMore: false,
        listCareGiver: tempList,
      });
    }
  };

  handleToggleMenuItem = () => {
    this.setState({
      openToggleMenu: !this.state.openToggleMenu,
    });
  };
  onSelectFinish = (selectedCellsData: any[]) => {
    const { handleSelection } = this.props;
    if (handleSelection) {
      let selectedRows: any[] = [];
      if (selectedCellsData && selectedCellsData.length) {
        selectedRows = selectedCellsData.map((selectedCell: any) => {
          const { props: cellProps } = selectedCell;
          const { item, list: caregiverData, cellIndex, day } = cellProps;
          const {
            id = "",
            firstName = "",
            lastName = "",
            email = "",
            caregiver = {},
            qualificationId = [],
          } = caregiverData ? caregiverData : {};
          return {
            id,
            firstName,
            lastName,
            email,
            caregiver,
            item,
            qualificationIds: qualificationId,
            dateString: day ? day.dateString : "",
            cellIndex,
          };
        });
        handleSelection(selectedRows, "caregiver");
      }
    }
  };

  loadMore = async () => {
    this.setState({ loadingMore: true });
    await this.props.fetchMoreData();
  };

  handleEndReached = (args: any) => {
    // action('onEndReached')(args)
    const { loading, loadingMore, loadedAll } = this.state;
    if (loading || loadingMore || loadedAll) return;
    this.loadMore();
  };

  // // Adding Row into table
  // onAddingRow = (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  //   name: string,
  //   index: number
  // ) => {
  //   e.preventDefault();
  //   const { caregiverData, setcaregiversList } = this.props;
  //   if (name === 'caregiver') {
  //     let temp: any = [...caregiverData];
  //     temp[index].availabilityData = temp[index].availabilityData
  //       ? [...temp[index].availabilityData, []]
  //       : [];
  //       console.log("temptemp",temp);

  //     setcaregiversList(temp);
  //   }
  // };

  render() {
    const {
      caregiverData: result,
      caregiverLoading,
      daysData,
      onAddingRow,
    } = this.props;
    const { days, openToggleMenu, loadingMore, listCareGiver } = this.state;
    const columns = [...staticHeader, ...daysData.daysArr];
    return (
      <>
        <div
          className={classname({
            "right-manu-close": true,
            "d-none": !openToggleMenu,
          })}
          onClick={this.handleToggleMenuItem}
        ></div>
        <CaregiverRightClickOptions
          isOpen={openToggleMenu}
          hide={() => this.setState({ openToggleMenu: false })}
        />

        {tempList && tempList.length ? (
          <SelectableGroup
            allowClickWithoutSelected
            className="custom-row-selector new-base-table"
            clickClassName="tick"
            resetOnStart={true}
            allowCtrlClick={false}
            onSelectionFinish={this.onSelectFinish}
            ignoreList={[".name-col", ".h-col", ".s-col", ".u-col", ".v-col"]}
          >
            <BaseTable
              data={result}
              width={1000}
              height={300}
              fixed
              footerHeight={loadingMore ? 50 : 0}
              onEndReached={this.handleEndReached}
              onEndReachedThreshold={60}
              headerClassName="custom-appointment-row"
              headerRenderer={() =>
                columns.map((d: any) =>
                  staticHeader.indexOf(d) > -1 ? (
                    <React.Fragment key={d.id}>
                      <span
                        className={`custom-appointment-col  ${
                          d === "caregiver" ? "name-col" : ""
                        }`}
                      >
                        {d}
                        {d === "caregiver" ? (
                          <>
                            <span onClick={this.handleToggleMenuItem}>
                              <i className="icon-options-vertical" />
                            </span>
                          </>
                        ) : null}
                      </span>
                    </React.Fragment>
                  ) : (
                    <span key={d.date} className="custom-appointment-col  ">
                      {d.day}
                      <br />
                      {d.date}
                    </span>
                  )
                )
              }
              rowClassName="custom-appointment-row"
              rowRenderer={({ cells, rowData }: any) => (
                <div
                  className="d-flex frozen-row"
                  title={[rowData.lastName, rowData.firstName].join(" ")}
                >
                  {cells}
                </div>
              )}
            >
              {columns.map((d: any, index: number) => (
                <Column
                  key={`col0-${typeof d === "string" ? d : d.dateString}`}
                  width={index === 0 ? 140 : 28}
                  className={`custom-appointment-col   ${
                    d === "caregiver" ? "name-col" : ""
                  }`}
                  frozen={typeof d === "string"}
                  cellRenderer={({ rowData, rowIndex }: any) => {
                    let list = listCareGiver[rowIndex];
                    let item = list.new;
                    let row = list.row;
                    let uIndex: number = result.findIndex(
                      (item: any) => item.id === list.id
                    );
                    switch (d) {
                      case "caregiver":
                        return (
                          <div
                            className="custom-appointment-col name-col appointment-color1 text-capitalize view-more-link one-line-text"
                            style={{
                              backgroundColor: !list.isActive
                                ? deactivatedListColor
                                : list.caregiver && list.caregiver.attributes
                                ? list.caregiver.attributes.includes(
                                    CaregiverTIMyoCYAttrId
                                  )
                                  ? leasingListColor
                                  : list.caregiver.attributes.includes(
                                      "Plycoco"
                                    )
                                  ? selfEmployesListColor
                                  : ""
                                : "",
                            }}
                            title={[list.lastName, list.firstName].join(" ")}
                            id={`caregiver-${list.id}-${index}-${row}`}
                          >
                            <Link
                              to={AppRoutes.CARE_GIVER_VIEW.replace(
                                ":id",
                                list.id
                              )}
                              target="_blank"
                              className="text-body"
                            >
                              {row === 0
                                ? [list.lastName, list.firstName].join(" ")
                                : ""}
                            </Link>
                          </div>
                        );
                      case "H":
                        return <span>H</span>;
                      case "S":
                        return <span className="">S</span>;
                      case "U":
                        return (
                          <span
                            className="custom-appointment-col u-col text-center"
                            // onClick={() =>
                            //   onhandleCaregiverStar(
                            //     list.id,
                            //     starCaregiver &&
                            //       !starCaregiver.isSecondStar,
                            //   )
                            // }
                          >
                            {/* {starCaregiver &&
                      starCaregiver.isSecondStar &&
                      starCaregiver.id === list.id ? (
                        <i className='fa fa-star theme-text' />
                      ) : (
                        <i className='fa fa-star-o' />
                        )} */}
                            <i className="fa fa-star-o" />
                          </span>
                        );
                      case "V":
                        return (
                          <span
                            className="custom-appointment-col v-col text-center"
                            onClick={(
                              e: React.MouseEvent<HTMLDivElement, MouseEvent>
                            ) => onAddingRow(e, "caregiver", uIndex)}
                          >
                            <i className="fa fa-arrow-down" />
                          </span>
                        );
                      default:
                        const currentAvail = item.filter(
                          (avabilityData: any) => {
                            return (
                              moment(d.isoString).format("DD.MM.YYYY") ===
                              moment(avabilityData.date).format("DD.MM.YYYY")
                            );
                          }
                        )[0];

                        return (
                          <SelectableCell
                            item={currentAvail || {}}
                            isWeekend={d.isWeekend}
                            list={rowData}
                          />
                        );
                    }
                  }}
                />
              ))}
            </BaseTable>
          </SelectableGroup>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

export default React.memo(CaregiverList);

import React from "react";
import { getDaysArrayByMonth } from "../../../../../helpers";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import { createSelectable, SelectableGroup } from "react-selectable-fast";
import classname from "classnames";
import moment from "moment";
import { CareinstitutionRightClickOptions } from "./CareinstitutionRightClickOptions";
import {
  AppRoutes,
  CareInstInActiveAttrId,
  CareInstPlycocoAttrId,
  CareInstTIMyoCYAttrId,
  deactivatedListColor,
  leasingListColor,
  PAGE_LIMIT,
  selfEmployesListColor,
} from "../../../../../config";
import { Link } from "react-router-dom";
import Loader from "../../../containers/Loader/Loader";

const staticHeader = ["careinstitution", "H", "S", "U", "V"];

export const SelectableCell = React.memo(
  createSelectable(
    ({
      selectableRef,
      isSelected,
      isSelecting,
      item,
      daysArr,
      key,
      isWeekend,
      showSelectedCaregiver,
      selectedcareInstApptId,
      selectedcareGiverApptId,
      selectedcareInstIndexes,
    }: any) => {
      let isRequirment: boolean = false,
        isMatching: boolean = false,
        isContract: boolean = false,
        isConfirm: boolean = false,
        isOffered: boolean = false,
        isOfferedFutureDate: boolean = false,
        showAppointedCareGiver: boolean = false;

      let isFutureDate: boolean = false;
      if (item && item.date) {
        let dateStr = moment(item.date).add(1, "days").format("YYYY/MM/DD");
        isFutureDate = moment(dateStr, "YYYY/MM/DD").isAfter();
      }

      // Date condition to not display fsn if date is before today
      let isBeforedate = false;
      if (item && item.date) {
        isBeforedate = moment(item.date).isBefore(moment(), "day");
      }

      if (item) {
        if (item.status === "default") {
          isRequirment = true;
        } else if (item.status === "linked") {
          isMatching = true;
        } else if (item.status === "contract") {
          isContract = true;
        } else if (item.status === "confirmed") {
          isConfirm = true;
        } else if (item.status === "offered" && isFutureDate === false) {
          isOffered = true;
          // isOfferedFutureDate = false;
        } else if (item.status === "offered" && isFutureDate === true) {
          isOfferedFutureDate = true;
        }
      }

      return (
        <div
          key={key}
          className={classname({
            "calender-col": true,
            "text-center": true,
            // weekend: daysArr,
            "selecting-cell-bg": isSelecting || isSelected,
            weekend: isWeekend,
            "availability-bg":
              isOffered && !isSelected && !isOfferedFutureDate
                ? isOffered
                : false,
            "availability-dark-bg":
              isOfferedFutureDate && !isSelected ? isOfferedFutureDate : false,
            "custom-appointment-col": true,
            "cursor-pointer": true,
            "requirement-bg":
              isRequirment && !isSelected ? isRequirment : false,
          })}
          ref={selectableRef}
          // onClick={() => handleSelectedUser(list, day, 'caregiver')}
        >
          {item ? (
            isBeforedate ? null : (
              <>
                {item.f ? item.f : null}
                {item.s ? item.s : null}
                {item.n ? item.n : null}
              </>
            )
          ) : null}
        </div>
      );
    }
  )
);
class CareInstitutionList extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      days: getDaysArrayByMonth().daysArr,
      selectedCells: [],
      openToggleMenu: false,
      loading: false,
      loadingMore: false,
      listCareInst: []
      // loadedAll: this.props.result.length < 30,
    };
  }

  componentDidMount = () => {
let tempList: any = [];

    this.props.careinstitutionData.forEach((element: any, index: number) => {
      element.availabilityData.forEach((item: any, row: number) => {
        return tempList.push({ ...element, new: item, row });
      });
    });
    this.setState({
      listCareInst: tempList
    })
  };

  componentDidUpdate = ({ careinstitutionData }: any) => {
let tempList: any = [];
    if (careinstitutionData !== this.props.careinstitutionData) {
      console.log("this.props.careinstitutionData",this.props.careinstitutionData);
      
      this.props.careinstitutionData.forEach((element: any, index: number) => {
        element.availabilityData.forEach((item: any, row: number) => {
          return tempList.push({ ...element, new: item, row });
        });
      });
      this.setState({
        loadingMore: false,
        listCareInst: tempList
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
          const { item, list: careinstitutionData, cellIndex, day } = cellProps;
          const {
            id = "",
            firstName = "",
            lastName = "",
            email = "",
            caregiver = {},
            qualificationId = [],
          } = careinstitutionData ? careinstitutionData : {};
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

  // Adding Row into table
  onAddingRow = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    index: number
  ) => {
    e.preventDefault();
    const { caregiversList, setcaregiversList } = this.props;
  };

  render() {
    const {
      careinstitutionData: result,
      caregiverLoading,
      daysData,
      onAddingRow
    } = this.props;
    const { days, openToggleMenu, loadingMore, listCareInst } = this.state;
    const columns = [...staticHeader, ...daysData.daysArr];
console.log("listCareInst",listCareInst);

    return (
      <>
        <div
          className={classname({
            "right-manu-close": true,
            "d-none": !openToggleMenu,
          })}
          onClick={this.handleToggleMenuItem}
        ></div>
        <CareinstitutionRightClickOptions
          isOpen={openToggleMenu}
          hide={() => this.setState({ openToggleMenu: false })}
        />
        {listCareInst && listCareInst.length ? (
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
              data={listCareInst}
              width={600}
              height={400}
              fixed
              // render ={ ({ column: { listCareInst } })}
              footerHeight={loadingMore ? 50 : 0}
              // onEndReached={this.handleEndReached}
              onEndReachedThreshold={60}
              headerClassName="custom-appointment-row"
              headerRenderer={() =>
                columns.map((d: any) =>
                  staticHeader.indexOf(d) > -1 ? (
                    <React.Fragment key={d}>
                      <span
                        className={`custom-appointment-col  ${
                          d === "careinstitution" ? "name-col" : ""
                        }`}
                      >
                        {d}
                        {d === "careinstitution" ? (
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
                  key={`col${index}-${typeof d === "string" ? d : d.dateString}`}
                  width={index === 0 ? 140 : 28}
                  className={`custom-appointment-col   ${
                    d === "careinstitution" ? "name-col" : ""
                  }`}
                  frozen={typeof d === "string"}
                  cellRenderer={({ rowData, rowIndex }: any) => {
                    let list = rowData

                    let uIndex: number = result.findIndex(
                      (item: any) => item.id === list.id
                    );
                    switch (d) {
                      case "careinstitution":
                        return (
                          <div
                            className="custom-appointment-col name-col appointment-color1 text-capitalize view-more-link one-line-text"
                            style={{
                              backgroundColor:
                                list.canstitution &&
                                list.canstitution.attributes
                                  ? list.canstitution.attributes.includes(
                                      CareInstInActiveAttrId
                                    )
                                    ? deactivatedListColor
                                    : list.canstitution.attributes.includes(
                                        CareInstTIMyoCYAttrId
                                      )
                                    ? leasingListColor
                                    : list.canstitution.attributes.includes(
                                        CareInstPlycocoAttrId
                                      )
                                    ? selfEmployesListColor
                                    : ""
                                  : "",
                            }}
                            title={list.name}
                            id={`careinst-${list.id}`}
                          >
                            <Link
                              to={AppRoutes.CARE_INSTITUION_VIEW.replace(
                                ":id",
                                list.id
                              )}
                              target="_blank"
                              className="text-body"
                            >
                              {list.row === 0 ? list.name : null}
                            </Link>
                          </div>
                        );
                      case "H":
                        return <span>H</span>;
                      case "S":
                        return <span className="">S</span>;
                      case "U":
                        return (
                          <span className="custom-appointment-col u-col text-center">
                            <i className="fa fa-star-o" />
                          </span>
                        );
                      case "V":
                        return (
                          <span
                            className="custom-appointment-col v-col text-center"
                            onClick={(
                              e: React.MouseEvent<HTMLDivElement, MouseEvent>
                            ) => onAddingRow(e, "careinstitution", uIndex)}
                          >
                            <i className="fa fa-arrow-down" />
                          </span>
                        );
                      default:
                        const currentAvail =
                          list && list.new
                            ? list.new.filter((avabilityData: any) => {
                                return (
                                  moment(d.isoString).format("DD.MM.YYYY") ===
                                  moment(avabilityData.date).format(
                                    "DD.MM.YYYY"
                                  )
                                );
                              })[0]
                            : "";
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

export default React.memo(CareInstitutionList);
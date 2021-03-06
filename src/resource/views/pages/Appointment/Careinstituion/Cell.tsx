import { createSelectable } from 'react-selectable-fast';
import React from 'react';
import classnames from 'classnames';
import { dateDiffernceValidator } from '../../../../../helpers';
import moment from 'moment';
import { dbAcceptableFormat } from '../../../../../config';
const CellCareinstitution = ({
  selectableRef,
  isSelected,
  isSelecting,
  item,
  daysArr,
  key,
  cellIndex,
  showSelectedCaregiver,
  selectedcareInstApptId,
  selectedcareGiverApptId,
  selectedcareInstIndexes
}: any) => {
  let isRequirment: boolean = false,
    isMatching: boolean = false,
    isContract: boolean = false,
    isConfirm: boolean = false,
    isOffered: boolean = false,
    isOfferedFutureDate: boolean = false,
    showAppointedCareGiver: boolean = false;

  let caregiverId: string = '';
  if (item) {
    const { appointments = [] } = item;
    const { ca = {} } =
      appointments && appointments.length ? appointments[0] : {};
    caregiverId = ca ? ca.userId : '';
  }
  if (caregiverId) {
    if (caregiverId === showSelectedCaregiver.id) {
      showAppointedCareGiver = true;
    }
  }
  // let canstitutionCell: any =
  // selectedCells &&
  // selectedCells.length &&
  // selectedCells[0] &&
  // selectedCells[0].item &&
  // selectedCells[0].item.appointments &&
  // selectedCells[0].item.appointments[0]
  //   ? selectedCells[0].item.appointments[0].id
  //   : '';

let careinstitutionCell: any =
  item && item.appointments && item.appointments[0]
    ? item.appointments[0].id
    : '';

// let showAppointment: boolean = false;
// if (canstitutionCell && careinstitutionCell) {
//   if (canstitutionCell === careinstitutionCell) {
//     showAppointment = true;
//   }else{
//     showAppointment = false;
//   }
// }else{
//   showAppointment = false;
// }

let isFutureDate: boolean = false
if(item && item.date){
  let dateStr = moment(item.date).add(1, "days").format("YYYY/MM/DD")
  isFutureDate= moment(dateStr, "YYYY/MM/DD").isAfter();
}

 // Date condition to not display fsn if date is before today
 let isBeforedate = false;
 if (item && item.date) {
   isBeforedate = moment(item.date).isBefore(moment(), "day")
 }

  if (item) {
    if (item.status === 'default') {
      isRequirment = true;
    } else if (item.status === 'linked') {
      isMatching = true;
    } else if (item.status === 'contract') {
      isContract = true;
    } else if (item.status === 'confirmed') {
      isConfirm = true;
    } else if (item.status === 'offered' && isFutureDate === false) {
      isOffered = true;
      // isOfferedFutureDate = false;
    } else if(item.status === 'offered'&& isFutureDate === true  ){
      isOfferedFutureDate = true;
    }
  }

  return (
    <div
      key={key}
      className={classnames({
        'calender-col': true,
        'text-center': true,
        weekend: daysArr,
        'availability-bg': isOffered && !isSelected && !isOfferedFutureDate ? isOffered : false,
        'availability-dark-bg': isOfferedFutureDate && !isSelected ? isOfferedFutureDate : false,
        'custom-appointment-col': true,
        'cursor-pointer': true,
        'selecting-cell-bg':
        !isSelected
        ? 
        selectedcareGiverApptId.length && selectedcareInstApptId.length && JSON.stringify(selectedcareGiverApptId) === JSON.stringify(selectedcareInstApptId) && selectedcareGiverApptId.includes(careinstitutionCell) ||
        // (showAppointedCareGiver && canstitutionCell === caregiverCell) ||
        isSelecting || 
        selectedcareInstIndexes.includes(cellIndex)
        : true,
        // 'selecting-cell': isSelecting,
        'requirement-bg': isRequirment && !isSelected ? isRequirment : false,
        'matching-bg':
          isMatching &&
          !isSelected &&
          !showAppointedCareGiver &&
          caregiverId !== showSelectedCaregiver.id
            ? isMatching
            : false,
        'contract-bg':
          isConfirm &&
          !isSelected &&
          !showAppointedCareGiver &&
          caregiverId !== showSelectedCaregiver.id
            ? isConfirm
            : false
        // 'cell-available-careinstitution':
        //   isRequirment && !isSelected ? isRequirment : false
      })}
      ref={selectableRef}
      // onClick={() => handleSelectedUser(list, day, 'caregiver')}
    >
      {item ?  isBeforedate ? null : (
        <>
          {item.f ? item.f : null}
          {item.s ? item.s : null}
          {item.n ? item.n : null}
        </>
      ) : null}
    </div>
  );
};

export default createSelectable(CellCareinstitution);

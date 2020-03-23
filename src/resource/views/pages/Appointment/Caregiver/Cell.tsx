import React from 'react';
import { createSelectable } from 'react-selectable-fast';
import classnames from 'classnames';

const Cell = ({
  selectableRef,
  isSelected,
  isSelecting,
  item,
  key,
  daysArr
}: any) => {
  let isBlocked: boolean = false;
  if (item) {
    isBlocked = item.f === 'block' || item.s === 'block' || item.n === 'block';
  }

  let isRequirment: boolean = false,
    isMatching: boolean = false,
    isContract: boolean = false,
    isConfirm: boolean = false;
  if (item) {
    if (item.status === 'default') {
      isRequirment = true;
    } else if (item.status === 'linked') {
      isMatching = true;
    } else if (item.status === 'contract') {
      isContract = true;
    } else if (item.status === 'confirmed') {
      isConfirm = true;
    }
  }

  return (
    <>
      <td
        key={key}
        className={classnames({
          'calender-col': true,
          'text-center': true,
          'custom-appointment-col': true,
          'cursor-pointer': true,
          'selecting-cell-bg': isSelected || isSelecting,
          // 'selecting-cell': isSelecting,
          weekend: daysArr,
          'block-bg': item ? (isBlocked ? true : false) : false,
          'matching-bg': isMatching && !isSelected ? isMatching : false,
          'confirmation-bg': isConfirm && !isSelected ? isConfirm : false,
          'availability-dark-bg': !isSelected
            ? item
              ? item.f === 'available' ||
                item.s === 'available' ||
                item.n === 'available'
                ? true
                : false
              : false
            : false
        })}
        ref={selectableRef}
      >
        {item ? (
          item.status === 'confirmed' ? (
            <i className='fa fa-circle-o'></i>
          ) : isBlocked ? (
            <i className='fa fa-ban'></i>
          ) : (
            <>
              {item.f === 'available' ? 'f' : null}
              {item.s === 'available' ? 's' : null}
              {item.n === 'available' ? 'n' : null}
            </>
          )
        ) : null}
      </td>
    </>
  );
};

export default createSelectable(Cell);

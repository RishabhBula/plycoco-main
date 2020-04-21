import React, { FunctionComponent, useState } from 'react';
import { UncontrolledTooltip, Table } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import { IInvoiceList } from '../../../../../interfaces';
import Loader from '../../../containers/Loader/Loader';
import { AppRoutes, PAGE_LIMIT } from '../../../../../config';
import { useHistory, useLocation } from 'react-router-dom';
import PaginationComponent from '../../../components/Pagination';
import * as qs from 'query-string';

const LeasingList: FunctionComponent<IInvoiceList & any> = (
  props: IInvoiceList & any
) => {
  const { search, pathname } = useLocation();
  const {
    invoiceListLoading,
    invoiceList,
    totalCount,
    currentPage,
    selectedAppointment,
    handleCheckedChange,
  } = props;
  let history = useHistory();

  const onPageChanged = (currentPage: number) => {
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      '?'
    );
    history.push(path);
  };

  let count = (currentPage - 1) * PAGE_LIMIT + 1;
  console.log('invoiceList', invoiceList);
  let qualiFilter: any;
  qualiFilter = invoiceList.filter((item: any) => {
    return item &&
      item.ca &&
      item.ca.user &&
      item.ca.user.caregiver &&
      item.ca.user.caregiver.attributes
      ? item.ca.user.caregiver.attributes.includes(9)
      : null;
  });
  console.log('qualiFilter', qualiFilter);
  // let leasingInvoiceList: any[] = [];
  // let temp: any[] = [];
  // if (qualiFilter) {
  //   leasingInvoiceList.push(qualiFilter);
  // }
  // console.log(
  //   'leasingInvoiceList',
  //   leasingInvoiceList &&
  //     leasingInvoiceList[0] &&
  //     leasingInvoiceList[0].map((item: any) => {
  //       console.log('item', item);
  //     })
  // );

  return (
    <>
      <div className='table-minheight createinvoices-table'>
        <Table bordered hover responsive>
          <thead className='thead-bg'>
            <tr>
              <th className='sno-col'>{languageTranslation('S_NO')}</th>
              <th className='invoiceid-col'> {languageTranslation('ID')}</th>
              <th className='h-col'>h</th>
              <th className='text-col'> {languageTranslation('TEXT')}</th>
              <th className='datetime-col'>{languageTranslation('BEGIN')}</th>
              <th className='datetime-col'>{languageTranslation('THE_END')}</th>
              <th className='datetime-col'>
                {languageTranslation('BREAK')} {languageTranslation('BEGIN')}
              </th>
              <th className='datetime-col'>
                {languageTranslation('BREAK')} {languageTranslation('END')}
              </th>
              <th className='price-col'>
                {' '}
                {languageTranslation('QUALIFICATION_PER_HOUR')}
              </th>
              <th className='price-col'>
                {languageTranslation('MARGIN_PER_HOUR')}
              </th>
              <th className='price-col'>{languageTranslation('NIGHT_IN_H')}</th>
              <th className='price-col'>
                {languageTranslation('NIGNT_IN')}&euro;
              </th>
              <th className='price-col'>
                {languageTranslation('SUNDAY_IN_H')}
              </th>
              <th className='price-col'>
                {languageTranslation('SUNDAY_IN')}&euro;
              </th>
              <th className='price-col'>
                {languageTranslation('HOLIDAY_IN_H')}
              </th>
              <th className='price-col'>
                {' '}
                {languageTranslation('HOLIDAY_IN')}&euro;
              </th>
              <th className='price-col'>{languageTranslation('TIMYOC_SUM')}</th>
              <th className='price-col'>
                {languageTranslation('CAREGIVER_GROSS')}
              </th>
              {/* <th className='price-col'>{languageTranslation('TOTAL')}</th>
              <th className='price-col'>{languageTranslation('COMMISSION')}</th>
              <th className='price-col'>{languageTranslation('TOTAL')}</th>
              <th className={'text-center action-col'}>
                {languageTranslation('TABEL_HEAD_CG_ACTION')}
              </th> */}
            </tr>
          </thead>
          <tbody>
            {invoiceListLoading ? (
              <tr>
                <td className={'table-loader'} colSpan={8}>
                  <Loader />
                </td>
              </tr>
            ) : qualiFilter && qualiFilter.length ? (
              qualiFilter.map((list: any, index: number) => {
                console.log('list', list);
                let time = list.cr ? list.cr.f || list.cr.s || list.cr.n : '';
                let timeStamp: any = '';
                console.log('time', time);
                if (time === 'f' || time === 's' || time === 'n') {
                  timeStamp = '08';
                } else {
                  let splitData =
                    time === 'f'
                      ? 'f'
                      : time === 's'
                      ? 's'
                      : time === 'n'
                      ? 'n'
                      : '';
                  console.log('splitData', splitData);

                  // let split = time.split()
                  timeStamp = '';
                }
                return (
                  <tr className='sno-col' key={index}>
                    <td className='checkbox-th-column text-center'>
                      <span className=' checkbox-custom pl-4'>
                        <input
                          type='checkbox'
                          id='check'
                          className=''
                          name={'status'}
                          onChange={(e: any) => handleCheckedChange(e, list)}
                          // checked={"true"}
                        />
                        <label className=''>{count++}</label>
                      </span>
                    </td>
                    <td className='invoiceid-col'> {list.id}</td>
                    <td className='h-col'>{timeStamp} </td>
                    <td className='text-col'>
                      {list && list.cr && list.cr.division
                        ? list.cr.division.name
                        : '-'}
                    </td>
                    <td className='datetime-col'>
                      {list.ca && list.ca.workingHoursFrom
                        ? list.ca.workingHoursFrom
                        : '-'}{' '}
                    </td>
                    <td className='datetime-col'>
                      {list.ca && list.ca.workingHoursTo
                        ? list.ca.workingHoursTo
                        : '-'}
                    </td>
                    <td className='datetime-col'>
                      {list.ca && list.ca.breakTo ? list.ca.breakTo : '-'}
                    </td>
                    <td className='datetime-col'>
                      {list.ca && list.ca.breakFrom ? list.ca.breakFrom : '-'}
                    </td>
                    <td className='price-col'>
                      qualification
                      {/* {list.ca && list.ca.nightFee ? list.ca.nightFee : '-'}{' '} */}
                    </td>
                    <td className='price-col'>00.00 &euro;</td>
                    <td className='price-col'>
                      {list.ca && list.ca.nightFee ? list.ca.nightFee : '-'}{' '}
                    </td>
                    <td className='price-col'>00.00 &euro;</td>
                    <td className='price-col'>
                      {list.ca && list.ca.weekendAllowance
                        ? list.ca.weekendAllowance
                        : '-'}{' '}
                    </td>
                    <td className='price-col'>00.00 &euro;</td>
                    <td className='price-col'>
                      {' '}
                      {list.ca && list.ca.holidayAllowance
                        ? list.ca.holidayAllowance
                        : '-'}{' '}
                      &euro;
                    </td>
                    <td className='price-col'>
                      {/* {list.ca && list.ca.distanceInKM
                        ? list.ca.distanceInKM
                        : '-'}{' '} */}
                    </td>
                    <td className='price-col'>
                      {/* {list.ca && list.ca.feePerKM
                        ? `${list.ca.feePerKM} &euro`
                        : '-'}{' '} */}
                    </td>
                    <td className='price-col'>
                      {/* {list.ca && list.ca.otherExpenses
                        ? `${list.ca.otherExpenses} &euro`
                        : '-'}{' '} */}
                    </td>
                    {/* <td className='price-col'>384.00 &euro;</td>
                    <td className='price-col'>384.00 &euro;</td>
                    <td className='price-col'>34584.00 &euro;</td>
                    <td className='action-col'>
                      <div className='action-btn'>
                        <span
                          className='btn-icon mr-2'
                          id={`viewcaregiver`}
                          onClick={() =>
                            history.push(
                              AppRoutes.CARE_GIVER_VIEW.replace(
                                ':id',
                                list.ca.userId
                              )
                            )
                          }
                        >
                          <UncontrolledTooltip
                            placement='top'
                            target={`viewcaregiver`}
                          >
                            View Caregiver Profile
                          </UncontrolledTooltip>
                          <i className='fa fa-eye'></i>
                        </span>
                        <span
                          className='btn-icon mr-2'
                          id={`viewcareinstitution`}
                          onClick={() =>
                            history.push(
                              AppRoutes.CARE_INSTITUION_VIEW.replace(
                                ':id',
                                list.cr.userId
                              )
                            )
                          }
                        >
                          <UncontrolledTooltip
                            placement='top'
                            target={`viewcareinstitution`}
                          >
                            View Care Institution Profile
                          </UncontrolledTooltip>
                          <i className='fa fa-eye'></i>
                        </span>
                        <span
                          onClick={() =>
                            history.push({
                              pathname: AppRoutes.APPOINTMENT,
                              state: {
                                caregiver: list.ca.userId,
                                name: list.ca.name,
                                canstitution: list.cr.userId,
                                avabilityId: list.avabilityId,
                              },
                            })
                          }
                          className='btn-icon mr-2'
                          id={`appointmentdetails`}
                        >
                          <UncontrolledTooltip
                            placement='top'
                            target={`appointmentdetails`}
                          >
                            Show Appointment Details
                          </UncontrolledTooltip>
                          <i className='fa fa-calendar'></i>
                        </span>
                      </div>
                    </td>
                   */}
                  </tr>
                );
              })
            ) : (
              <tr className={'text-center no-hover-row'}>
                <td colSpan={12} className={'pt-5 pb-5'}>
                  <div className='no-data-section'>
                    <div className='no-data-icon'>
                      <i className='icon-ban' />
                    </div>
                    <h4 className='mb-1'>
                      {languageTranslation('NO_INVOICE_FOR_LIST')}{' '}
                    </h4>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {totalCount ? (
        <PaginationComponent
          totalRecords={totalCount}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
      ) : null}
    </>
  );
};

export default LeasingList;

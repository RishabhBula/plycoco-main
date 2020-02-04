import React, { FunctionComponent } from 'react';
import { Col } from 'reactstrap';
import { languageTranslation } from '../../../../helpers';
import { IEmailTemplateList } from '../../../../interfaces';
import Loader from '../../containers/Loader/Loader';
import nodata from '../../../assets/img/nodata.png';

export const EmailTemplateList: FunctionComponent<IEmailTemplateList> = ({
  onTemplateSelection,
  data,
  loading,
  activeTemplate
}: IEmailTemplateList) => {
  const id =
    data && data.getEmailtemplate && data.getEmailtemplate.id
      ? data.getEmailtemplate.id
      : '';
  return (
    <Col lg={'7'}>
      <h5 className='content-title'>{languageTranslation('MENU_ENTRY')}</h5>
      <div className='common-list-wrap border-0 email-template-list'>
        <div className='common-list-body'>
          <ul className='common-list list-unstyled mb-0'>
            {!loading ? (
              data &&
              data.getEmailtemplate &&
              data.getEmailtemplate.email_templates &&
              data.getEmailtemplate.email_templates.length ? (
                data.getEmailtemplate.email_templates.map(
                  (menu: any, index: number) => {
                    return (
                      <li
                        key={index}
                        className={`cursor-pointer text-capitalize ${
                          activeTemplate === menu.id ? 'active' : ''
                        }`}
                        onClick={() => onTemplateSelection(menu.id)}
                      >
                        {menu.menuEntry}
                      </li>
                    );
                  }
                )
              ) : (
                <div className='no-list-section d-flex align-items-center justify-content-center flex-column py-5 my-3'>
                  <img src={nodata} alt='' className='no-img' />
                  <span className='no-text'>No Menu Entry Added </span>
                </div>
              )
            ) : (
              <Loader />
            )}
          </ul>
        </div>
      </div>
    </Col>
  );
};
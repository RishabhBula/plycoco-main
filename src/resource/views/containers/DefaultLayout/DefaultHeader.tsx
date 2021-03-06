import React, { FunctionComponent } from 'react';
import { AppSidebarToggler } from '@coreui/react';
import {
  Nav,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { AppRoutes, client } from '../../../../config';
import { ProfileQueries } from '../../../../graphql/queries';
import logo from '../../../assets/img/plycoco-orange.png';
import { languageTranslation } from '../../../../helpers';

const [VIEW_PROFILE] = ProfileQueries;

const DefaultHeader: FunctionComponent = () => {
  const history = useHistory();
  const { data } = useQuery(VIEW_PROFILE, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <React.Fragment>
      <AppSidebarToggler className='d-lg-none' display='md' mobile />
      <div className='brand-logo'>
        <img src={logo} alt='' />
        {/* <span className="logo-text">Plycoco</span> */}
      </div>
      <AppSidebarToggler className='d-md-down-none' display='lg' />

      <Nav className='ml-auto profile-dropdown' navbar>
        <UncontrolledDropdown setActiveFromChild>
          <DropdownToggle
            id='dropdown-basic'
            color='link'
            className='profile-button'
            caret
          >
            <div className='user-name'>
              <i className='fa fa-user'></i>
            </div>
          </DropdownToggle>

          <DropdownMenu className='profile-dropdown'>
            <DropdownItem className='user-box'>
              <div
                className='user-text'
                onClick={() => history.push(AppRoutes.MY_PROFILE)}
              >
                <h6>
                  <b>
                    {data && data.viewAdminProfile
                      ? [
                          data.viewAdminProfile.firstName,
                          data.viewAdminProfile.lastName,
                        ].join(' ')
                      : ''}
                  </b>
                </h6>
                <p className='mb-0'>
                  {data && data.viewAdminProfile
                    ? data.viewAdminProfile.email
                    : ''}
                </p>
              </div>
            </DropdownItem>
            <DropdownItem onClick={() => history.push(AppRoutes.MY_PROFILE)}>
              <i className='fa fa-user' /> {languageTranslation("PROFILE")}
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                localStorage.removeItem('adminToken');
                history.push(AppRoutes.LOGIN);
              }}
            >
              <i className='fa fa-lock' /> {languageTranslation("LOGOUT")}
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </React.Fragment>
  );
};

export default DefaultHeader;

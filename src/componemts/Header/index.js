import React, { useState, useEffect } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbarNav,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import { useHistory } from 'react-router-dom';
export default function Header({handleLogout}) {
  const history = useHistory();
  const [socket, setSocket] = useState(null);
  
  // const handleLogout = () => {
  //   //Gửi yêu cầu đăng ký đến server WebSocket
  //   const requestData = {
  //     action: "onchat",
  //     data: {
  //       event: "LOGOUT",
  //     },
  //   };
  //   history.push("/login");
  // };
  // useEffect(() => {

  //   localStorage.removeItem('username');
  //   localStorage.removeItem('password');

  // }, []);
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);

  return (
    <>
      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            <img
              src='./img/logo.png'
              alt=''
              loading='lazy'
              height={40}
            />
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo02'
            aria-controls='navbarTogglerDemo02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavNoTogglerSecond}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page'>
                  APPCHAT
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink>{sessionStorage.getItem('username')}</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                  ChatGPT
                </MDBNavbarLink>
              </MDBNavbarItem>

            </MDBNavbarNav>
            <MDBInputGroup tag="form" className='d-flex w-auto'>
              {/* <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' /> */}
              {/* <MDBBtn outline>Đăng xuất</MDBBtn> */}
              <MDBBtn color='info' onClick={handleLogout}>
                Đăng_Xuất
              </MDBBtn>
            </MDBInputGroup>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
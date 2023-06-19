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
import ModalMember from "../ModalMember";
export default function Header({ handleLogout, owner, members }) {
  const history = useHistory();
  const [socket, setSocket] = useState(null);

  
  const [topRightModal, setTopRightModal] = useState(false);

  const toggleShow = () => setTopRightModal(!topRightModal);
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);

  return (
    <>
      <MDBNavbar style={{ borderRadius: '2rem 2rem 0 0' }} expand='lg' light bgColor='light'>
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
              <a className="ms-3" onClick={toggleShow}>
                <MDBIcon className='fa-lg' fas icon="circle-info" />
              </a>
              <ModalMember members = {members} owner = {owner} toggleShow ={toggleShow} setTopRightModal = {setTopRightModal} topRightModal = {topRightModal} ></ModalMember>
            </MDBInputGroup>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
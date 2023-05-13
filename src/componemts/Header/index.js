import React, { useState } from 'react';
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
import {useHistory} from 'react-router-dom';
export default function Header() {
  const history = useHistory();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

    newSocket.addEventListener("open", (event) => {
        console.log("Kết nối WebSocket đã được thiết lập", event);
        setSocket(newSocket);
    });

    return () => {
        // Đóng kết nối WebSocket khi component bị hủy
        newSocket.close();
    };
}, []);
  const handleLogout = () => {
    //Gửi yêu cầu đăng ký đến server WebSocket
    const requestData = {
        action: "onchat",
        data: {
            event: "LOGOUT",
        },
    };
    history.push("/login");
};
useEffect(() => {
  
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  
}, []);
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);

  return (
    <>
      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>App Chat</MDBNavbarBrand>
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
                <MDBNavbarLink active aria-current='page' href='#'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Link</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
                  Disabled
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
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
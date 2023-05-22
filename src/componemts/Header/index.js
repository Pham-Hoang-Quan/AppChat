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
          <MDBNavbarBrand href='#'>
          <img
              src='https://lh3.googleusercontent.com/74EILO4aC4i4b8fN-aEdgZQMe4xCrg0PWxIozicQZi6j7VxfALpWWa720TFr6DVy1FpOLJimsG-Pg_UwJxp5Rt0NnlxPAgHwacMuNV7g1C8Xj2VkrsWAsdQRFsd1BdoOXsFjJafEDGvWYRqXHX92CL2pnH9w6BCm3JRodDIFqEzCR9D0LD1O3dfBpPEfhulHMgQafnY0Y8KCX1aJraXJBndvXFpjYJfWFR1ya9YIpMV7e7JdbTybesxU4TYXlgC8zvfhetyZCkEpDxUY-pBTLFsxKmjpoOottqZJsJpHEkrm_fgbw183UhRd9W9lin_qU5kteZINHdOd-1a6hdeO9FUPyMv9f7qnJX_A3y_ZfrJ2HQR6RPGyd4J6DfChQG4jSTE1toX2mJa2ot5Y4ptUzJXXOcgXGdb9PJCbRlGzZyzaYmX7uno-IwuYQgvtXpCVcPr6imEgTJfg20TKfClW_Fa8pKAdu-gsbCbCQrXK-dRCaHru0W0xJWPXx_lXUMmw6mJXozF-6HwP_srr_Q1d-6fSbYtboNNwD9GDURilJ5pbKMCXlnQy-YQZ9JkfiTlZVnAEi5YncNuq-Jlzzdsximo8PmILtVWbBjQll6ZzI19ecI_pwMiiW0phbRNNT0U9grvAjUC81nZs663ugKWaXZJ7FoCVgoSy9k0usVxGd9zkY1KIRgRnI-VqdUTPR5_ogYOv9PDyLHjmlFXYkP15cnOX0yFu1whICjOOUlySThp5SJJ0UE3bytqSavFSpJ1_E9vaVijyqMW9LPKsdX9nggsr0_yEeIP4x_a92ycf-uOcBjn5FD8vLIgftLsweU4c7RbwGQ9PiSu5R8mGkp7XVjSJ9ptHVhlC9AOtqqOs9vpJkDSeHVblRKBZTeSCX1kPPB8erumRGfzc4JM3IgwWSdOEOZTX0e7mpaSe0GTB4IHCWKFQp8MY9MN8H81bxIT_M2_r04PHQC00bnjTIdUKBzww08eLDsRVSkfU0sN4XTHvTnaAhFrFrS61RjpX-ysrLxU4y6zoMyhJxxgDqDueCVVm=w500-h500-s-no?authuser=1'
              height='40'
              alt=''
              loading='lazy'
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
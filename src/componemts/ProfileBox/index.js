import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox, MDBCard, MDBCardBody, MDBBadge, MDBCardFooter } from 'mdb-react-ui-kit';


export default function ProfileBox({handleLogout}) {



    return (

        <><MDBCardBody style={{ paddingBottom: '5px' }}>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                    <img
                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle' />
                    <div className='ms-3'>
                        <p className='fw-bold mb-1'>{sessionStorage.getItem('username')}</p>
                        <p className='text-muted mb-0'>{sessionStorage.getItem('username')}@gmail.com</p>
                    </div>
                </div>
                <MDBBadge pill color='' light>
                    {/* Online */}
                    <MDBBtn onClick={handleLogout} className='me-1' tag='a' color='primary' outline floating>
                        <MDBIcon fas icon='arrow-right-from-bracket' />
                    </MDBBtn>
                </MDBBadge>
            </div>
        </MDBCardBody></>



    );
};


import React, { useState, useEffect } from "react";

import {
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBTypography,
} from "mdb-react-ui-kit";
import CreateRoom from "../CreateRoom";
import {useHistory, Link, useLocation} from 'react-router-dom';


export default function UserList() {

    const location = useLocation();
    const userList = location.state?.userList || [];

    return (
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">

            <MDBCard>
                <MDBCardBody>

                    <MDBTypography listUnStyled className="mb-0">
                        <li className="p-2 border-bottom">
                            <CreateRoom />
                        </li>
                        {userList.map((user, index) => (
                            <li key={index} className="p-2 border-bottom">
                                <a href="#!" className="d-flex justify-content-between">
                                    <div className="d-flex flex-row">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30SI-uBVs2LI0-oPqsNDVgvVL-ojsD8fiNQ&usqp=CAU"
                                            alt="avatar"
                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                            width="60" />
                                        <div className="pt-1">
                                            <p className="fw-bold mb-0">{user.name}</p>
                                            <p className="small text-muted">
                                                {/* Lorem ipsum dolor sit. */}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-1">
                                        <p className="small text-muted mb-1"key={index}>{user.actionTime}</p>
                                    </div>
                                </a>
                            </li>
                            
                        ))}
                        
                    </MDBTypography>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );
}
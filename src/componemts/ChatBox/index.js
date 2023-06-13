import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBTypography,
    MDBTextArea,
    MDBCardHeader,
} from "mdb-react-ui-kit";

export default function ChatBox(props) {

    // const [selectedUser, setSelectedUser] = useState(null);
    const { chatMess } = props;
    const [socket, setSocket] = useState(null);



    // Sắp xếp tin nhắn theo thời gian tăng dần
    if (!chatMess || !Array.isArray(chatMess)) {
        return null;
    }

    const sortedChatContent = chatMess.sort((a, b) => {
        const timeA = new Date(a.createAt).getTime();
        const timeB = new Date(b.createAt).getTime();
        return timeA - timeB;
    });
    // const sortedChatContent = [...chatMess].sort((a, b) => {
    //     const timeA = new Date(a.createAt).getTime();
    //     const timeB = new Date(b.createAt).getTime();
    //     return timeA - timeB;
    // });

    return (

        <><MDBTypography style={{ height: "560px", overflow: "scroll", scrollBehavior: "smooth" }} listUnStyled>
            {sortedChatContent.map((mess, index) => (
                <div key={index}>
                    {mess.name == sessionStorage.getItem('username') ? (
                        <li style={{ width: "600px", textAlign: "right", marginLeft: "365px", }} class="d-flex mb-4 ml-300">
                            <MDBCard className="w-100">
                                <MDBCardHeader className="d-flex justify-content-between p-3">
                                    <p class="fw-bold mb-0">{mess.name}</p>
                                    <p class="text-muted small mb-0">
                                        <MDBIcon far icon="clock" /> {mess.createAt}
                                    </p>
                                </MDBCardHeader>
                                <MDBCardBody className="btn-info ">
                                    <p className="mb-0">
                                        {mess.mes}
                                    </p>
                                </MDBCardBody>

                            </MDBCard>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                width="60" />
                        </li>
                    ) : (
                        <li className="d-flex mb-4">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                width="60" />
                            <MDBCard>
                                <MDBCardHeader className="d-flex justify-content-between p-3">
                                    <p className="fw-bold mb-0">{mess.name}</p>
                                    <p className="text-muted small mb-0">
                                        <MDBIcon far icon="clock" /> {mess.createAt}
                                    </p>
                                </MDBCardHeader>
                                <MDBCardBody style={{ width: "600px" }}>
                                    <p className="mb-0 w-100">
                                        {mess.mes}
                                    </p>
                                </MDBCardBody>
                            </MDBCard>
                        </li>
                    )}



                </div>
            ))}
        </MDBTypography></>
    );
}
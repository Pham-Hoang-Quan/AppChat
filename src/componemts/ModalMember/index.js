import React, { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBListGroup,
    MDBListGroupItem,
    MDBBadge,


} from 'mdb-react-ui-kit';

export default function ModalMember({ members, topRightModal, setTopRightModal, toggleShow, owner }) {
    //   const [topRightModal, setTopRightModal] = useState(false);

    //   const toggleShow = () => setTopRightModal(!topRightModal);

    return (
        <>
            {/* <MDBBtn onClick={toggleShow}>Top right</MDBBtn> */}

            <MDBModal
                animationDirection='right'
                show={topRightModal}
                tabIndex='-1'
                setShow={setTopRightModal}
            >
                <MDBModalDialog position='top-right' side>
                    <MDBModalContent>
                        <MDBModalHeader className='bg-info text-white'>
                            <MDBModalTitle>Thành viên trong nhóm</MDBModalTitle>
                            <MDBBtn
                                color='none'
                                className='btn-close btn-close-white'
                                onClick={toggleShow}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBListGroup style={{ minWidth: '22rem' }} light>
                                <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src='./img/people.png'
                                            alt=''
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{owner}</p>
                                            <p className='text-muted mb-0'>Nhóm trưởng</p>
                                        </div>
                                    </div>
                                    <MDBBadge pill light color='success'>
                                        Online
                                    </MDBBadge>
                                </MDBListGroupItem>
                                {members.map((user, index) => (
                                    
                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src='./img/people.png'
                                            alt=''
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{user.name}</p>
                                            <p className='text-muted mb-0'>Thành viên</p>
                                        </div>
                                    </div>
                                    <MDBBadge pill light color='warning'>
                                        Offline
                                    </MDBBadge>
                                </MDBListGroupItem>

                                ))}
                                

                            </MDBListGroup>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn outline color='info' onClick={toggleShow}>
                                Đóng
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
import React from 'react';
import {
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

export default function CreateRoom() {
  return (
    <MDBRow tag='form' className='gy-2 gx-3 align-items-center'>
      <MDBCol size='auto'>
        <MDBInput id='form13Example1' label='Username or RoomCode' />
      </MDBCol>
      <MDBCol size='auto'>
        <MDBCheckbox id='form13Example2' label='Room' />
      </MDBCol>
      <MDBCol size='auto'>
        <MDBBtn type='submit'><MDBIcon size='lg' fas icon="arrow-circle-right" /></MDBBtn>
      </MDBCol>
    </MDBRow>
  );
}
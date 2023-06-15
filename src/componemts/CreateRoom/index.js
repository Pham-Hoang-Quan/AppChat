import React, { useState, useEffect } from "react";
import {
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
export default function CreateRoom({handleCreateRoom, handleJoinRoom}) {
  const [roomName, setRoomName] = useState('');
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [userList, setUserList] = useState([ ...roomName]);
// const [chatMess, setChatMess] = useState([ ...userName]);
const [socket, setSocket] = useState(null);

function handleChange(event) {

  setRoomName(event.target.value); // Cập nhật giá trị từ thẻ input vào state

}
function keyClickEnter(e) {
  if (e.key === 'Enter') {
    handleClickCreate();
    handleClickJoin() ;
  }
}
function handleClickCreate() {
  if (roomName !== "") {
    handleCreateRoom(roomName); // Truyền giá trị message vào hàm handleSendMessage
    setRoomName('');
  }

}
function handleClickJoin() {
  if (roomName !== "") {
    handleJoinRoom(roomName); // Truyền giá trị message vào hàm handleSendMessage
    setRoomName('');
  }

}

  return (
    <MDBRow className='gy-2 gx-3 align-items-center'>
      <MDBCol size='auto'>
        <MDBInput id='form13Example1' label='Username or RoomCode'
        value={roomName} // Gán giá trị từ state vào giá trị của thẻ input
        onChange={handleChange} // Gắn sự kiện onChange để cập nhật state khi nhập liệu vào thẻ input
        onKeyPress={keyClickEnter}/>
      </MDBCol>
      <MDBCol size='auto'>
        {/* <MDBCheckbox id='form13Example2' label='Room' /> */}
        <MDBBtn onClick={handleClickCreate}><MDBIcon size='lg' fas icon="circle-plus" /></MDBBtn>
      </MDBCol>
      <MDBCol size='auto'>
        <MDBBtn onClick={handleClickJoin}><MDBIcon size='lg' fas icon="arrow-circle-right" /></MDBBtn>
      </MDBCol>
    </MDBRow>
  );
}
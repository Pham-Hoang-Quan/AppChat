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
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
export default function InputMess({ handleSendMessage }) {

  const [selectedUser, setSelectedUser] = useState(null);


  const [message, setMessage] = useState("");
  
  const [showPicker, setShowPicker] = useState(false);
 
  

  function handleChange(e) {

    setMessage(e.target.value); // Cập nhật giá trị từ thẻ input vào state

  }
  function keyClickEnter(e) {
    if (e.key === 'Enter') {
      handleClick();
    }
  }
  function handleClick() {
    if (message !== "") {
      handleSendMessage(message); // Truyền giá trị message vào hàm handleSendMessage
      setMessage('')
    }

  }
  return (

    <div className="text-muted d-flex justify-content-start align-items-center pe-3 mt-2">
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
        alt="avatar 3"
        style={{ width: "40px", height: "100%" }}
      />
      <input
        autoComplete="off"
        type="text"
        className="form-control form-control-lg"
        id="exampleFormControlInput2"
        placeholder="Type message"
        value={message} // Gán giá trị từ state vào giá trị của thẻ input
        onChange={handleChange} // Gắn sự kiện onChange để cập nhật state khi nhập liệu vào thẻ input
        onKeyPress={keyClickEnter}
        
      />
      <a className="ms-1 text-muted" href="#!">
        <MDBIcon fas icon="paperclip" />
      </a>
      <a className="ms-3 text-muted" href="#!">
        <MDBIcon fas icon="smile"  onClick={() => setShowPicker(!showPicker)} />
        {showPicker && <Picker
          data={data} 
          
          onEmojiSelect={(e)=>{setMessage(e.native);
            setShowPicker(!showPicker)
          }}
           />}
      </a>
      <a className="ms-3" onClick={handleClick}>
        <MDBIcon fas icon="paper-plane" />
      </a>
    </div>

  );
}
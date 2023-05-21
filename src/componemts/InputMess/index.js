import {
  MDBIcon
} from "mdb-react-ui-kit";
import React, { useState } from "react";

export default function InputMess({ socket, selectedUser, handleIsSent }) {
  const [message, setMessage] = useState();


  const handleOnchangeMessage = (e) => {
    const value = e.target.value;
    setMessage(value);
  }

  const handleSendMessage = () => {
    if (message.length > 0) {
      socket.send(JSON.stringify(sendChatRequest()));
      handleIsSent();
    }
    setMessage("");
  }

  const sendChatRequest = () => {
    let request;
    if (selectedUser.type === 0) {
      request = {
        action: "onchat",
        data: {
          event: "SEND_CHAT",
          data: {
            type: "people",
            to: selectedUser.name,
            mes: message
          }
        }
      }
      console.log("Sent chat people:" + selectedUser.name + " message: "+message)
    }
    else {
      request = {
        action: "onchat",
        data: {
          event: "SEND_CHAT",
          data: {
            type: "room",
            to: selectedUser.name,
            mes: message
          }
        }
      }
      console.log("Sent chat room:" + selectedUser.name + " message: "+message)
    }
    return request;
  }




  return (

    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
        alt="avatar 3"
        style={{ width: "40px", height: "100%" }}
      />
      <input
        type="text"
        className="form-control form-control-lg"
        id="exampleFormControlInput2"
        placeholder="Type message"
        value={message}
        onChange={handleOnchangeMessage}
      />
      <a className="ms-1 text-muted" href="#!">
        <MDBIcon fas icon="paperclip" />
      </a>
      <a className="ms-3 text-muted" href="#!">
        <MDBIcon fas icon="smile" />
      </a>
      <a className="ms-3" href="#!">
        <MDBIcon fas icon="paper-plane" onClick={handleSendMessage} />
      </a>
    </div>

  );
}
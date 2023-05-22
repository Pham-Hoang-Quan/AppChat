import React, { useState, useEffect } from "react";
import {
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
export default function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  
  
  
  const [selectedUserType, setSelectedUserType] = useState(null);
const [userList, setUserList] = useState([ ...roomName]);
// const [chatMess, setChatMess] = useState([ ...userName]);
const [socket, setSocket] = useState(null);
function handleCreateRoom () {
    
        const requestcreateRoom = {
          action: "onchat",
          data: {
              event: "CREATE_ROOM",
              data: {
                  name: roomName,
                  
              },
          },
      };
  
      socket.send(JSON.stringify(requestcreateRoom));
      console.log("Đã gửi yêu cầu ");
      setRoomName('');
      
      socket.onmessage = (event) => {
           const response = JSON.parse(event.data);
           

           if (response.status === 'success' && response.event === 'CREATE_ROOM') {
            
      
      const newRoom = response.data.roomName;
      setUserList([...userList, newRoom]);
     
            
          } else {
            console.log(response.mes)
        }
        
          if (response.status === 'success' && response.event === 'RE_LOGIN') {
              console.log("Đã relogin thành công")
              sessionStorage.setItem('relogin_code', response.data.RE_LOGIN_CODE);
          } else {
              console.log(response.mes)
          }
          
          
        }
      
    }
  useEffect(() => {
    // Khởi tạo kết nối với server qua websocket
    const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

    socket.addEventListener("open", () => {
        console.log("WebSocket connection established.");

        // Gửi message RE_LOGIN để đăng nhập lại với thông tin user và code
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "RE_LOGIN",
                data: {
                    user: sessionStorage.getItem('username'),
                    code: sessionStorage.getItem('relogin_code')
                }
            }
        }

        ));

        setSocket(socket);
    });

    socket.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.status === 'success' && response.event === 'RE_LOGIN') {
            console.log("Đã relogin thành công")
            sessionStorage.setItem('relogin_code', response.data.RE_LOGIN_CODE);
        } else {
            console.log(response.mes)
        }
    }

    // Đóng kết nối khi component unmount
    return () => {
        socket.close();
    };
    
}, []);

  return (
    <MDBRow tag='form' className='gy-2 gx-3 align-items-center'>
      <MDBCol size='auto'>
        <MDBInput id='form13Example1' label='Username or RoomCode'
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)} />
      </MDBCol>
      <MDBCol size='auto'>
        <MDBCheckbox id='form13Example2' label='Room' />
      </MDBCol>
      <MDBCol size='auto'>
        <MDBBtn type='submit' onClick={handleCreateRoom}><MDBIcon size='lg' fas icon="arrow-circle-right" /></MDBBtn>
      </MDBCol>
    </MDBRow>
  );
}
import {
    MDBContainer,
    MDBRow
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import ChatBox from "../componemts/ChatBox";
import Header from "../componemts/Header";
import UserList from "../componemts/UserList";

export default function Home() {
    const [socket, setSocket] = useState();
    const [selectedUser, setSelectedUser] = useState(null);
    const [userList, setUserList] = useState([]);

    console.log("render")
    function handleUserClick(user) {
        console.log(user)
        setSelectedUser(user);
    }
    useEffect(() => {
        const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        newSocket.addEventListener("open", (event) => {
            console.log("Kết nối WebSocket đã được thiết lập", event);
            handleRelogin(newSocket)
        });

        return () => {
            // Đóng kết nối WebSocket khi component bị hủy
            newSocket.close();
            console.log("Da dong socket")
        };
    }, []);


    const handleGetUserList = (socket) => {
        console.log("GUi list user")
        const request = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(request));
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.status === 'success' && response.event === 'GET_USER_LIST') {
                const users = response.data;
                console.log(users)
                setUserList(users);
            } else {
                console.log(response.data)
            }
        }
    }

    const handleRelogin = (socket) => {
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "RE_LOGIN",
                data: {
                    user: sessionStorage.getItem('username'),
                    code: sessionStorage.getItem('relogin_code')
                }
            }
        }));
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.status === 'success' && response.event === 'RE_LOGIN') {
                console.log("Đã relogin thành công")
                sessionStorage.setItem('relogin_code', response.data.RE_LOGIN_CODE);
                handleGetUserList(socket)
                setSocket(socket);

            } else {
                console.log(response.mes)
            }
        }
      

    }

    return (
        <><Header socket={socket} /><MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
            <MDBRow>
                {userList && <UserList userList={userList} handleUserClick={handleUserClick} /> }
                {selectedUser && <ChatBox selectedUser={selectedUser} socket={socket} />}
            </MDBRow>
        </MDBContainer></>
    );
}
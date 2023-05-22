import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol
} from "mdb-react-ui-kit";
import UserList from "../componemts/UserList";
import ChatBox from "../componemts/ChatBox";
import Header from "../componemts/Header";
import InputMess from "../componemts/InputMess";

export default function Home() {
    const [socket, setSocket] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [typeSend, setTypeSend] = useState(null);
    const [userList, setUserList] = useState([]);
    const [chatMess, setChatMess] = useState([]);



    function handleSendMessage(message) {
        const chatData = {
            action: 'onchat',
            data: {
                event: 'SEND_CHAT',
                data: {
                    type: typeSend, // Loại tin nhắn (data.chatData.type)
                    to: selectedUser, // get room chat mess (data.chatData.name)
                    mes: message, // Nội dung tin nhắn từ người dùng nhập vào
                }
            },
        };
        socket.send(JSON.stringify(chatData));
        console.log("Đã gửi tin nhắn lên cho server");
        if (selectedUserType == 1) {
            const requestRoomChatMessage = {
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MES",
                    data: {
                        name: selectedUser,
                        page: 1,
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMessage));
        } else {
            const requestRoomChatMessage = {
                action: "onchat",
                data: {
                    event: "GET_PEOPLE_CHAT_MES",
                    data: {
                        name: selectedUser,
                        page: 1,
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMessage));
        }
    }

    function handleUserClick(userName, type) {
        setSelectedUser(userName);
        setSelectedUserType(type);
        console.log(type)
        console.log(userName);
        if (type == 1) {
            setTypeSend("room");
            console.log("đã biết type = 1 và user là " + userName)
            const requestRoomChatMess = {
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MES",
                    data: {
                        name: userName,
                        page: 1
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMess));
            console.log("Đã gửi yêu cầu get room chat mes");
        } else {
            setTypeSend("people");
            console.log("đã biết type = 1 và user là " + userName)
            const requestRelogin = {
                action: "onchat",
                data: {
                    event: "RE_LOGIN",
                    data: {
                        user: sessionStorage.getItem('user'),
                        code: sessionStorage.getItem('relogin_code')
                    },
                },
            };
            socket.send(JSON.stringify(requestRelogin));
            const requestRoomChatMess = {
                action: "onchat",
                data: {
                    event: "GET_PEOPLE_CHAT_MES",
                    data: {
                        name: userName,
                        page: 1
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMess));
            console.log("Đã gửi yêu cầu get people chat mes");
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
            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'RE_LOGIN') {
                    sessionStorage.setItem('relogin_code', response.data.RE_LOGIN_CODE)
                }
                if (response.status === 'success' && response.event === 'GET_ROOM_CHAT_MES') {
                    const chatMess = response.data;
                    setChatMess(chatMess);
                    console.log(chatMess);
                }
                if (response.status === 'success' && response.event === 'GET_PEOPLE_CHAT_MES') {
                    const chatMess = response.data;
                    setChatMess(chatMess);
                    console.log(chatMess)
                }
                if (response.status === 'success' && response.event === 'SEND_CHAT') {
                    const receivedMessage = response.data;
                    setChatMess((prevChatMess) => [...prevChatMess, receivedMessage]);
                }
            }
            
            setSocket(socket);
        });
        // Đóng kết nối khi component unmount
        return () => {
            socket.close();
        };
    }, []);





    return (
        <><Header /><MDBContainer fluid className="py-2" style={{ backgroundColor: "#eee" }}>
            <MDBRow>
                <UserList userList={userList} handleUserClick={handleUserClick} />
                <MDBCol md="6" lg="7" xl="8">
                    <ChatBox chatMess={chatMess} />
                    <InputMess handleSendMessage={handleSendMessage} />
                </MDBCol>
            </MDBRow>
        </MDBContainer></>
    );
}
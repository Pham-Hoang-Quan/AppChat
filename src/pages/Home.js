import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useHistory } from 'react-router-dom';


import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCardBody
}




from "mdb-react-ui-kit";
import UserList from "../componemts/UserList";
import ChatBox from "../componemts/ChatBox";
import Header from "../componemts/Header";
import InputMess from "../componemts/InputMess";
import CreateRoom from "../componemts/CreateRoom";



export default function Home() {
    const [socket, setSocket] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [typeSend, setTypeSend] = useState(null);
    const [userList, setUserList] = useState([]);
    const [chatMess, setChatMess] = useState([]);
    const [error, setError] = useState([]);

    const history = createBrowserHistory();

   


    function handleSendMessage(message) {
        const encodedMessage = encodeURIComponent(message);
        const chatData = {
            action: 'onchat',
            data: {
                event: 'SEND_CHAT',
                data: {
                    type: typeSend, // Loại tin nhắn (data.chatData.type)
                    to: selectedUser, // get room chat mess (data.chatData.name)
                    mes: encodedMessage, // Nội dung tin nhắn từ người dùng nhập vào
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
            // const requestRelogin = {
            //     action: "onchat",
            //     data: {
            //         event: "RE_LOGIN",
            //         data: {
            //             user: sessionStorage.getItem('user'),
            //             code: sessionStorage.getItem('relogin_code')
            //         },
            //     },
            // };
            // socket.send(JSON.stringify(requestRelogin));
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
    function handleLogout() {
        const requestLogout = {
            action: "onchat",
            data: {
                event: "LOGOUT",
            },
        };
        socket.send(JSON.stringify(requestLogout));
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('relogin_code');
        
    }
    function handleCreateRoom(roomName) {
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
        setSelectedUser(roomName);
        console.log("Đã gửi yêu cầu ");
        const userList = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(userList));
        //   setRoomName('');
        // socket.onmessage = (event) => {
        //     const response = JSON.parse(event.data);
        //     if (response.status === 'success' && response.event === 'CREATE_ROOM') {
        //         const newRoom = response.data.roomName;
        //         setUserList([...userList, newRoom]);
        //     } else {
        //         console.log(response.mes)
        //     }

        //     if (response.status === 'success' && response.event === 'RE_LOGIN') {
        //         console.log("Đã relogin thành công")
        //         sessionStorage.setItem('relogin_code', response.data.RE_LOGIN_CODE);
        //     } else {
        //         console.log(response.mes)
        //     }


        // }

    }
    function handleJoinRoom(roomName) {
        const requestJoinRoom = {
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: {
                    name: roomName,
                },
            },
        };
        socket.send(JSON.stringify(requestJoinRoom));
        setSelectedUser(roomName);
        console.log("Đã gửi yêu cầu ");
        const userList = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(userList));
        

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
            ))
                ;
            socket.send(JSON.stringify({
                action: 'onchat',
                data: {
                    event: 'GET_USER_LIST',
                },
            }
            ))
                ;
            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'RE_LOGIN') {
                    sessionStorage.setItem('relogin_code', response.data.RE_LOGIN_CODE)
                }
                if (response.status === 'success' && response.event === 'GET_ROOM_CHAT_MES') {
                    const chatMess = response.data.chatData;
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
                if (response.status === 'success' && response.event === 'CREATE_ROOM') {
                    const receivedRoomName = response.data;
                }
                if (response.status === 'error' && response.event === 'CREATE_ROOM') {
                    alert(response.mes)
                }
                if (response.status === 'success' && response.event === 'JOIN_ROOM') {
                    const receivedJoinRoomName = response.data;
                }
                if (response.status === 'error' && response.event === 'JOIN_ROOM') {
                    alert(response.mes)
                }
                if (response.status === 'success' && response.event === 'GET_USER_LIST') {
                    const users = response.data;
                    setUserList(users);
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
        <><Header handleLogout = {handleLogout} /><MDBContainer fluid className="py-2" style={{ backgroundColor: "#eee" }}>

            <MDBRow>
                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                    <MDBCardBody>
                        <CreateRoom handleCreateRoom={handleCreateRoom} handleJoinRoom={handleJoinRoom} />
                    </MDBCardBody>

                    <UserList selectedUser = {selectedUser} userList={userList} handleUserClick={handleUserClick} />
                </MDBCol>
                <MDBCol md="6" lg="7" xl="8">
                    <ChatBox chatMess={chatMess} />
                    <InputMess handleSendMessage={handleSendMessage} />
                </MDBCol>
            </MDBRow>
        </MDBContainer></>
    );
}
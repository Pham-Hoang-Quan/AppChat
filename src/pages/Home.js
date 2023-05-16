import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBRow
} from "mdb-react-ui-kit";
import UserList from "../componemts/UserList";
import ChatBox from "../componemts/ChatBox";
import Header from "../componemts/Header";

export default function Home() {
    const [socket, setSocket] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [userList, setUserList] = useState([]);
    const [chatMess, setChatMess] = useState([]);

    function handleUserClick(userName, type) {
        setSelectedUser(userName);
        setSelectedUserType(type);
        console.log(type)
        console.log(userName);
        if (type == 1) {
            console.log("đã biết type = 1 và user là " + userName)
            // const requestRelogin = {
            //     action: "onchat",
            //     data: {
            //         event: "RE_LOGIN",
            //         data: {
            //             user: sessionStorage.getItem('username'),
            //             code: sessionStorage.getItem('relogin_code')
            //         },
            //     },
            // };
            // socket.send(JSON.stringify(requestRelogin));
            // Tải tin nhắn của người dùng được chọn từ API hoặc database
            // và cập nhật state `messages`.
            // console.log("Đã chọn được user")
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
            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'RE_LOGIN') {
                    console.log("Đã relogin thành công")
                    sessionStorage.setItem('relogin_code', response.data.RE_LOGIN_CODE);
                } else {
                    console.log(response.mes)
                }
                if (response.status === 'success' && response.event === 'GET_ROOM_CHAT_MES') {
                    const chatMess = response.data.chatData;
                    setChatMess(chatMess);
                    console.log(chatMess);
                } else {
                    console.log(response.mes)
                }
            }
        } else {
            console.log("đã biết type = 1 và user là " + userName)
            // const requestRelogin = {
            //     action: "onchat",
            //     data: {
            //         event: "RE_LOGIN",
            //         data: {
            //             user: sessionStorage.getItem('username'),
            //             code: sessionStorage.getItem('relogin_code')
            //         },
            //     },
            // };
            // socket.send(JSON.stringify(requestRelogin));
            // Tải tin nhắn của người dùng được chọn từ API hoặc database
            // và cập nhật state `messages`.
            // console.log("Đã chọn được user")
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

            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'error' && response.event === 'ACTION_NOT_EXIT') {
                    console.log(response.mes);
                } else {
                    console.log(response.mes)
                }
                if (response.status === 'success' && response.event === 'RE_LOGIN') {
                    console.log("Đã relogin thành công")
                    sessionStorage.setItem('relogin_code', response.data.RE_LOGIN_CODE);
                } else {
                    console.log(response.mes)
                }
                if (response.status === 'success' && response.event === 'GET_PEOPLE_CHAT_MES') {
                    const chatMess = response.data;
                    setChatMess(chatMess);
                    console.log(chatMess);
                } else {
                    console.log(response.mes)
                }

            }
        }
        // socket.onmessage = (event) => {
        //     const response = JSON.parse(event.data);
        //     if (response.status === 'success' && response.event === 'RE_LOGIN') {
        //         console.log("Đã relogin thành công")
        //     } else {
        //         console.log(response.mes)
        //     }
        //     if (response.status === 'success' && response.event === 'GET_ROOM_CHAT_MES') {
        //         const chatMess = response.data.chatData;
        //         setChatMess(chatMess);
        //         console.log(chatMess);
        //     } else {
        //         console.log(response.mes)
        //     }
        //     if (response.status === 'success' && response.event === 'GET_PEOPLE_CHAT_MES') {
        //         const chatMess = response.data.chatData;
        //         setChatMess(chatMess);
        //         console.log(chatMess);
        //     } else {
        //         console.log(response.mes)
        //     }
        // }
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
        <><Header /><MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
            <MDBRow>
                <UserList userList={userList} handleUserClick={handleUserClick} />
                <ChatBox selectedUser={selectedUser} chatMess={chatMess} />
            </MDBRow>
        </MDBContainer></>
    );
}
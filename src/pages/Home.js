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
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        newSocket.addEventListener("open", (event) => {
            console.log("Kết nối WebSocket đã được thiết lập", event);
            setSocket(newSocket);

        });
        
        return () => {
            // Đóng kết nối WebSocket khi component bị hủy
            newSocket.close();
        };
    }, []);


    // const handleGetUserList = () => {
    //     // Gửi yêu cầu lấy danh sách user tới WebSocket Server
    //     const loginData = {
    //         action: 'onchat',
    //         data: {
    //             event: 'LOGIN',
    //             data: {
    //                 user: sessionStorage.getItem('username'),
    //                 pass: sessionStorage.getItem('password'),
    //                 // user: user,
    //                 // pass: pass,
    //             },
    //         },
    //     };
    //     socket.send(JSON.stringify(loginData));
    //     console.log("Đã gửi thông tin login cho server")
    //     const userList = {
    //         action: 'onchat',
    //         data: {
    //             event: 'GET_USER_LIST',
    //         },
    //     };
    //     socket.send(JSON.stringify(userList));
    //     console.log("Đã gửi yêu cầu lấy danh sách cho server")
    //     socket.onmessage = (event) => {
    //         const response = JSON.parse(event.data);
    //         if (response.status === 'success' && response.event === 'GET_USER_LIST') {
    //             const users = response.data;
    //             setUserList(users);
    //         }
    //     }
    //     const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

    //     newSocket.addEventListener("open", (event) => {
    //         console.log("Kết nối WebSocket đã được thiết lập", event);
    //         setSocket(newSocket);
    //     });
    // }

    // const loginAndGetUserList = () => {
    //     const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

    //     newSocket.addEventListener("open", (event) => {
    //         console.log("Kết nối WebSocket đã được thiết lập", event);
    //         setSocket(newSocket);
    //     });
    //     const loginData = {
    //         action: 'onchat',
    //         data: {
    //             event: 'LOGIN',
    //             data: {
    //                 // user: sessionStorage.getItem('username'),
    //                 // code: sessionStorage.getItem('password'),
    //                 user: user,
    //                 pass: pass,
    //             },
    //         },
    //     };
    //     socket.send(JSON.stringify(loginData));
    //     console.log("Đã gửi thông tin login cho server")
    //     const handleGetUserList = () => {
    //         // Gửi yêu cầu lấy danh sách user tới WebSocket Server
    //         const userList = {
    //             action: 'onchat',
    //             data: {
    //                 event: 'GET_USER_LIST',
    //             },
    //         };
    //         socket.send(JSON.stringify(userList));
    //         console.log("Đã gửi yêu cầu lấy danh sách cho server")
    //         socket.onmessage = (event) => {
    //             const response = JSON.parse(event.data);
    //             if (response.status === 'success' && response.event === 'GET_USER_LIST') {
    //                 const users = response.data;
    //                 setUserList(users);
    //             }
    //         }
    //     }
    // }





    return (
        <><Header /><MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
            <MDBRow>
                <UserList userList={userList} />
                <ChatBox />
            </MDBRow>
        </MDBContainer></>
    );
}
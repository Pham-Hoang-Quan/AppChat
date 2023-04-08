import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBRow
} from "mdb-react-ui-kit";
import UserList from "../componemts/UserList";
import ChatBox from "../componemts/ChatBox";
import Header from "../componemts/Header";

import Login from "../componemts/Login";

export default function Home() {
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    useEffect(() => {
        // Kiểm tra xem có thông tin đăng nhập trong localStorage hay không
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        if (savedUsername && savedPassword) {
          setUsername(savedUsername);
          setPassword(savedPassword);
          handleLogin();
          console.log(username + password)
        }
      }, []);
      const handleLogin = () => {
        // Gửi thông tin đăng nhập tới WebSocket Server
        const loginData = {
          action: 'onchat',
          data: {
            event: 'LOGIN',
            data: {
              user: username,
              pass: password,
            },
          },
        };
        socket.send(JSON.stringify(loginData));
    }  
    return (
        <><Header /><MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
            <MDBRow>
                <UserList />
                <ChatBox />
            </MDBRow>
        </MDBContainer></>
    );
}
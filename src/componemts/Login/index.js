import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [socket, setSocket] = useState(null);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [connected, setConnected] = useState(false);
  const history = useHistory();


  // Khi component được tạo, thiết lập kết nối WebSocket
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

  const register = () => {
    window.location.href = '/register';
  }
  const handleLogin = () => {
    // Kiểm tra nếu chưa nhập tên đăng nhập hoặc mật khẩu thì hiển thị thông báo lỗi
    if (!username || !password) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    // Kiểm tra nếu chưa kết nối đến WebSocket Server thì thông báo lỗi
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      setError('Không thể kết nối đến WebSocket Server');
      return;
    }
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

    
  };
  useEffect(() => {
    // Kiểm tra xem có thông tin đăng nhập trong localStorage hay không
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      handleLogin();
    }
  }, []);

  // Sau khi đăng nhập thành công, set socket và lưu trữ thông tin đăng nhập
  useEffect(() => {
    if (isLoginSuccess) {
      // Lưu trữ thông tin đăng nhập vào localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    }
  
    if (socket) {
      socket.onmessage = (event) => {
        const responseData = JSON.parse(event.data);
        if (responseData && responseData.status === "success") {
          // Đăng nhập thành công
          setIsLoginSuccess(true);
          // Lưu trữ thông tin đăng nhập, ví dụ: lưu trữ token
          history.push('/'); // Chuyển đến trang chủ
          window.location.href = '/';
        }
      };
    }
  }, [socket, isLoginSuccess, username, password]);

  

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>
            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>
          </div>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>
          <MDBInput wrapperClass='mb-4' id='formControlLg' size="lg"
            label="Username"
            icon="user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <MDBInput wrapperClass='mb-4' id='formControlLg' type='password' size="lg"
            label="Password"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>
          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' onClick={handleLogin}
            >Đăng nhập</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </MDBCol>

      </MDBRow>


    </MDBContainer>
  );
};

export default Login;
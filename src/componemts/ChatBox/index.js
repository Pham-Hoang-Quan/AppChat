import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBIcon,
    MDBTypography
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import InputMess from "../InputMess";

export default function ChatBox(props) {

    const selectedUser = props.selectedUser
    const { socket } = props;
    const [chatMess, setChatMess] = useState([]);
    const [isSentMessage, setIsSentMessage ] = useState(false);

    useEffect(() => {
        if (selectedUser) {
            if (selectedUser.type === 0) {
                getPeopleChat();
            }
            else {
                getRoomChat();
            }
        }
    }, [selectedUser, isSentMessage]);

    const handleIsSent = () => {
        setIsSentMessage(!isSentMessage)
    }


    const getPeopleChat = () => {
        const requestPeopleChatMess = {
            action: "onchat",
            data: {
                event: "GET_PEOPLE_CHAT_MES",
                data: {
                    name: selectedUser.name,
                    page: 1
                },
            },
        };
        socket.send(JSON.stringify(requestPeopleChatMess));
        console.log("Đã gửi yêu cầu get people chat mes");

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.status === 'success' && response.event === 'GET_PEOPLE_CHAT_MES') {
                const chatMess = response.data;
                setChatMess(chatMess);
                console.log(chatMess);
            } else {
                console.log(response.mes)
            }
        }

    }

    const getRoomChat = () => {
        const requestRoomChatMess = {
            action: "onchat",
            data: {
                event: "GET_ROOM_CHAT_MES",
                data: {
                    name: selectedUser.name,
                    page: 1
                },
            },
        };
        socket.send(JSON.stringify(requestRoomChatMess));
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.status === 'success' && response.event === 'GET_ROOM_CHAT_MES') {
                const chatMess = response.data;
                setChatMess(chatMess.chatData);
                console.log(chatMess);
            } else {
                console.log(response.mes)
            }
        }
    }

    return (
        <MDBCol md="6" lg="7" xl="8">
            <MDBTypography style={{ height: "500px", overflow: "scroll" }} listUnStyled>
                {chatMess.map((mess, index) => (
                    <div key={index}>
                        {mess.name === sessionStorage.getItem('username') ? (
                            <li style={{ width: "600px", textAlign: "right", marginLeft: "365px", }} class="d-flex mb-4 ml-300">
                                <MDBCard className="w-100">
                                    <MDBCardHeader className="d-flex justify-content-between p-3">
                                        <p class="fw-bold mb-0">{mess.name}</p>
                                        <p class="text-muted small mb-0">
                                            <MDBIcon far icon="clock" /> {mess.createAt}
                                        </p>
                                    </MDBCardHeader>
                                    <MDBCardBody className="btn-info" >
                                        <p className="mb-0">
                                            {mess.mes}
                                        </p>
                                    </MDBCardBody>
                                </MDBCard>
                                <img
                                    src="https://lh3.googleusercontent.com/Z0uHpq2nN4pMmA3FL1MAwzao6V4lez0FHvLl5MXQIIxPRBAYQku7RqLpc4Tr7IRQpC87JhFW94mzZiXyeQG4tjG5gw0ayGrwN4lmpwlTJdl_wGjPyb3htQQyBQXV3i26qZCZ0_Gf-3VHgIPjE2LeemWeQXWqRr35-Gv4Z_ehRAExxHmpkDZmYzj-ioH6VIJ209wj4GGVqLc6ZpVFTCKKTL6FVHfekOxcQ3yOnMUBD7rewS4HZnwWMsV_pEVNYDNf5y6m_3VhCaqC_19-0iFmrAbnlTiGIMb5aGPwsEP0wbkRg5QTpnQoZep9q_3hKsYZSdwVk7ReQ2uNP3LnqqQOlvHzTx149kEjmXl1sc0Mo4hwDF06BmlMfLvMyXsiY7N9gjVlVbfX3V2TQ9THHCVXSRnb5HqtUdbgnJP7ThSRYxGe_WiLQEtNfUBQChpMOLtfnihoQUKaUo2eiTnXzFgPDC4OCx-0omYgNqRsNpZAdAtibp0iGZXq5ztvvhlOr5owhTMjbisd1PDfYIvKp1GESx0Kflwt3PIOMfjcWvQYN-IWiUtYtC-3bQc5VdSMjVCm2LdSW-OhG3hC1Ngu5gI_zNLI9NAd1azwU5DZx33kTeGfGyiZM8zxnP5_nBuh0hmesr5ichF7jhihDgSf7xGeUsOoEoQvauvNmMZGW4fvZjC5f095t5ljtg19CVC3u8fVQIO48Do5pJB2co1nMe2In7-gdFckvfE5zxT-Fmma1MJ7H65LCcIW2ZAH42t7QyZmcVGhuEwFwidgJFitFUR7QmB8GDvWp3nBsxMDKbMQvJUIQ8xb8mi7FJRAawJ5dG8aoYtchGgQuZvOJ_CGsTscfQGCTeuGH2mhKyzUNAHnbfaXOfbrNSNXjMnOlzQ5VgTZmBtzl-4f-zrF1URyke47A76u5RXcQsEdGTSCQi1mwjzCZTsEdunq_cOD1eS_L7FHLs8TTL9kn2SR7WO_4UBjoHlF0xolrH2bedl0nuniyNFv0JP_SoNfbIp13-jn0b4XIpr19XQpmEf3tGwEJGKt3M3D=w500-h500-s-no?authuser=1"
                                    alt="avatar"
                                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                    width="60"
                                />
                            </li>
                        ) : (
                            <li className="d-flex mb-4">
                                <img
                                    src="https://lh3.googleusercontent.com/Z0uHpq2nN4pMmA3FL1MAwzao6V4lez0FHvLl5MXQIIxPRBAYQku7RqLpc4Tr7IRQpC87JhFW94mzZiXyeQG4tjG5gw0ayGrwN4lmpwlTJdl_wGjPyb3htQQyBQXV3i26qZCZ0_Gf-3VHgIPjE2LeemWeQXWqRr35-Gv4Z_ehRAExxHmpkDZmYzj-ioH6VIJ209wj4GGVqLc6ZpVFTCKKTL6FVHfekOxcQ3yOnMUBD7rewS4HZnwWMsV_pEVNYDNf5y6m_3VhCaqC_19-0iFmrAbnlTiGIMb5aGPwsEP0wbkRg5QTpnQoZep9q_3hKsYZSdwVk7ReQ2uNP3LnqqQOlvHzTx149kEjmXl1sc0Mo4hwDF06BmlMfLvMyXsiY7N9gjVlVbfX3V2TQ9THHCVXSRnb5HqtUdbgnJP7ThSRYxGe_WiLQEtNfUBQChpMOLtfnihoQUKaUo2eiTnXzFgPDC4OCx-0omYgNqRsNpZAdAtibp0iGZXq5ztvvhlOr5owhTMjbisd1PDfYIvKp1GESx0Kflwt3PIOMfjcWvQYN-IWiUtYtC-3bQc5VdSMjVCm2LdSW-OhG3hC1Ngu5gI_zNLI9NAd1azwU5DZx33kTeGfGyiZM8zxnP5_nBuh0hmesr5ichF7jhihDgSf7xGeUsOoEoQvauvNmMZGW4fvZjC5f095t5ljtg19CVC3u8fVQIO48Do5pJB2co1nMe2In7-gdFckvfE5zxT-Fmma1MJ7H65LCcIW2ZAH42t7QyZmcVGhuEwFwidgJFitFUR7QmB8GDvWp3nBsxMDKbMQvJUIQ8xb8mi7FJRAawJ5dG8aoYtchGgQuZvOJ_CGsTscfQGCTeuGH2mhKyzUNAHnbfaXOfbrNSNXjMnOlzQ5VgTZmBtzl-4f-zrF1URyke47A76u5RXcQsEdGTSCQi1mwjzCZTsEdunq_cOD1eS_L7FHLs8TTL9kn2SR7WO_4UBjoHlF0xolrH2bedl0nuniyNFv0JP_SoNfbIp13-jn0b4XIpr19XQpmEf3tGwEJGKt3M3D=w500-h500-s-no?authuser=1"
                                    alt="avatar"
                                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                    width="60"
                                />
                                <MDBCard>
                                    <MDBCardHeader className="d-flex justify-content-between p-3">
                                        <p className="fw-bold mb-0">{mess.name}</p>
                                        <p className="text-muted small mb-0">
                                            <MDBIcon far icon="clock" /> {mess.createAt}
                                        </p>
                                    </MDBCardHeader>
                                    <MDBCardBody style={{ width: "600px" }}>
                                        <p className="mb-0 w-100">
                                            {mess.mes}
                                        </p>
                                    </MDBCardBody>
                                </MDBCard>
                            </li>
                        )}



                    </div>
                ))}
            </MDBTypography>
            <InputMess socket={socket} selectedUser={selectedUser} handleIsSent={handleIsSent} />
        </MDBCol>
    );
}
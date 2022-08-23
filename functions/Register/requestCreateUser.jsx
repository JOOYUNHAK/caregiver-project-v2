/* 회원가입 유저 생성 요청 보내기 */

import axios from "axios";

export default function requestCreateUser(protectorRegisterData) {
    axios({
        method: 'POST',
        url: 'http://172.30.1.30:8080/auth/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            firstRegister: protectorRegisterData.firstRegister,
            secondRegister: protectorRegisterData.secondRegister,
            lastRegister: protectorRegisterData.lastRegister
        }
    })
        .then((res) => {
            console.log(res.data)
        }) 
}
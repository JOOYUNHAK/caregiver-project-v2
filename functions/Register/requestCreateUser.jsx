/* 회원가입 유저 생성 요청 보내기 */

import axios from "axios";

export default function requestCreateUser(RegisterData) {
    axios({
        method: 'POST',
        url: 'http://172.30.1.39:8080/auth/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            firstRegister: RegisterData.firstRegister,
            secondRegister: RegisterData.secondRegister,
            lastRegister: RegisterData.lastRegister
        }
    })
        .then((res) => {
            console.log(res.data)
        }) 
}
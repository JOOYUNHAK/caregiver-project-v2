/* 보호자용 마지막 회원가입 페이지 */

import CompleteRegisterBtn from "../../../components/LastRegister/Protector/CompleteRegisterBtn";
import Help from "../../../components/LastRegister/Protector/Help";

export default function Protector( { navigation }) {
    return (
        <>
        <Help />
        <CompleteRegisterBtn navigation={navigation} />
        </>
    )
}
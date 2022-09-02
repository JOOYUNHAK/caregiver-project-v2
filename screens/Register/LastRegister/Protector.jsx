/* 보호자용 마지막 회원가입 페이지 */

import CompleteRegisterBtn from "../../../components/LastRegister/Protector/CompleteRegisterBtn";
import Help from "../../../components/LastRegister/Protector/Help";
import CommonInfo from "../../../components/ConfirmRegisterInfo/Info/CommonInfo";

export default function Protector( { navigation }) {
    return (
        <>
        <Help />
        <CommonInfo />
        <CompleteRegisterBtn navigation={navigation} />
        </>
    )
}
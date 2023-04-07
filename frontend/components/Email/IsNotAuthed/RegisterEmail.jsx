/* 내 프로필에서 이메일 미인증 사용자 이메일 등록하기 */

import EmailInput from "./EmailInput";
import RegisterEmailInfo from "./RegisterEmailInfo";

export default function RegisterEmail ({ navigation }) {
    return (
        <>
            <RegisterEmailInfo />
            <EmailInput navigation = {navigation}/>
        </>
    );
}
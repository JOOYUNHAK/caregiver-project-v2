/* 보호자 두번째 회원가입 페이지 */
import NextRegisterBtn from "../../../components/SecondRegister/Protector/NextRegisterBtn";
import PatientDiagnosis from "../../../components/SecondRegister/Protector/PatientDiagnosis";
import PatientPlaceAndNext from "../../../components/SecondRegister/Protector/PatientPlaceAndNext";
import PatientSex from "../../../components/SecondRegister/Protector/PatientSex";
import PatientState from "../../../components/SecondRegister/Protector/PatientState";
import PatientWeight from "../../../components/SecondRegister/Protector/PatientWeight";

export default function Protector({ navigation }) {

    return (
        <>
            <PatientWeight />
            <PatientSex />
            <PatientDiagnosis />
            <PatientPlaceAndNext />
            <PatientState />
            <NextRegisterBtn navigation={navigation}/>
        </>
    )
}
/* 회원가입 두번째 페이지(간병인용) */

import AcquisitionLicense from "../../../components/SecondRegister/AcquisitionLicense";
import NextHospital from "../../../components/SecondRegister/CareGiver/NextHospital";
import PayAndStartDate from "../../../components/SecondRegister/CareGiver/PayAndStartDate";
import PossibleArea from "../../../components/SecondRegister/PossibleArea";
import WeightAndCareer from "../../../components/SecondRegister/WeightAndCareer";
import NextRegisterBtn from "../../../components/SecondRegister/CareGiver/NextRegisterBtn";

export default function CareGiver( { navigation }) {
    return (
        <>
            <WeightAndCareer />
            <PayAndStartDate />
            <NextHospital />
            <PossibleArea />
            <AcquisitionLicense />
            <NextRegisterBtn navigation={navigation} />
        </>
    )
}
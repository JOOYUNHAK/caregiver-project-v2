/* 활동보조사 2번째 회원가입 */

import WeightAndCareer from "../../components/SecondRegister/WeightAndCareer";
import TimeAndStartDate from "../../components/SecondRegister/Assistant/TimeAndStartDate";
import Training from "../../components/SecondRegister/Assistant/Training";
import PossibleArea from "../../components/SecondRegister/PossibleArea";
import AcquisitionLicense from "../../components/SecondRegister/AcquisitionLicense";
import NextRegisterBtn from "../../components/SecondRegister/Assistant/NextRegisterBtn";
export default function Assistatnt( { navigation }) {
    return(
        <>
            <WeightAndCareer />
            <TimeAndStartDate />
            <Training />
            <PossibleArea />
            <AcquisitionLicense />
            <NextRegisterBtn navigation={navigation} />
        </>
    )
}
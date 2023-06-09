
import CareGiverStyle from "../../../components/LastRegister/CareGiver/CareGiverStyle";
import CompleteRegisterBtn from "../../../components/LastRegister/CareGiver/CompleteRegisterBtn";
import KeyWords from "../../../components/LastRegister/CareGiver/KeyWords";
import Strength from "../../../components/LastRegister/CareGiver/Strength";

export default function CareGiver({ navigation }) {
    return (
        <>
            <CareGiverStyle />
            <Strength />
            <KeyWords />
            <CompleteRegisterBtn navigation={navigation}/>
        </>
    )
}
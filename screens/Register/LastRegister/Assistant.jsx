import Info from "../../../components/ConfirmRegisterInfo/Info";
import CompleteRegisterBtn from "../../../components/LastRegister/Assistant/CompleteRegisterBtn";
import Strength from "../../../components/LastRegister/Assistant/Strength";
import WithPatient from "../../../components/LastRegister/Assistant/WithPatient"

export default function Assistant({ navigation }) {
    return (
        <>
            <Strength />
            <WithPatient />
            <Info />
            <CompleteRegisterBtn navigation={navigation}/>
        </>
    )
}
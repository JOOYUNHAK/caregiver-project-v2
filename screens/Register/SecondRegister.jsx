/* 회원가입 두번째 페이지 */

import { BackHandler, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux"
import StatusBarComponent from "../../components/StatusBarComponent";
import Assistatnt from "./SecondRegister/Assistant";
import CareGiver from "./SecondRegister/CareGiver";
import Protector from "./SecondRegister/Protector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { secondRegisterReset } from "../../redux/action/register/secondRegisterAction";

export default function SecondRegister({ navigation }) {
    
    const purpose = useSelector((state) => state.firstRegister.user.purpose); //가입목적
    const dispatch = useDispatch();
    const backAction = () => {
        dispatch(secondRegisterReset());
        navigation.goBack();
        return true;
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => 
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='handled'
                extraHeight={150}
                extraScrollHeight={90}
                enableOnAndroid={true}
                scrollEnabled={true}
                enableAutomaticScroll={true}
                showsVerticalScrollIndicator={false} >
                {purpose === '간병인' ? 
                    <CareGiver navigation={navigation}/> : 
                        (purpose === '활동보조사' ? <Assistatnt navigation={navigation}/> : <Protector navigation={navigation}/>)}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
})

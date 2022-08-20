/* 회원가입 마지막 페이지 */

import {  StyleSheet,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../components/StatusBarComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import CareGiver from "./LastRegister/CareGiver";
import Protector from "./LastRegister/Protector";
import Assistant from "./LastRegister/Assistant";
import { lastRegisterReset } from "../redux/action/register/lastRegisterAction";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useDispatch } from "react-redux";

export default function LastRegister({ navigation }) {
    const purpose = useSelector((state) => state.firstRegister.user.purpose);
    const dispatch = useDispatch();

    const backAction = () => {
        dispatch(lastRegisterReset());
        navigation.goBack();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

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
                        (purpose === '활동보조사' ? <Assistant navigation={navigation}/> : <Protector navigation={navigation}/>)}
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
        alignItems: 'flex-start',
    },
})
/* 회원가입 페이지 첫페이지*/
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    BackHandler,
    StyleSheet,
} from "react-native";
import StatusBarComponent from '../components/StatusBarComponent';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthId from "../components/FirstRegister/AuthId";
import InputNameBirth from "../components/FirstRegister/InputNameBirth";
import NextRegisterBtn from "../components/FirstRegister/NextRegisterBtn";
import { useDispatch } from "react-redux";
import { firstRegisterReset } from "../redux/action/register/firstRegisterAction";
import SelectSex from "../components/FirstRegister/SelectSex";
import SelectPurpose from "../components/FirstRegister/SelectPurpose";

export default function FirstRegister({ navigation }) {
    const dispatch = useDispatch();
    const backAction = () => {
        dispatch(firstRegisterReset());
        navigation.pop();
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
                extraScrollHeight={30}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                <AuthId />
                <InputNameBirth />
                <SelectSex />
                <SelectPurpose />
                <NextRegisterBtn navigation={navigation} />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
})

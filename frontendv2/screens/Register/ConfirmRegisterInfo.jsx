/* 마지막 안내문과 한마디 (간병인용) */
import { BackHandler, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from 'react';
import StatusBarComponent from "../../components/StatusBarComponent";
import InputNotice from '../../components/ConfirmRegisterInfo/InputNotice';
import { confirmRegisterInfoReset } from '../../../frontendv2/redux/action/register/lastRegisterAction';
import ConfirmRegisterBtn from '../../components/ConfirmRegisterInfo/ConfirmRegisterBtn';
import Info from "../../components/ConfirmRegisterInfo/Info";
import ExtraFee from "../../components/ConfirmRegisterInfo/ExtraFee";

export default function ConfirmRegisterInfo({ navigation }) {

    const dispatch = useDispatch();

    const backAction = () => {
        dispatch(confirmRegisterInfoReset());
        navigation.pop();
        return true;
    }

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
                <InputNotice />
                <ExtraFee />
                <Info />
                <ConfirmRegisterBtn navigation={navigation} />
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
        alignItems: 'flex-start'
    },
})
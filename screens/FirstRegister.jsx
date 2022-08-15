/* 회원가입 페이지 첫페이지*/
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    StyleSheet,
} from "react-native";
import StatusBarComponent from '../components/StatusBarComponent';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthId from "../components/FirstRegister/AuthId";
import InputNameBirth from "../components/FirstRegister/InputNameBirth";
import SelectSexPurpose from "../components/FirstRegister/SelectSexPurpose";
import NextRegisterBtn from "../components/FirstRegister/NextRegisterBtn";

export default function FirstRegister({ navigation }) {
    
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
                <SelectSexPurpose />
                <NextRegisterBtn navigation = {navigation} />

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
 
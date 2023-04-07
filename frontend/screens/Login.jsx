/* 로그인 페이지 */
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import {
    SafeAreaView,
    StyleSheet,
}
    from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import AuthId from '../components/Login/AuthId';
import SubBtn from '../components/Login/SubBtn';
import StatusBarComponent from '../components/StatusBarComponent';
import { reset } from '../redux/action/login/loginAction';

export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const backAction = () => {
        dispatch(reset());
        navigation.dispatch(
            CommonActions.goBack()
        );
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            <StatusBarComponent />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps = 'handled'
                enableOnAndroid = {true}
            >
                <AuthId navigation={navigation} />
                <SubBtn navigation={navigation} />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
    },
});

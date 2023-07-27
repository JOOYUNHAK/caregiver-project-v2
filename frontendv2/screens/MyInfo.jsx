/* 마이 페이지 */

import React, { useEffect } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import LoginBox from '../components/MyInfo/LoginBox';
import StatusBarComponent from '../components/StatusBarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUser } from '../redux/action/user/userAction';
import { useDispatch } from 'react-redux';

export default function MyInfo({ navigation }) {
    const dispatch = useDispatch();

    useEffect(() => {
        async function getMyName() {
            const name = await AsyncStorage.getItem('name');
            dispatch(saveUser(name));
        };
        getMyName()
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <LoginBox navigation={navigation} />
            <View style={{ flex: 7 }}>
            </View>
        </SafeAreaView>

    );
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
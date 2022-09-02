/* 로그인 페이지 */
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
}
from 'react-native';
import AuthId from '../components/Login/AuthId';
import SubBtn from '../components/Login/SubBtn';
import StatusBarComponent from '../components/StatusBarComponent';

export default function Login({ navigation }) {
    return (
        <SafeAreaView style={styles.container} >
            <StatusBarComponent />
            <AuthId navigation={navigation}/>
            <SubBtn navigation={navigation}/>
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

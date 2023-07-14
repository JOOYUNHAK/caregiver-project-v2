/* 마이 페이지 */

import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import LoginBox from '../components/MyInfo/LoginBox';
import StatusBarComponent from '../components/StatusBarComponent';

export default function MyInfo({ navigation }) {
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
/* 마이 페이지 */

import React from 'react';
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
}
    from 'react-native';
import LoginBox from '../components/MyInfo/LoginBox';
import StatusBarComponent from '../components/StatusBarComponent';
import { getLoginState, validateToken } from '../functions/Token';
import Loading from './Loading';

export default function MyInfo({ navigation }) {

    const [loading, setLoading] = useState(true);
    useLayoutEffect(() => {
        async function getState() {
            const isLogin = await getLoginState();
            if (isLogin) {
                await validateToken(navigation);
            }
            setLoading(false)
        }
        getState();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            {loading ?
                <Loading /> :
                <>
                    <LoginBox navigation={navigation} />
                    <View style={{ flex: 7 }}>
                    </View>
                </>
            }
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
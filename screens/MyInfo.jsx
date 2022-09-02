/* 마이 페이지 */

import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Platform,
    TouchableHighlight
}
    from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import Icon from '../components/Icon';
import LoginBox from '../components/MyInfo/LoginBox';
import StatusBarComponent from '../components/StatusBarComponent';

export default function MyInfo({ navigation }) {

    const { name, purpose } = useSelector(state => ({
        name: state.user.name,
        purpose: state.user.purpose
    }));

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <LoginBox navigation = {navigation}/>
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

    myLoginBox: {
        height: hp('20%'),
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'stretch',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 10,
                    height: 10,
                },
                shadowOpacity: 0.5,
                shadowRadius: 10,
            },
            android: {
                elevation: 15,
                shadowColor: 'silver'
            }
        })
    },

    myLoginState: {
        width: wp('100%'),
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        borderBottomWidth: 0.2,
        borderColor: '#cecece'
    },

    myLoginBoxText: {
        paddingLeft: 10,
        fontSize: Platform.OS === 'ios' ? 17 : 17,
        color: '#94c6ad',
        fontWeight: '600'
    },

    myPoint: {
        flex: 1,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
})
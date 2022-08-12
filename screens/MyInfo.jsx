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
import Icon from '../components/Icon';
import StatusBarComponent from '../components/StatusBarComponent';

export default function MyInfo( { navigation} ) {
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <View style={styles.myLoginBox}>
                <TouchableHighlight
                    underlayColor='none'
                    onPress={() => navigation.push('loginPage')}
                    style={{ flex: 1.5 }}>
                    <View style={styles.myLoginState}>
                        <Text style={styles.myLoginBoxText}>
                            로그인 및 회원가입하기
                        </Text>
                        <View style={{ position: 'absolute', right: 15 }}>
                            <Icon props={['material', 'navigate-next', 30, '#94c6ad']} />
                        </View>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                underlayColor = 'none'
                onPress = {() => console.log('mypoint')}
                style = {{flex:1}}>
                <View style={styles.myPoint}>
                    <Text style={styles.myLoginBoxText}>
                        포인트
                    </Text>
                    <View style={{ position: 'absolute', right: 15 }}>
                        <Icon props={['material', 'navigate-next', 30, '#94c6ad']} />
                    </View>
                </View>
                </TouchableHighlight>
            </View>


            <View style={{ flex: 8 }}>

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
        flex: 2,
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
        alignSelf: 'stretch',
        flex: 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        borderBottomWidth: 0.2,
        borderColor: '#cecece'
    },

    myLoginBoxText: {
        paddingLeft: 15,
        fontSize: Platform.OS === 'ios' ? 17 : 19,
        color: '#94c6ad',
    },

    myPoint: {
        flex: 1, 
        paddingLeft: 20, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center'
    },


})
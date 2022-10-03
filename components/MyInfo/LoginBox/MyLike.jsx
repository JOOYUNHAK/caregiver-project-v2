/* 로그인박스 찜 */
import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
}
    from 'react-native';
import Icon from '../../Icon';

export default function MyLike() {
    const navigation = useNavigation();
    return (
        <TouchableHighlight 
            underlayColor='none'
            onPress={() => navigation.dispatch(
                StackActions.push('heartListPage')
            )}
            style={{ width: '33%', }}>
            <View style={styles.likeBox}>
                <View>
                    <Icon props={['font-awesome', 'heart', 28, '#94c6ad']} />

                    <Text style={{ marginTop: 10, color: '#94c6ad', textAlign: 'center' }}>
                        찜
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    likeBox: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
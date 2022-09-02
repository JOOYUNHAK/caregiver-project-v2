/* 로그인박스 포인트 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
}
    from 'react-native';
import Icon from '../../Icon';

export default function MyPoint() {
    return (
        <TouchableHighlight style={{ width: '33%' }}>
            <View style={styles.pointBox}>
                <View>
                    <Icon props={['font-awesome-5', 'coins', 28, '#94c6ad']} />

                    <Text style={{ marginTop: 10, color: '#94c6ad' }}>
                        포인트
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    pointBox: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.2,
        borderRightColor: 'silver'
    }
})
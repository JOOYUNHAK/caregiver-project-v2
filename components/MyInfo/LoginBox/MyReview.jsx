/* 로그인박스 나의 리뷰 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
}
    from 'react-native';
import Icon from '../../Icon';

export default function MyReview() {
    return (
        <TouchableHighlight style={{ width: '33%' }}>
                    <View style={styles.reviewBox}>
                        <View>
                            <Icon props={['font-awesome', 'commenting', 28, '#94c6ad']} />

                            <Text style={{ marginTop: 10, color: '#94c6ad' }}>
                                나의 후기
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    reviewBox: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.2,
        borderRightColor: 'silver'
    }
})
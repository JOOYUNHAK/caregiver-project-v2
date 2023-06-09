/* 현재 포인트 텍스트 */

import { Text } from "react-native"
import { View } from "react-native"
import { StyleSheet } from "react-native"

export function CurrentPointText() {
    return (
        <View style={{ width: '50%' }}>
            <Text style={styles.currentPointText}>
                현재 포인트
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    currentPointText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#949494'
    }
})
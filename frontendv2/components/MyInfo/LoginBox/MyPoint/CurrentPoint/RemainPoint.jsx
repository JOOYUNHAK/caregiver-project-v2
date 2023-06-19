/* 현재 남아있는 포인트 */

import { Text } from "react-native"
import { View } from "react-native"
import { StyleSheet } from "react-native"

export function RemainPoint() {
    return (
        <View style={{ marginTop: 5 }}>
            <Text style={styles.remainPoint}>
                10,000원
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    remainPoint: {
        fontSize: 24,
        fontWeight: '600',
        color: '#545454'
    }
})
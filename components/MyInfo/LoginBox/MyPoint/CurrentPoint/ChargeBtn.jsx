/* 포인트 충전 버튼 */

import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

export function ChargeBtn() {

    const chargePoint = () => {

    }

    return (
        <View style={styles.pointChargeBtn}>
            <TouchableHighlight 
                onPress={() => chargePoint()}
            >
                <Text style={styles.pointChargeText}>
                    충전하기
                </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    pointChargeBtn: {

        width: '50%',
        alignItems: 'flex-end'
    },

    pointChargeText: {
        fontSize: 12,
        paddingHorizontal: 13,
        borderRadius: 10,
        paddingVertical: 3,
        backgroundColor: 'rgba(65, 92, 118, 0.95)',
        fontWeight: '500',
        color: 'whitesmoke'
    }
})
/* 페이 필터 모달 하단 부분 */

import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function PayFilterModalBottom({ setVisible }) {
    return (
        <TouchableHighlight
            style={styles.eachExample}
            underlayColor='none'
            onPress={() => setVisible(false)}
        >
            <Text style={styles.closeBtn}>
                닫기
            </Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    eachExample: {
        width: '100%',
        height: hp('6%'),
        borderTopColor: 'silver',
        borderTopWidth: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    closeBtn: {
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    }
})
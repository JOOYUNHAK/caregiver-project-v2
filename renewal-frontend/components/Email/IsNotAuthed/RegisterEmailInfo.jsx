/* 이메일 등록하는 부분 안내 멘트 */

import { StyleSheet } from "react-native";
import { Text } from "react-native";

export default function RegisterEmailInfo() {
    return (
        <Text style={styles.infoText}>
            등록하실 이메일을 입력해 주세요 {"\n"}
            추후에 휴대폰 번호 변경시 이용됩니다
        </Text>
    )
}

const styles = StyleSheet.create({
    infoText: {
        marginTop: 15,
        marginLeft: 22,
        color: 'black',
        fontWeight: '600',
        fontSize: Platform.OS === 'ios' ? 13 : 17,
    },
});
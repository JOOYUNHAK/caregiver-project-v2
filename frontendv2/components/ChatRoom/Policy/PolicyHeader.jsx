/* 채팅 방 내 정책 헤더 */

import { StyleSheet } from "react-native";
import { Text } from "react-native";

export default function PolicyHeader() {

    return (
        <Text style={styles.header}>
            보호자분께서 간병 신청을 하셨어요!
        </Text>
    )
}

const styles = StyleSheet.create({

    header: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500'
    },

})
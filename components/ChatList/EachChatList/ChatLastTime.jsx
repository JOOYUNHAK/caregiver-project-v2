/* 채팅 목록 마지막 시간 */

import { StyleSheet, Text, View } from "react-native";

export default function ChatLastTime() {

    return (
        <View style={styles.chatLastTime}>
            <Text style={styles.lastTimeText}>
                오후 5:24
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    chatLastTime: {
        width: '25%',
        paddingTop: 10
    },

    lastTimeText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#949494'
    }
})
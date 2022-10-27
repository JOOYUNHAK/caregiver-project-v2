/* 채팅 목록에 보일 마지막 메시지 */

import { StyleSheet, Text } from "react-native"

export default function LastMessage() {

    return (
        <Text
            numberOfLines = {1} 
            style={styles.lastMessage}>
            아니 이건 아니잖아요
        </Text>
    )
}

const styles = StyleSheet.create({
    lastMessage: {
        height: '50%',
        paddingTop: 2,
        color: '#545454',
    }
})
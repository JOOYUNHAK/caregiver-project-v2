/* 채팅 목록에 보일 마지막 메시지 */

import { StyleSheet, Text } from "react-native"

export default function LastMessage({ message, messageType }) {
    return (
        <Text
            numberOfLines = {1} 
            style={styles.lastMessage}>
            {   
                messageType == -1 ? '간병 신청이 거절되었어요' :
                    (messageType == 0 ? '보호자분이 간병 신청을 하셨어요!' : 
                        (messageType == 2 ? '간병 신청이 수락되었어요!' : message))
            }
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
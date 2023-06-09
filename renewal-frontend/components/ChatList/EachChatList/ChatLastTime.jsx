/* 채팅 목록 마지막 시간 */

import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";

export default function ChatLastTime({ userId, sendId, time, newMessage }) {
    const lastMessageTime = _transform(time)

    function _transform(time) {
        const formatDate = dayjs(time).format('YYYY년 M월 D일 A h:mm')
        const arr = formatDate.split(' ')
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const messageTime = arr[3] === 'AM' ? '오전' : '오후';
        //다른 년도이면
        if (!arr[0].includes(year))
            return arr[0] + ' ' + arr[1] + ' ' + arr[2]

        if (arr[1].substring(0, arr[1].length - 1) == month) {
            const messageDate = arr[2].substring(0, arr[2].length - 1)
            //하루전이면
            if (messageDate == date - 1)
                return '어제';
            //같은 날짜면
            if (messageDate == date)
                return messageTime + ' ' + arr[4]
            return arr[1] + ' ' + arr[2];
        }
    }

    return (
        <View style={styles.chatLastTime}>
            <View style={styles.lastTime}>
                <Text style={styles.lastTimeText}>
                    {lastMessageTime}
                </Text>
            </View>
            {
                newMessage && sendId !== userId ?
                    <View style={styles.newMessage}>
                        <Text style={styles.newMessageText}>
                            {newMessage}
                        </Text>
                    </View>
                    : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    chatLastTime: {
        paddingRight: 5,
        height: '100%',
        width: '20%',
        paddingVertical: 10
    },
    lastTime: {
        height: '50%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    lastTimeText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#949494',
    },

    newMessageText: {
        fontSize: 11,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 100,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#94c6ad'
    },

    newMessage: {
        height: '50%',
        alignItems: 'flex-end',
        marginTop: 3
    }
})
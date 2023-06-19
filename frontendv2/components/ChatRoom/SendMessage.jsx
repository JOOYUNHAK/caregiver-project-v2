/* 메시지 보내는 버튼 */

import dayjs from "dayjs";
import { useState } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { Text, TextInput, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../module/socket";
import { saveMessage } from "../../redux/action/chat/chatAction";

export default function SendMessage({ roomId, opponentId }) {
    const [message, setMessage] = useState();
    const dispatch = useDispatch();
    const { id } = useSelector(state => ({
        id: state.user.id
    }))

    const sendMessage = () => {
        const sendMessageDto = {
            roomId,
            sendId: id,
            content: message,
            type: 1,
            time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        }
        dispatch(
            saveMessage(sendMessageDto)
        )
        socket.emit(`new_message`, {
            sendMessageDto,
            opponentId
        })
    }

    return (
        <View style={styles().sendMessage}>

            <TextInput
                value={message}
                multiline
                onChangeText={(text) => setMessage(text)}
                placeholder="메시지를 입력하세요..."
                style={styles().textInputStyle}
            >
            </TextInput>

            <TouchableHighlight
                onPress={() => { setMessage(''), sendMessage() }}
                underlayColor='none'
                disabled={message ? false : true}
                style={styles().sendButton}>
                <Text style={styles(message).sendText}>
                    전송
                </Text>
            </TouchableHighlight>

        </View>
    )
}

const styles = (message) => StyleSheet.create({
    sendMessage: {
        flexDirection: 'row',
        position: 'absolute',
        width: wp('95%'),
        alignSelf: 'center',
        height: hp('5.5%'),
        borderWidth: 0.8,
        borderColor: 'silver',
        borderRadius: 20,
        bottom: 5,
    },
    textInputStyle: {
        fontSize: 15,
        paddingLeft: 15,
        width: '85%',
    },

    sendButton: {
        alignSelf: 'center',
        alignItems: 'center',
        paddingRight: 15,
        width: '15%',
    },

    sendText: {
        fontSize: 17,
        color: message ? 'green' : 'darkgray'
    }
})
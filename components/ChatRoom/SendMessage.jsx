/* 메시지 보내는 버튼 */

import { useState } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import { Text, TextInput, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function SendMessage() {
    const [message, setMessage] = useState('');
    return (
        <View style={styles().sendMessage}>

            <TextInput
                onChangeText={(text) => setMessage(text)}
                placeholder="메시지를 입력하세요..."
                style={styles().textInputStyle}
            >
            </TextInput>

            <TouchableHighlight 
                onPress={() => console.log('df')}
                disabled = {message ? false : true}
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
/* 각각의 채팅 목록 */

import { StyleSheet, TouchableHighlight, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import ChatInfo from "./EachChatList/ChatInfo";
import ChatLastTime from './EachChatList/ChatLastTime'
import ChatProfile from './EachChatList/ChatProfile';

export default function EachChatList() {

    return (
        <TouchableHighlight
            underlayColor='whitesmoke'
            onPress={() => console.log('hi')}
            onLongPress = {() => console.log('long')}
        >
            <View style={styles.eachRoom}>
                <ChatProfile />
                <ChatInfo />
                <ChatLastTime />
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    eachRoom: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('100%'),
        height: hp('10%'),
        paddingHorizontal: 5,
    }
})
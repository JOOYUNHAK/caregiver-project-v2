/* 채팅방 목록이 비었을 때 */

import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function NoChatList() {
    return (
        <View style={styles.page}>
            <Text style={styles.noListText}>
                채팅방 목록이 비어있어요.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        height: '100%',
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center'
    },

    noListText: {
        fontSize: 15,
        color: '#7a7a7a'
    }
})
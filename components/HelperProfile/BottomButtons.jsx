/* 상세 프로필 제일 하단 리뷰보기, 채팅 버튼 */

import { StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ChatButton from "./BottomButtons/ChatButton";
import ReviewButton from "./BottomButtons/ReviewButton";

export default function BottomButtons() {

    return (
        <View style={styles.bottomButtons}>
            <ReviewButton />
            <ChatButton />
        </View>
    )
}

const styles = StyleSheet.create({
    bottomButtons: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: wp('100%'),
        backgroundColor: 'white',
        borderTopColor: 'silver',
        borderTopWidth: 0.3,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
})
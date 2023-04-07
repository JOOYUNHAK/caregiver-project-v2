/* 채팅 목록 프로필 */

import { StyleSheet } from "react-native";
import { View } from "react-native";
import Icon from "../../Icon";

export default function ChatProfile() {

    return (
        <View style={styles.profileIcon}>
            <Icon props={['material', 'account-circle', 65, '#eaebe8']} />
        </View>
    )
}

const styles = StyleSheet.create({
    profileIcon: {
        paddingLeft: 3,
        width: '20%',
        alignItems: 'flex-start'
    }
})
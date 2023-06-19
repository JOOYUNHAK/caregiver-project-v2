/* 프로필 공개 여부 Modal Header */

import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

export default function ModalHeader({ profile_off }) {

    return (
        <View style={styles.modalHeader}>
            <View style={styles.headerText}>
            </View>
            <Text style={styles.headerTextStyle}>
                {profile_off ?
                    `프로필을 공개로 전환하시겠어요?` : `프로필을 비공개로 전환하시겠어요?`}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    modalHeader: {
        height: '25%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: 'silver',
        borderBottomWidth: 0.2,
        paddingTop: 15
    },

    headerText: {
        height: '0%',
        borderWidth: 1.5,
        borderColor: 'darkgray',
        width: '10%',
    },

    headerTextStyle: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: '600'
    },
})
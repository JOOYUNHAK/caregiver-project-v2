/* 보조사들 한마디나 공지사항 */

import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Icon from "../../Icon";

export default function Notice({ profile }) {
    const { notice } = profile;
    return (
        <View style={styles.profileHelperAppeal}>
            <Icon props={['material', 'campaign', 20, 'silver']} />
            <Text style={styles.profileHelperAppealText}>
               {notice}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    profileHelperAppeal: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 35,
        flex: 0.7,
        borderTopColor: '#dadada',
        borderTopWidth: 0.2
    },

    profileHelperAppealText: {
        fontSize: 13,
        paddingLeft: 3,
        color: 'darkgray',
    },
})
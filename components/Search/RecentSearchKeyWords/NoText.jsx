/* 검색어 저장 꺼져있거나 검색 내역 없을 경우 */

import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function NoText({ type }) {
    return (
        <View style={styles.noAutoStore}>
            <Text style={styles.noAutoStoreText}>
                {type === 'word' ? 
                    `검색 내역이 없습니다.` : 
                        `최근 검색어 저장기능이 꺼져 있습니다.`}  
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    noAutoStore: {
        width: widthPercentageToDP('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
    },

    noAutoStoreText: {
        color: 'silver',
        fontWeight: '400',
        fontSize: Platform.OS === 'ios' ? 11 : 14,
    },
})
/* 검색 결과 정보 컴포넌트 */

import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";

export default function SearchResultInfo() {
    const { resultProfile } = useSelector(state => ({
        resultProfile: state.search.resultProfile
    }));

    return (
        <View style={styles.resultInfo}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.infoText}>
                    총
                </Text>
                <Text style={styles.resultText}>
                    {resultProfile.length}
                </Text>
                <Text style={styles.infoText}>
                    명의 간병인을 찾았어요
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    resultInfo: {
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 30,
        borderTopColor: 'silver',
        borderTopWidth: 0.2,
        width: wp('100%'),
        marginBottom: 10
    },

    infoText: {
        fontSize: 13,
        color: 'dimgray',
    },

    resultText: {
        fontSize: 13,
        fontWeight: '500',
        marginLeft: 5,
        color: 'black'
    }
})
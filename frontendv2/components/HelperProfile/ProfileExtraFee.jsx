/* 보조사 프로필 추가 요금 붙는 부분 */

import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSelector } from "react-redux"

export default function ProfileExtraFee() {
    const { additionalChargeCase } = useSelector(state => ({
        additionalChargeCase: state.profile.userProfile.profile.additionalChargeCase
    }));

    return (
        <View style={styles.nextHospital}>
            <View style={{ height: hp('4%'), justifyContent: 'flex-end' }}>
                <Text style={{ fontWeight: '500', fontSize: 16 }}>
                    추가 요금이 발생하는 상황
                </Text>
            </View>
                <Text style = {styles.nextHospitalText}>
                    {additionalChargeCase}
                </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    nextHospital: {
        justifyContent: 'center',
        borderTopColor: '#e3e3e3',
        backgroundColor: "white",
        width: wp('100%'),
        height: 'auto',
        paddingLeft: 18,
        marginTop: 8,
        borderTopWidth: 0.2,
        paddingVertical: 15
    },

    nextHospitalText: {
        marginTop: 15,
        fontSize: 15,
        color: '#4d4d4d',
    }
})
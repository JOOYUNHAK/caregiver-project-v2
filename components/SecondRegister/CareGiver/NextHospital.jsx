/* 간병인용 다음 병원 질문 입력 */
import { useState } from "react"
import { StyleSheet, Text, TextInput,  View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveNextHospital } from "../../../redux/action/register/secondRegisterAction";
import inputStyle from "./styles/inputStyle";

export default function NextHospital() {
    const dispatch = useDispatch();
    return (
        <View style={styles.nextHospital}>
            <Text style={{ fontWeight: '500' }}>
                환자에게 다음 병원이 예정된 경우
            </Text>
            <TextInput
                onChangeText={(text) => dispatch(saveNextHospital(text))}
                style={inputStyle('nextHospital')}
                placeholder='Ex) 활동 지역이면 가능합니다, 다음 병원은 불가능합니다'
                maxLength={25}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    nextHospital: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: hp('12%'),
        paddingTop: 5
    },
})

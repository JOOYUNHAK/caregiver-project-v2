/* 간병인용 몸무게, 경력 입력 */

import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import inputStyle from "./styles/inputStyle";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveCareer, saveWeight } from "../../../redux/action/register/secondRegisterAction";

export default function WeightAndCareer() {
    const dispatch = useDispatch();
    return (
        <View style={styles.weightAndCareer}>
            <View style={styles.weight}>
                <Text style={{ fontWeight: '500' }}>
                    몸무게는
                </Text>
                <TextInput
                    onChangeText={(text) => dispatch(saveWeight(text))}
                    style={inputStyle('weight')}
                    keyboardType='decimal-pad'
                />
                <Text>
                    (Kg)
                </Text>
            </View>

            <View style={styles.career}>
                <Text style={{ fontWeight: '500' }}>
                    경력은
                </Text>
                <TextInput
                    onChangeText={(text) => dispatch(saveCareer(text))}
                    style={inputStyle('career')}
                    keyboardType='decimal-pad'
                />
                <Text>
                    (개월)
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weightAndCareer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 10,
        height: hp('8%'),
    },

    weight: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    career: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10
    },
})

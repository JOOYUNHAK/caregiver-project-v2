/* 활동보조사 회원가입 완료 버튼 */
import { StyleSheet, Text, TouchableHighlight, View, Platform } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import requestCreateUser from "../../../functions/Register/requestCreateUser";


export default function CompleteRegisterBtn({ navigation }) {

    const [isFill, setIsFill] = useState(false);
    const { firstRegister, secondRegister, lastRegister } = useSelector(
        state => ({
            firstRegister: state.firstRegister.user,
            secondRegister: state.secondRegister,
            lastRegister: state.lastRegister
        }),
        shallowEqual
    );
    const withPatient = lastRegister.assistant['withPatient'];
    useEffect(() => {
        withPatient ? setIsFill(true) : setIsFill(false)
    }, [withPatient])

    return (
        <View style={completeBtnStyle(isFill)}>
            
            <TouchableHighlight
                disabled={isFill ? false : true}
                underlayColor='none'
                onPress={async () => await requestCreateUser(
                    {
                        firstRegister,
                        secondRegister,
                        lastRegister
                    },
                    navigation
                )} > 
                <Text style={completeBtnTextStyle(isFill)}>
                    가입할게요
                </Text>

            </TouchableHighlight>
        </View>
    );
}

const completeBtnStyle = (isFill) => StyleSheet.create({
    alignSelf: 'center',
    borderRadius: 5,
    width: wp('90%'),
    backgroundColor: isFill ? '#78e7b9' : '#c0f3dc'
});

const completeBtnTextStyle = (isFill) => StyleSheet.create({
    paddingHorizontal: wp('15%'), 
    paddingVertical: 15, 
    textAlign: 'center',
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 13 : 16
});
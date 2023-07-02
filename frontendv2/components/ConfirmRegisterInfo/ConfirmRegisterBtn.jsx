/* 회원가입 안내사항 확인 버튼 */

import { useEffect, useState } from "react";
import { useSelector, shallowEqual} from "react-redux";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import requestCreateUser from "../../functions/Register/requestCreateUser";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"


export default function ConfirmRegisterBtn({ navigation }) {
    const [isFill, setIsFill] = useState(false);
    const { firstRegister, caregiverInfo, caregiverThirdRegister, caregiverLastRegister } = useSelector(
        state => ({
            firstRegister: state.firstRegister.user, 
            caregiverInfo: state.caregiverInfo,
            caregiverThirdRegister: state.caregiverThirdRegister,
            caregiverLastRegister: state.caregiverLastRegister
        }),
        shallowEqual
    );
    const { notice, additionalChargeCase }  = caregiverLastRegister;

     useEffect(() => {
        notice && additionalChargeCase ? setIsFill(true) : setIsFill(false)
    }, [notice, additionalChargeCase] )

    return (
        <View style={{ width: wp('100%') }}>
            <TouchableHighlight
                disabled={isFill ? false : true}
                underlayColor='none'
                onPress={async () => { await requestCreateUser(
                    {
                        firstRegister,
                        secondRegister: caregiverInfo,
                        thirdRegister: caregiverThirdRegister,
                        lastRegister: caregiverLastRegister
                    },
                    navigation
                )}}>
                <Text style={styles(isFill).btnText}>
                    확인했어요
                </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = (isFill) => StyleSheet.create({
    btnText: {
        textAlign: 'center',
        marginHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 5,
        color: 'white',
        backgroundColor: isFill ? 'rgba(65, 92, 118, 0.85)' : 'rgba(65, 92, 118, 0.25)',
        fontSize: 15
    }
})
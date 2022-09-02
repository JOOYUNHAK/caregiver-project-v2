/* 회원가입 안내사항 확인 버튼 */

import { useEffect, useState } from "react";
import { useSelector, shallowEqual} from "react-redux";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import requestCreateUser from "../../functions/Register/requestCreateUser";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"


export default function ConfirmRegisterBtn() {
    const [isFill, setIsFill] = useState(false);
    const { firstRegister, secondRegister, lastRegister} = useSelector(
        state => ({
            firstRegister: state.firstRegister.user, 
            secondRegister: state.secondRegister,
            lastRegister: state.lastRegister,
        }),
        shallowEqual
    );
    const notice = lastRegister.careGiver['notice'];

     useEffect(() => {
        notice ? setIsFill(true) : setIsFill(false)
    }, [notice] )

    return (
        <View style={{ width: wp('100%') }}>
            <TouchableHighlight
                disabled={isFill ? false : true}
                underlayColor='none'
                onPress={() => requestCreateUser(
                    {
                        firstRegister,
                        secondRegister,
                        lastRegister
                    }
                )}>
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
        backgroundColor: isFill ? '#78e7b9' : '#c0f3dc',
        fontSize: 15
    }
})
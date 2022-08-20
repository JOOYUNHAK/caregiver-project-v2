/* 간병인 회원가입 완료 버튼 */

import { Text, TouchableHighlight, View } from "react-native";
import { completeBtnStyle, completeBtnTextStyle } from "../../../styles/Register/LastRegister/CompleteBtn";
import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";

export default function CompleteRegisterBtn({ navigation }) {

    const [isFill, setIsFill] = useState(false);
    const { suction, toilet, bedsore, washing, keyWord1, keyWord2, keyWord3 } = useSelector(
        state => ({
            suction: state.lastRegister.suction,
            toilet: state.lastRegister.toilet,
            bedsore: state.lastRegister.bedsore,
            washing: state.lastRegister.washing,
            keyWord1: state.lastRegister.careGiver.keyWord1,
            keyWord2: state.lastRegister.careGiver.keyWord2,
            keyWord3: state.lastRegister.careGiver.keyWord3,
        }),
        shallowEqual
    );

    useEffect(() => {
        suction && toilet && bedsore && washing
            && keyWord1 && keyWord2 && keyWord3 ? setIsFill(true) : setIsFill(false)
    }, [suction, toilet, bedsore, washing, keyWord1, keyWord2, keyWord3])

    return (
        <View style={completeBtnStyle(isFill)}>
            <TouchableHighlight
                disabled={isFill ? false : true}
                underlayColor='none'
                onPress={() => console.log()}
            >
                <Text style={completeBtnTextStyle(isFill)}>
                    가입할게요
                </Text>
            </TouchableHighlight>
        </View>
    )
}
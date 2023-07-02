/* 간병인 회원가입 완료 버튼 */

import { Text, TouchableHighlight, View } from "react-native";
import { completeBtnStyle, completeBtnTextStyle } from "../../../styles/Register/LastRegister/CompleteBtn";
import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";

export default function CompleteRegisterBtn({ navigation }) {

    const [isFill, setIsFill] = useState(false);
    const { suction, toilet, bedsore, washing, keyWord1, keyWord2, keyWord3 } = useSelector(
        state => ({
            suction: state.caregiverThirdRegister.experience.suction,
            toilet: state.caregiverThirdRegister.experience.toilet,
            bedsore: state.caregiverThirdRegister.experience.bedsore,
            washing: state.caregiverThirdRegister.experience.washing,
            keyWord1: state.caregiverThirdRegister.tags.keyWord1,
            keyWord2: state.caregiverThirdRegister.tags.keyWord2,
            keyWord3: state.caregiverThirdRegister.tags.keyWord3,
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
                onPress={() => navigation.push('confirmRegisterInfoPage')}
            >
                <Text style={completeBtnTextStyle(isFill)}>
                    가입할게요
                </Text>
            </TouchableHighlight>
        </View>
    )
}
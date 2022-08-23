/* 활동보조사 회원가입 완료 버튼 */
import { Text, TouchableHighlight, View } from "react-native";
import { completeBtnStyle, completeBtnTextStyle } from "../../../styles/Register/LastRegister/CompleteBtn";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function CompleteRegisterBtn({ navigation }) {

    const [isFill, setIsFill] = useState(false);
    const withPatient = useSelector((state) => state.lastRegister.assistant.withPatient);

    useEffect(() => {
        withPatient ? setIsFill(true) : setIsFill(false)
    }, [withPatient])

    return (
        <View style={completeBtnStyle(isFill)}>
            
            <TouchableHighlight
                disabled={isFill ? false : true}
                underlayColor='none'
                onPress={() => console.log()} >
                <Text style={completeBtnTextStyle(isFill)}>
                    가입할게요
                </Text>

            </TouchableHighlight>
        </View>
    );
}

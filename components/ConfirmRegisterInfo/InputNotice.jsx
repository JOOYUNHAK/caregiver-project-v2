/* 보호자들께 한줄로 하고 싶은 말 */

import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "../Icon";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { saveNotice } from '../../redux/action/register/lastRegisterAction';
import { useDispatch } from "react-redux";
import RegisterHelpText from "../RegisterHelpText";

export default function InputNotice() {
    const dispatch = useDispatch();
    return (
        <View style={styles.notice}>
            <Text style={{ fontSize: 15 }}>
                보호자분들께 알려드려요.
            </Text>
            <RegisterHelpText helpText={'하고싶은 말, 공지사항등을 한줄로 자유롭게 작성해 주세요.'} />
            <TextInput
                maxLength={30}
                onChangeText={(text) => dispatch(saveNotice(text))}
                style={styles.noticeTextInput}
                placeholder='Ex) 친절하게 모시겠습니다, 당분간 환자분들 받지 못합니다.'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    notice: {
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        padding: 20, 
        width: wp('100%')
    },

    noticeTextInput: { 
        borderBottomColor: 'silver', 
        borderBottomWidth: 0.5, 
        width: '100%', 
        fontSize: 14, 
        paddingVertical: 1, 
        paddingLeft: 3, 
        marginTop: 5 
    }
})
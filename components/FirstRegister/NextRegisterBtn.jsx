/* 회원가입 다음으로 이동하는 페이지*/
import { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableHighlight
} from "react-native";
import { shallowEqual, useSelector } from "react-redux";

export default function NextRegisterBtn({ navigation }) {

    const [isFill, setIsFill] = useState(false);
    
    const {isAuthed, name, birth, sex, purpose} = useSelector(
        state => ({
            isAuthed: state.firstRegister.isAuthed,
            name: state.firstRegister.user.name,
            birth: state.firstRegister.user.birth,
            sex: state.firstRegister.user.sex,
            purpose: state.firstRegister.user.purpose
        }),
        shallowEqual
    );
        
    useEffect(() => {

      name && birth && sex && purpose ? setIsFill(true) : setIsFill(false)
    }, [ name, birth, sex, purpose])

    return (
        <View style={styles(isFill).nextBtn}>
            <TouchableHighlight
                underlayColor='none'
                style={{ width: '100%' }}
                disabled={isFill ? false : true}
                onPress={() => navigation.push('secondRegisterPage')}
            >
                <Text style={styles(isFill).nextBtnText}>
                    다음
                </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = (isFill) => StyleSheet.create({
    nextBtnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 13 : 16,
        paddingTop: 15,
        paddingBottom: 15
    },

    nextBtn: {
        flexDirection: 'row',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: isFill ? 'rgba(65, 92, 118, 0.85)' : 'rgba(65, 92, 118, 0.25)'
    }
});

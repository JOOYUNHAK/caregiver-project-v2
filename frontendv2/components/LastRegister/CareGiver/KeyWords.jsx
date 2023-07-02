/* 간병인 회원가입 키워드 입력 부분 */
import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveKeyWord1, saveKeyWord2, saveKeyWord3} from '../../../redux/action/register/caregiverThirdRegisterAction'; 
import keyWordData from "../../../data/Register/LastRegister/keyWord.data";

export default function KeyWords() {
    const dispatch = useDispatch();
    const onChangeHandler = (id, text) => {
        switch( id ) {
            case 1:
                dispatch(saveKeyWord1(text));
                break;
            case 2:
                dispatch(saveKeyWord2(text));
                break;
            case 3:
                dispatch(saveKeyWord3(text));
                break;
        }
    };

    return (
        <View style={styles.keyWords}>
            <Text style={{ paddingLeft: 20 }}>
                회원님만의 키워드 3가지를 적어주세요
            </Text>
            <View style={styles.eachKeyWords}>
                {keyWordData.map((content) => {
                    return(
                        <TextInput
                        key={content.id}
                        onChangeText = {(text) => onChangeHandler(content.id, text)}
                        maxLength={4}
                        placeholder={content.placeholder}
                        style={styles.eachKeyWordsTextInput} />
                    )
                })}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    keyWords: {
        marginTop: 20, 
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        height: hp('8%'),
        width: wp('100%'),
    },
    eachKeyWords:{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        paddingHorizontal:30, 
        width: wp('100%'), 
        marginTop: 15,
    },
    eachKeyWordsTextInput: {
        borderBottomColor: 'silver', 
        borderBottomWidth: 0.5, 
        width: '20%', 
        paddingLeft: 5, 
        paddingVertical: 3, 
        fontSize: 13
    }
})
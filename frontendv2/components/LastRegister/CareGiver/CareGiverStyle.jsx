/* 간병인 간병 스타일 입력 */
import { StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import careGiverStyleData from "../../../data/Register/LastRegister/careGiverStyle.data"
import { useDispatch } from "react-redux";
import { saveBedSore, saveSuction, saveToilet, saveWashing } from '../../../redux/action/register/lastRegisterAction'; 

export default function CareGiverStyle() {
    const dispatch = useDispatch();

    const onChangeHandler = (title, text) => {
        switch( title ) {
            case '석션':
                dispatch(saveSuction(text));
                break;
            case '용변':
                dispatch(saveToilet(text));
                break;
            case '욕창':
                dispatch(saveBedSore(text));
                break;
            case '세면':
                dispatch(saveWashing(text));
                break;
        }
    };

    return (
        <View style={styles.careGiverStyle}>
            <Text style={{ paddingLeft: 20, }}>
                회원님만의 간병 스타일 또는 경험을 적어주세요
            </Text>
            {careGiverStyleData.map((content) => {
                return (
                    <View key={content.id} style={styles.eachContent}>
                        <Text style={styles.eachContentQuestion}>
                            {content.question}
                        </Text>
                        <TextInput
                            maxLength={30}
                            onChangeText = {(text) => onChangeHandler(content.title, text)}
                            placeholder={content.placeholder}
                            style={styles.eachContentTextInput}
                        />
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    careGiverStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 20,
        width: wp('95%'),
    },
    eachContent: {
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        margin: 10, 
        marginTop: 10, 
        overflow: 'hidden',
        paddingLeft: 20, 
        paddingBottom: 5
    },

    eachContentQuestion: {
        paddingVertical: 8,
        color: '#564d4f'
    },
    eachContentTextInput: {
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5,
        marginLeft: 10,
        alignSelf: "flex-end",
        fontSize: 13,
        width: '100%',
        paddingLeft: 5,
    }
})
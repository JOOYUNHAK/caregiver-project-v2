/* 보호자용 환자분께서 도움이 필요한 부분 */
import { StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import helpContentData from "../../../data/Register/LastRegister/helpContent.data";
import { useDispatch } from "react-redux";
import { saveBathChair, saveBedSore, saveMeal, saveSuction, saveToilet, saveWashing } from '../../../redux/action/register/lastRegisterAction'; 

export default function Help() {
    const dispatch = useDispatch();
    const onChangeHandler = (title, text) => {
        switch (title) {
            case '석션':
                dispatch(saveSuction(text));
                break;
            case '용변':
                dispatch(saveToilet(text));
                break;
            case '욕창':
                dispatch(saveBedSore(text));
                break;
            case '식사':
                dispatch(saveMeal(text));
                break;
            case '세면':
                dispatch(saveWashing(text));
                break;
            case '휠체어':
                dispatch(saveBathChair(text));
                break;
        }
    };
    
    return (
        <View style={styles.helpToPatient}>
            <Text style={{ paddingLeft: 20 }}>
                환자분께서 도움이 필요한 부분 (해당사항 없을 시 입력 X)
            </Text>
            {helpContentData.map((content) => {
                return (
                    <View key={content.id} style={styles.eachContent}>
                        <Text style={styles.eachContentTitle}>
                            {content.title}
                        </Text>
                        <TextInput
                            maxLength={30}
                            placeholder={content.placeholder}
                            style={styles.eachContentTextInput}
                            onChangeText={(text) => onChangeHandler(content.title, text)}
                        />
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    helpToPatient: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
        width: wp('95%'),
    },
    eachContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 10,
        marginTop: 20,
        paddingLeft: 20,
        overflow: 'hidden',
        paddingBottom: 5
    },
    eachContentTitle: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: 'whitesmoke',
        elevation: 1.5,
    },
    eachContentTextInput: {
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5,
        marginLeft: 10,
        alignSelf: "flex-end",
        width: '100%',
        fontSize: 13,
        paddingLeft: 5
    }
})
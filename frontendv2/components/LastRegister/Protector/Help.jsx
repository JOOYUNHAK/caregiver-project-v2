/* 보호자용 환자분께서 도움이 필요한 부분 */
import { StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveBathChair, saveBedSore, saveMeal, saveSuction, saveToilet, saveWashing } from '../../../redux/action/register/lastRegisterAction'; 
import helpContentData from "../../../data/Register/LastRegister/helpContent.data";
import RegisterHelpText from "../../RegisterHelpText";

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
            <Text style = {{paddingLeft :20}}>
                환자분께서 도움이 필요한 부분을 적어주세요
            </Text>
            <View style = {{paddingLeft: 20}}>
            <RegisterHelpText helpText={'해당사항이 없으신 경우 작성하지 않으셔도 돼요.'} />
            </View>
            {helpContentData.map((content) => {
                return (
                    <View key={content.id} style={styles.eachContent}>
                        <Text style={styles.eachContentQuestion}>
                            {content.question}
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
        width: '100%',
        fontSize: 13,
        paddingLeft: 5
    }
})
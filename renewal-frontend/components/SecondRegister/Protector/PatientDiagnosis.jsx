/* 보호자용 2번째 회원가입 환자가 받은 진단명 입력 */
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import { TouchableHighlight } from "react-native";
import { Text, StyleSheet, TextInput, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { saveDiagnosis } from "../../../redux/action/register/secondRegisterAction";
import inputStyle from "../../../styles/Register/inputStyle";
import Icon from "../../Icon";

export default function PatientDiagnosis() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const [period, setPeriod] = useState('');

    useEffect(() => {
        route?.params?.period ? 
            setPeriod(route.params.period) : null
    }, [route]);

    return (
        <View style={{
            flexDirection: 'row',
            width: wp('90%'),
            paddingLeft: 20,
            justifyContent: 'space-around'
        }}>
            <View style={styles.diagnosis}>
                <Text >
                    환자분이 받은 진단명
                </Text>
                <TextInput
                    maxLength={25}
                    placeholder="Ex) 뇌출혈, 뇌경색"
                    style={[inputStyle('startDate'),]}
                    onChangeText={(text) => dispatch(saveDiagnosis(text))} />
            </View>

            <View style={styles.period}>
                <Text >
                    케어 기간
                </Text>

                {
                    period ?
                        <TouchableHighlight
                            style={{ 
                                marginTop: 5,
                                marginTop: 12,
  
                            }}
                            underlayColor='none'
                            onPress={() => navigation.dispatch(
                                StackActions.push('selectCarePeriodPage')
                            )}>
                            <Text style={{ color: '#0c2461' }}>
                                {period}
                            </Text>
                        </TouchableHighlight>
                        :
                        <TouchableHighlight
                            style={{
                                marginTop: 16,
                                paddingRight: 10,
                                borderBottomColor: 'silver',
                                borderBottomWidth: 0.5,
                                width: '100%',
                            }}
                            underlayColor='none'
                            onPress={() => navigation.dispatch(
                                StackActions.push('selectCarePeriodPage')
                            )}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <Icon props={['material', 'event-available', 18, 'darkgray']} />
                                <Text style={{
                                    color: 'darkgray',
                                    marginLeft: 5,
                                    paddingBottom: 5
                                }}>
                                    날짜를 선택해주세요
                                </Text>
                            </View>
                        </TouchableHighlight>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    diagnosis: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: hp('12%'),
        width: '45%'
    },

    period: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: hp('12%'),
        width: '45%',
        marginLeft: 20
    }
})
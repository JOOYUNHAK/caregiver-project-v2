/* 수정하고 싶은 내용이 있는 회원가입 페이지로 가는 버튼 */

import { StackActions, useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";
import modifyData from "../../../../data/modify.data";
import Icon from "../../../Icon";

export default function EachModifyBtn() {

    const navigation = useNavigation();

    const onPressHandler = (page) => {
        navigation.dispatch(
            StackActions.push(
                'profileModifyPage', {
                    page
                }
            )
        )
    }

    return (
        <>
            {
                modifyData.map((list) => {
                    return (
                        <TouchableHighlight
                            key={list.id}
                            onPress={() => onPressHandler(list.id)}
                            underlayColor='none'
                            style={styles.eachPageTouch}
                        >
                            <View style={styles.eachPageContent}>
                                <View style={{ justifyContent: 'space-around' }}>     
                                <Text
                                    style={styles.eachPageMainText}>
                                    {list.title}
                                </Text>

                                    <Text style={styles.eachPageSubText}>
                                        {list.subTitle}
                                    </Text>
                                </View>
                                <View style={styles.eachPageIcon}>
                                    <Icon props={['material', 'navigate-next', 36, '#5a5a5a']} />
                                </View>
                            </View>
                        </TouchableHighlight>
                    )
                })
            }
        </>
    )
}

const styles = StyleSheet.create({

    eachPageTouch: {
        marginTop: hp('7%'),
        height: hp('10%'),
        borderRadius: 30,
        elevation: 5,
        backgroundColor: 'white'
    },

    eachPageContent: {
        flexDirection: 'row',
        height: '100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    eachPageMainText: {
        fontSize: 17,
        fontWeight: '500'
    },

    eachPageSubText: {
        fontSize: 15,
        color: '#5a5a5a'
    },

    eachPageIcon: {
        position: 'absolute',
        right: 15,
        alignSelf: 'center'
    }
})
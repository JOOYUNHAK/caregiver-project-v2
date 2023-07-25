/* 내 정보 수정의 계정 부분 이메일 전화번호 */

import { CommonActions, StackActions } from "@react-navigation/native";
import { StyleSheet, TouchableHighlight } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import Icon from "../../Icon";

export default function EmailAndHp({ navigation }) {
    const { email, phoneNumber } = useSelector(state => ({
        email: state.user.profile.email,
        phoneNumber: state.user.profile.phoneNumber
    }));

    const Hp = setPhoneNumber(phoneNumber);
    return (
        <View>
            <TouchableHighlight
                style={{ height: hp('9%') }}
                underlayColor='whitesmoke'
                onPress={() => navigation.dispatch(
                    StackActions.push('emailPage')
                )}
            >
                <View style={{ flexDirection: 'row', height: hp('9%'), alignItems: 'center' }}>
                    <View style={styles.eachPart}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>
                            이메일
                        </Text>
                        {email ?
                            <Text style={styles.userAccountText}>
                                {email}
                            </Text>
                            :
                            <Text style={styles.userAccountText}>
                                미인증
                            </Text>
                        }
                    </View>
                    <View style={styles.nextIcon}>
                        <Icon props={['material', 'navigate-next', 33, 'silver']} />
                    </View>
                </View>
            </TouchableHighlight>

            <TouchableHighlight
                style={{ height: hp('9%') }}
                underlayColor='whitesmoke'
                onPress={() => console.log('hi')}
            >
                <View style={{ flexDirection: 'row', height: hp('9%'), alignItems: 'center', }}>
                    <View style={styles.eachPart}>
                        <Text style={{ fontSize: 16, fontWeight: '400' }}>
                            전화번호
                        </Text>
                        <Text style={styles.userAccountText}>
                            {Hp}
                        </Text>
                    </View>
                    <View style={styles.nextIcon}>
                        <Icon props={['material', 'navigate-next', 33, 'silver']} />
                    </View>
                </View>
            </TouchableHighlight>

        </View>
    )
}

const setPhoneNumber = (hp) => {
    const start = hp.slice(0, 3);
    const middle = hp.slice(3, -4);
    const last = hp.slice(-4);
    return start + '-' + middle + '-' + last;
}

const styles = StyleSheet.create({
    emailAndHp: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 15,
        height: hp('7%')
    },

    eachPart: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingVertical: 15,
        width: '100%',
    },

    userAccountText: {
        fontSize: 14,
        color: '#7a7a7a',
        paddingLeft: 3,
        marginTop: 6
    },

    nextIcon: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
        paddingTop: 10
    }

})
/* 프로필 비공개 Modal Middle 부분 */

import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

export default function ModalMiddle({ profile_off, purpose }) {

    return (
        <View style={styles.modalMiddle}>
            <View style={{ width: '100%', paddingLeft: 20 }}>
                <Text style={{ color: '#4d4d4d', fontSize: 14 }}>
                    {purpose === '보호자' ?
                        (profile_off ?
                            `대화신청을 하고 싶은 보조사분들에게 대화신청이 가능해 집니다.` :
                            `보조사분들의 프로필은 볼 수 있지만 대화 신청은 할 수 없게 됩니다.`
                        ) :
                        (profile_off ?
                            `보호자분들에게 회원님의 프로필이 보여지고, 대화 신청을 받을 수 있게 됩니다.` :
                            `프로필이 노출되지 않고 보호자분들은 회원님의 프로필을 볼 수 없게 됩니다.`
                        )
                    }
                </Text>
            </View>
            <View style={{ width: '100%', paddingLeft: 20 }}>
                <Text style={{ color: '#4d4d4d', fontSize: 14 }}>
                    {purpose === '보호자' ?
                        (profile_off ?
                            `대화방 내에서 환자분의 프로필을 보조사분들은 언제든 볼 수 있게 됩니다.` :
                            `대화를 진행하였던 보조사분들도 해당 채팅방에선 회원님의 프로필을 볼 수 없게 됩니다.`
                        ) :
                        (profile_off ?
                            `보호자분들의 요청에 응답을 하지 못하는 상황이라면, 프로필을 비공개로 다시 전환해 주세요. ` :
                            `대화를 진행하였던 보호자분들도 해당 채팅방에선 회원님의 프로필을 볼 수 없게 됩니다.`
                        )
                    }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalMiddle: {
        height: '50%',
        width: '100%',
        borderBottomColor: 'silver',
        borderBottomWidth: 0.2,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingVertical: 15
    },
})
/* 채팅방 내 정책 리스트 */

import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Icon from "../../Icon";

export default function PolicyList() {

    return (
        <View style={styles.policyList}>
            <View>
                <View style={styles.eachPolicy}>
                    <View style={styles.icon}>
                        <Icon props={['entypo', 'dot-single', 10, '#564d4f']} />
                    </View>
                    <Text style={styles.policyText}>
                        간병인분께서 거절을 할 시 보호자분에게 약 70%의 포인트를 돌려드리고 있어요.
                    </Text>
                </View>

                <View style={styles.eachPolicy}>
                    <View style={styles.icon}>
                        <Icon props={['entypo', 'dot-single', 10, '#564d4f']} />
                    </View>
                    <Text style={styles.policyText}>
                        보호자분께서는 간병인분의 응답이 없을 경우 언제든 간병 신청 취소를 하실 수 있어요.{'\n\n'}
                        이러한 경우 해당 신청 시 차감했던 포인트를 전부 돌려드리고 있어요.
                    </Text>
                </View>

                <View style={styles.eachPolicy}>
                    <View style={styles.icon}>
                        <Icon props={['entypo', 'dot-single', 10, '#564d4f']} />
                    </View>
                    <Text style={styles.policyText}>
                        수락이 된 이후에도 취소는 가능하지만, 다음과 같이 간병 시작일까지 남은 기간에 따라 환불 정책에 차이가 있어요.{'\n\n'}
                        3일 이내에는 취소를 당하신 분에게 신청 시 차감했던 포인트를 전부 돌려드려요.{'\n\n'}
                        또한, 취소를 하신 분은 신고 대상이 될 수 있으며, 차감되었던 포인트는 돌려받지 못해요.{'\n\n'}
                        4일 이전에는 취소를 하신분에게는 신청 시 차감했던 포인트의 80%를, 상대방분에게는 100%를 돌려드려요.

                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    policyList: {
        alignItems: 'center'
    },
    
    eachPolicy: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center'
    },

    icon: {
        height: 18,
        justifyContent: 'center'
    },

    policyText: {
        paddingLeft: 5,
        color: '#564d4f',
        fontSize: 13,
        width: '90%',
        lineHeight: 17
    }
})
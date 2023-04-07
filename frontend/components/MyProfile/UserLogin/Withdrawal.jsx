/* 내 계정 관리 회원탈퇴 부분 */

import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Withdrawal({ navigation }) {

    return (
        <TouchableHighlight
            style={{ height: hp('6%') }}
            underlayColor='none'
            onPress={console.log('todo')}
        >
            <View style={styles.eachPart}>
                <Text style={{ fontSize: 16, fontWeight: '400' }}>
                    회원탈퇴
                </Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({

    eachPart: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp('6%'),
    }

})
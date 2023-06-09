/* 내 정보 내 프로필의 계정 안내 부분 */
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";

export default function AccountInfo() {
    return (
        <View style={styles.headerText}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
                계정
            </Text>
            <Text style={styles.accountInfo}>
                계정 정보를 업데이트 하여 안전하게 관리해보세요.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    accountInfo: { 
        fontSize: 13, 
        color: 'darkgray', 
        fontWeight: '600', 
        paddingLeft: 1, 
        paddingTop: 2 
    },

    headerText: {
        paddingTop: 15, 
        height: hp('8%'),
        borderTopColor: 'silver',
        borderTopWidth: 0.7
    }
})
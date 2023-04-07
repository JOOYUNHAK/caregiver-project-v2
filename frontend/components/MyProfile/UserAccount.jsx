/* 내정보에서 내 프로필 유저 계정관련 부분 */

import { StyleSheet } from "react-native";
import { View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AccountInfo from "./UserAccount/AccoutInfo";
import EmailAndHp from "./UserAccount/EmailAndHp";

export default function UserAccount({ navigation }) {

    return (
        <View style={styles.account}>
            <AccountInfo />
            <EmailAndHp navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    account: {
        paddingHorizontal: 10,        
    }
})
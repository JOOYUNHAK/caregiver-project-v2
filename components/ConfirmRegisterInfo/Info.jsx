/* 회원가입 마지막 안내문 */

import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CommonInfo from "./Info/CommonInfo";
import HelperInfo from "./Info/HelperInfo";

export default function Info() {
    return (
        <View style={styles.info}>
            <HelperInfo />
            <CommonInfo />
        </View>
    )
}

const styles = StyleSheet.create({
    info: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: wp('100%'),
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        marginVertical: 20
    }
})

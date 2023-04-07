/**
 * 내 프로필 마지막 로그인 부분 ( 로그아웃, 회원 탈퇴 )
 */

import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Logout from "./Logout";
import Withdrawal from "./Withdrawal";

export default function UserLogin({ navigation }) {
    return (
        <View style={{paddingHorizontal: 10}}>

            <View style={styles.headerText}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                    로그인
                </Text>
            </View>

               <Logout navigation={navigation}/>
               <Withdrawal navigation={navigation}/>

        </View>
    )
}

const styles = StyleSheet.create({

     headerText: {
        paddingTop: 15,
        height: hp('6%'),
        borderTopColor: 'silver',
        borderTopWidth: 0.7,
        marginTop: 15
    }

})
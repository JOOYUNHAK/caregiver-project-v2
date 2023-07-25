/* 내 정보 수정 화면에서 가장 상단 이름과 가입목적 부분 */
import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import Icon from "../../components/Icon";

export default function UserInfo() {
    const { name, role } = useSelector(state => ({
        name: state.user.name,
        role: state.user.profile.role
    }))

    return (
        <View style={styles.userInfo}>
            <View>
                <Icon props={['material', 'account-circle', 100, '#eaebe8']} />
            </View>
            <View style={ styles.nameAndPurpose }>
                <Text style={{ fontSize: 17, fontWeight: '500' }}>
                    {name}님
                </Text>
                <Text >
                    {role === '간병인' ? 
                        (`${role}으로 활동중이에요`) :
                             (`${role}로 활동중이에요`)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userInfo: {
        width: wp('100%'),
        height: hp('20%'),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    nameAndPurpose: {
        flexDirection: 'column', 
        width: '100%', 
        alignItems: 'center', 
        paddingLeft: 8 
    }
})
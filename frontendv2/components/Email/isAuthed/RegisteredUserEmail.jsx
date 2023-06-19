/**
 * 내 프로필 계정 부분 이메일 눌렀을 때 인증된 사용자인 경우의 화면
 */
import { StyleSheet } from "react-native"
import { Text, TouchableHighlight, View } from "react-native"
import { useSelector } from "react-redux"
import Icon from "../../Icon"

export default function RegisteredUserEmail({ navigation }) {
    const { email } = useSelector(state => ({
        email: state.user.email
    }))

    return (
        <View style={styles.email}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
                인증받은 이메일
            </Text>
            <Text style={styles.subInfo}>
                휴대폰 번호 변경시 인증받을 이메일 주소에요.
                다른 이메일로 인증을 원할시 해당 이메일로 재인증 해주세요
            </Text>

            <TouchableHighlight style={{ width: '100%', marginTop: 30 }}>
                <View style={styles.userEmail}>
                    <Icon props={['material', 'mail-outline', 24, 'black']} />
                    <Text style={styles.userEmailText}>
                        {email}
                    </Text>
                    <View style={styles.nextIcon}>
                        <Icon props={['material', 'navigate-next', 30, 'silver']} />
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    email: { 
        padding: 20, 
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start' 
    },

    subInfo: {
        fontSize: 13,
        color: 'darkgray',
        fontWeight: '600',
        paddingTop: 2
    },

    userEmail: { 
        flexDirection: 'row', 
        borderBottomColor: 'silver', 
        borderBottomWidth: 0.8, 
        paddingBottom: 10 
    },

    userEmailText: {
        color: '#5d5d5d',
        fontSize: 17,
        marginLeft: 5
    },

    nextIcon: { 
        position: 'absolute', 
        right: 0, 
        alignSelf: 'center', 
        bottom: 6 
    }
})
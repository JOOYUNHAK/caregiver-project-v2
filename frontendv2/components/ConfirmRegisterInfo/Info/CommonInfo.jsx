/* 모든 대상자 공통 안내문 */
import { StyleSheet, View } from "react-native";
import CustomSpanText from "../../CustomSpanText";
import Icon from "../../Icon";


export default function CommonInfo() {
    return (
        <>
            <View style={styles.info}>
                <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                <CustomSpanText
                    fullText={'휴대폰 번호를 변경하기 위해서는 이메일 인증이 필수에요.'} spanText={['이메일 인증']} type={'combination'} />
            </View>
            <View style={styles.info}>
                <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                <CustomSpanText
                    fullText={'이메일 인증은 내정보 -> 이메일 인증에서 가능해요.'} spanText={['내정보 -> 이메일 인증']} type={'combination'} />
            </View>
            <View style={styles.info}>
                <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                <CustomSpanText
                    fullText={'프로필 변경 사항은 내정보 -> 프로필 수정에서 변경 가능해요.'} spanText={['내정보 -> 프로필 수정']} type={'combination'} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    info: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 15,
        paddingLeft: 20
    },
})
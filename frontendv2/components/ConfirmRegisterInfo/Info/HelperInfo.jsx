/* 간병인, 활동보조사 회원가입 안내문 */

import { StyleSheet, View } from "react-native";
import CustomSpanText from "../../CustomSpanText";
import Icon from "../../Icon";

export default function HelperInfo() {

    return (
        <>
            <View style={styles.info}>
                <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                <CustomSpanText
                    fullText={'해당 가입은 선택 자격증에 대해 증명 자료 제출이 필수에요.'} spanText={['증명 자료 제출']} type={'combination'} />
            </View>
            <View style={styles.info}>
                <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                <CustomSpanText
                    fullText={'인증이 되기 전까지 프로필이 노출되지 않아요.'} spanText={['노출']} type={'combination'} />
            </View>
            <View style={styles.info}>
                <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                <CustomSpanText
                    fullText={'제출은 wndbsgkr@naver.com으로 신분증과 함께 보내주세요.'} spanText={['wndbsgkr@naver.com']} type={'combination'} />
            </View>
            <View style={styles.info}>
                <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                <CustomSpanText
                    fullText={'자격증 관리는 내정보 -> 자격증 관리에서 변경 가능해요.'} spanText={['내정보 -> 자격증 관리']} type={'combination'} />
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
/* 나의 프로필 -> 나의 자격증 */

import { NavigationContext, StackActions, useNavigation } from "@react-navigation/native"
import { TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import CustomSpanText from "../../CustomSpanText";
import Icon from "../../Icon";

export default function MyCertificate() {
    const navigation = useNavigation();

    const { isCertified, certificate } = useSelector(state => ({
        isCertified: state.user.isCertified,
        certificate: state.secondRegister.license
    }))
    return (
        <View style={styles.certificate}>
            <View style = {{flexDirection: 'row'}}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
                선택한 자격증
            </Text>
            <Text style = {{
                fontSize: 16, 
                marginLeft: 10, 
                color: isCertified ? '#0764b0' : 'orange',
                paddingTop: 2,
                fontWeight: isCertified ? '400' : '600'
                }}>
                {isCertified ? ('인증완료') : ('미인증')}
            </Text>
            </View>

            <Text style={styles.subInfo}>
                회원가입 때 보유 자격증으로 선택하신 자격증 목록입니다.
                인증이 확인 되기 전까진 프로필이 노출 되지 않습니다.
            </Text>

            {certificate.length ?
                <View style={styles.certificatePart}>
                    {certificate.map((certificate) => {
                        return (
                            <Text key={certificate} style={styles.eachPart}>
                                {certificate}
                            </Text>
                        )
                    })}       
                    <View style={{ paddingTop: 40, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon props={['material', 'fiber-manual-record', 4, '#909090']} />
                        </View>
                        <CustomSpanText
                            fullText={'증명자료는 wndbsgkr@naver.com으로 신분증과 함께 보내주세요.'} spanText={['wndbsgkr@naver.com']} type={'combination'} />
                    </View>
                    <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ alignSelf: 'center' }}>
                            <Icon props={['material', 'fiber-manual-record', 4, '#909090']} />
                        </View>
                        <CustomSpanText
                            fullText={'신분증 및 증명 자료는 확인 즉시 삭제됩니다.'} spanText={['삭제']} type={'combination'} />
                    </View>
                    <TouchableHighlight style={{ marginTop: 15, marginLeft: 6 }}>
                        <Text style={{ color: '#0764b0' }}>
                            새로 추가하거나 삭제하실 자격증이 있으신가요?
                        </Text>
                    </TouchableHighlight>
                </View>
                :
                <View style={{ marginTop: 30 }}>
                    <TouchableHighlight
                        underlayColor='none'
                        onPress={() => console.log('todo')}
                    >
                        <Text style={{ color: '#0764b0', }}>
                            새로 등록하실 자격증이 있으신가요?
                        </Text>
                    </TouchableHighlight>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    certificate: {
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

    certificatePart: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },

    eachPart: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontSize: 14,
        color: '#5d5d5d',
        borderWidth: 0.5,
        borderRadius: 15,
        marginRight: 10
    }
})
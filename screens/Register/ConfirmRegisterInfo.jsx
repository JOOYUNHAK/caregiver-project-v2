/* 마지막 안내문과 한마디 (간병인용) */

import Icon from '../../components/Icon';
import { BackHandler, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../components/StatusBarComponent";
import CustomSpanText from '../../components/CustomSpanText';
import InputNotice from '../../components/ConfirmRegisterInfo/InputNotice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { confirmRegisterInfoReset } from '../../redux/action/register/lastRegisterAction';
import { useEffect, useState } from 'react';
import ConfirmRegisterBtn from '../../components/ConfirmRegisterInfo/ConfirmRegisterBtn';

export default function ConfirmRegisterInfo({ navigation }) {

    const dispatch = useDispatch();
    const [isFill, setIsFill] = useState(false);
    const notice = useSelector(state => state.lastRegister.careGiver.notice);

    useEffect(() => {
        console.log(notice)
        notice ? setIsFill(true) : setIsFill(false)
    }, [ notice ]);

    const backAction = () => {
        dispatch(confirmRegisterInfoReset());
        navigation.pop();
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <InputNotice />
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: wp('100%'), padding: 20, marginVertical: 20 }}>
                <View style={styles.info}>
                    <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                    <CustomSpanText
                        fullText={'해당 가입은 선택 자격증에 대해 증명 자료 제출이 필수에요.'} spanText={['필수']} type={'combination'} />
                </View>
                <View style={styles.info}>
                    <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                    <CustomSpanText
                        fullText={'인증이 되기 전까지 자격증 미인증으로 노출돼요.'} spanText={['미인증']} type={'combination'} />
                </View>
                <View style={styles.info}>
                    <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                    <CustomSpanText
                        fullText={'제출은 wndbsgkr@naver.com으로 신분증과 함께 보내주세요.'} spanText={['wndbsgkr@naver.com']} type={'combination'} />
                </View>
                <View style={styles.info}>
                    <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                    <CustomSpanText
                        fullText={'신분증 및 증명 자료는 확인 즉시 삭제됩니다.'} spanText={['삭제']} type={'combination'} />
                </View>
                <View style={styles.info}>
                    <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                    <CustomSpanText
                        fullText={'자격증 관리는 내정보 -> 자격증 관리에서 변경 가능해요.'} spanText={['내정보 -> ', '자격증 관리']} type={'combination'} />
                </View>
                <View style={styles.info}>
                    <Icon props={['font-awesome', 'exclamation', 18, 'silver']} />
                    <CustomSpanText
                        fullText={'프로필 변경 사항은 내정보 -> 프로필 수정에서 변경 가능해요.'} spanText={['내정보 -> ', '프로필 수정']} type={'combination'} />
                </View>
            </View>
            <ConfirmRegisterBtn />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },

    info: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 15
    },
})
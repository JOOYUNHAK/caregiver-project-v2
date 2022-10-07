/* 각 프로필 상세보기를 누르면 나오는 사용자 개개인의 프로필 */

import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import requestUserProfile from "../api/Profile/requestUserProfile";
import BottomButtons from "../components/HelperProfile/BottomButtons";
import ProfileBasicInfo from "../components/HelperProfile/ProfileBasicInfo";
import ProfileCareStyle from "../components/HelperProfile/ProfileCareStyle";
import ProfileCertificate from "../components/HelperProfile/ProfileCertificate";
import ProfileExtraFee from "../components/HelperProfile/ProfileExtraFee";
import ProfileHeader from "../components/HelperProfile/ProfileHeader";
import ProfileNextHospital from "../components/HelperProfile/ProfileNextHospital";
import ProfileStrength from "../components/HelperProfile/ProfileStrength";
import ProfileWarning from "../components/HelperProfile/ProfileWarning";
import StatusBarComponent from "../components/StatusBarComponent";
import Dialog from "react-native-dialog";
import Loading from "./Loading";
import { StackActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { removeNotFoundProfile } from "../redux/action/profile/profileAction";

export default function HelperProfile({ navigation, route }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); //데이터 받아오기 전까지
    const [visible, setVisible] = useState(false); //프로필 찾을 수 없을 때 dialog
    const [errMessage, setErrMessage] = useState(''); //프로필 찾을 수 없을 때 message
    const purpose = route.params.purpose;
    const profileId = route.params.profileId;
    const name = route.params.name;
    
    const { completeHeart } = useSelector(state => ({
        completeHeart: state.profile.completeHeart
    }));

    useEffect(() => {
        async function getUserProfile() {
            const result = await requestUserProfile(
                purpose === '간병인' ? 'careGiver' : 'assistant',
                profileId);
            //프로필을 찾을 수 없으면 dialog 띄우기
            if(result !== 'true') {
                setVisible(true);
                setErrMessage(result);
            }
            else
                setLoading(false);
        }
        const unsubscribe = navigation.addListener('focus', async() => {
            await getUserProfile();
        });
        return unsubscribe
    }, [navigation])

    //dialog 확인 버튼 눌렀을 때
    const pressDialog = () => {
        setVisible(false);
        navigation.dispatch(
            StackActions.pop()
        )
        //db에 요청하지 않고 사용자 목록에서 제거만 하기
        dispatch(removeNotFoundProfile(profileId));
    }

    const onScrollHandler = (e) => {
        if( e.nativeEvent.contentOffset.y > 50 ) {
            const newTitle = purpose + ' ' + name + '님';
            navigation.setOptions({ title: newTitle})
        }else 
            navigation.setOptions({ title: '' })
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            {loading ? <Loading /> :
                <>
                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps='handled'
                        extraHeight={150}
                        extraScrollHeight={30}
                        enableOnAndroid={true}
                        enableAutomaticScroll={true}
                        onScroll={onScrollHandler}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}>
                        <ProfileHeader />
                        <ProfileBasicInfo />
                        <ProfileCertificate />
                        <ProfileExtraFee />
                        <ProfileNextHospital />
                        <ProfileCareStyle />
                        <ProfileStrength />
                        <ProfileWarning />
                    </KeyboardAwareScrollView>
                    <BottomButtons />
                </>
            }
        
            {/* <Animatable.View
                animation = {completeHeart ? 'slideInUp' : 'slideInDown'}
                style = {{
                    backgroundColor: 'rgba(65, 92, 118, 0.95)',
                    position: 'absolute', 
                    bottom: completeHeart ? 100 : -150, 
                    alignSelf: 'center', 
                    borderRadius: 10,
                    flexDirection: 'row',
                    paddingHorizontal: 30,
                    paddingVertical: 15
                }}
            >
                <Text
                    style ={{color: '#ededed'}}
                >
                    찜 등록 완료!
                </Text>

                <TouchableHighlight style = {{paddingLeft: 50}}>
                <Text style = {{color: '#fab1a0'}}>
                    찜 목록으로 갈까요?
                </Text>
                </TouchableHighlight>
            </Animatable.View> */}
            <>
                <Dialog.Container 
                    contentStyle = {styles.dialogContainer}
                    onBackdropPress={() => pressDialog()}
                    onRequestClose = {() => pressDialog()}
                    visible={visible}>
                    <Dialog.Description
                        style = {styles.dialogDescription}
                    >
                        {errMessage}
                    </Dialog.Description>
                    <Dialog.Button 
                        label = '확인' 
                        onPress={() => pressDialog()} 
                        style = {{ 
                            color: 'white', 
                            paddingHorizontal: 30, 
                            borderRadius: 3, 
                            backgroundColor:'rgba(65, 92, 118, 0.85)' 
                        }}
                        />
                </Dialog.Container>
            </>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'whitesmoke'
    },

    profileHelperAppeal: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingLeft: 5
    },

    profileHelperAppealText: {
        fontSize: 14,
        paddingLeft: 3,
        color: 'darkgray',
    },

    title: {
        color: 'darkgray',
        fontWeight: '400',
        fontSize: 15,
    },

    verticalLine: {
        borderWidth: 0.3,
        height: '50%',
        marginTop: 6,
        borderColor: 'silver',
        marginHorizontal: 5
    },

    userValue: {
        color: '#545454',
        fontSize: 15
    },

    dialogContainer: {
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10, 
        marginTop: -90
    },

    dialogDescription: {
        fontSize: 15, 
        color: '#756e6f', 
        paddingHorizontal:10
    }
});

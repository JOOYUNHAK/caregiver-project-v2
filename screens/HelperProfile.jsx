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
import ProfileHeader from "../components/HelperProfile/ProfileHeader";
import ProfileNextHospital from "../components/HelperProfile/ProfileNextHospital";
import ProfileStrength from "../components/HelperProfile/ProfileStrength";
import ProfileWarning from "../components/HelperProfile/ProfileWarning";
import StatusBarComponent from "../components/StatusBarComponent";
import Loading from "./Loading";

export default function HelperProfile({ navigation, route }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getUserProfile() {
            await requestUserProfile(
                route.params.purpose === '간병인' ? 'careGiver' : 'assistant',
                route.params.profileId);
            setLoading(false);
        }
        getUserProfile();
    }, [])

    const onScrollHandler = (e) => {
        //console.log(e.nativeEvent.contentOffset.y)
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
                        <ProfileNextHospital />
                        <ProfileCareStyle />
                        <ProfileStrength />
                        <ProfileWarning />
                    </KeyboardAwareScrollView>
                    <BottomButtons />
                </>
            }
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
});

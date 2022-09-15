/* 각 프로필 상세보기를 누르면 나오는 사용자 개개인의 프로필 */

import { useState } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import requestUserProfile from "../api/Profile/requestUserProfile";
import ProfileBasicInfo from "../components/HelperProfile/ProfileBasicInfo";
import ProfileCareStyle from "../components/HelperProfile/ProfileCareStyle";
import ProfileHeader from "../components/HelperProfile/ProfileHeader";
import Icon from "../components/Icon";
import StatusBarComponent from "../components/StatusBarComponent";
import { getAge, getCareer, isEqualPay } from "../functions/Profile/profileFunctions";
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
        console.log(e.nativeEvent.contentOffset.y)
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            {loading ? <Loading /> :
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
                    <ProfileCareStyle />
                </KeyboardAwareScrollView>
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

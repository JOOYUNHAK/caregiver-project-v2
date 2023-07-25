/* 내정보 -> 로그인 했을 경우 프로필 화면 */

import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import UserInfo from "../components/MyProfile/UserInfo";
import UserLogin from "../components/MyProfile/UserLogin/UserLogin";
import UserProfile from "../components/MyProfile/UserProfile";
import StatusBarComponent from "../components/StatusBarComponent";
import api from "../config/CustomAxios";
import store from "../redux/store";
import { saveProfile } from "../redux/action/user/userAction";
import UserAccount from "../components/MyProfile/UserAccount";

export default function MyProfile({ navigation }) {

    useEffect(() => {
        async function getMyProfile() {
            try{
                const res = await api.get('user/profile/my');
                store.dispatch(saveProfile(res.data));
            }
            catch(err) {
                console.log(err.response)
            }
        }
        getMyProfile();
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps='handled'
                    extraHeight={150}
                    extraScrollHeight={30}
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}>
                    <UserInfo navigation = {navigation}/>
                    <UserAccount  navigation = {navigation}/>
                    <UserProfile navigation = {navigation}/>
                    <UserLogin navigation={navigation}/>  
                </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
})
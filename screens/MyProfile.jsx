/* 내정보 -> 로그인 했을 경우 프로필 화면 */

import { StackActions} from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import UserAccount from "../components/MyProfile/UserAccount";
import UserInfo from "../components/MyProfile/UserInfo";
import UserLogin from "../components/MyProfile/UserLogin/UserLogin";
import UserProfile from "../components/MyProfile/UserProfile";
import StatusBarComponent from "../components/StatusBarComponent";
import { getLoginState, validateToken } from "../functions/Token";

export default function MyProfile({ navigation }) {

    useEffect(() => {
        const sub = navigation.addListener('focus', async () => {
            const isLogin = await getLoginState();
            if (isLogin) {
                if(await validateToken(navigation));
                else {
                    navigation.dispatch(
                        StackActions.push('loginPage')
                    )
                }
            }
        })
        return sub
    }, [navigation])


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
/* 회원가입 두번째 페이지 */

import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux"
import StatusBarComponent from "../components/StatusBarComponent";
import CareGiver from "./SecondRegister/CareGiver";

export default function SecondRegister({ navigation }) {
    const purpose = useSelector((state) => state.firstRegister.user.purpose); //가입목적

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='handled'
                extraHeight={150}
                extraScrollHeight={30}
                enableOnAndroid={true}
                scrollEnabled={true}
                enableAutomaticScroll={true}
                showsVerticalScrollIndicator={false} >
                <CareGiver navigation={navigation}/>
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
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
})

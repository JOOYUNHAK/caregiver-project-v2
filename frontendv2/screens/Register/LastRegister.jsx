/* 회원가입 마지막 페이지 */

import {  ScrollView, StyleSheet,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../components/StatusBarComponent";
import { useSelector } from "react-redux";
import CareGiver from "./LastRegister/CareGiver";
import Protector from "./LastRegister/Protector";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useDispatch } from "react-redux";
import { thirdRegisterReset } from "../../redux/action/register/caregiverThirdRegisterAction";

export default function LastRegister({ navigation }) {
    const purpose = useSelector((state) => state.firstRegister.user.purpose);
    const dispatch = useDispatch();

    const backAction = () => {
        dispatch(thirdRegisterReset());
        navigation.goBack();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <ScrollView
                keyboardShouldPersistTaps='handled'
                enableOnAndroid={true}
                scrollEnabled={true}
                enableAutomaticScroll={true}
                showsVerticalScrollIndicator={false} >
            {purpose === 'caregiver' ? 
                    <CareGiver navigation={navigation}/> : 
                        <Protector navigation={navigation}/>
            }
            </ScrollView>
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
/* 각 페이지당 작성했던 내용 수정 */

import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestRegisteredProfile } from "../../../../api/Profile/profileModifyApi";
import AcquisitionLicense from "../../../../components/SecondRegister/AcquisitionLicense";
import NextHospital from "../../../../components/SecondRegister/CareGiver/NextHospital";
import NextRegisterBtn from "../../../../components/SecondRegister/CareGiver/NextRegisterBtn";
import PayAndStartDate from "../../../../components/SecondRegister/CareGiver/PayAndStartDate";
import PossibleArea from "../../../../components/SecondRegister/PossibleArea";
import WeightAndCareer from "../../../../components/SecondRegister/WeightAndCareer";
import StatusBarComponent from "../../../../components/StatusBarComponent";

export default function EachModify( { navigation, route }) {

    const { page } = route.params;
    
    useEffect(() => {
        requestRegisteredProfile(navigation, page);
    }, []);

    return(
        <SafeAreaView style = {styles.container}>
            <StatusBarComponent />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='handled'
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
                style = {{ marginTop: 20 }}
            >
                <WeightAndCareer />
                <PayAndStartDate />
                <NextHospital />
                <PossibleArea />
                <AcquisitionLicense />
                <NextRegisterBtn navigation={navigation} />
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
    }
})
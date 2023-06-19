/*  세부 필터 조건 페이지 */

import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { BackHandler } from "react-native";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Age from "../components/Filter/Age";
import Area from "../components/Filter/Area";
import Except from "../components/Filter/Except";
import FilterBottomButton from "../components/Filter/FilterBottomButton";
import License from "../components/Filter/License";
import Sex from "../components/Filter/Sex";
import StatusBarComponent from "../components/StatusBarComponent";
import { backToPreviousFilter } from "../../frontendv2/redux/action/profile/profileAction";
import { backToPreviousSearchFilter } from "../../frontendv2/redux/action/search/searchAction";

export default function Filter({ route }) {
    const dispatch = useDispatch();
    const { previousName } = route.params;
    const backAction = () => {
            previousName === 'searchResultPage' ?
                dispatch(backToPreviousSearchFilter()) :
                dispatch(backToPreviousFilter());
    }
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => 
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);
    
    return(

        <SafeAreaView style = {styles.container}>
            <StatusBarComponent />
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps='handled'
                extraHeight={150}
                extraScrollHeight={30}
                enableOnAndroid={true}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                    <Sex />
                    <Age />
                    <Area />
                    <License />
                    <Except />
                </KeyboardAwareScrollView>
                <FilterBottomButton />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white'
    }
})
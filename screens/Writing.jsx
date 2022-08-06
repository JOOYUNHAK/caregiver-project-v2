/* 글쓰기 페이지 */
import React, { useLayoutEffect, useState, } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableHighlight,
} from 'react-native';
import StatusBarComponent from "../components/StatusBarComponent";
import TipModal from "../components/Writing/TipModal/TipModal";
import Questions from "../components/Writing/Questions";
import BackBtn from "../components/Btn/BackBtn";

const WritingPage = ({ navigation }) => {
    const [isFill, setIsFill] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                    <TouchableHighlight
                        underlayColor='none'
                        disabled={isFill ? false : true}
                        onPress={() => storeWriting()}>
                        <Text style={styles(isFill).completeBtn}>
                            완료
                        </Text>
                    </TouchableHighlight>
            ),
            headerLeft: () => (
                <BackBtn navigation = {navigation} />
            )
        })
    }, [navigation, isFill]);

    const fillCheck = (data) => {
        setIsFill(data);
    }

    const storeWriting = () => {
        console.log('글 저장 완료')
    }

    return (
        <SafeAreaView style={styles().container}>
            <StatusBarComponent />
            <TipModal />           
            <Questions fillCheck={fillCheck} />
        </SafeAreaView>
    )
}

export default WritingPage;

const styles = (isFill) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: 'white',
        //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },

    completeBtn: {
        fontSize: Platform.OS === 'ios' ? 13 : 16,
        fontWeight: 'bold',
        color: isFill ? 'red' : 'silver'
    },

})
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import StatusBarComponent from '../components/StatusBarComponent';
import Header from '../components/Search/Header';
import Main from '../components/Search/Main';
import * as firebaseFunction from '../config/firebaseFunctions.js';
import * as MyPhoneStorage from '../functions/Search.js';
import ShowMatchingWord from '../components/Search/ShowMatchingWord';
import { useLayoutEffect } from 'react';
import searchData from '../data/search.data';


export default function SearchPage(props) {
    const data = props.route.params.data[0];
    const navigation = props.navigation;
    const [recentWords, setRecentWords] = useState(data);
    const [searchValue, setSearchValue] = useState('');
    const [length, setLength] = useState(0);

    const [initEnglishWords, setInitEnglishWords] = useState([]);
    const [initNumberWords, setInitNumberWords] = useState([]);
    const [initKoreaWords, setInitKoreaWords] = useState([]);
    const [filterData, setFilterData] = useState(searchData);
    const [autoStore, setAutoStore] = useState(props.route.params.data[1]);
    /* useLayoutEffect(() => {
        async function getMyRecentPart() {
            const a = await MyPhoneStorage.getAutoStore();
            setRecentWords(await MyPhoneStorage.getStoreWords());
            setAutoStore(a);
        }
        getMyRecentPart();
    }, []); */

    //처음 렌더링 때 검색어들 받아오기
    /* useEffect(() => {
        async function getStorageWords() {
            firebaseFunction.getStorageWords(
                setInitEnglishWords, setInitNumberWords, setInitKoreaWords);
        }
        getStorageWords();
    }, []) */

    //입력값이 변할 때마다 해당 검색어에 맞는 단어 보여주기
    useEffect(() => {
        const englishReg = /^[a-zA-Z]/;  //영어로 시작하는지
        const numberReg = /^[0-9]/; //숫자로 시작하는지 
        const inputValue = searchValue.replace(/ /g, '');
        
        if (numberReg.test(inputValue))
            firebaseFunction.getFilterWord(searchData, searchValue, setFilterData);
        else
            firebaseFunction.getFilterWord(searchData, searchValue, setFilterData);
    }, [searchValue]) 

    //입력값 길이 체크
    const lengthCheck = (length) => {
        setLength(length);
    }

    return (

        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <Header
                navigation={navigation}
                recentWords={recentWords}
                autoStore={autoStore}
                lengthCheck={lengthCheck}
                setValue={setSearchValue} />
             {!length ?
                <Main 
                    data={recentWords} 
                    autoStore={autoStore} 
                /> : 
                <ShowMatchingWord 
                    filterData = {filterData} 
                    recentWords = {recentWords} 
                    autoStore = {autoStore} />} 
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
        //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
})
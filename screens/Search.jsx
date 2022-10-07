import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import StatusBarComponent from '../components/StatusBarComponent';
import * as MyPhoneStorage from '../functions/Search.js';
import ShowMatchingWord from '../components/Search/ShowMatchingWord';
import SearchHeader from '../components/Search/SearchHeader';
import { useDispatch } from 'react-redux';
import { refreshSearchProfileList, resetPreviousSearchFilters, resetSearchFilter, resetSearchMainFilters, saveAutoStore, saveRecentSearchKeywords, saveSearchValue, setSearchNoData } from '../redux/action/search/searchAction';
import RecentSearchKeyWords from '../components/Search/RecentSearchKeyWords';
import MostSearchedKeyWords from '../components/Search/MostSearchedKeyWords';


export default function SearchPage({ navigation }) {

    const dispatch = useDispatch();
    useEffect(() => {
        async function _getAboutRecent() {
            const _isAutoStore = await MyPhoneStorage.getAutoStore();
             dispatch(saveAutoStore(
                _isAutoStore === false ? false : true
            ));
            const _recentSearchKeywords = await MyPhoneStorage.getStoreWords();
            dispatch(saveRecentSearchKeywords(_recentSearchKeywords));
        }
        _getAboutRecent();

        //검색 결과 페이지의 필터 및 검색 조건 초기화
        const _unsubscribe = navigation.addListener('focus', () => {
            dispatch(saveSearchValue(''));
            dispatch(setSearchNoData(false));
            dispatch(refreshSearchProfileList());
            dispatch(resetSearchMainFilters());
            dispatch(resetSearchFilter());
            dispatch(resetPreviousSearchFilters());
        })
        return _unsubscribe;
    }, [])

    return (

        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <SearchHeader />
            <RecentSearchKeyWords />
            <MostSearchedKeyWords />
            <ShowMatchingWord />
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
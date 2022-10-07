/*  검색페이지 헤더 */
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TouchableHighlight,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import requestSearchResult from '../../api/Search/requestSearchResult.js';
import * as MyPhoneStorage from '../../functions/Search.js';
import { refreshSearchProfileList, saveSearchValue, setSearchNoData } from '../../redux/action/search/searchAction.js';
import Icon from '../Icon.jsx';

export default function SearchHeader() {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    const { searchValue } = useSelector(state => ({
        searchValue: state.search.searchValue
    }));
    const inputRef = useRef();

    useEffect(() => {
        route.name === 'searchPage' ?
            (Platform.OS === 'ios'
                ? inputRef.current.focus()
                : setTimeout(() => 
                    inputRef.current.focus(), 100)
            )
            : null
    }, [])

    const storeSearchValue = async () => {
        if (searchValue.length)
            MyPhoneStorage.storeSearchValue(searchValue);
        route.name === 'searchPage' ?
            navigation.dispatch(
                StackActions.push('searchResultPage')
        ) :
            navigation.dispatch(
                StackActions.replace('searchResultPage')
            )
        dispatch(setSearchNoData(false));
        dispatch(refreshSearchProfileList()); //새로 입력했으므로 요청 번호 처음부터
        requestSearchResult(); // 요청 api
    }

    return (
        <View style={styles.searchPageHeader}>
            <TouchableOpacity
                onPress={() => navigation.pop()}
                style={{ flex: 1 }}>
                <Icon props={['antdesign', 'arrowleft', 24, 'black']} />
            </TouchableOpacity>

            <View style={styles.searchPageBox}>
                <TextInput
                    ref={inputRef}
                    underlineColorAndroid="transparent"
                    placeholder='어떤 보조사분들을 찾고 계신가요? (Ex:경험많은, 청결)'
                    onChangeText={text => dispatch(saveSearchValue(text))}
                    value={searchValue}
                    returnKeyType='search'
                    onSubmitEditing={() => storeSearchValue()}
                    style={{ fontSize: Platform.OS === 'ios' ? 10 : 13 }} />
                {searchValue ?
                    <TouchableHighlight
                        underlayColor='none'
                        onPress={() => dispatch(saveSearchValue(''))}
                        style={styles.deleteBtn}>
                        <Icon props={['material-community', 'close-circle-outline', 20, 'darkgray']} />
                    </TouchableHighlight>
                    : null}
            </View>
        </View>
    );

}
const styles = StyleSheet.create({

    searchPageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingLeft: 10,
    },

    searchPageBox: {
        flex: 9,
        backgroundColor: 'whitesmoke',
        borderRadius: 15,
        height: 45,
        paddingLeft: 10,
        marginLeft: 5,
        marginRight: 10,
        marginTop: 2,
        flexDirection: 'row'
    },

    deleteBtn: {
        position: 'absolute',
        right: 10,
        alignSelf: 'center',
    }
})
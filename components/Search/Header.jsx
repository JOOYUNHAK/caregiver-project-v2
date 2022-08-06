/*  검색페이지 헤더 */
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TouchableHighlight,
} from 'react-native';
import * as MyPhoneStorage from '../../functions/Search.js';
import Icon from '../Icon.jsx';

export default function Header({ navigation, recentWords, autoStore, lengthCheck, setValue }) {

    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        Platform.OS === 'ios'
            ? inputRef.current.focus()
            : setTimeout(() => inputRef.current.focus(), 100);
    }, [])

    useEffect(() => {
        lengthCheck(searchValue.length)
        setValue(searchValue);
    }, [searchValue])

    //최근검색어 저장
    const storeRecentSearch = async (data) => {
        const searchValueCheck = MyPhoneStorage.searchValueCheck(data);
        //단어 부적절 검사 통과하면
        if (searchValueCheck === true) {
            
            if (autoStore === false);
            else
                MyPhoneStorage.storeSearchValue(recentWords, data); //검색 단어 저장
            
          
            
        } else {
            //차단 페이지
        }
    }

    return (
            <View style={styles.searchPageHeader}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    style={{ flex: 1 }}>
                    <Icon props={['antdesign', 'arrowleft', 24, 'red']} />
                </TouchableOpacity>

                <View style={styles.searchPageBox}>
                    <TextInput
                        ref={inputRef}
                        underlineColorAndroid="transparent"
                        placeholder='자신의 취향을 검색해보세요(Ex: ENFT, 활발함, 여행, 운동)'
                        onChangeText={text => setSearchValue(text)}
                        value={searchValue}
                        returnKeyType='search'
                        onSubmitEditing={() => storeRecentSearch(searchValue)}
                        style={{ flex: 1, fontSize: Platform.OS === 'ios' ? 10 : 13 }} />
                    {searchValue ?
                        <TouchableHighlight
                            underlayColor='none'
                            onPress={() => setSearchValue('')}
                            style={styles.deleteBtn}>
                            <Icon props={['material-community', 'close-circle-outline', 20, 'silver']} />
                        </TouchableHighlight> : null}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 15
    }
})
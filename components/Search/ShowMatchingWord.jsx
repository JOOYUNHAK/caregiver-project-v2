/* 검색어와 일치하는 목록 보여주기 */

import React, { useState, useEffect } from 'react';
import {
    FlatList,
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    Platform
} from 'react-native';
import * as Board from '../../functions/Search.js';
import * as Font from 'expo-font';
import Icon from '../Icon.jsx';
import CustomSpanText from '../CustomSpanText.jsx';

export default function ShowMatchingWord({ filterData,  recentWords, autoStore }) {

    const [fontReady, setFontReady] = useState(false);

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                "Maru": require("../../assets/fonts/MaruBuri-SemiBold.ttf")
            });
            setFontReady(true);
        }
        loadFont();
    }, []);

    const searchWord = async (value) => {
        if (Board.searchValueCheck(value)) {
            if (autoStore)
                await Board.storeSearchValue(recentWords, value);
        }
        //차단페이지
    }

    const showMatchWord = (value) => {

        return (
            <>
                {fontReady === true ?
                    <TouchableHighlight
                        underlayColor='none'
                        onPress={() => { searchWord(value).word }}
                    >
                        <View style={ styles.eachMatchWord}>
                            <Icon props={['antdesign', 'search1', 16, 'red']} />
                           
                            <Text style={styles.eachMatchWordText}>
                                {value.word}
                            </Text> 
                        </View>
                    </TouchableHighlight>
                    : null}
            </>
        )
    }

    return (

        <View style={styles.matchWords}>
            {<FlatList
                data={filterData}
                renderItem={({ item }) => showMatchWord(item)}
                showsVerticalScrollIndicator={false}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    matchWords: {
        width: '100%', 
        flexDirection: 'column', 
        marginTop: -10, 
        marginLeft: 20
    },  

    eachMatchWord: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 30 
    },

    eachMatchWordText: {
        fontSize:  Platform.OS === 'ios' ? 12 : 15, 
        fontWeight: '400', 
        paddingLeft: 10,
        fontFamily: 'Maru',
    }
})
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Platform,
} from 'react-native';
import * as MyPhoneStorage from '../../functions/Search.js';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import NoText from './RecentSearchKeyWords/NoText.jsx';
import { useSelector } from 'react-redux';
import RecentKeywords from './RecentSearchKeyWords/RecentKeyWords';

export default function RecentSearchKeyWords() {

    const { autoStore } = useSelector(state => ({
        autoStore: state.search.autoStore
    }));

    const onPressAutoStore = async () => {
        await MyPhoneStorage.setAutoStore(!autoStore);
    }

    const onPressDeleteAll = async () => {
        await MyPhoneStorage.deleteAllWords();
    }

    return (
        <View style={styles.recentWords}>
            <View style={styles.recentSearchText}>
                <Text style={styles.mainText}>
                    최근 검색한 키워드
                </Text>
                <View style={styles.subText}>
                    <TouchableHighlight
                        underlayColor='none'
                        onPress={() => onPressAutoStore()}>
                        <Text style={styles.subTextStyle}>
                            {autoStore ? `자동저장 끄기` : `자동저장 켜기`}
                        </Text>
                    </TouchableHighlight>
                    {
                        autoStore ?
                            <>
                                <View style={styles.vertical} />
                                <TouchableHighlight
                                    underlayColor='none'
                                    onPress={() => onPressDeleteAll()}>
                                    <Text style={styles.subTextStyle}>
                                        전체삭제
                                    </Text>
                                </TouchableHighlight>
                            </>
                            : null
                    }
                </View>
            </View>
            {autoStore === true ?
                    <RecentKeywords />
                :
                <NoText type='autoStore' />
            }
        </View>
    );
}

const styles = StyleSheet.create({

    recentWords: {
        height: heightPercentageToDP('12%'),
        marginTop: 30,
        paddingVertical: 10,
    },

    recentSearchText: {
        flexDirection: 'row',
        height: '30%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 15
    },

    mainText: {
        fontWeight: 'bold',
        width: '50%',
        color: 'dimgray',
        fontSize: Platform.OS === 'ios' ? 11 : 15
    },

    subText: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingTop: 3
    },

    subTextStyle: {
        fontWeight: '500',
        color: 'silver',
        fontSize: Platform.OS === 'ios' ? 10 : 13
    },

    vertical: {
        height: 12,
        alignSelf: 'center',
        borderLeftColor: 'lightgray',
        borderLeftWidth: 1,
        marginLeft: 5,
        marginRight: 5
    },
})
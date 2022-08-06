import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Platform,
} from 'react-native';
import { Button } from '@rneui/themed';
import RecentWords from './RecentWords';
import NoListPage from '../../screens/NoList';
import * as Board from '../../functions/Search.js';
import Icon from '../../components/Icon';


export default function Main({data, autoStore}) {
    const [recentWords, setRecentWords] = useState(data);
    const [isAutoStore, setIsAutoStore] = useState(autoStore);
    const [allDelete, setAllDelete] = useState(false);

    const recommendTags = [
        { tag: "MBTI" },
        { tag: "코로나" },
        { tag: "여행" },
        { tag: "사랑꾼" },
        { tag: "야근돌이" },
        { tag: "직장인" },
    ];

    useEffect(() => {
        async function getRecentSearch() {
            const recentWords = await Board.getStoreWords();
            setRecentWords(recentWords);
        }
        getRecentSearch();
    }, [ isAutoStore ])

    //최근검색어 저장
    const storeRecentSearch = async (data) => {
        //자동저장을 꺼놓았으면
        if (isAutoStore === false);
        else
            Board.storeSearchValue(recentWords, data); //검색 단어 저장
    }

    const renderRecommendTag = ({ item }) => {
        return (
            <Button
                type='outline'
                onPress={() => storeRecentSearch(item.tag)}
                titleStyle={{
                    fontWeight: 'bold',
                    fontSize: Platform.OS === 'ios' ? 11 : 13,
                    color: 'orange'
                }}
                buttonStyle={{
                    backgroundColor: 'floralwhite',
                    width: 100,
                    height: 40,
                    borderRadius: 20,
                    borderColor: 'white'

                }}
                containerStyle={{
                    margin: 5,
                    borderRadius: 20,
                    borderColor: 'white'
                }}
            >
                <Icon props={['antdesign', 'tagso', 20, 'orange']} />
                {item.tag}
            </Button>
        );
    }

    return (
        <View style={styles.searchPageMain}>
            <View style={styles.recommend}>
                <Text style={styles.recommendText}>
                    현재 이 매력의 소유자를 가장 많이 찾고 있어요!
                </Text>
                <View style={styles.recommendTag}>
                    <FlatList
                        data={recommendTags}
                        renderItem={renderRecommendTag}
                        keyExtractor={(tags) => tags.tag}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
            <View style={styles.recentSearch}>
                <View style={styles.recentSearchText}>
                    <Text style={styles.mainText}>
                        최근 내가 찾은 유형
                    </Text>
                    <View style={styles.subText}>
                        {isAutoStore === true ?
                            <>
                                <TouchableHighlight
                                    underlayColor='none'
                                    onPress={() => {
                                        setIsAutoStore(false);
                                        Board.setAutoStore(false);
                                    }}>
                                    <Text style={styles.subTextStyle}>
                                        자동저장 끄기
                                    </Text>
                                </TouchableHighlight>

                                <View style={styles.vertical} />

                                <TouchableHighlight
                                    underlayColor='none'
                                    onPress={() => {
                                        setAllDelete(true);
                                        setRecentWords(null);
                                        Board.deleteAllWords();
                                    }}>
                                    <Text style={styles.subTextStyle}>
                                        전체삭제
                                    </Text>
                                </TouchableHighlight>
                            </>
                            :
                            <TouchableHighlight
                                underlayColor='none'
                                onPress={() => {
                                    setIsAutoStore(true);
                                    Board.setAutoStore(true);
                                }}>
                                <Text style={styles.subTextStyle}>
                                    자동저장 켜기
                                </Text>
                            </TouchableHighlight>
                        }

                    </View>

                </View>
                {isAutoStore === true ?
                    (allDelete === true ?
                        <NoListPage code={'noRecentSearch'} />
                        : <RecentWords props={recentWords} />)
                    :
                    <View style={styles.noAutoStore}>
                        <Text style={styles.noAutoStoreText}>
                            최근 검색 저장기능이 꺼져 있습니다.
                        </Text>
                    </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchPageMain: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 15
    },

    recommend: {
        flex: 2,
        flexDirection: 'column',
        marginBottom: -30
    },

    recommendText: {
        fontWeight: 'bold',
        color: 'dimgray',
        fontSize: Platform.OS === 'ios' ? 11 : 13,
        alignSelf: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: 10
    },

    recommendTag: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 10
    },
    recentSearch: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 15 : 0
    },

    recentSearchText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    mainText: {
        flex: 5,
        paddingLeft: 20,
        fontWeight: 'bold',
        color: 'dimgray',
        fontSize: Platform.OS === 'ios' ? 11 : 13
    },

    subText: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingRight: 10,
        paddingTop: 3
    },

    subTextStyle: {
        fontWeight: 'bold',
        color: 'silver',
        fontSize: Platform.OS === 'ios' ? 10 : 12
    },

    vertical: {
        height: 12,
        alignSelf: 'center',
        borderLeftColor: 'lightgray',
        borderLeftWidth: 1,
        marginLeft: 5,
        marginRight: 5
    },

    noAutoStore: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 50
    },

    noAutoStoreText: {
        color: 'silver',
        fontWeight: '600',
        fontSize: Platform.OS === 'ios' ? 11 : 14,
        paddingLeft: 20
    },
})
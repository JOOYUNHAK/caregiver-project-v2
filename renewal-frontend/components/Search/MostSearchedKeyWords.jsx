//많이 검색한 단어 뿌리기

import { StackActions, useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import { TouchableHighlight } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import requestSearchResult from "../../api/Search/requestSearchResult";
import { storeSearchValue } from "../../functions/Search";
import { saveMostKeyWord, saveSearchValue } from "../../redux/action/search/searchAction";

export default function MostSearchedKeyWords() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { mostSearchedKeyWords, keyWordsUpdateTime, mostKeyWordsLoading } = useSelector(state => ({
        mostSearchedKeyWords: state.search.mostSearchedKeyWords,
        keyWordsUpdateTime: state.search.keyWordsUpdateTime,
        mostKeyWordsLoading: state.search.mostKeyWordsLoading
    }));

    const onPressEachKeyword = (keyWord) => {
        dispatch(saveMostKeyWord(true)); //인기 검색어는 다시 카운트에 포함시키지 않기 위해
        navigation.dispatch(
            StackActions.push(
                'searchResultPage'
            )
        )
        dispatch(saveSearchValue(keyWord)) // 현재 검색한 단어 저장
        requestSearchResult();
        storeSearchValue(keyWord) //최근 검색어에 저장
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableHighlight
                key={item.profileId}
                underlayColor='none'
                onPress={() => onPressEachKeyword(item)}
                style={styles.keyWordsList}
            >
                <Text style={styles.keyWordText}>
                    {item}
                </Text>
            </TouchableHighlight>
        )
    }

    return (
        <View style={styles.mostSearchedKeyWords}>
            <Text style={styles.headerText}>
                보호자들이 이런 키워드를{"\n"}
                가진 간병인을 많이 찾고 있어요!
            </Text>
            {
                mostKeyWordsLoading ?
                    <View style={styles.loading}>
                        <ActivityIndicator size='small' color='rgba(65, 92, 118, 0.85)' />
                    </View>
                    :
                    <>
                        <Text style={styles.updateTime}>
                            {keyWordsUpdateTime} 기준
                        </Text>

                        <FlatList
                            enableOnAndroid={true}
                            horizontal={true}
                            keyboardShouldPersistTaps='handled'
                            style={{ marginHorizontal: 10 }}
                            data={mostSearchedKeyWords}
                            renderItem={renderItem}
                            showsHorizontalScrollIndicator={false}
                        />
                    </>
            }

        </View>
    );
}

const styles = StyleSheet.create({

    mostSearchedKeyWords: {
        height: hp('16%'),
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 5
    },

    mostSearchedKeyWordsHeader: {
        paddingHorizontal: 15,
    },

    headerText: {
        fontWeight: 'bold',
        fontSize: Platform.OS === 'ios' ? 11 : 16,
        paddingHorizontal: 15
    },

    keyWordsList: {
        alignSelf: 'center',
        marginTop: 15,
        borderWidth: 1,
        borderColor: 'white',
        marginHorizontal: 5,
        backgroundColor: 'rgba(90, 186, 118, 0.1)',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 4,
    },

    keyWordText: {
        fontSize: 15,
        color: '#5aba76',
    },

    updateTime: {
        marginTop: 5,
        fontSize: 14,
        color: '#7b7b7b',
        paddingHorizontal: 15
    },

    loading: {
        alignSelf: 'center',
        width: widthPercentageToDP('100%'),
        marginTop: 30,
    }

})

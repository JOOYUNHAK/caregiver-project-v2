import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform
} from "react-native";
import Icon from "../../Icon";
import { FlatList } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneWord, storeSearchValue } from "../../../functions/Search";
import { StackActions, useNavigation } from "@react-navigation/native";
import { saveSearchValue } from "../../../redux/action/search/searchAction";
import requestSearchResult from "../../../api/Search/requestSearchResult";


export default function RecentKeywords() {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { recentSearchKeywords } = useSelector(state => ({
        recentSearchKeywords: state.search.recentSearchKeywords
    }));

    const onPressEachKeyword = async ( item ) => {
        navigation.dispatch(
            StackActions.push(
                'searchResultPage'
            )
        )
        dispatch(saveSearchValue(item));
        requestSearchResult();
        storeSearchValue( item );
    }


    const renderItem = ({ item }) => {
        return (
            <View style={styles.keyWords}>
                <TouchableHighlight
                    key={item}
                    underlayColor='none'
                    onPress={() => onPressEachKeyword(item)}
                    style={{
                        paddingHorizontal: 6,
                    }}
                >
                    <Text style={styles.keyWordText}>
                        {item}
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    underlayColor='none'
                    onPress={() => deleteOneWord(recentSearchKeywords, item)}
                >
                    <Icon props={['feather', 'x', 18, 'orange']} />
                </TouchableHighlight>
            </View>
        );
    }

    return (
        <FlatList
            enableOnAndroid={true}
            horizontal={true}
            keyboardShouldPersistTaps='handled'
            style={{ height: '70%', marginHorizontal: 10 }}
            ListEmptyComponent={
                <View style={styles.noAutoStore}>
                    <Text style={styles.noAutoStoreText}>
                        검색 내역이 없습니다.
                    </Text>
                </View>
            }
            data={recentSearchKeywords}
            extraData={recentSearchKeywords}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({

    keyWords: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '60%',
        marginHorizontal: 3,
        borderWidth: 1,
        paddingHorizontal: 8,
        backgroundColor: '#fff7f2',
        borderColor: 'white',
        borderRadius: 20,
        marginTop: 15,
    },

    keyWordText: {
        fontSize: 14,
        color: 'orange',
    },

    noAutoStore: {
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    noAutoStoreText: {
        color: 'silver',
        fontWeight: '400',
        fontSize: Platform.OS === 'ios' ? 11 : 14,
    },
})
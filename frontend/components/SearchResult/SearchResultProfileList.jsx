/* 검색 결과 프로필 리스트 */

import { useState } from "react";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { FlatList } from "react-native";
import { useSelector } from "react-redux"
import requestSearchResult from "../../api/Search/requestSearchResult";
import SearchResultProfile from "../FindHelper/EachHelper/Profile";
import Icon from "../Icon";
import SearchResultInfo from "./SearchResultInfo";

export default function SearchResultProfileList() {
    const { resultProfile } = useSelector(state => ({
        resultProfile: state.search.resultProfile,
    }));

    const [showTopBtn, setShowTopBtn] = useState(false);
    let listViewRef;

    function _ScrollToTop() {
        listViewRef.scrollToOffset({ offset: 0, animated: true });
        setShowTopBtn(false);
    }

    function _showButton(e) {
        (e.nativeEvent.contentOffset.y - 0 > 200) ? setShowTopBtn(true) : setShowTopBtn(false);
    }

    return (
        <>
            <FlatList
                ListHeaderComponent={
                    <SearchResultInfo />
                }
                data={resultProfile}
                renderItem={({ item }) =>
                    <SearchResultProfile item={item} key={item.id} />
                }
                onEndReachedThreshold = {0.1}
                onEndReached = {async ({ distanceFromEnd }) => {
                    ( distanceFromEnd < -30 ) ? null : await requestSearchResult();

                }}
                onScrollEndDrag={_showButton}
                ref={(ref) => {
                    listViewRef = ref;
                }}
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
            />
            {
                showTopBtn ?
                    <TouchableHighlight
                        style={styles.TopBtn}
                        underlayColor='whitesmoke'
                        onPress={_ScrollToTop}>
                        <Icon props={['antdesign', 'arrowup', 25, 'dimgray']} />
                    </TouchableHighlight> 
                    : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    flatList: {
        paddingTop: 0,
        backgroundColor: 'white',
        marginTop: 5,
    },

    TopBtn: {
        position: 'absolute',
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        bottom: 10,
        borderColor: 'whitesmoke',
        borderWidth: 2,
        borderRadius: 150,
        right: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 3
    },
})
/* 검색 결과 페이지 */

import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../components/StatusBarComponent";
import SearchHeader from '../components/Search/SearchHeader';
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import SearchResultProfileList from "../components/SearchResult/SearchResultProfileList";
import SearchSelectFilter from '../components/SearchResult/SearchSelectFilter';
import { View } from "react-native";
import Icon from "../components/Icon";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Text } from "react-native";

export default function SearchResult() {
    const { searchLoading, isBlocked } = useSelector(state => ({
        searchLoading: state.search.searchLoading,
        isBlocked: state.search.isBlocked
    }))

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <SearchHeader />
            {
                isBlocked ?
                    <View style={{ 
                        width: widthPercentageToDP('100%'), 
                        marginTop: 150, 
                        alignItems: 'center' 
                        }}>
                        <Icon props={['material', 'highlight-off', 80, 'darkgray']} />
                        <Text style={styles.NoListText}>
                            해당 단어로 검색할 수 없어요
                        </Text>
                        <Text style={{ color: '#7a7a7a', marginTop: 5 }}>
                            검색어를 변경해보세요
                        </Text>
                    </View>
                    :
                    <>
                        <SearchSelectFilter />
                        {searchLoading ?
                            <Loading /> :
                            <SearchResultProfileList />}
                    </>
            }
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
    },

    NoListText: {
        marginTop: 20,
        fontSize: Platform.OS === 'ios' ? 11 : 17,
        fontWeight: '400',
        color: 'black'
      },
})
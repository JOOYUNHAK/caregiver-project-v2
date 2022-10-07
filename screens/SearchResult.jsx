/* 검색 결과 페이지 */

import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../components/StatusBarComponent";
import SearchHeader from '../components/Search/SearchHeader';
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import SearchResultProfileList from "../components/SearchResult/SearchResultProfileList";
import SearchSelectFilter from '../components/SearchResult/SearchSelectFilter';

export default function SearchResult() {

    const { searchLoading } = useSelector(state => ({
        searchLoading: state.search.searchLoading
    }))

    return(
        <SafeAreaView style = {styles.container}>
            <StatusBarComponent />
            <SearchHeader />
            <SearchSelectFilter />
            {
                searchLoading ?
                    <Loading /> :
                    <SearchResultProfileList />
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
})
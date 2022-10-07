/* 필터가 있을 경우 초기화 버튼 */

import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { Text } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import requestProfileList from "../../../api/Profile/requestProfileList";
import requestSearchResult from "../../../api/Search/requestSearchResult";
import { refreshProfileList, resetMainFilters, setNoData } from "../../../redux/action/profile/profileAction";
import { refreshSearchProfileList, resetSearchMainFilters, setSearchNoData } from "../../../redux/action/search/searchAction";
import Icon from "../../Icon";

export default function ResetFilter({ scrollRef }) {
    const dispatch = useDispatch();
    const { name } = useRoute();
    const { mainFilter, payFilter, startDateFilter } = useSelector(state => ({
        mainFilter: name === 'searchResultPage' ? 
            state.search.filters.mainFilter :
            state.profile.filters.mainFilter,
        payFilter: name === 'searchResultPage' ? 
            state.search.filters.payFilter :
            state.profile.filters.payFilter,
        startDateFilter: name === 'searchResultPage' ? 
            state.search.filters.startDateFilter : 
            state.profile.filters.startDateFilter
    }),
    shallowEqual
    );

    const resetMainFilter = async () => {
        if( name === 'searchResultPage') {
            dispatch(setSearchNoData(false));
            dispatch(resetSearchMainFilters());
            dispatch(refreshSearchProfileList());
            await requestSearchResult();
        } else {
            dispatch(setNoData(false));
            dispatch(resetMainFilters());
            dispatch(refreshProfileList('careGiver'));
            await requestProfileList('careGiver');
        }
    }

    useEffect(() => {
        scrollRef.current.scrollTo({x: 0})
    },[resetMainFilter])

    return (
        <>
            {mainFilter === '기본순' && payFilter === '일당' && startDateFilter === '시작가능일' ? null :
                <TouchableHighlight
                    onPress={resetMainFilter}
                    style={styles.resetFilter}
                    underlayColor='none'
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Icon props={['font-awesome', 'rotate-left', 13, '#726c88']} />

                        <Text style={styles.resetText}>
                            초기화
                        </Text>
                    </View>
                </TouchableHighlight>}
        </>
    )
}
const styles = StyleSheet.create({
    resetFilter: {
        marginLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },

    resetText: {
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 2,
        color: '#726c88'
    }
})
/* 기타필터가 있을 경우 초기화 버튼 */

import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { Text } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import requestProfileList from "../../../api/Profile/requestProfileList";
import requestSearchResult from "../../../api/Search/requestSearchResult";
import { refreshProfileList, resetFilter, savePreviousFilter, setNoData } from "../../../redux/action/profile/profileAction";
import { refreshSearchProfileList, resetSearchFilter, savePreviousSearchFilter, setSearchNoData } from "../../../redux/action/search/searchAction";
import Icon from "../../Icon";

export default function ResetEtcFilter({ scrollRef }) {
    const dispatch = useDispatch();
    const { name } = useRoute();

    const { sexFilter, ageFilter, areaFilter,
        licenseFilter, warningFilter, strengthFilter } = useSelector(state => ({
            sexFilter: name === 'searchResultPage' ?
                state.search.filters.sexFilter :
                state.profile.filters.sexFilter,
            ageFilter: name === 'searchResultPage' ?
                state.search.filters.ageFilter :
                state.profile.filters.ageFilter,
            areaFilter: name === 'searchResultPage' ?
                state.search.filters.areaFilter :
                state.profile.filters.areaFilter,
            licenseFilter: name === 'searchResultPage' ?
                state.search.filters.licenseFilter :
                state.profile.filters.licenseFilter,
            warningFilter: name === 'searchResultPage' ?
                state.search.filters.warningFilter :
                state.profile.filters.warningFilter,
            strengthFilter: name === 'searchResultPage' ?
                state.search.filters.strengthFilter :
                state.profile.filters.strengthFilter,
        }),
            shallowEqual
        );

    const resetEtcFilter = async () => {
        if (name === 'searchResultPage') {
            dispatch(setSearchNoData(false));
            dispatch(resetSearchFilter());
            dispatch(savePreviousSearchFilter());
            dispatch(refreshSearchProfileList());
            await requestSearchResult();
        } else {
            dispatch(setNoData(false));
            dispatch(resetFilter());
            dispatch(savePreviousFilter());
            dispatch(refreshProfileList('careGiver'));
            await requestProfileList('careGiver');
        }
    }

    useEffect(() => {
        scrollRef.current.scrollToEnd();
    }, [resetEtcFilter])

    return (
        <>
            {!sexFilter && ageFilter === '나이' && areaFilter.length == 0
                && licenseFilter.length == 0 && !warningFilter && !strengthFilter ? null :
                <TouchableHighlight
                    onPress={resetEtcFilter}
                    style={styles.resetFilter}
                    underlayColor='none'
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Icon props={['font-awesome', 'rotate-left', 13, '#726c88']} />

                        <Text style={styles.resetText}>
                            기타 필터 초기화
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
/* 필터가 있을 경우 초기화 버튼 */

import { useEffect } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native";
import { Text } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import requestProfileList from "../../../api/Profile/requestProfileList";
import { refreshProfileList, resetMainFilters } from "../../../redux/action/profile/profileAction";
import Icon from "../../Icon";

export default function ResetFilter({ scrollRef }) {
    const dispatch = useDispatch();
    const { mainFilter, payFilter, startDateFilter } = useSelector(state => ({
        mainFilter: state.profile.filters.mainFilter,
        payFilter: state.profile.filters.payFilter,
        startDateFilter: state.profile.filters.startDateFilter
    }),
    shallowEqual
    );

    const resetMainFilter = async () => {
        dispatch(resetMainFilters());
        dispatch(refreshProfileList('careGiver'));
        await requestProfileList('careGiver');
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
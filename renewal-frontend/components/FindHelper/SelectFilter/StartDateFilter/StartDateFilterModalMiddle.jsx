/* 시작가능일 필터 모달 중간 부분 */

import { useRoute } from "@react-navigation/native"
import { Text } from "react-native"
import { StyleSheet } from "react-native"
import { TouchableHighlight } from "react-native"
import { View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import requestProfileList from "../../../../api/Profile/requestProfileList"
import requestSearchResult from "../../../../api/Search/requestSearchResult"
import { StartDateExample } from "../../../../data/Filter"
import { refreshProfileList, saveStartDateFilter, setNoData } from "../../../../redux/action/profile/profileAction"
import { refreshSearchProfileList, saveSearchStartDateFilter, setSearchNoData } from "../../../../redux/action/search/searchAction"
import Icon from "../../../Icon"

export default function StartDateFilterModalMiddle({ setVisible }) {
    const dispatch = useDispatch();
    const { name } = useRoute();

    let { startDateFilter } = useSelector(state => ({
        startDateFilter: name === 'searchResultPage' ?
            state.search.filters.startDateFilter :
            state.profile.filters.startDateFilter
    }))

    if (startDateFilter === '시작가능일')
        startDateFilter = '전체날짜';

    const pressStartDate = async (title) => {
        if (startDateFilter === title)
            setVisible(false);
        else {
            setVisible(false);
            if (name === 'searchResultPage') {
                dispatch(setSearchNoData(false));
                dispatch(saveSearchStartDateFilter(title));
                dispatch(refreshSearchProfileList());
                await requestSearchResult();
            } else {
                dispatch(setNoData(false));
                dispatch(saveStartDateFilter(title));
                dispatch(refreshProfileList('careGiver'));
                await requestProfileList('careGiver');
            }
        }
    }

    return (
        <View style={styles.modalMiddle}>
            {StartDateExample.map((example) => {
                return (
                    <TouchableHighlight
                        key={example.id}
                        style={{
                            paddingHorizontal: 30,
                            marginVertical: 6,
                            paddingVertical: 15
                        }}
                        underlayColor='none'
                        onPress={() => pressStartDate(example.title)}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontWeight: startDateFilter === example.title ? '700' : '400',
                                color: startDateFilter === example.title ? '#94c6ad' : 'black'
                            }}>
                                {example.title}
                            </Text>
                            {startDateFilter === example.title ?
                                <View style={{ position: 'absolute', right: 0, alignSelf: 'center' }}>
                                    <Icon props={['material', 'done', 24, '#94c6ad']} />
                                </View> :
                                null
                            }
                        </View>
                    </TouchableHighlight>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    modalMiddle: {
        width: '100%',
        height: 'auto',
        justifyContent: 'space-around',
        paddingVertical: 10
    }
})
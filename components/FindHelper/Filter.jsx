/* 각각의 정렬 기준들 */

import React from 'react';
import {
    TouchableHighlight,
    StyleSheet,
    View,
    Text,
    Platform,
} from 'react-native';

export default function Filter(props) {

    const isSelected = props.props[0]; //어떤기준이 선택되었는지
    const setisSelected = props.props[1]; // 그 기준을 true값으로
    const setSort = props.props[2]; //기준 정렬을 선택된 기준 정렬 값으로 바꿔주기
    const sortStandard = props.props[3]; //기준 정렬 값
    const selectText = props.props[4]; //사용자에게 보여지는 기준 정렬 문구
    const remainArr = props.props[5]; // 선택된 기준 제외하고 나머지 기준은 false로 변경
    const scrollRef = props.props[6];

    const changeSort = () => {
        setSort(sortStandard);
        remainArr.map(eachFunction => {
            eachFunction(false);
        });
    }

    const onPressHandler = () => {
        setisSelected(true);
        changeSort();
        switch ( sortStandard ) {
            case 'normal' :
                scrollRef.current.scrollTo({x: 10});
                break;
            case 'highGrade':
                scrollRef.current.scrollTo({x: 30});
                break;
            case 'viewHigh':
                scrollRef.current.scrollTo({x: 70});
                break;
            case 'ageLow':
            case 'ageHigh':
                scrollRef.current.scrollTo({x: 150});
                break;
        }
    }

    return (
    
        <TouchableHighlight
            underlayColor='none'
            onPress={() => onPressHandler()}
            style={styles(isSelected).filterOutLine}
        >
            <View >
                <Text style={styles(isSelected).filterText}>
                    {selectText}
                </Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = (isSelected) => StyleSheet.create({

    filterOutLine: {
        flex: 3,
        borderRadius: 20,
        marginRight: 5,
        backgroundColor: isSelected ? 'peachpuff' : 'white'
    },

    filterText: {
        textAlign: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: Platform.OS === 'ios' ? 7 : 5,
        color: isSelected ? 'orange' : 'silver',
        fontWeight: isSelected ? 'bold' : '500',
        fontSize: Platform.OS === 'ios' ? 11 : 13
    }

})
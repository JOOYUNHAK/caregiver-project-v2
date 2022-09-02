/* 정렬 기준들 */

import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import Filter from './Filter';


export default function SelectFilter(props) {
    const setSortStandard = props.props;

    const [sort, setSort] = useState('normal');
    const [selectNormal, setSelectNormal] = useState(true);
    const [selectAgeHigh, setSelectAgeHigh] = useState(false);
    const [selectAgeLow, setSelectAgeLow] = useState(false);
    const [selectGrade, setSelectGrade] = useState(false);
    const [selectView, setSelectView] = useState(false);

    
    const scrollRef = useRef(null);

    useEffect(() => {
        setSortStandard(sort)
    }, [sort]);

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref = {scrollRef}
        >
            <View style={styles.filters}>
                <Filter props={[selectNormal, setSelectNormal, setSort, 'normal', '기본순', 
                    [setSelectAgeHigh, setSelectAgeLow, setSelectGrade, setSelectView], scrollRef]} />
                
                <Filter props={[selectGrade, setSelectGrade, setSort, 'highGrade', '평점 높은 순', 
                    [setSelectAgeHigh, setSelectAgeLow, setSelectNormal, setSelectView],scrollRef]} />
                
                <Filter props={[selectView, setSelectView, setSort, 'viewHigh', '리뷰 많은 순', 
                    [setSelectGrade, setSelectAgeHigh, setSelectAgeLow, setSelectNormal], scrollRef]} />
                
                <Filter props={[selectAgeLow, setSelectAgeLow, setSort, 'ageLow', '나이 적은 순', 
                    [setSelectAgeHigh, setSelectGrade, setSelectNormal, setSelectView], scrollRef]} />
                
                <Filter props={[selectAgeHigh, setSelectAgeHigh, setSort, 'ageHigh', '지역', 
                    [setSelectGrade, setSelectAgeLow, setSelectNormal, setSelectView], scrollRef]} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    filters: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 15,
        height: 30,
    }
})
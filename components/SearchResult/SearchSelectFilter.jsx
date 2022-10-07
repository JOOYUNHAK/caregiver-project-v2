/* 검색 결과 메인 필터들 */

import React, { useState } from 'react';
import { useRef } from 'react';
import { ScrollView } from 'react-native';
import {
    StyleSheet,
    View,
} from 'react-native';
import FilterIcon from '../FindHelper/SelectFilter/FilterIcon';
import MainFilter from '../FindHelper/SelectFilter/MainFilter';
import PayFilter from '../FindHelper/SelectFilter/PayFilter';
import ResetEtcFilter from '../FindHelper/SelectFilter/ResetEtcFilter';
import ResetFilter from '../FindHelper/SelectFilter/ResetFilter';
import StartDateFilter from '../FindHelper/SelectFilter/StartDateFilter';

export default function SelectFilter() {

    const scrollRef = useRef(null);

    return (

        <View style={styles.filters}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled = {true}
                ref={scrollRef}
                contentContainerStyle = {{flexGrow: 1, paddingRight: 25}}
                style = {{ paddingLeft: 20, marginRight: 50}}
            >
                <ResetFilter scrollRef = {scrollRef}/>
                <MainFilter scrollRef = {scrollRef}/>
                <PayFilter scrollRef= {scrollRef}/>
                <StartDateFilter scrollRef= {scrollRef}/>
                <ResetEtcFilter scrollRef= {scrollRef}/>
            </ScrollView>
            <FilterIcon />
        </View>

    )
}

const styles = StyleSheet.create({
    filters: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
    }
})
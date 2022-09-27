/* 정렬 기준들 */

import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import FilterIcon from './SelectFilter/FilterIcon';
import MainFilter from './SelectFilter/MainFilter';
import PayFilter from './SelectFilter/PayFilter';
import StartDateFilter from './SelectFilter/StartDateFilter';


export default function SelectFilter() {

    const scrollRef = useRef(null);
    {/* <ScrollView
            horizontal={true}
            style={{ backgroundColor: 'white'}} //수정
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
        >
             </ScrollView> */}

    return (

        <View style={styles.filters}>
            <MainFilter />
            <PayFilter />
            <StartDateFilter />
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
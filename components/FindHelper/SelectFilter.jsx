/* 정렬 기준들 */

import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import {
    StyleSheet,
    View,
} from 'react-native';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FilterIcon from './SelectFilter/FilterIcon';
import MainFilter from './SelectFilter/MainFilter';
import PayFilter from './SelectFilter/PayFilter';
import ResetEtcFilter from './SelectFilter/ResetEtcFilter';
import ResetFilter from './SelectFilter/ResetFilter';
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
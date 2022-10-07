/* 검색 버튼 */

import React from "react";
import {
    View,
    TouchableOpacity,
} from 'react-native';
import { StackActions, useNavigation } from "@react-navigation/native";
import Icon from "../Icon.jsx";

export default function SearchBtn() {

    const navigation = useNavigation();

    return (
        <>
            <View>
                <TouchableOpacity onPress={() => navigation.dispatch (
                    StackActions.push('searchPage')
                )}>
                    <Icon props={['antdesign', 'search1', 20, 'black']} />
                </TouchableOpacity>
            </View>
        </>
    )
}
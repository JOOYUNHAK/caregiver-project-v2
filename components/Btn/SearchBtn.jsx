/* 검색 버튼 */

import React from "react";
import {
    View,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as Board from "../../functions/Search.js";
import Icon from "../Icon.jsx";

export default function SearchBtn() {

    const navigate = useNavigation();
    
    //검색 페이지로 이동 할 때 데이터와 자동저장 여부를 받아서 넘겨줌
    const toSearch = async () => {
        const data = await Board.getStoreWords();
        const autoStore = await Board.getAutoStore();

        navigate.push('searchPage', {
            'data': [
                data,
                autoStore
            ]
        });
    }

    return (
        <>
            <View>
                <TouchableOpacity onPress={() => toSearch()}>
                    <Icon props={['antdesign', 'search1', 20, 'red']} />
                </TouchableOpacity>
            </View>
        </>
    )
}
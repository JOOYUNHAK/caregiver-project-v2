/* 각 페이지 별 뒤로가기 버튼 */
import React from 'react';
import {TouchableHighlight} from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from '../Icon';

export default function ({ navigation, type }) {
    const dispatch = useDispatch();
    const onPressBackBtn = () => {
        if(type === 'secondRegisterReset') {
           /*  dispatch(secondRegisterReset()); */
            navigation.pop();
        }
        else
            navigation.pop();
    }

    return (
        <TouchableHighlight
            underlayColor='none'
            onPress={() => onPressBackBtn()}
            style={{ marginLeft: 10 }}>
            <Icon props={['antdesign', 'arrowleft', 24, '#94c6ad']} />
        </TouchableHighlight>
    )
}
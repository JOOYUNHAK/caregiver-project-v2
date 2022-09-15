/* 각 페이지 별 뒤로가기 버튼 */
import React from 'react';
import {TouchableHighlight} from 'react-native';
import Icon from '../Icon';
import { useDispatch } from 'react-redux';
import { secondRegisterReset } from '../../redux/action/register/secondRegisterAction';
import { confirmRegisterInfoReset, lastRegisterReset } from '../../redux/action/register/lastRegisterAction';
import { CommonActions, StackActions } from '@react-navigation/native';

export default function BackBtn ({ navigation, type }) {
    const dispatch = useDispatch();
    const onPressBackBtn = () => {
        switch(type) {
            case 'secondRegisterReset' :        //2번째 페이지에서 뒤로가기 버튼( 2번째 작성 전부 리셋 )
                dispatch(secondRegisterReset());
            case 'lastRegisterReset' :
                dispatch(lastRegisterReset());
            case 'confirmRegisterInfoReset' :
                dispatch(confirmRegisterInfoReset());
                navigation.pop()
                break;
            case 'findAddress':
                navigation.dispatch(
                    StackActions.pop()
                )
                break;
            case 'default':
                navigation.dispatch(
                    CommonActions.goBack()
                )
                break;
            
        }
    }

    return (
        <TouchableHighlight
            underlayColor='none'
            onPress={() => onPressBackBtn()}
            style={{ marginLeft: 10, marginTop: 1 }}>
            <Icon props={['antdesign', 'arrowleft', 24, 'black']} />
        </TouchableHighlight>
    )
}
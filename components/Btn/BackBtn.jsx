/* 각 페이지 별 뒤로가기 버튼 */
import React from 'react';
import {TouchableHighlight} from 'react-native';
import Icon from '../Icon';
import { useDispatch } from 'react-redux';
import { secondRegisterReset } from '../../redux/action/register/secondRegisterAction';
import { confirmRegisterInfoReset, lastRegisterReset } from '../../redux/action/register/lastRegisterAction';

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

            navigation.pop();
        }
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
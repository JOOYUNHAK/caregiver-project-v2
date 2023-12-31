/* 각 페이지 별 뒤로가기 버튼 */
import React from 'react';
import {TouchableHighlight} from 'react-native';
import Icon from '../Icon';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import { patientInfoReset } from '../../redux/action/register/patientInfoAction';
import { caregiverInfoReset } from '../../redux/action/register/caregiverInfoAction';
import { thirdRegisterReset } from '../../redux/action/register/caregiverThirdRegisterAction';
import { lastRegisterReset } from '../../redux/action/register/caregiverLastRegisterAction';

export default function BackBtn ({ navigation, type }) {
    const dispatch = useDispatch();
    const { purpose } = useSelector(
        state => ({
            purpose: state.firstRegister.user.purpose,
    }))
    const onPressBackBtn = () => {
        switch(type) {
            case 'secondRegisterReset' :        //2번째 페이지에서 뒤로가기 버튼( 2번째 작성 전부 리셋 )
                purpose === 'protector' ? dispatch(patientInfoReset()) : dispatch(caregiverInfoReset());
            case 'lastRegisterReset' :
                dispatch(thirdRegisterReset());
            case 'confirmRegisterInfoReset' :
                dispatch(lastRegisterReset());
                navigation.pop()
                break;
            case 'findAddress':
                navigation.dispatch(
                    StackActions.pop()
                )
                break;
            case 'default':
                navigation.dispatch(
                    StackActions.pop()
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
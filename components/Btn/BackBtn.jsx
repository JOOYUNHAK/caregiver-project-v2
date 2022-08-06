/* 각 페이지 별 뒤로가기 버튼 */
import React from 'react';
import {TouchableHighlight} from 'react-native';
import Icon from '../Icon';

export default function ({ navigation }) {
    return (
        <TouchableHighlight
            underlayColor='none'
            onPress={() => navigation.pop()}
            style={{ marginLeft: 10 }}>
            <Icon props={['antdesign', 'arrowleft', 24, 'red']} />
        </TouchableHighlight>
    )
}
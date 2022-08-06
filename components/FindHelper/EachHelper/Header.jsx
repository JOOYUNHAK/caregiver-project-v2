/* 가게 정보를 확인하는 버튼 */
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Platform,
} from 'react-native';
import Icon from '../../Icon';

export default function Header(props) {
    const helperProfileData = props.props;
    
    return (
        <View style={styles.header}>

            <View style={styles.name}>
                    <Text style={styles.nameText}>
                        김진수님
                    </Text>
                    
            </View>

            <TouchableHighlight underlayColor='none' onPress={() => console.log('hi')}>
                <View style={styles.confirmProfileBtn}>
                    <Icon props={['antdesign', 'search1', 15, '#94c6ad']} />
                    <Text style={styles.confirmProfileBtnText}>
                        프로필 더 볼래요
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row', 
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 10 : 0,
        flex: 2,
    },

    name: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 25,
        flex: 4
    },

    nameText: {
        fontSize: Platform.OS === 'ios' ? 15 : 18,
        fontWeight: 'bold',
        marginLeft: 3,
        color: '#94c6ad', //접속 안할 땐 powderblue
        
    },

    confirmProfileBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20,
        borderRadius: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        paddingBottom: 6,
        backgroundColor: 'hsla(307, 20%, 95%, 0.4)'
    },

    confirmProfileBtnText: {
        fontWeight: '500',
        fontSize: Platform.OS === 'ios' ? 11 : 13,
        color: '#94c6ad',
        overflow: 'hidden',
        marginLeft: 3
    },

});
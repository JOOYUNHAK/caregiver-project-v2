/* 사용자 정보를 확인하는 버튼 */
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Platform,
} from 'react-native';
import Icon from '../../Icon';
import { StackActions, useNavigation } from "@react-navigation/native";

export default function Header({ profile }) {
    const navigation = useNavigation();

    const { user } = profile;

    return (
        <View style={header().header}>
            <View style={{ flex: 2 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.name}>
                        <Text style={styles.nameText}>
                            {user.name}
                        </Text>
                        <Text style={styles.subInfoText}>
                            {user.sex}, {user.age}세
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableHighlight
                underlayColor='none'
                onPress={() => navigation.dispatch(
                    StackActions.push('helperProfilePage', {
                        name: user.name,
                        profileId: profile.profile.id ,
                    })
                )}>
                <View style={styles.confirmProfileBtn}>
                    <Icon props={['antdesign', 'search1', 15, '#94c6ad']} />
                    <Text style={styles.confirmProfileBtnText}>
                        프로필 상세보기
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({

    name: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 25,
        flex: 4
    },

    nameText: {
        fontSize: Platform.OS === 'ios' ? 15 : 17,
        fontWeight: '600',
        marginLeft: 3,
        color: 'black', //접속 안할 땐 powderblue
    },

    subInfoText: {
        color: '#5a5a5a',
        fontWeight: '500',
        marginLeft: 7,
        fontSize: 13,
        paddingTop: 1
    },

    subTagText: {
        fontSize: 10,
        fontWeight: '600',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 5,
        marginLeft: 3,
        paddingVertical: 2
    },

    confirmProfileBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20,
        borderRadius: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 6,
        backgroundColor: 'hsla(307, 20%, 95%, 0.4)'
    },

    confirmProfileBtnText: {
        fontWeight: '500',
        fontSize: Platform.OS === 'ios' ? 10 : 12,
        color: '#94c6ad',
        overflow: 'hidden',
        marginLeft: 3
    },
});

const header = () => StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: Platform.OS === 'ios' ? 25 : 15,
        flex: 1
    },
})
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
import { getAge, possibleAreaRange } from '../../../functions/Profile/profileFunctions';
import { StackActions, useNavigation } from "@react-navigation/native";

export default function Header({ profile }) {
    const navigation = useNavigation();
    // 기본 프로필 목록과 나의 찜 프로필 목록 데이터가 다르므로
    const age = getAge(profile.birth);
    const exceedArea = possibleAreaRange(profile.possibleArea);
    
    const name = profile.name;
    const sex =  profile.sex;
    const isCertified = profile.isCertified;

    return (
        <View style={header(exceedArea, isCertified).header}>
            <View style={{ flex: 2 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.name}>
                        <Text style={styles.nameText}>
                            {name}
                        </Text>
                        <Text style={styles.subInfoText}>
                            {sex}, {age}세
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 25, marginTop: 3 }}>
                    {exceedArea ?
                        <Text style={styles.subTagText}>
                            가능 지역 넓음
                        </Text> : null
                    }
                    {isCertified ?
                        <Text style={styles.subTagText}>
                            자격증 보유
                        </Text> : null
                    }
                </View>
            </View>

            <TouchableHighlight
                underlayColor='none'
                onPress={() => navigation.dispatch(
                    StackActions.push('helperProfilePage', {
                        purpose: profile.purpose,
                        profileId: profile.id ,
                        name: name
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

const header = (equalPay, exceedArea, isCertified) => StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: Platform.OS === 'ios' ? 25 : 15,
        flex: exceedArea || isCertified ? 1 : 0.8,
    },
})
/* 내 정보 내 프로필 수정 프로필 부분 */

import { StackActions } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Switch } from "react-native";
import { TouchableHighlight } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import Icon from "../Icon";
import PrivateSetting from "./Profile/PrivateSetting";

export default function UserProfile({ navigation }) {
    
    const { purpose, isCertified } = useSelector(state => ({
        purpose: state.user.purpose,
        isCertified: state.user.isCertified
    })) 

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <View style={styles.headerText}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                    프로필
                </Text>
                <Text style={styles.accountInfo}>
                    회원님이 작성한 프로필을 관리하고, 공개 여부를 설정해보세요.
                </Text>
            </View>

            <PrivateSetting navigation = {navigation}/>

            <View style={styles.eachPart}>
                <Text style={{ fontSize: 16, fontWeight: '400' }}>
                    프로필 수정
                </Text>
                <View style={styles.nextIcon}>
                    <Icon props={['material', 'navigate-next', 33, 'silver']} />
                </View>
            </View>

            {purpose === '보호자' ? null :
            <TouchableHighlight
                underlayColor='whitesmoke'
                onPress={() => navigation.dispatch(
                    StackActions.push('certificatePage')
                )}
            >
                <View style={styles.eachPart}>
                    <Text style={{ fontSize: 16, fontWeight: '400' }}>
                        자격증 관리
                    </Text>
                    <View style={styles.nextIcon}>
                        <Icon props={['material', 'navigate-next', 33, 'silver']} />
                    </View>
                </View>
            </TouchableHighlight>
            }
        </View>
    )
}

const styles = StyleSheet.create({

    headerText: {
        paddingTop: 15,
        height: hp('8%'),
        borderTopColor: 'silver',
        borderTopWidth: 0.7,
        marginTop: 15
    },

    accountInfo: {
        fontSize: 13,
        color: 'darkgray',
        fontWeight: '600',
        paddingLeft: 1,
        paddingTop: 2
    },

    eachPart: {
        flexDirection: 'row',
        height: hp('7%'),
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15,
    },

    nextIcon: {
        position: 'absolute',
        right: 0,
        height: '100%',
        alignSelf: 'center',
        paddingRight: 4
    }
})
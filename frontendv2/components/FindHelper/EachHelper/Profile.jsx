/* 각 사용자 홍보 프로필 */
import React from "react";
import {
    StyleSheet,
    View,
    Platform
} from 'react-native';
import Content from "./Content"

export default function Profile({ item }) {
    const profile = item;
    return (
        <>
            <View style={styles.profile}>
                <Content profile={profile} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    profile: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        height: Platform.OS === 'ios' ? 170 : 240,
        flexDirection: 'row',
        borderRadius: 15,
        borderTopColor: 'silver',
        borderTopWidth: 0.2,
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 10,
                    height: 10,
                },
                shadowOpacity: 0.5,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
                shadowColor: 'darkgray'
            }
        })

    },
})
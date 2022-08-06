/* 각 가게의 홍보 프로필 */
import React from "react";
import {
    StyleSheet,
    View,
    Platform
} from 'react-native';
import Content from "./Content"

export default function Profile(props) {
    const helperProfile = props.list;
    return (
        <>
            <View style={styles.profile}>
                <Content list={helperProfile} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    profile: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        height: Platform.OS === 'ios' ? 170 : 230,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
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
                elevation: 15,
                shadowColor: 'silver'
            }
        })
    
    },
})
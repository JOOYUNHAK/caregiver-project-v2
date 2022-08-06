/* 각 가게 홍보 프로필의 내용 */
import React from "react";
import {
    StyleSheet,
    View,

} from 'react-native';
import Header from "./Header";
import KeyWord from "./KeyWord";
import Info from "./Info";

export default function ProfileContent( props ) {
    const helperProfile = props.list;

    return (
        <>
            <View style={styles.profileContent}>
                <Header props = {helperProfile}/>
                <Info props = {helperProfile} />
                <KeyWord props = {helperProfile} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    profileContent: {
        flexDirection: 'column',
        flex: 1,
        paddingTop: 10
    },
});


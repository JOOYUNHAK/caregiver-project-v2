/* 각 사용자 프로필의 내용 */
import React from "react";
import {
    StyleSheet,
    View,

} from 'react-native';
import Header from "./Header";
import KeyWord from "./KeyWord";
import Info from "./Info";
import Notice from "./Notice";

export default function ProfileContent({ profile }) {

    return (
        <>
            <View style={styles.profileContent}>
                <Header profile = {profile}/>
                <Info profile = {profile} />
                <KeyWord profile = {profile} />
                <Notice profile = {profile} />
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


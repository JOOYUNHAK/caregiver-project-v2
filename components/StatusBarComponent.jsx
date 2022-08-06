import React from "react";
import { Platform, StatusBar } from "react-native";

export default function StatusBarComponent() {
    return (
        <>
            {Platform.OS === 'android' ?
                <StatusBar backgroundColor='white' barStyle='dark-content' />
                : <StatusBar barStyle='dark-content' />}
        </>
    );
}
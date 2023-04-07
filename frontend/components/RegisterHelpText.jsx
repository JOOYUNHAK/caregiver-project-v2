/* 회원가입 문항별 작성 도움 안내 Text */

import { StyleSheet, Text, View } from "react-native";
import Icon from "./Icon";

export default function RegisterHelpText({ helpText }) {
    return (
        <View style={styles.helpText}>
            <Icon props={['font-awesome', 'exclamation', 15, 'silver']} />
            <Text style={{ paddingLeft: 3, color: 'silver', fontSize: 13 }}>
                {helpText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({

    helpText: { 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        marginTop: 5,
    },
})
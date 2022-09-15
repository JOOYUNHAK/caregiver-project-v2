/* 각 사용자가 설정한 3가지 키워드 */
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Platform,
} from 'react-native';

export default function KeyWord({ profile }) {
    let keywords = profile.keywords.split(',');
    
    return (
        <View style={styles.keyWords}>
            {keywords.map((keywords, index) => {
                return (
                    <View key={index} style={styles.keyWordStyle}>
                        <Text style={styles.keyWordTextStyle}>
                            {keywords}
                        </Text>
                    </View>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({

    keyWords: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 5,
    },

    keyWordStyle: {
        flex: 2,
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#fff7f2',  
        alignItems: 'center'
    },

    keyWordTextStyle: {
        color: 'orange',
        fontSize: Platform.OS === 'ios' ? 10 : 13,
        paddingVertical: 5

    }
});
/* 각 가게가 설정한 3가지 키워드 */
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Platform,
} from 'react-native';

export default function KeyWord(props) {
    const helperProfile = props.props;
    const keywords = []; //태그들만 배열에 담음
    keywords.push(helperProfile['keyword1']); 
    keywords.push(helperProfile['keyword2']); keywords.push(helperProfile['keyword3']);
    return (
        <View style={styles.keyWords}>
            {keywords.map((keywords, index) => {
                return (
                    <View key={index} style={styles.keyWordStyle}>
                        <Text style={styles.keyWordTextStyle}>
                            #{keywords}
                        </Text>
                    </View>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({

    keyWords: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5
    },

    keyWordStyle: {
        flex: 4,
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: 'hsla(307, 20%, 95%, 0.3)',  
        alignItems: 'center'
    },

    keyWordTextStyle: {
        color: 'orange',
        fontSize: Platform.OS === 'ios' ? 11 : 14,
        paddingTop: 5,
        paddingBottom: 5
    }
});
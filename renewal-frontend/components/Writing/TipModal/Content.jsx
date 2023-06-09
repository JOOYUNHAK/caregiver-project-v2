import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';
import * as Font from "expo-font";

export default function Content() {
    const [fontReady, setFontReady] = useState(false);

    //글꼴
    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                "jua": require("../../../assets/fonts/jua.ttf")
            });

            setFontReady(true);
        }
        loadFont();
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator = {false}>
            <Text style={styles.content}>
                태그? {"\n"}
                나를 가장 잘 표현할 수 있는 태그 3개와 그 이유를 함께 작성해주세요! {"\n"}
                (태그의 앞 글자만 따서 3행시로 표현해도 좋아요! 자유롭게 표현해주세요!)
            </Text>

            <Text style={styles.content}>
                현재 관심사?{"\n"}
                요즘 내가 무엇에 푹 빠져있는지 알려주세요!{"\n"}
                (문장도 좋고 단어로 여러개를 나열해도 괜찮아요!)
            </Text>

            <Text style={styles.content}>
                상대방?{"\n"}
                나에게 호감을 표시하는 분이 어떤 사람이면 좋겠는지 알려주세요!{"\n"}
                (Ex: 같이 게임할 수 있는 분, 말 이쁘게 하는 사람)
            </Text>

            <Text style={styles.content}>
                나와 잘 맞는 상대?{"\n"}
                평소에 내가 어떤 사람과 잘 맞는지 알려주세요! {"\n"}
                (Ex: 음식에 진심인 분, 같이 있을 때 쉬지 않고 말하는 사람)
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    
    content: {
        fontFamily: "jua",
        fontSize: 12,
        color: 'white',
        flexShrink: 1,
        lineHeight: 20,
        marginTop: 10
    },
})
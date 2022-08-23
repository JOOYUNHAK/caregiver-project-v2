/* 특정 글자만 색깔 칠하기 두 단어 결합, 각 단어 분리 case 나누기*/
/* 결합일 경우 글자별로 색깔을 입히면 앞, 뒤로 똑같은 글자가 나왔을 때 같이 칠해지므로 두 case를 나눈다 */

import { Text, View } from "react-native";

export default function CustomSpanText({ fullText, spanText, type }) {
    let completeText;
    if(type === 'combination')
        completeText = colorCombinationText(fullText, spanText);
    else
        completeText = colorSeparateText(fullText, spanText);
    
        return(
        <View style = {{flexDirection: 'row', paddingLeft: 5}}>
        {completeText.map((text) => {
            return(
                <Text
                    key={text.text} 
                    style ={{color: 'silver', fontWeight: text.isSpan ? '900' : 'normal', textDecorationLine: text.isSpan ? 'underline' : 'none', fontSize: 13}}>
                    {text.text}
                </Text>
            )
        })}    
        </View>
    )
}

//두 단어 결합 색 입히기
function colorCombinationText(fullText, spanText) {
    let completeText = []; let index = 0; let behindText;

    for(let i = 0; i < spanText.length; i++) {
        const findValue = spanText[i]; // 색 입힐 글자
        const textLength = findValue.length; // 색 입힐 글자의 길이
        const spanTextStartIndex = fullText.lastIndexOf(findValue); // 색 입힐 글자의 시작 Index(뒤부터 검색)
        const frontText = fullText.substring(index, spanTextStartIndex); // 색 입힐 글자의 앞 기존 앞 문장들
        completeText.push({ text: frontText, isSpan: false });
        completeText.push({ text: findValue, isSpan: true});
        index = spanTextStartIndex + textLength; // 색 입힌 글자 다음 부터 다음 색 입힐 글자 전까지 다시 탐색
        
        //마지막 색 입힐 글자면 남은 글자들 전부 포함
        if(i == spanText.length - 1) {
            behindText = fullText.substring(index, fullText.length);
            completeText.push({ text: behindText, isSpan: false });
        }    
    }
    return completeText;
}

function colorSeparateText(fullText, spanText) {

}

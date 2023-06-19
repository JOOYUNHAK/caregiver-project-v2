/* 글쓰기 각 질문 항목들 */

import React, { useState, } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import {
    View,
    Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import WritingInput from "./WritingInput";

export default function Questions({ fillCheck }) {

    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [isFocused4, setIsFocused4] = useState(false);
    const [isFocused5, setIsFocused5] = useState(false);
    const [isFocused6, setIsFocused6] = useState(false);
    const [isFocused7, setIsFocused7] = useState(false);
    const [isFocused8, setIsFocused8] = useState(false);
    const [isFocused9, setIsFocused9] = useState(false);

    const [tag1, setTag1] = useState('');
    const [tag2, setTag2] = useState('');
    const [tag3, setTag3] = useState('');

    const [tag1Reason, setTag1Reason] = useState('');
    const [tag2Reason, setTag2Reason] = useState('');
    const [tag3Reason, setTag3Reason] = useState('');

    const [myInteresting, setMyInteresting] = useState('');
    const [who, setWho] = useState('');
    const [myPartner, setMyPartner] = useState('');


   //const SCROLL_HEIGHT = Dimensions.get("window").height + 150;

    useEffect(() => {
        tag1 && tag2 && tag3 && tag1Reason && tag2Reason
            && tag3Reason && myInteresting && who && myPartner ?
            fillCheck(true) : fillCheck(false)
    }, [tag1, tag2, tag3, tag1Reason, tag2Reason, tag3Reason, myInteresting, who, myPartner])

    return (

        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraScrollHeight={60}
            showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'column', margin: 30, }}>

                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <WritingInput
                        props={[setIsFocused1, setTag1, 4, '#태그1', 'tagPartTag', isFocused1]} />

                    <WritingInput
                        props={[setIsFocused2, setTag1Reason, 15,
                            '이유를 입력해주세요(15자 이내)', 'tagPartReason', isFocused2]} />
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <WritingInput
                        props={[setIsFocused3, setTag2, 4, '#태그2', 'tagPartTag', isFocused3]} />

                    <WritingInput
                        props={[setIsFocused4, setTag2Reason, 15,
                            '이유를 입력해주세요(15자 이내)', 'tagPartReason', isFocused4]} />
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <WritingInput
                        props={[setIsFocused5, setTag3, 4, '#태그3', 'tagPartTag', isFocused5]} />
                    <WritingInput
                        props={[setIsFocused6, setTag3Reason, 15,
                            '이유를 입력해주세요(15자 이내)', 'tagPartReason', isFocused6]} />
                </View>

                <View style={{ marginBottom: 15, marginTop: 30 }}>
                    <WritingInput
                        props={[setIsFocused7, setMyInteresting, 15,
                            '요즘 나의 관심사는 이거에요!(15자 이내)', 'bottomPart', isFocused7]} />
                </View>
                <View style={{ marginBottom: 15, marginTop: 30 }}>
                    <WritingInput
                        props={[setIsFocused8, setWho, 15,
                            '나는 이런 분을 기다리고 있어요!(15자 이내)', 'bottomPart', isFocused8]} />
                </View>
                <View style={{ marginBottom: 15, marginTop: 30 }}>
                    <WritingInput
                        props={[setIsFocused9, setMyPartner, 15,
                            '평소 나와 궁합이 잘 맞는 사람은 이런 분이에요!(15자 이내)',
                            'bottomPart', isFocused9]} />
                </View>
            </View>
        </KeyboardAwareScrollView>

    )
}




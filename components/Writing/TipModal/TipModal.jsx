import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Platform,
} from 'react-native';
import * as Font from "expo-font";
import WritingTipContent from "./Content";
import Icon from '../../Icon.jsx';

export default function TipModal() {
    const [fontReady, setFontReady] = useState(false);
    const [isTipVisible, setIsTipVisible] = useState(false);

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
        <>
            {fontReady === true ? (isTipVisible === true ?
                <>
                    <View style={styles.tipModal}>
                        <View style={styles.tipHeader}>
                            <View style={styles.tipHeaderTitle}>
                                <Text style={styles.titleText}>
                                    본인 어필 작성Tip
                                </Text>
                                <View style={styles.tipIcon}>
                                    <Icon props={['antdesign', 'exclamationcircleo', 18, 'white']} />
                                </View>
                            </View>
                            <View style={styles.tipHeaderWarning}>
                                <Icon props={['feather', 'alert-triangle', 20, 'red']} />
                                <Text style={styles.warningText}>
                                    모든 문항에 타인에게 불쾌감을 주거나,
                                    명예를 훼손시키는 말은 신고 대상입니다.
                                </Text>
                            </View>
                            <View style={styles.closeBtn}>
                                <TouchableHighlight
                                    underlayColor='none'
                                    onPress={() => setIsTipVisible(false)}>
                                    <Icon props={['feather', 'chevron-up', 30, 'white']} />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <WritingTipContent />
                    </View>
                </> :
                <TouchableHighlight
                    underlayColor='none'
                    onPress={() => setIsTipVisible(true)}
                >
                    <View style={styles.writingHelp}>
                        <Text style={styles.helpText}>
                            작성하는데 도움이 필요해요
                        </Text>
                        <Icon props={['feather', 'help-circle', 20, 'lightblue']} />
                    </View>
                </TouchableHighlight>)
                : null
            }
        </>
    )
};

const styles = StyleSheet.create({
    tipModal: {
        height: 150,
        flexDirection: 'column',
        backgroundColor: 'hsla(195, 90%, 80%, 1)',
        borderRadius: 15,
        margin: 10,
        paddingLeft: 20,
    },

    tipHeader: {
        flexDirection: 'row',
    },

    tipHeaderTitle: {
        flex: 4,
        flexDirection: 'row'
    },

    titleText: {
        fontFamily: "jua",
        fontSize: 14,
        color: 'white',
        paddingTop: 20,
    },
    
    tipIcon: {
        marginLeft: 2,
        marginTop: 17
    },

    tipHeaderWarning: {
        flex: 5,
        flexDirection: 'row',
        paddingTop: 16,
    },

    warningText: {
        flexShrink: 1,
        fontFamily: 'jua',
        fontSize: 10,
        color: 'red'
    },

    writingHelp: {
        flexDirection: 'row',
        margin: 30,
    },

    helpText: {
        fontFamily: 'jua',
        fontSize: Platform.OS === 'ios' ? 14 : 17,
        color: 'lightblue'
    },

    closeBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginTop: 12,
        paddingRight: 10,
    },

})
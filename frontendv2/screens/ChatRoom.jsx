/* 채팅방 */

import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useLayoutEffect } from "react";
import { BackHandler } from "react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Policy from "../components/ChatRoom/Policy";
import SendMessage from "../components/ChatRoom/SendMessage";
import Icon from "../components/Icon";
import StatusBarComponent from "../components/StatusBarComponent";
import { socket, socketEvent } from "../module/socket";
import { saveMessageList } from "../../frontendv2/redux/action/chat/chatAction";

function ChatRoom({ navigation, route }) {
    const dispatch = useDispatch();
    let { messages, id } = useSelector(state => ({
        messages: state.chat.messages,
        id: state.user.id,
    }));
    useLayoutEffect(() => {
        navigation.setOptions({
            title: `${route.params.name}과의 대화`
        });
    }, []);

    useEffect(() => {
        function backAction() {
            socketEvent(socket, 'leave', route.params.roomId)
            setTimeout(() => {
                dispatch(saveMessageList([]));
            }, 20);
        }
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />
            <FlatList
                nestedScrollEnabled={true}
                inverted={true}
                keyboardShouldPersistTaps='handled'
                style={{ marginBottom: hp('7%') }}
                data={messages}
                contentContainerStyle={styles.contentStyle}
                renderItem={({ item, index }) => {
                    let previousTime = '';
                    //이전 메세지 시간과 같은지 판별 위해
                    if (messages.length != 1 && messages.length - 1 != index)
                        previousTime = dayjs(messages[index + 1].time).format('YYYY년 M월 D일 A h:mm');

                    //오늘
                    const today = dayjs().format('YYYY년 M월 D일 A h:mm');
                    let [todayYear, todayMonth, todayDate, day] = today.split(' ');
                    day = day === 'AM' ? '오전' : '오후';
                    //현재 메세지 시간
                    const time = dayjs(item.time).format('YYYY년 M월 D일 A h:mm');
                    let [sendYear, sendMonth, sendDate, sendDay, sendTime] = time.split(' ');
                    sendDay = sendDay === 'AM' ? '오전' : '오후'

                    const transformTime = time.includes(todayYear) ?
                        (time.includes(todayMonth + ' ' + todayDate) ? sendDay + ' ' + sendTime :
                            sendMonth + ' ' + sendDate + ' ' + sendDay + ' ' + sendTime) :
                        sendYear + ' ' + sendMonth + ' ' + sendDate + ' ' + sendDay + ' ' + sendTime
                    return (
                        <>
                            <View
                                key={index}
                                style={{ height: 'auto', marginBottom: 5 }}>
                                {
                                    item.type == 0 ?
                                        <Policy
                                            protectorId={route.params.protectorId}
                                            roomId={route.params.roomId}
                                            messageContent = {item.content}
                                        />
                                        :
                                        (
                                            item.type == -1 ?
                                                <View style={{
                                                    alignSelf: 'center',
                                                    height: 'auto',
                                                    borderRadius: 20,
                                                    marginVertical: 5,
                                                    backgroundColor: "#94c6ad",
                                                }}>
                                                    <Text style={{
                                                        color: 'white',
                                                        paddingVertical: 15,
                                                        paddingHorizontal: 15,
                                                        fontSize: 13,
                                                        textAlign: 'center'
                                                    }}>
                                                        죄송해요, 간병신청이 거절되었어요
                                                    </Text>
                                                </View>
                                                :
                                                (
                                                    item.type == 2 ?
                                                        <View style={{
                                                            alignSelf: 'center',
                                                            height: 'auto',
                                                            borderRadius: 20,
                                                            marginVertical: 5,
                                                            backgroundColor: "#94c6ad",
                                                        }}>
                                                            <Text style={{
                                                                color: 'white',
                                                                paddingHorizontal: 15,
                                                                paddingVertical: 15,
                                                                fontSize: 13,
                                                                textAlign: 'center'
                                                            }}>
                                                                간병 요청을 수락하셨어요!
                                                            </Text>
                                                        </View>
                                                        :
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            justifyContent: item.sendId === id ? 'flex-end' : 'flex-start',
                                                            width: '70%',
                                                            alignSelf: item.sendId === id ? 'flex-end' : 'flex-start',
                                                            marginRight: item.sendId === id ? 20 : 0,
                                                            marginLeft: item.sendId !== id ? 10 : 0
                                                        }}>
                                                            {id !== item.sendId ?
                                                                <View style={{ paddingRight: 3 }}>
                                                                    <Icon props={['material', 'account-circle', 35, '#eaebe8']} />
                                                                </View>
                                                                : null
                                                            }

                                                            <Text style={{
                                                                paddingVertical: 12,
                                                                borderRadius: 25,
                                                                paddingHorizontal: 15,
                                                                fontSize: 14,
                                                                color: item.sendId === id ? 'white' : '#70686a',
                                                                backgroundColor: item.sendId === id ? '#5e718d' : '#f4f6f5',
                                                                alignSelf: item.sendId === id ? 'flex-end' : 'flex-start',

                                                            }}>
                                                                {item.content}
                                                            </Text>
                                                        </View>
                                                )

                                        )

                                }
                            </View>
                            {

                                <View style={{
                                    alignItems: 'center',
                                }}>

                                    {
                                        time === previousTime ? null :
                                            <Text style={{
                                                color: '#949494',
                                                marginTop: 10,
                                                marginBottom: 12,
                                                fontSize: 13
                                            }}>
                                                {transformTime}
                                            </Text>
                                    }
                                </View>
                            }
                        </>
                    )
                }}
            />
            <SendMessage roomId={route.params.roomId} opponentId={route.params.opponentId} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: 'white',
    },

    contentStyle: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },

});

export default React.memo(ChatRoom);
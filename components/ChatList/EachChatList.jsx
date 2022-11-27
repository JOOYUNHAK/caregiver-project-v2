/* 각각의 채팅 목록 */

import { StackActions, useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { socket, socketEvent } from "../../module/socket";
import { deleteNewMessageCount } from "../../redux/action/chat/chatAction";
import ChatInfo from "./EachChatList/ChatInfo";
import ChatLastTime from './EachChatList/ChatLastTime'
import ChatProfile from './EachChatList/ChatProfile';

export default function EachChatList({ item }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    //자신의 아이디와 이름

    const { id, name, purpose } = useSelector(state => ({
        id: state.user.id,
        name: state.user.name,
        purpose: state.user.purpose
    }));
    const enterRoom = () => {
        const [member1, member2] = item.members.split(',');
        const [memberId1, memberId2] = item.memberIds.split(',');
        let protectorId, opponentId;

        if (purpose === '보호자') {
            if (id === memberId1) {
                opponentId = memberId2;
                protectorId = memberId1;
            } else {
                sendId = memberId1;
                opponentId = memberId1;
                protectorId = memberId2;
            }
        } else {
            if (id === memberId1) {
                opponentId = memberId2;
                protectorId = memberId2;
            } else {
                opponentId = memberId1;
                protectorId = memberId1;
            }
        }
        //해당 채팅방 이동할 시 방 번호, 상대방 아이디 이름 넘겨줌
        navigation.dispatch(
            StackActions.push(
                'chatPage', {
                roomId: item.roomId,
                opponentId,
                protectorId,
                name: name === member1 ? member2 : member1,
            }
            )
        )
        //새로운 메세지가 있는데 자신이 보낸 메세지면 알림 없애지 않음
        if (item.newMessage && (id !== item.sendId)) {
            //안읽은 매세지 있으면 0으로 변경
            dispatch(deleteNewMessageCount(item.roomId))
        }
        socketEvent(socket, 'join', {
            loginId: id,
            opponentId,
            roomId: item.roomId,
        });

    }

    return (
        <TouchableHighlight
            underlayColor='whitesmoke'
            onPress={() => enterRoom()}
            onLongPress={() => console.log('long')}
        >
            <View style={styles.eachRoom}>
                <ChatProfile />
                <ChatInfo info={item} />
                <ChatLastTime
                    userId={id} sendId={item.sendId}
                    time={item.time} newMessage={item.newMessage} />
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    eachRoom: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('100%'),
        height: hp('10%'),
        paddingHorizontal: 5,
    }
})
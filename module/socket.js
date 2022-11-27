import { io } from "socket.io-client";
import { addRoomList, deleteNewMessageCount, receiveNewMessage, saveMessage, saveMessageList, stateUpdate } from "../redux/action/chat/chatAction";
import store from "../redux/store";

export const socket = io('http://172.30.1.34:8800/chat', {
    transports: ['websocket']
})

export function socketEvent(socket, event, roomId = '') {
    const { id } = store.getState().user;
    switch (event) {
        case 'disconnect':
            socket.removeAllListeners();
            socket.disconnect();
            break;
        case 'reconnect':
            socket.open();
            break;

        //새로운 방이 생성되었을 때
        case 'newroom':
            socket.on(`newroom:${id}`, async (roomInfo) => {
                console.log(roomInfo)
                store.dispatch(
                    addRoomList({ ...roomInfo })
                )
                /* AsyncStorage.removeItem('rooms')
                AsyncStorage.getItem('rooms').then((rooms) => {
                    //새로 추가되어 저장해야 할 방 번호
                    const { roomId } = roomInfo.roomInfo.room;
                    //방목록이 하나도 없는 유저인 경우
                    if( !rooms ) {
                        AsyncStorage.setItem('rooms', JSON.stringify({ roomIds: String(roomId) }));
                        return;
                    }
                    //방 목록이 있는 유저는 기존 방번호에서 추가
                    const { roomIds } = JSON.parse( rooms );
                    AsyncStorage.setItem('rooms', JSON.stringify(
                        { roomIds: roomIds + ',' + roomId }
                    ));
                })*/
            })
            break;

        //상대방이 방에 조인했을 때 메세지를 전부 읽었으므로
        case 'opponentJoin':
            socket.on(`join:${id}`, (roomId) => {
                store.dispatch(
                    deleteNewMessageCount(roomId)
                )
            })
            break;

        //방에 들어갔을 때
        case 'join':
            socket.emit('join', roomId, (messages) => {
                store.dispatch(
                    saveMessageList(messages)
                )
            });
            break;

        // 새 매세지 이벤트 해제
        case 'off_new_message':
            socket.on(`new_message:${id}`, async (newMessage) => {
                store.dispatch(
                    saveMessage(newMessage)
                )
                store.dispatch(
                    receiveNewMessage(newMessage)
                )
            })
            break;

        //자신의 새 매세지
        case 'new_message':
            socket.on('new_message', (message) => {
                store.dispatch(
                    saveMessage(message)
                )
            })
            break;
        
        //간병인이 프로필 확인 했을 때
        case 'check_application':
            socket.on(`check_application:${id}`, (roomInfo) => {
                store.dispatch(
                    stateUpdate(roomInfo)
                )
            })
            break;

        case 'response_application':
            socket.on(`response_application:${id}`, (response) => {
                store.dispatch(
                    stateUpdate(response)
                )
            })
            break;

        //방 나갈때
        case 'leave':
            socket.emit('leave', roomId);
            break;
    }
}
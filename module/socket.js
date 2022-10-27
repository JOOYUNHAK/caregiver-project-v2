import { io } from "socket.io-client";

export const socket = io('http://172.30.1.38:8800/chat', {
    transports: ['websocket']
})

export function LeaveRoomEvent( loginId, opponentId ) {
    socket.emit('LEAVE_ROOM', {
        loginId,
        opponentId   
    })
}


//roomname을 잘못 지정함
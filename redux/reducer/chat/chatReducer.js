import { createReducer } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { addRoomList, deleteNewMessageCount, patientProfileVisible, receiveNewMessage, saveLookUp, saveMessage, saveMessageList, savePatientProfile, saveRoomList, saveSocketId, stateUpdate } from "../../action/chat/chatAction";

const initialState = {
    visible: false,
    patientProfile: {
        weight: '',
        sex: '',
        diagnosis: '',
        start: '',
        end: '',
        place: '',
        next: '',
        state: '',
        suction: '',
        toilet: '',
        bedSore: '',
        washing: '',
        meal: '',
        bathChair: ''
    },
    roomList: [],
    messages: [],

    isLookUpedList: false,
    socketId: '',
};

const chatReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(patientProfileVisible, (state,action) => {
            state.visible = action.payload
        })
        .addCase(savePatientProfile, (state, action) => {
            Object.assign(state.patientProfile, action.payload)
        })
        .addCase(saveSocketId, (state, action) => {
            state.socketId = action.payload;
        })
        .addCase(addRoomList, (state, action) => {

            const { roomInfo } = action.payload;
            //방 정보
            let { room, message } = roomInfo;
            state.roomList.unshift({
                ...room, ...message
            })
        })
        .addCase(saveRoomList, (state, action) => {
            const roomList = action.payload;
            //방 목록이 없을 때
            if( !roomList )
                return;
            // 저장하려는 방이 한개일 때
            if( roomList.length == 1) {
                state.roomList = action.payload
                return;
            }
            state.roomList = roomList.sort((a, b) => (dayjs(b.time).isAfter(dayjs(a.time)) ? 1 : -1 ))
        })
        .addCase(saveLookUp, (state, action) => {
            state.isLookUpedList = action.payload;
        })
        .addCase(saveMessageList, (state, action) => {
            state.messages = action.payload;
        })
        .addCase(saveMessage, (state, action) => {
            state.messages.unshift(action.payload);
            state.roomList.map( (roomList, index) => {
                if( roomList.roomId == action.payload.roomId ) {
                    roomList.sendId = action.payload.sendId;
                    roomList.content = action.payload.content;
                    roomList.type = action.payload.type;
                    roomList.time = action.payload.time
                    state.roomList.splice(index, 1);
                    state.roomList.unshift(roomList);
                }   
            })

        })
        .addCase(deleteNewMessageCount, (state, action) => {
            state.roomList.map( roomList => {
                if(roomList.roomId === action.payload) {
                    roomList.newMessage = 0;
                }
            })
        })
        .addCase(stateUpdate, (state, action) => {
            //방 상태 업데이트
            state.roomList.map(roomList => {
                if( roomList.roomId == action.payload[0] ) {
                    roomList.state = action.payload[1];
                    return;
                }
            })
            if(action.payload[2] === undefined) return;
            //해당 신청 메세지 업데이트
            if( action.payload[1] == -1 || action.payload[1] == 2) {
                for( let i = state.messages.length - 1; i >= 0; i-- ) {
                    if( state.messages[i].type == 0 && state.messages[i].content === null ) {
                        state.messages[i].content = action.payload[2];
                        return;
                    }
                }
            }
        })
        .addCase(receiveNewMessage, (state, action) => {
            state.roomList.map(roomList => {
                if( roomList.roomId == action.payload.roomId ) {
                    roomList.newMessage = roomList.newMessage + 1;
                }
            })
        })  
})

export default chatReducer;
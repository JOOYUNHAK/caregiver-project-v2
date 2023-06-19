import { createAction } from "@reduxjs/toolkit";

export const saveChatProtectorId = createAction('chat/saveChatProtectorId');
export const ProtectorProfileLoading = createAction('chat/ProtectorProfileLoading');

export const savePatientProfile = createAction('chat/savePatientProfile');
export const patientProfileVisible = createAction('chat/patientProfileVisible')
export const saveSocketId = createAction('chat/saveSocketId');
export const addRoomList = createAction('chat/addRoomList');
export const saveRoomList = createAction('chat/saveRoomList');
export const saveLookUp = createAction('chat/saveLookUp');
export const saveMessage = createAction('chat/saveMessage');
export const saveMessageList = createAction('chat/saveMessageList');
export const deleteNewMessageCount = createAction('chat/deleteNewMessageCount');
export const stateUpdate = createAction('chat/stateUpdate');
export const receiveNewMessage = createAction('chat/receiveNewMessage')

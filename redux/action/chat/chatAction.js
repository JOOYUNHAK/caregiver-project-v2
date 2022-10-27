import { createAction } from "@reduxjs/toolkit";

export const saveChatProtectorId = createAction('chat/saveChatProtectorId');
export const ProtectorProfileLoading = createAction('chat/ProtectorProfileLoading');

export const savePatientProfile = createAction('chat/savePatientProfile');
export const patientProfileVisible = createAction('chat/patientProfileVisible')
export const saveSocketId = createAction('chat/saveSocketId');
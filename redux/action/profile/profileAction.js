import { createAction } from "@reduxjs/toolkit";

export const saveCareGiverProfile = createAction('profile/saveCareGiverProfile');
export const saveAssistantProfile = createAction('profile/saveAssistantProfile');
export const saveProtectorProfile = createAction('profile/saveProtectorProfile');
export const saveUserProfile = createAction('profile/saveUserProfile');
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import firstRegisterReducer from "./reducer/register/firstRegisterReducer";
import patientInfoReducer from "./reducer/register/patientInfoReducer";
import loginReducer from "./reducer/login/loginReducer";
import userReducer from "./reducer/user/userReducer";
import profileReducer from "./reducer/profile/profileReducer";
import searchReducer from "./reducer/search/searchReducer";
import chatReducer from "./reducer/chat/chatReducer";
import patientHelpListReducer from "./reducer/register/patientHelpListReducer";
import caregiverInfoReducer from "./reducer/register/caregiverInfoReducer";
import caregiverThirdRegisterReducer from "./reducer/register/caregiverThirdRegisterReducer";
import caregiverLastRegisterReducer from "./reducer/register/caregiverLastRegisterReducer";

const store = configureStore ({
    reducer: {
        firstRegister: firstRegisterReducer,
        patientInfo: patientInfoReducer,
        patientHelpList: patientHelpListReducer,
        caregiverInfo: caregiverInfoReducer,
        caregiverThirdRegister: caregiverThirdRegisterReducer,
        caregiverLastRegister: caregiverLastRegisterReducer,
        login: loginReducer,
        user: userReducer,
        profile: profileReducer,
        search: searchReducer,
        chat: chatReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store; 
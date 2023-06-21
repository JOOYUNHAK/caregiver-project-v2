import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import firstRegisterReducer from "./reducer/register/firstRegisterReducer";
import patientInfoReducer from "./reducer/register/patientInfoReducer";
import secondRegisterReducer from './reducer/register/secondRegisterReducer';
import lastRegisterReducer from './reducer/register/lastRegisterReducer';
import loginReducer from "./reducer/login/loginReducer";
import userReducer from "./reducer/user/userReducer";
import profileReducer from "./reducer/profile/profileReducer";
import searchReducer from "./reducer/search/searchReducer";
import chatReducer from "./reducer/chat/chatReducer";
import patientHelpListReducer from "./reducer/register/patientHelpListReducer";
const store = configureStore ({
    reducer: {
        firstRegister: firstRegisterReducer,
        secondRegister: secondRegisterReducer,
        patientInfo: patientInfoReducer,
        patientHelpList: patientHelpListReducer,
        lastRegister: lastRegisterReducer,
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
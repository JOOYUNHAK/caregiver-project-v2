import { configureStore } from "@reduxjs/toolkit";
import firstRegisterReducer from "./reducer/register/firstRegisterReducer";
import secondRegisterReducer from './reducer/register/secondRegisterReducer';
import lastRegisterReducer from './reducer/register/lastRegisterReducer';
import loginReducer from "./reducer/login/loginReducer";
import userReducer from "./reducer/user/userReducer";
import profileReducer from "./reducer/profile/profileReducer";
const store = configureStore ({
    reducer: {
        //register: registerSlice.reducer
        firstRegister: firstRegisterReducer,
        secondRegister: secondRegisterReducer,
        lastRegister: lastRegisterReducer,
        login: loginReducer,
        user: userReducer,
        profile: profileReducer
    }
});

export default store; 
import { configureStore } from "@reduxjs/toolkit";
import firstRegisterReducer from "./reducer/register/firstRegisterReducer";
import secondRegisterReducer from './reducer/register/secondRegisterReducer';
import lastRegisterReducer from './reducer/register/lastRegisterReducer';
import loginReducer from "./reducer/login/loginReducer";
import userReducer from "./reducer/user/userReducer";
const store = configureStore ({
    reducer: {
        //register: registerSlice.reducer
        firstRegister: firstRegisterReducer,
        secondRegister: secondRegisterReducer,
        lastRegister: lastRegisterReducer,
        login: loginReducer,
        user: userReducer
    }
});

export default store; 
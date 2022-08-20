import { configureStore } from "@reduxjs/toolkit";
import firstRegisterReducer from "./reducer/register/firstRegisterReducer";
import secondRegisterReducer from './reducer/register/secondRegisterReducer';
import lastRegisterReducer from './reducer/register/lastRegisterReducer';
const store = configureStore ({
    reducer: {
        //register: registerSlice.reducer
        firstRegister: firstRegisterReducer,
        secondRegister: secondRegisterReducer,
        lastRegister: lastRegisterReducer
    }
});

export default store; 
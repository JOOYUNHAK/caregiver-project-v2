import { configureStore } from "@reduxjs/toolkit";
import firstRegisterReducer from "./reducer/register/firstRegisterReducer";
import secondRegisterReducer from './reducer/register/secondRegisterReducer';
const store = configureStore ({
    reducer: {
        //register: registerSlice.reducer
        firstRegister: firstRegisterReducer,
        secondRegister: secondRegisterReducer
    }
});

export default store; 
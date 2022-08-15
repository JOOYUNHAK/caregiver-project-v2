import { configureStore } from "@reduxjs/toolkit";
import firstRegisterReducer from "./reducer/register/firstRegisterReducer";
const store = configureStore ({
    reducer: {
        //register: registerSlice.reducer
        firstRegister: firstRegisterReducer
    }
});

export default store; 
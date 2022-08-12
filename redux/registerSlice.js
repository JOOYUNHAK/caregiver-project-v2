import { createSlice } from "@reduxjs/toolkit";
const registerSlice = createSlice ({
    name: 'registerSlice',
    initialState: {
        id: '',
        name: '',
        birth: '',
        sex: '',
        purpose: '',
    },
    reducers: {
        saveFirstRegister: (state,action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.birth = action.payload.birth;
            state.sex = action.payload.sex;
            state.purpose = action.payload.purpose;
        },
        reset: (state) => {
            Object.assign(state, initialState);
        }
    }
});

export default registerSlice; 
export const { saveFirstRegister, reset } = registerSlice.actions;

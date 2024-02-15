import {createSlice} from "@reduxjs/toolkit"
import { retry } from "@reduxjs/toolkit/query"

const initialState = {
        name:null,
        studentCode: null,
        department: null,
        lop: null,
        accessToken: null,
        refreshToken: null,
}
export const User = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateUser: (state,action) =>{
            return {...state,...action.payload}
        },
        logOut: () =>{
            return initialState;
        }
    }
})

export const {updateUser,logOut} = User.actions;
export default User.reducer;
import { createSlice } from "@reduxjs/toolkit"

export interface User_crytoSlice {
    id: number
    id_user: number
    id_crypto: number
    favorite: boolean
}

const initialState: User_crytoSlice = {
    id: 0,
    id_user: 0,
    id_crypto: 0,
    favorite: false,
}

export const User_crytoSlice = createSlice({
    name: 'User_cryto',
    initialState,
    reducers: {
        someAction: function() {

        }
    }

})
export const { someAction } = User_crytoSlice.actions

export default User_crytoSlice.reducer
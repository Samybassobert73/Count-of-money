import { createSlice } from "@reduxjs/toolkit"

export interface User_adressSlice{
    id: number
    id_user: number
    id_adress: number
    principal: boolean
}

const initialState: User_adressSlice = {
    id: 0,
    id_user: 0,
    id_adress: 0,
    principal: false,
}

export const User_adressSlice = createSlice({
    name: 'User_adress',
    initialState,
    reducers: {
        someAction: function() {

        }
    }

})
export const { someAction } = User_adressSlice.actions

export default User_adressSlice.reducer
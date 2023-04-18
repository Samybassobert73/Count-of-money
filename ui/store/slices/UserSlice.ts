import {createSlice} from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode";
import {update} from "immutable";
import router from "next/router";
const jwt = require("jsonwebtoken");



export interface User {
    id: number
    username: string
    name: string
    lastname: string
    email: string
    password: string
    verified: boolean
    avatar: string
    token: string
    id_address: string
    is_admin: boolean
    is_logged: boolean
    token_is_valid: boolean

}

const initialState: User = {
    id: 0,
    username: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    verified: false,
    avatar: "",
    token: "",
    id_address: "",
    is_admin: false,
    is_logged: false,
    token_is_valid: false
}

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        login: function (state, {payload}) {
            // @ts-ignore
            const key = process.env.NEXT_PUBLIC_API_PUBLIC
            try {
                // Verify the JWT using the secret key and algorithm
                const decoded = jwt.verify(payload.token, key);

                // If the JWT is valid, the decoded variable will contain the
                // payload of the token (which might include information about the
                // user, such as their name or ID)
                state.token_is_valid = true
                state.token = payload.token
                state.id = decoded.id;
                state.is_logged = true;
                // @ts-ignore

                if (decoded.roles.includes("ROLE_ADMIN")) {
                    state.is_admin = true;
                }
            } catch (err) {
                // If the JWT is invalid (if it has expired, for example), this
                // code will be executed and the error will be logged to the
                // console
                state.token_is_valid = false
                state.is_logged = false
            }

        },
        verifyToken: function (state) {
            const key = process.env.NEXT_PUBLIC_API_PUBLIC
            try {
                // Verify the JWT using the secret key and algorithm
                const decoded = jwt.verify(state.token, key);

            } catch (err) {
                // If the JWT is invalid (if it has expired, for example), this
                // code will be executed and the error will be logged to the
                // console
                state.token_is_valid = false
                state.is_logged = false
            }
        },
        logout: function (state) {
            state.token = "";
            state.id = 0;
            state.is_logged = false;
            state.is_admin = false;
            
        }
    }
})
export const {login} = UserSlice.actions
export default UserSlice.reducer
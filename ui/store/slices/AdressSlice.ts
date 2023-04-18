import { createSlice } from "@reduxjs/toolkit"

export interface AdressSlice{
    id: number
    line_1: string
    line_2: string
    line_3: string
    postal_code: string
    city: string
    country: string
}

const initialState: AdressSlice = {
    id: 0,
    line_1: "",
    line_2: "",
    line_3: "",
    postal_code: "",
    city: "",
    country: "",
}

export const AdressSlice = createSlice({
    name: 'Adress',
    initialState,
    reducers: {
        someAction: function() {

        }
    }

})
export const { someAction } = AdressSlice.actions

export default AdressSlice.reducer
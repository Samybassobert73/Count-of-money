import { createSlice } from "@reduxjs/toolkit"

export interface CryptoSlice{
    id: number
    symbol: string
    base_asset: string
    quote_access: string
}

const initialState: CryptoSlice = {
    id: 0,
    symbol: "",
    base_asset: "",
    quote_access: "",
}

export const CryptoSlice = createSlice({
    name: 'Crypto',
    initialState,
    reducers: {
        someAction: function() {

        }
    }

})
export const { someAction } = CryptoSlice.actions

export default CryptoSlice.reducer
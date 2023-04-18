import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface RefreshUserCryptoState {
  toRefresh : boolean
}

const initialState = { toRefresh: false } as RefreshUserCryptoState

const userCryptoSlice = createSlice({
  name: 'userCrypto',
  initialState,
  reducers: {
    refresh(state) {
        state.toRefresh = true
        console.log("refreshing")
    },
    reset(state) {
        state.toRefresh = false
        console.log("reseting")
    }
  },
})

export const { refresh, reset } = userCryptoSlice.actions
export default userCryptoSlice.reducer
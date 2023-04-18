import { configureStore } from '@reduxjs/toolkit'
import AdressReducer from './slices/AdressSlice'
import CryptoReducer from './slices/CryptoSlice'
import EventSlices from './slices/EventSlices'
import User_adressReducer from './slices/User_adressSlice'
import User_cryptoReducer from './slices/User_cryptoSlice'
import UserReducer from './slices/UserSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
  key: 'root',
  storage,
}

const UserPersistedReducer = persistReducer(persistConfig, UserReducer)
const EventPersistedSlices = persistReducer(persistConfig, EventSlices)
const AdressPersistedReducer = persistReducer(persistConfig, AdressReducer)
const CryptoPersistedReducer = persistReducer(persistConfig, CryptoReducer)
const UserAdressPersistedReducer = persistReducer(persistConfig, User_adressReducer)
const UserCryptoPersistedReducer = persistReducer(persistConfig, User_cryptoReducer)

export const store = configureStore({
  reducer: {
    user: UserPersistedReducer,
    event: EventPersistedSlices,
  }
  ,
  middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

// import { configureStore } from '@reduxjs/toolkit'
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';
import userReducer from './slice/user/UserSlice';

import { configureStore } from "@reduxjs/toolkit"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
  },
})
export const persistor = persistStore(store)






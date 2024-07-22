import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth'
import api from './api/api'
import adminAPI from './api/adminAPI'
import adminSlice from './reducers/admin'

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [adminSlice.name]: adminSlice.reducer,
    [api.reducerPath]: api.reducer,
    [adminAPI.reducerPath]: adminAPI.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware, adminAPI.middleware],
})

import { configureStore } from '@reduxjs/toolkit'
import globalReducer from "../state"
import { api } from "state/api"
import authReducer from "state/authSlice"

const store = configureStore({
    reducer: {
      global: globalReducer,
      [api.reducerPath]: api.reducer,
      auth: authReducer,
    },
    middleware: (getDefault) => getDefault().concat(api.middleware)
  });

export default store
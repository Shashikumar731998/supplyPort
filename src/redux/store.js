import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import {thunk} from "redux-thunk"; // Fix: Import as named 'thunk'
import userReducer from "./slices/userSlice";
import globalReducer from "./slices/globalSlice";
import cartReducer from "./slices/cartSlice";

// Configure persist settings
const persistConfig = {
  key: "root",
  storage,
};

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
  cart: cartReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure and export the store with thunk and serializable check disabled
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }).concat(thunk), // Add thunk for async actions
});

const persistor = persistStore(store);

export { store, persistor };

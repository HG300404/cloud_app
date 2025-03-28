import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slides/userSlide";
import { orderReducer } from "./slides/orderSlide";
import { gameReducer } from "./slides/gameSlide";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
  order: orderReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["game"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

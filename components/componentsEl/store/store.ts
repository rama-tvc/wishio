"use client";

import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";
import rootReducer from "./reducers";


const PersistedState = loadState();

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: PersistedState,
    devTools: process.env.NODE_ENV === "production",
});

export type RootState = ReturnType<typeof store.getState>;

store.subscribe(()=> {
  saveState(store.getState())
})



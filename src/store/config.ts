import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import {BOARD_API_REDUCER_KEY, boardApi} from "../api/board/api";
import dialogSlice from "./slices/dialogSlice";
import alertSlice from "./slices/alertSlice";

const logger = createLogger();

const reducers = {
    [dialogSlice.name]: dialogSlice.reducer,
    [alertSlice.name]: alertSlice.reducer,
    [BOARD_API_REDUCER_KEY]: boardApi.reducer,
};

const rootReducer = combineReducers<typeof reducers>(reducers);

const initialState = {};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat([
            logger,
            boardApi.middleware
        ]);
    },
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    enhancers: (defaultEnhancers) => [...defaultEnhancers]
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
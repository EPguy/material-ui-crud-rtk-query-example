import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import {POST_API_REDUCER_KEY, postApi} from "../api/post/api";
import dialogSlice from "./slices/dialogSlice";
import alertSlice from "./slices/alertSlice";
import paginationSlice from "./slices/paginationSlice";

const logger = createLogger();

const reducers = {
    [dialogSlice.name]: dialogSlice.reducer,
    [alertSlice.name]: alertSlice.reducer,
    [paginationSlice.name]: paginationSlice.reducer,
    [POST_API_REDUCER_KEY]: postApi.reducer,
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
            postApi.middleware
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

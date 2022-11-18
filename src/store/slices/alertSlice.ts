import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AlertTypeEnum} from "../../enum/AlertTypeEnum";

interface AlertState {
    open: boolean,
    type: AlertTypeEnum,
    title: string,
    body: string
}

const initialState: AlertState = {
    open: false,
    type: AlertTypeEnum.SUCCESS,
    title: "",
    body: ""
}


const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        open: (state, action: PayloadAction<AlertState>) => {
            state.open = true
            state.type = action.payload.type
            state.title = action.payload.title
            state.body = action.payload.body
        },
        close: (state) => {
            state.open = false
        }
    }
})

export const { open, close } = alertSlice.actions;

export default alertSlice;
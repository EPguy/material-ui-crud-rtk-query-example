import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface DialogState {
    open: boolean,
    onConfirm: (input: string) => void
}

const initialState: DialogState = {
    open: false,
    onConfirm: () => {}
}


const dialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        open: (state, action: PayloadAction<(input: string) => void>) => {
            state.open = true
            state.onConfirm = action.payload
        },
        close: (state) => {
            state.open = false
        }
    }
})

export const { open, close } = dialogSlice.actions;

export default dialogSlice;
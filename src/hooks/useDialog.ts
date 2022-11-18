import {useAppDispatch} from "../store/config";
import {open, close} from "../store/slices/dialogSlice";
import {useCallback} from "react";
export default function useDialog() {
    const dispatch = useAppDispatch();

    const openDialog = useCallback((onConfirm: (input: string) => void) => {
        dispatch(open(onConfirm));
    },[dispatch])

    const closeDialog = useCallback(() => {
        dispatch(close());
    },[dispatch])

    return { openDialog, closeDialog }
}
import {useAppDispatch} from "../store/config";
import {open, close} from "../store/slices/dialogSlice";
import {useCallback} from "react";
export default function useDialog() {
    const dispatch = useAppDispatch();

    const openDialog = useCallback((onConfirm: (input: string) => void) => {
        dispatch(open(onConfirm));
    },[])

    const closeDialog = useCallback(() => {
        dispatch(close());
    },[])

    return { openDialog, closeDialog }
}
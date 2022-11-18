import {useAppDispatch} from "../store/config";
import {open, close} from "../store/slices/alertSlice";
import {useCallback} from "react";
import {AlertTypeEnum} from "../enum/AlertTypeEnum";
export default function useAlert() {
    const dispatch = useAppDispatch();

    const openAlert = useCallback((type: AlertTypeEnum, title: string, body: string) => {
        dispatch(open({
            type,
            title,
            body,
            open: true
        }));
    },[dispatch])

    const closeAlert = useCallback(() => {
        dispatch(close());
    },[dispatch])

    return { openAlert, closeAlert }
}
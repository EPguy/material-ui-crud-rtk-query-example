import {useAppDispatch} from "../store/config";
import {close, open} from "../store/slices/alertSlice";
import {useCallback} from "react";
import {AlertTypeEnum} from "../enum/AlertTypeEnum";

export default function useAlert() {
    const dispatch = useAppDispatch();

    const openSuccessAlert = useCallback((body: string) => {
        dispatch(open({
            type: AlertTypeEnum.SUCCESS,
            title: "Success",
            body,
            open: true
        }));
    },[dispatch])

    const openFailAlert = useCallback((body: string) => {
        dispatch(open({
            type: AlertTypeEnum.ERROR,
            title: "Error",
            body,
            open: true
        }));
    },[dispatch])

    const closeAlert = useCallback(() => {
        dispatch(close());
    },[dispatch])

    return { openSuccessAlert, openFailAlert, closeAlert }
}
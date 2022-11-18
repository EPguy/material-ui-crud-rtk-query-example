import {BaseQueryFn} from "@reduxjs/toolkit/query";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {properties} from "../properties";
import {BaseResponse} from "../models/response/BaseResponse";
import {SuccessFailEnum} from "../enum/SuccessFailEnum";
import {open} from "../store/slices/alertSlice";
import {AlertTypeEnum} from "../enum/AlertTypeEnum";

export const axiosBaseQuery = (): BaseQueryFn<
    {
        url: string;
        method: AxiosRequestConfig['method'];
        data?: AxiosRequestConfig['data'];
    }
    > => async ({ url, method, data }, api) => {
    const alertError = (message: string) => {
        api.dispatch(open({type: AlertTypeEnum.ERROR, title: "Error", body: message, open: true}));
    }
    try {
        const response = await axios({ url: properties.apiDomain + url, method, data });
        const responseData : BaseResponse<any> = response.data

        if(responseData.result === SuccessFailEnum.SUCCESS) {
            return { data: responseData.data };
        } else {
            alertError(responseData.message)
            return { data: null };
        }
    } catch (axiosError) {
        let err = axiosError as AxiosError;
        return { error: { status: err.response?.status, data: err.response?.data } };
    }
};
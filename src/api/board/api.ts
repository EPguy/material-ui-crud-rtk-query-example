import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Board} from "../../models/Board";
import {properties} from "../../properties";
import {BaseResponse} from "../../models/response/BaseResponse";

export const BOARD_API_REDUCER_KEY = 'boardApi';
export const boardApi = createApi({
    reducerPath: BOARD_API_REDUCER_KEY,
    baseQuery: fetchBaseQuery({ baseUrl: properties.apiDomain }),
    endpoints: (builder) => ({
        getBoardList: builder.query<BaseResponse<Board[]>, null>({
            query: () => {
                return ({
                    url: 'rtk/board',
                    method: 'GET'
                })
            },
        }),
    }),
})
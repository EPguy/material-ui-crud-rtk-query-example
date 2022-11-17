import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Board} from "../../models/Board";
import {properties} from "../../properties";
import {BaseResponse} from "../../models/response/BaseResponse";
import {axiosBaseQuery} from "../axiosBaseQuery";

export const BOARD_API_REDUCER_KEY = 'boardApi';
export const boardApi = createApi({
    reducerPath: BOARD_API_REDUCER_KEY,
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getBoardList: builder.query<Board[], null>({
            query: () => {
                return ({
                    url: 'board',
                    method: 'GET'
                })
            },
        }),
    }),
})

export const { useGetBoardListQuery } = boardApi
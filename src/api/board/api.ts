import { createApi } from '@reduxjs/toolkit/query/react'
import {Board} from "../../models/Board";
import {axiosBaseQuery} from "../axiosBaseQuery";

export const BOARD_API_REDUCER_KEY = 'boardApi';
export const boardApi = createApi({
    reducerPath: BOARD_API_REDUCER_KEY,
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Board'],
    endpoints: (builder) => ({
        getBoardList: builder.query<Board[], null>({
            query: () => {
                return ({
                    url: 'board',
                    method: 'GET'
                })
            },
            providesTags: result => [{type: 'Board', id: 'List'}],
        }),
        deleteBoard: builder.mutation<null, {board: Board}>({
            query: ({board}) => {
                return ({
                    url: 'board',
                    method: 'DELETE',
                    data: board
                })
            },
            invalidatesTags: ["Board"],
        }),
        updateBoard: builder.mutation<null, {board: Board}>({
            query: ({board}) => {
                return ({
                    url: 'board',
                    method: 'PUT',
                    data: board
                })
            },
            invalidatesTags: ["Board"]
        })
    }),
})

export const { useGetBoardListQuery, useDeleteBoardMutation, useUpdateBoardMutation } = boardApi
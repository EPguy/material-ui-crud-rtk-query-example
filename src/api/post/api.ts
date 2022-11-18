import { createApi } from '@reduxjs/toolkit/query/react'
import {Post} from "../../models/Post";
import {axiosBaseQuery} from "../axiosBaseQuery";

export const POST_API_REDUCER_KEY = 'postApi';
export const postApi = createApi({
    reducerPath: POST_API_REDUCER_KEY,
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPostList: builder.query<Post[], null>({
            query: () => {
                return ({
                    url: 'post',
                    method: 'GET'
                })
            },
            providesTags: result => [{type: 'Post', id: 'List'}],
        }),
        deletePost: builder.mutation<null, {post: Post}>({
            query: ({post}) => {
                return ({
                    url: 'post',
                    method: 'DELETE',
                    data: post
                })
            },
            invalidatesTags: ["Post"],
        }),
        updatePost: builder.mutation<null, {post: Post}>({
            query: ({post}) => {
                return ({
                    url: 'post',
                    method: 'PUT',
                    data: post
                })
            },
            invalidatesTags: ["Post"]
        })
    }),
})

export const { useGetPostListQuery, useDeletePostMutation, useUpdatePostMutation } = postApi
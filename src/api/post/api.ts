import { createApi } from '@reduxjs/toolkit/query/react'
import {Post} from "../../models/Post";
import {axiosBaseQuery} from "../axiosBaseQuery";
import {PostListResponse} from "../../models/response/PostListResponse";

export const POST_API_REDUCER_KEY = 'postApi';
export const postApi = createApi({
    reducerPath: POST_API_REDUCER_KEY,
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPostList: builder.query<PostListResponse, {page: number, rowsPerPage: number}>({
            query: ({page, rowsPerPage}) => {
                return ({
                    url: `post?page=${page}&rowsPerPage=${rowsPerPage}`,
                    method: 'GET'
                })
            },
            providesTags: result => [{type: 'Post', id: 'List'}]
        }),
        getPost: builder.query<Post, number>({
            query: (seq) => {
                return ({
                    url: `post/${seq}`,
                    method: 'GET'
                })
            },
            providesTags: result => [{type: 'Post', id: result?.seq}]
        }),
        insertPost: builder.mutation<Post, Post>({
            query: (post) => {
                return ({
                    url: 'post',
                    method: 'POST',
                    data: post
                })
            },
            invalidatesTags: result => ["Post", {type: "Post", id: result?.seq}]
        }),
        deletePost: builder.mutation<Post, Post>({
            query: (post) => {
                return ({
                    url: 'post',
                    method: 'DELETE',
                    data: post
                })
            },
            invalidatesTags: result => ["Post", {type: "Post", id: result?.seq}]
        }),
        updatePost: builder.mutation<Post, Post>({
            query: (post) => {
                return ({
                    url: 'post',
                    method: 'PUT',
                    data: post
                })
            },
            invalidatesTags: result => ["Post", {type: "Post", id: result?.seq}]
        })
    }),
})

export const { useGetPostListQuery, useGetPostQuery, useInsertPostMutation, useDeletePostMutation, useUpdatePostMutation } = postApi

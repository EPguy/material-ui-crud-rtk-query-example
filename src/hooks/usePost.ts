import {useCallback} from "react";
import {Post} from "../models/Post";
import {useDeletePostMutation, useGetPostListQuery, useUpdatePostMutation} from "../api/post/api";

export default function usePost() {
    const { data: postList = [], isLoading: getPostLoading } = useGetPostListQuery(null)
    const [deletePostMutation, { isLoading: deletePostLoading }] = useDeletePostMutation()
    const [updatePostMutation, { isLoading: updatePostLoading }] = useUpdatePostMutation()

    const loading = getPostLoading || deletePostLoading || updatePostLoading

    const deletePost = useCallback((post: Post, password: string) => {
        post = {
            ...post,
            password: password.toString()
        }
        deletePostMutation({post});
    }, [deletePostMutation])

    const updatePost = useCallback((post: Post) => {
        const title = prompt("Enter A TITLE TO UPDATE.");
        const password = prompt("Enter Password.");
        if(title !== null && password != null) {
            post = {
                ...post,
                title: title.toString(),
                password: password.toString()
            }
        }
        updatePostMutation({post});
    }, [updatePostMutation])

    return { postList, loading, deletePost, updatePost }
}
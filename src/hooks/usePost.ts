import {useCallback} from "react";
import {Post} from "../models/Post";
import {useDeletePostMutation, useGetPostListQuery, useInsertPostMutation, useUpdatePostMutation} from "../api/post/api";
import useDialog from "./useDialog";

export default function usePost() {

    const { openDialog, closeDialog } = useDialog();

    const { data: postList = [], isLoading: getPostListLoading } = useGetPostListQuery(null)
    const [insertPostMutation, { isLoading: insertPostLoading }] = useInsertPostMutation()
    const [deletePostMutation, { isLoading: deletePostLoading }] = useDeletePostMutation()
    const [updatePostMutation, { isLoading: updatePostLoading }] = useUpdatePostMutation()

    const loading = getPostListLoading || deletePostLoading || updatePostLoading || insertPostLoading

    const insertPost = useCallback((post: Post) => {
        insertPostMutation(post)
    }, [insertPostMutation])

    const deletePost = useCallback((post: Post) => {
        openDialog((password) => {
            post = {
                ...post,
                password: password.toString()
            }
            deletePostMutation(post);
            closeDialog()
        });
    }, [deletePostMutation, closeDialog, openDialog])

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
        updatePostMutation(post);
    }, [updatePostMutation])

    return { postList, loading, deletePost, updatePost, insertPost }
}
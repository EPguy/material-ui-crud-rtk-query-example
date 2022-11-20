import {useCallback} from "react";
import {Post} from "../models/Post";
import {useDeletePostMutation, useGetPostListQuery, useInsertPostMutation, useUpdatePostMutation} from "../api/post/api";
import useDialog from "./useDialog";
import {useNavigate} from "react-router-dom";

export default function usePost() {

    const navigate = useNavigate()
    const { openDialog, closeDialog } = useDialog();

    const { data: postList = [], isLoading: getPostListLoading } = useGetPostListQuery(null)
    const [insertPostMutation, { isLoading: insertPostLoading }] = useInsertPostMutation()
    const [deletePostMutation, { isLoading: deletePostLoading }] = useDeletePostMutation()
    const [updatePostMutation, { isLoading: updatePostLoading }] = useUpdatePostMutation()

    const loading = getPostListLoading || deletePostLoading || updatePostLoading || insertPostLoading

    const insertPost = useCallback(async (post: Post) => {
        const data = await insertPostMutation(post).unwrap()
        if(data != null) {
            // if insert usccess
            navigate('/')
        }
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

    const updatePost = useCallback(async (post: Post) => {
        const data = await updatePostMutation(post).unwrap();
        if(data != null) {
            //if update success
            navigate('/')
        }
    }, [updatePostMutation])

    return { postList, loading, deletePost, updatePost, insertPost }
}

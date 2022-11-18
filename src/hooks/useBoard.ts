import {useCallback} from "react";
import {Board} from "../models/Board";
import {useDeleteBoardMutation, useGetBoardListQuery, useUpdateBoardMutation} from "../api/board/api";

export default function useBoard() {
    const { data: boardList = [], isLoading: getBoardLoading } = useGetBoardListQuery(null)
    const [deleteBoardMutation, { isLoading: deleteBoardLoading }] = useDeleteBoardMutation()
    const [updateBoardMutation, { isLoading: updateBoardLoading }] = useUpdateBoardMutation()

    const loading = getBoardLoading || deleteBoardLoading || updateBoardLoading

    const deleteBoard = useCallback((board: Board, password: string) => {
        board = {
            ...board,
            password: password.toString()
        }
        deleteBoardMutation({board});
    }, [deleteBoardMutation])

    const updateBoard = useCallback((board: Board) => {
        const title = prompt("Enter A TITLE TO UPDATE.");
        const password = prompt("Enter Password.");
        if(title !== null && password != null) {
            board = {
                ...board,
                title: title.toString(),
                password: password.toString()
            }
        }
        updateBoardMutation({board});
    }, [updateBoardMutation])

    return { boardList, loading, deleteBoard, updateBoard }
}
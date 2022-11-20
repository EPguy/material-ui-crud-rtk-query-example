import {useAppDispatch} from "../store/config";
import {setPage, setRowsPerPage} from "../store/slices/paginationSlice";
import {useCallback} from "react";
export default function usePagination() {
    const dispatch = useAppDispatch();

    const handleChangePage = useCallback((page: number) => {
        dispatch(setPage(page));
    },[dispatch])

    const handleChangeRowsPerPage = useCallback((page: number) => {
        dispatch(setRowsPerPage(page));
    },[dispatch])

    return { handleChangePage, handleChangeRowsPerPage }
}

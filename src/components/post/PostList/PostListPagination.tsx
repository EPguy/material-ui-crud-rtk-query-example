import {Button, TablePagination} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {useAppSelector} from "../../../store/config";
import usePagination from "../../../hooks/usePagination";


interface PropsType {
    totalCount: number
}

const PostListPagination = ({totalCount}: PropsType) => {
    const { page, rowsPerPage } = useAppSelector(state => state.pagination)
    const { handleChangePage, handleChangeRowsPerPage } = usePagination()
    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={3}
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
                inputProps: {
                    'aria-label': 'rows per page',
                },
                native: true,
            }}
            onPageChange={(_,page) => {handleChangePage(page)}}
            onRowsPerPageChange={(e) => {handleChangeRowsPerPage(Number(e.target.value))}}
            ActionsComponent={TablePaginationActions}
        />
    )
}
export default PostListPagination;

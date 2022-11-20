import {TablePagination, TableRow} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import usePagination from "../../../hooks/usePagination";


interface PropsType {
    totalCount: number,
    page: number,
    rowsPerPage: number
}

const PostListPagination = ({totalCount, page, rowsPerPage}: PropsType) => {
    const { handleChangePage, handleChangeRowsPerPage } = usePagination()
    return (
        <TableRow>
            <TablePagination
                width="100%"
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
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
        </TableRow>
    )
}
export default PostListPagination;

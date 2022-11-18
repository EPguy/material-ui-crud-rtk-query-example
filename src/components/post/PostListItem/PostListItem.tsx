import {useCallback, useMemo} from "react";
import usePost from "../../../hooks/usePost";
import {
    Box, Button,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from "@mui/material";
import {Delete, Edit, PostAdd} from "@mui/icons-material";
import useDialog from "../../../hooks/useDialog";
import {Post} from "../../../models/Post";

const PostListItem = () => {
    const { postList, deletePost, updatePost } = usePost();
    const { openDialog, closeDialog } = useDialog();

    const doDeletePost = useCallback((post: Post) => {
        openDialog((password) => {
            deletePost(post, password)
            closeDialog()
        });
    },[closeDialog, deletePost, openDialog])

    return useMemo(() => (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    }}
                >
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        RTK Query Example
                    </Typography>
                    <Button variant="contained" color="success" startIcon={<PostAdd />}>
                        Post
                    </Button>
                </Toolbar>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell width="5%">ID</TableCell>
                                <TableCell width="20%" align="center">Title</TableCell>
                                <TableCell width="60%" align="center">Content</TableCell>
                                <TableCell width="15%" align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {postList.map((post) => (
                                <TableRow
                                    key={post.seq}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" width="5%" scope="row">{post.seq}</TableCell>
                                    <TableCell component="th"  width="20%" scope="row" align="center">
                                        {post.title}
                                    </TableCell>
                                    <TableCell align="center" width="60%">{post.content}</TableCell>
                                    <TableCell align="center" width="15%">
                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                            <Button size="small" variant="outlined" startIcon={<Edit />} onClick={() => updatePost(post)}>
                                                Edit
                                            </Button>
                                            <Button size="small" color="error" variant="outlined" startIcon={<Delete />}  onClick={() => doDeletePost(post)}>
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    ), [postList, updatePost, doDeletePost])
}

export default PostListItem;
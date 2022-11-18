import {Button, Toolbar, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const PostListHeader = () => {
    const navigate = useNavigate();
    return (
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
            <Button variant="contained" color="success" startIcon={<Add />} onClick={() => navigate("/post/add")}>
                Post
            </Button>
        </Toolbar>
    )
}
export default PostListHeader;
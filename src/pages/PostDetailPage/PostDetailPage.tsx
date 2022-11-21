import React from "react";
import {Container} from "@mui/material";
import PostDetail from "../../components/post/PostDetail/PostDetail";

const PostDetailPage = ()  => {
    return (
        <>
            <Container maxWidth="lg">
                <PostDetail/>
            </Container>
        </>
    )
}

export default PostDetailPage;
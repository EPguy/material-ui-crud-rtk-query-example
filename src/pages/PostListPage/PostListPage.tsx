import React from "react";
import PostListItem from "../../components/post/PostList/PostListItem";
import {Container} from "@mui/material";

const PostListPage = ()  => {
    return (
        <Container maxWidth="xl">
            <PostListItem/>
        </Container>
    )
}

export default PostListPage;
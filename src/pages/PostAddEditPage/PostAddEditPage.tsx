import React from "react";
import PostForm from "../../components/post/PostForm/PostForm";
import {Container} from "@mui/material";

const PostAddEditPage = ()  => {
    return (
        <>
            <Container maxWidth="lg">
                <PostForm/>
            </Container>
        </>
    )
}

export default PostAddEditPage;
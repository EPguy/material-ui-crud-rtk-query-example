import {Button, Paper, Stack, Typography} from "@mui/material";
import {useGetPostQuery} from "../../../api/post/api";
import {useNavigate, useParams} from "react-router-dom";
import React from "react";

const PostDetail = () => {
    const navigate = useNavigate();
    const { seq } = useParams();
    const seqNumber = seq ? Number(seq) : 0

    const { data } = useGetPostQuery(seqNumber)

    return (
        <Paper sx={{padding: "20px"}}>
            {
                data && (
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h6" textAlign="center">{data.title}</Typography>
                        <Typography variant="subtitle1">{data.content}</Typography>
                    </Stack>
                )
            }
            <Stack direction="row" spacing={1} sx={{marginTop: "50px"}}>
                <Button size="medium" variant="contained" onClick={() => navigate(`/`)} color="inherit">
                    Back
                </Button>
            </Stack>
        </Paper>
    )
}
export default PostDetail;

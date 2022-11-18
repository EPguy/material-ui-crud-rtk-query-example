import React, {useCallback, useEffect, useState} from "react";
import {useGetPostQuery} from "../../../api/post/api";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import usePost from "../../../hooks/usePost";
import useAlert from "../../../hooks/useAlert";

const initialFormState = {
    title: "",
    content: "",
    password: "",
}

const initialInputErrorState = {
    title: false,
    content: false,
    password: false
}

const PostForm = ()  => {
    const [formValue, setFormValue] = useState(initialFormState);
    const [inputError, setInputError] = useState(initialInputErrorState)
    const [editMode, setEditMode] = useState(false)
    const { seq } = useParams();
    const { insertPost } = usePost();
    const { openFailAlert } = useAlert();
    const seqNumber = seq ? Number(seq) : 0
    const navigate = useNavigate()
    const { data } = useGetPostQuery(seqNumber)

    useEffect(() => {
        if(seq && data) {
            setEditMode(true)
            setFormValue({
                title: data.title,
                content: data.content,
                password: ""
            })
        }
    }, [data, seq])

    const onAddClick = useCallback(async () => {
        setInputError({
            title: formValue.title.trim() === "",
            content: formValue.content.trim() === "",
            password: formValue.password.trim() === ""
        })
        if(formValue.title.trim() === "") {
            openFailAlert("Please enter the title.");
        } else if(formValue.content.trim() === "") {
            openFailAlert("Please enter the content.");
        } else if(formValue.password.trim() === "") {
            openFailAlert("Please enter the password.");
        } else {
            await insertPost({title: formValue.title, content: formValue.content, password: formValue.password})
            navigate('/')
        }
    },[formValue])

    return (
        <>
           <Paper sx={{padding: "20px"}}>
               <Stack direction="column" spacing={3}>
                   <Typography
                       sx={{ flex: '1 1 100%' }}
                       variant="h6"
                       id="tableTitle"
                       component="div"
                   >
                       {editMode ? "Edit" : "Add"} Post
                   </Typography>
                   <TextField
                       error={inputError.title}
                       variant="standard"
                       id="title"
                       label="Title"
                       value={formValue.title}
                       onChange={(e) => setFormValue({...formValue, title: e.target.value})}
                       helperText={inputError.title ? "Require." : ""}
                   />
                   <TextField
                       error={inputError.content}
                       variant="standard"
                       id="content"
                       label="Content"
                       value={formValue.content}
                       onChange={(e) => setFormValue({...formValue, content: e.target.value})}
                       helperText={inputError.content ? "Require." : ""}
                   />
                   <TextField
                       error={inputError.password}
                       variant="standard"
                       type="password"
                       id="password"
                       label="Password"
                       value={formValue.password}
                       onChange={(e) => setFormValue({...formValue, password: e.target.value})}
                       helperText={inputError.password ? "Require." : ""}
                   />
                   <Stack direction="row" spacing={1}>
                       <Button size="medium" variant="contained" onClick={() => navigate(`/`)} color="secondary">
                           Back
                       </Button>
                       <Button size="medium"  variant="contained" color="success" onClick={() => onAddClick()}>
                           Add
                       </Button>
                   </Stack>
               </Stack>
           </Paper>
        </>
    )
}

export default PostForm;
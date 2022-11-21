import React, {useCallback, useEffect, useState} from "react";
import {useGetPostQuery} from "../../../api/post/api";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import usePost from "../../../hooks/usePost";
import useAlert from "../../../hooks/useAlert";

const initialFormState = {
    seq: 0,
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
    const { insertPost, updatePost } = usePost();
    const { openFailAlert } = useAlert();
    const seqNumber = seq ? Number(seq) : 0
    const navigate = useNavigate()

    const { data } = useGetPostQuery(seqNumber)

    useEffect(() => {
        if(seq && data) {
            setEditMode(true)
            setFormValue({
                seq: data.seq!,
                title: data.title,
                content: data.content,
                password: ""
            })
        }
    }, [data, seq])

    const validate = useCallback((): boolean => {
        let isSuccess = false;
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
            isSuccess = true
        }
        return isSuccess
    }, [setInputError, formValue, openFailAlert])

    const onAddClick = useCallback(async () => {
        if(validate()) {
            await insertPost({
                title: formValue.title,
                content: formValue.content,
                password: formValue.password
            })
        }
    },[formValue, insertPost, validate])

    const onEditClick = useCallback(async () => {
        if(validate()) {
            await updatePost({
                seq: formValue.seq,
                title: formValue.title,
                content: formValue.content,
                password: formValue.password
            })
        }
    },[formValue, updatePost, validate])

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
                       <Button size="medium" variant="contained" onClick={() => navigate(`/`)} color="inherit">
                           Back
                       </Button>
                       {
                           editMode ? (<Button size="medium"  variant="contained" color="primary" onClick={() => onEditClick()}>
                               Edit
                           </Button>) : (<Button size="medium"  variant="contained" color="primary" onClick={() => onAddClick()}>
                               Add
                           </Button>)
                       }
                   </Stack>
               </Stack>
           </Paper>
        </>
    )
}

export default PostForm;

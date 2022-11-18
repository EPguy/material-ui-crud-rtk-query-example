import React, {useEffect, useState} from "react";
import {useGetPostQuery} from "../../../api/post/api";
import {useParams} from "react-router-dom";

const initialState = {
    title: "",
    content: "",
    password: "",
}

const PostForm = ()  => {
    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false)
    const { seq } = useParams();
    const seqNumber = seq ? Number(seq) : 0
    const {data, isLoading} = useGetPostQuery(seqNumber)

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
    return (
        <>

        </>
    )
}

export default PostForm;
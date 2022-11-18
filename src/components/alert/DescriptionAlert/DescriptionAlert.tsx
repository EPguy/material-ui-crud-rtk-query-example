import {
    Alert,
    AlertTitle,
    IconButton,
} from "@mui/material";
import {useAppSelector} from "../../../store/config";
import useAlert from "../../../hooks/useAlert";
import {Close} from "@mui/icons-material";

const DescriptionAlert = () => {
    const {open, type, title, body} = useAppSelector(state => state.alert);
    const { closeAlert } = useAlert();

    return (
        <div>
            {
                open && <Alert
                    severity={type}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                closeAlert();
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    <AlertTitle>{title}</AlertTitle>
                    {body}
                </Alert>
            }
        </div>
    )
}

export default DescriptionAlert;
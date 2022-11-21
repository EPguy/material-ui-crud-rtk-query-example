import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useAppSelector} from "../../../store/config";
import useDialog from "../../../hooks/useDialog";
import {useState} from "react";

const PasswordDialog = () => {
    const [password, setPassword] = useState("");
    const {open, onConfirm} = useAppSelector(state => state.dialog);
    const { closeDialog } = useDialog();

   return (
       <div>
           <Dialog open={open} onClose={() => closeDialog()}>
               <DialogTitle>Confirm Password</DialogTitle>
               <DialogContent>
                   <DialogContentText>
                       Please enter the password you used to create this post.
                   </DialogContentText>
                   <TextField
                       autoFocus={true}
                       margin="dense"
                       id="name"
                       label="Password"
                       type="password"
                       fullWidth
                       variant="standard"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                   />
               </DialogContent>
               <DialogActions>
                   <Button onClick={() => closeDialog()}>Cancel</Button>
                   <Button onClick={() => onConfirm(password)}>Confirm</Button>
               </DialogActions>
           </Dialog>
       </div>
   )
}

export default PasswordDialog;

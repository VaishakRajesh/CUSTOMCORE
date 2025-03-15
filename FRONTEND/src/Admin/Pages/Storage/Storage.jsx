import React, { useState } from 'react'
import Style from './Storage.module.css'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Storage = () => {
    const [open, setOpen] = React.useState(false);
    const [errors, seterrors] = useState("")
    const handleClose = () => {
        setOpen(false);
    };

    const [storage, setstorage] = useState("")
    const HandleSubmit = () => {
        const data = {
            storageName: storage
        }
        axios.post("http://localhost:5000/collectionStorage", data).then((response) => {
            console.log(response)
            seterrors("Insert Successfully")
            setOpen(true);

        }).catch((err) => {
            console.log(err);
                seterrors("Data already exists")
            setOpen(true);
        })
    }
    return (
 
                <div className={Style.Storages}>
                    <div className={Style.Text}>Insert Storages</div>
                    <div className={Style.TextField}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Storage Name Other Details"
                            multiline
                            maxRows={4}
                            variant="standard"
                            sx={{
                                width: '200px', // Increase width
                                '& .MuiInputBase-root': {
                                    color: 'Black', // Text color
                                    fontSize: '18px', // Increase text size
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'Black', // Label color
                                    fontSize: '20px', // Increase label size
                                },
                                '& .MuiInput-underline:before': {
                                    borderBottomColor: 'Black', // Default underline color
                                },
                                '& .MuiInput-underline:hover:before': {
                                    borderBottomColor: 'Black', // Hover underline color
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: 'Black', // Focused underline color
                                },
                            }}
                            onChange={(e) => setstorage(e.target.value)}/>
                    </div>
                    <div className={Style.Button}><Button onClick={HandleSubmit}>Submit</Button></div>
                    <React.Fragment>
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                    {errors}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Ok</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                </div>
        
    )
}

export default Storage
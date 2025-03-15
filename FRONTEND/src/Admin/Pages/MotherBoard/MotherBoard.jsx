import React, { useEffect, useState } from 'react'
import Style from './MotherBoard.module.css'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Types from '../Types/Types';
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const MotherBoard = () => {

    const handleChange1 = (event) => {
        setType(event.target.value);
    };
    const handleChange2 = (event) => {
        setCompany(event.target.value);
    };


    const fetchTypes = () => {
        axios.get("http://localhost:5000/collectionType").then((response) => {
            console.log(response.data);
            setTypeArray(response.data.type)
        })
    }
    const fetchCompany = () => {
        axios.get("http://localhost:5000/collectionCompany").then((response) => {
            console.log(response.data);
            setCompanyArray(response.data.company)
        })
    }
    const fetchMotherboard = () => {
        axios.get("http://localhost:5000/collectionMotherboard").then((response) => {
            console.log(response.data);
            setMotherboardArray(response.data)
        })
    }


    const [CompanyArray, setCompanyArray] = React.useState([]);
    const [Company, setCompany] = useState("")
    const [Motherboard, setMotherboard] = useState("")
    const [TypeArray, setTypeArray] = useState([])
    const [Type, setType] = useState([])
    const [open, setOpen] = React.useState(false);
    const [errors, seterrors] = useState("")
    const [MotherboardArray, setMotherboardArray] = useState([])

    const HandleSubmit = () => {
        const data = {
            motherboardName: Motherboard,
            typeId: Type,
            companyId: Company
        }
        axios.post("http://localhost:5000/collectionMotherboard", data).then((response) => {
            console.log(response)
            seterrors("Insert Successfully")
            setOpen(true);
            fetchMotherboard();
        }).catch((err) => {
            console.log(err);
            seterrors("Data already exists")
            setOpen(true);
        })
    }
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        fetchCompany();
        fetchTypes();
    }, [])

    return (
        <div className={Style.MotherBoard}>
            <div className={Style.Text}>Insert MotherBoard</div>
            <div className={Style.TextField}>
                <TextField
                    id="standard-multiline-flexible"
                    label="MotherBoard"
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
                    }} onChange={(e) => setMotherboard(e.target.value)}
                />
            </div>
            <div className={Style.Types}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel
                        id="demo-simple-select-standard-label"
                        sx={{ fontSize: 20, fontWeight: 'bold' }}
                    >
                        Select Types
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={Type}
                        onChange={handleChange1}
                        label="Select Types"
                        sx={{
                            width: 200,
                            fontWeight: 'bold',
                            color: 'black', // Ensures selected text remains black
                        }}
                    >

                        {TypeArray?.map((Type, index) => (
                            <MenuItem key={index} value={Type._id} sx={{ color: 'black' }}>
                                {Type.typeName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className={Style.Company}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel
                        id="demo-simple-select-standard-label"
                        sx={{ fontSize: 20, fontWeight: 'bold' }}
                    >
                        Select Company
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={Company}
                        onChange={handleChange2}
                        label="Select District"
                        sx={{
                            width: 200,
                            fontWeight: 'bold',
                            color: 'black', // Ensures selected text remains black
                        }}
                    >
                        {CompanyArray?.map((Company, index) => (
                            <MenuItem key={index} value={Company._id} sx={{ color: 'black' }}>
                                {Company.companyName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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

export default MotherBoard
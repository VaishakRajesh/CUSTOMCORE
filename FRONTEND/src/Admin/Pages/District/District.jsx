import React, { useEffect, useState } from 'react'
import Style from './District.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { motion } from 'framer-motion';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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


const District = () => {
    const fetchDistrict = () => {
        axios.get("http://localhost:5000/collectionDistrict").then((response) => {
            console.log(response.data.district);
            setDistrictArray(response.data.district)
        })
    }


    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/collectionDistrict/${id}`).then((response) => {
            fetchDistrict();
            console.log(response)
        }).catch((err) => {
            console.log(err);
            
        })
    };
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'districtName', headerName: 'District name', flex: 3 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            width: 350,
            renderCell: (params) => {
                return (
                    <>
                        <DeleteOutlineIcon
                            className="Delete"
                            onClick={() =>
                                 deleteData(params.row._id)
                                }
                        />
                    </>
                );
            }
        }

    ];

    const paginationModel = { page: 0, pageSize: 5 };
    const [open, setOpen] = React.useState(false);
    const [errors, seterrors] = useState("")
    const handleClose = () => {
        setOpen(false);
    };

    const [district, setdistrict] = useState("")
    const [districtArray, setDistrictArray] = useState([])
    const rowsWithId = districtArray.map((row, index) => ({ ...row, id: index + 1 }));

    const HandleSubmit = () => {
        const data = {
            districtName: district
        }
        axios.post("http://localhost:5000/collectionDistrict", data).then((response) => {
            console.log(response)
            seterrors("Insert Successfully")
            setOpen(true);
            fetchDistrict();

        }).catch((err) => {
            console.log(err);
            seterrors("Data already exists")
            setOpen(true);
        })
    }
   
    useEffect(() => {
        fetchDistrict();

    }, [])
    const [ActiveSection, setActiveSection] = useState('');

    
    return (
        <div className={Style.Body}>
            <Sidebar />
            <div className={Style.container}>
                <Navbar />
                <div className={Style.Selectbutton} onClick={() => setActiveSection(ActiveSection === 'insert' ? '' : 'insert')}>
                    <FileUploadOutlinedIcon />
                </div>
                <div className={Style.Selecttext}>Insert District</div>
                {ActiveSection === 'insert' && (

                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className={Style.District}
                    >
                        <div className={Style.District}>
                            <div className={Style.box}>
                                <div className={Style.text}>Insert District<br /><br /></div>
                                <div className={Style.TextField}>
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="District Name"
                                        multiline
                                        maxRows={4}
                                        variant="standard"
                                        sx={{
                                            width: '200px', // Set custom width
                                            '& .MuiInputBase-root': { // Root container
                                                minHeight: '60px', // Set minimum height
                                            },
                                            '& .MuiInputBase-input': { // Targets the input text
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'black',
                                            },
                                            '& .MuiInputLabel-root': { // Targets the label
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'black',
                                            }
                                        }}
                                        onChange={(e) => setdistrict(e.target.value)} />
                                </div>


                                <br />
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

                        </div>
                    </motion.div>
                )}
                {ActiveSection != 'insert' && (

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >

                        <div className={Style.tablediv}>
                            <div className={Style.table}>
                                <Paper sx={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={rowsWithId}
                                        columns={columns}
                                        initialState={{ pagination: { paginationModel } }}
                                        pageSizeOptions={[5, 10]}
                                        // checkboxSelection
                                        sx={{ border: 0 }}
                                    />
                                </Paper>
                            </div>
                        </div>
                    </motion.div>)}
            </div>
        </div>
    )
}

export default District
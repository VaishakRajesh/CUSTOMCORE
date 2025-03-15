import React, { useEffect, useState } from 'react'
import Style from './Place.module.css'
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
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { motion } from 'framer-motion';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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


const Place = () => {

    const [District, setDistrict] = React.useState('');

    const handleChange = (event) => {
        setDistrict(event.target.value);
    };


    const fetchPlace = () => {
        axios.get("http://localhost:5000/collectionPlace").then((response) => {
            console.log(response.data.place);
            setPlaceArray(response.data.place)
        })
    }
    const fetchDistrict = () => {
        axios.get("http://localhost:5000/collectionDistrict").then((response) => {
            console.log(response.data.district);
            setDistrictArray(response.data.district)
        })
    }


    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/collectionPlace/${id}`).then((response) => {
            fetchPlace();
            console.log(response)
        }).catch((err) => {
            console.log(err);

        })
    };
    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'placeName', headerName: 'place name', flex: 3 },
        { field: 'district', headerName: 'District name', flex: 3 },
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

    const [Place, setPlace] = useState("")
    const [PlaceArray, setPlaceArray] = useState([])
    const [DistrictArray, setDistrictArray] = useState([])
    const rowsWithId = PlaceArray.map((row, index) => ({ ...row, district : row.districtId.districtName, id: index + 1 }));

    const HandleSubmit = () => {
        const data = {
            districtId: District,
            placeName: Place
        }
        axios.post("http://localhost:5000/collectionPlace", data).then((response) => {
            console.log(response)
            seterrors("Insert Successfully")
            setOpen(true);
            fetchPlace();
        }).catch((err) => {
            console.log(err);
            seterrors("Data already exists")
            setOpen(true);
        })
    }

    useEffect(() => {
        fetchPlace();
        fetchDistrict()
    }, [])
    const [ActiveSection, setActiveSection] = useState('');


    return (
        <div className={Style.Body}>
            {/* <Sidebar /> */}
            <div className={Style.container}>
                {/* <Navbar /> */}
                <div className={Style.Selectbutton} onClick={() => setActiveSection(ActiveSection === 'insert' ? '' : 'insert')}>
                    <FileUploadOutlinedIcon />
                </div>
                <div className={Style.Selecttext}>Insert Place</div>
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
                                <div className={Style.text}>Insert Place<br /><br /></div>
                                <div className={Style.SeletDistrict}>
                                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                                        <InputLabel
                                            id="demo-simple-select-standard-label"
                                            sx={{ fontSize: 20, fontWeight: 'bold' }}
                                        >
                                            Select District
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            value={District}
                                            onChange={handleChange}
                                            label="Select District"
                                            sx={{
                                                width: 200,
                                                fontWeight: 'bold',
                                                color: 'black', // Ensures selected text remains black
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {DistrictArray?.map((district, index) => (
                                                <MenuItem key={index} value={district._id} sx={{ color: 'black' }}>
                                                    {district.districtName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>


                                </div>
                                <div className={Style.TextField}>
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Place Name"
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
                                        onChange={(e) => setPlace(e.target.value)} />
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

export default Place
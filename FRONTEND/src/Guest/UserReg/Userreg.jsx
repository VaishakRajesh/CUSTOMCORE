import React, { useEffect, useState } from 'react';
import Styles from './Userreg.module.css';
import {
  Box, Button, FormControl, InputLabel, MenuItem, Select, TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, Slide, Paper,
  TableCell, TableRow,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import axios from 'axios';
import { DriveFolderUploadOutlined, Visibility, VisibilityOff } from '@mui/icons-material';

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


const Userreg = () => {

  const fetchDistrict = () => {
    axios.get("http://localhost:5000/collectionDistrict").then((response) => {
      console.log(response.data);
      setDistrictArray(response.data.district)
    })
  }
  const fetchPlace = (e) => {
    const district = e.target.value
    axios.get(`http://localhost:5000/collectionPlaceByIdAll/${district}`).then((response) => {
      console.log(response.data);
      setPlaceArray(response.data)
    })
  }
  const fetchUser = () => {
    axios.get("http://localhost:5000/collectionUser").then((response) => {
      console.log(response.data);
      setUserArray(response.data)
    })
  }

  const [DistrictArray, setDistrictArray] = useState([])
  const [PlaceArray, setPlaceArray] = useState([])
  const [UserArray, setUserArray] = useState([])

  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const [UserName, setUserName] = useState("")
  const [UserContact, setUserContact] = useState("")
  const [UserEmail, setUserEmail] = useState("")
  const [UserAddress, setUserAddress] = useState("")
  const [UserPassword, setUserPassword] = useState("")
  const [Place, setPlace] = useState("")
  const [image, setimage] = useState([])
  const [proof, setproof] = useState([])
  const [Message, setMessage] = useState("")
  const [emailError, setEmailError] = useState("");


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailRegex.test(emailValue)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email format!");
    }
  };



  const handleChange = (event) => {
    setPlace(event.target.value);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  // const handleChange1 = (event) => {
  //   const selectedDistrict = event.target.value;
  //   setdistrict(selectedDistrict);
  //   fetchPlace(selectedDistrict);
  // };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
    if (e.target.value !== UserPassword) {
      setPasswordError("Passwords do not match!");
    } else {
      setPasswordError("");
    }
  };


  const handleSubmit = async () => {



    const formDataToSend = new FormData();

    formDataToSend.append('name', UserName);
    formDataToSend.append('email', UserEmail);
    formDataToSend.append('address', UserAddress);
    formDataToSend.append('contact', UserContact);
    formDataToSend.append('place', Place);
    formDataToSend.append('password', UserPassword);

    if (proof) formDataToSend.append('proof', proof);
    if (image) formDataToSend.append('image', image);

    try {
      

      axios.post('http://localhost:5000/collectionUserreg', formDataToSend).then((response) => {
        setMessage('Registration successful!');
        alert("Registration successful");
        console.log('Registration successful:', response.data);
      })

    } catch (error) {
      // setMessage('Error registering. Please try again.');
      console.error('Error registering:', error);
    }
  };





  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    fetchUser();
    fetchDistrict();
  }, [])
  return (
    <div className={Styles.body}>
      <div className={Styles.Card}>
        <div className={Styles.username}>
          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: '#9d3579' }}>User Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="User Name" sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                input: {
                  color: '#9d3579',
                },
              }} onChange={(e) => setUserName(e.target.value)} />
          </FormControl>
        </div>
        <div className={Styles.contact}>
          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: '#9d3579' }}>Contact</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="contact" sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                input: {
                  color: '#9d3579',
                },
              }} onChange={(e) => setUserContact(e.target.value)} />
          </FormControl>
        </div>
        <div className={Styles.email}>
          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: '#9d3579' }}>Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="email" sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                input: {
                  color: '#9d3579',
                },
              }} onChange={(e) => setUserEmail(e.target.value)}
            />
          </FormControl>
        </div>
        <br />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <div className={Styles.district}>
          <Box sx={{ minWidth: 250, color: '#9d3579', backgroundColor: '#1c0f38', border: '2px solid #9d3579' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ color: '#9d3579' }}>District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={District}
                label="District"
                onChange={fetchPlace}
                sx={{ color: '#9d3579', backgroundColor: '#482b74', border: '0.1px solid #9d3579' }}
              >
                {DistrictArray && DistrictArray.map((District, index) => (
                  <MenuItem key={index} value={District._id} sx={{ color: 'black' }}>
                    {District.districtName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className={Styles.place}>
          <Box sx={{ minWidth: 250, color: '#9d3579', backgroundColor: '#482b74', border: '2px solid #9d3579' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ color: '#9d3579' }}>Place</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Place}
                label="District"
                onChange={handleChange}
                sx={{ color: '#9d3579', backgroundColor: '#482b74', border: '1px solid #9d3579' }}
              >
                {PlaceArray?.map((Place, index) => (
                  <MenuItem key={index} value={Place._id} sx={{ color: 'black' }}>
                    {Place.placeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className={Styles.address}>
          <TextField
            id="outlined-multiline-static"
            label="Address"
            multiline
            rows={4}
            sx={{
              width: '250px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#9d3579',
                },
                '&:hover fieldset': {
                  borderColor: '#9d3579',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9d3579',
                },
                color: '#9d3579'
              },
              '& .MuiInputLabel-root': {
                color: '#9d3579',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#9d3579',
              },
            }} onChange={(e) => setUserAddress(e.target.value)}
          />

        </div>
        <div className={Styles.forminput}>
          <label className={Styles.label} htmlFor='file'> Image: <DriveFolderUploadOutlined className={Styles.icon} /></label>
          <input type="file" id='file' onChange={(e) => setimage(e.target.files[0])} required style={{ display: "none" }} />
        </div>
        <div className={Styles.forminput}>
          <label className={Styles.label} htmlFor='fileTwo'>proof: <DriveFolderUploadOutlined className={Styles.icon} /></label>
          <input type="file" id='fileTwo' onChange={(e) => setproof(e.target.files[0])} required style={{ display: "none" }} />
        </div>
        <div className={Styles.password}>
          <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: "#9d3579" }}>
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9d3579" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9d3579" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#9d3579" },
                input: { color: "#9d3579" },
              }}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "hide the password" : "display the password"}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </FormControl>
        </div>
        <div className={Styles.Repassword}>
          <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-repassword" sx={{ color: "#9d3579" }}>
              RePassword
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-repassword"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#9d3579" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9d3579" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#9d3579" },
                input: { color: "#9d3579" },
              }}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "hide the password" : "display the password"}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="RePassword"
              onChange={handleRePasswordChange}
            />
          </FormControl>
        </div>

        {passwordError && <div style={{ color: "red", marginLeft: "10px" }}>{passwordError}</div>}
        <div className={Styles.button}>
          <Button variant="outlined" sx={{ color: '#9d3579', borderColor: '#9d3579' }} onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div >
  )
}

export default Userreg
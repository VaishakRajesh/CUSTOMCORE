import React, { useEffect, useState } from 'react'
import Styles from './BuliderReg.module.css'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { Place, Visibility, VisibilityOff } from '@mui/icons-material';
import { DriveFolderUploadOutlined } from '@mui/icons-material'
import axios from 'axios';
const BuliderReg = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const [district, setdistrict] = React.useState('');

  const handleChange = (event) => {
    setPlace(event.target.value);
  };

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

    const [DistrictArray, setDistrictArray] = useState([])
    const [PlaceArray, setPlaceArray] = useState([])

    const [buliderName, setbuliderName] = useState("")
      const [buliderContact, setbuliderContact] = useState("")
      const [buliderEmail, setbuliderEmail] = useState("")
      const [buliderAddress, setbuliderAddress] = useState("")
      const [buliderPassword, setbuliderPassword] = useState("")
      const [Place, setPlace] = useState("")
      const [image, setimage] = useState([])
      const [proof, setproof] = useState([])
      const [Message, setMessage] = useState("")
    

  const handleSubmit = async () => {



    const formDataToSend = new FormData();

    formDataToSend.append('name', buliderName);
    formDataToSend.append('email', buliderEmail);
    formDataToSend.append('address', buliderAddress);
    formDataToSend.append('contact', buliderContact);
    formDataToSend.append('place', Place);
    formDataToSend.append('password', buliderPassword);
    console.log(proof)
    console.log(image)
    if (image) formDataToSend.append('image', image);
    if (proof) formDataToSend.append('proof', proof);
    try {
    
      axios.post('http://localhost:5000/collectionBuliderreg', formDataToSend).then((response) => {
        setMessage('Registration successful!');
        console.log('Registration successful:', response.data);
        alert("Registration successful");
      })

    } catch (error) {
      // setMessage('Error registering. Please try again.');
      console.error('Error registering:', error);
    }
  };
 useEffect(() => {
    fetchDistrict();
  }, [])
  return (
    <div className={Styles.body}>
      <div className={Styles.Card}>
        <div className={Styles.username}>
          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: '#9d3579' }}>Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="User Name" sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                input: {
                  color: '#9d3579',
                },
              }} onChange={(e) => setbuliderName(e.target.value)}/>
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
              }} onChange={(e) => setbuliderContact(e.target.value)}/>
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
              }} onChange={(e) => setbuliderEmail(e.target.value)}/>
          </FormControl>
        </div>
        <div className={Styles.district}>
          <Box sx={{ minWidth: 250, color: '#9d3579', backgroundColor: '#1c0f38', border: '2px solid #9d3579' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ color: '#9d3579' }}>District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={district}
                label="District"
                onChange={fetchPlace}
                sx={{ color: '#9d3579', backgroundColor: '#1c0f38', border: '0.1px solid #9d3579' }}
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

        <div className={Styles.district}>
          <Box sx={{ minWidth: 250, color: '#9d3579', backgroundColor: '#1c0f38', border: '2px solid #9d3579' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ color: '#9d3579' }}>Place</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Place}
                label="District"
                onChange={handleChange}
                sx={{ color: '#9d3579', backgroundColor: '#1c0f38', border: '1px solid #9d3579' }}
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
            }}
            onChange={(e) => setbuliderAddress(e.target.value)}
          />

        </div>
        <div className={Styles.forminput}>
          <label className={Styles.label} htmlFor='fileimage'>Shop Image: <DriveFolderUploadOutlined className={Styles.icon} /></label>
          <input type="file" id='fileimage' onChange={e => setimage(e.target.files[0])} style={{ display: "none" }} />
        </div>
        <div className={Styles.forminput}>
          <label className={Styles.label} htmlFor='fileproof'>Proof: <DriveFolderUploadOutlined className={Styles.icon} /></label>
          <input type="file" id='fileproof' onChange={e => setproof(e.target.files[0])} style={{ display: "none" }} />
        </div>
        <div className={Styles.password}>
          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: '#9d3579' }}>Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                input: {
                  color: '#9d3579',
                },
              }}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
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
              onChange={(e) => setbuliderPassword(e.target.value)}
            />
          </FormControl>
        </div>
        <div className={Styles.Repassword}>
          <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" sx={{ color: '#9d3579' }}>RePassword</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#9d3579', },
                input: {
                  color: '#9d3579',
                },
              }}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? 'hide the password' : 'display the password'
                    }
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
            />
          </FormControl>
        </div>
        <div className={Styles.button}>
          <Button variant="outlined" sx={{ color: '#9d3579', borderColor: '#9d3579' }} onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default BuliderReg
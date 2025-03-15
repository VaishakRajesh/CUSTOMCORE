import React from 'react'
import Style from './UserEditProfile.module.css'
import img from './img/user.gif'
import { Link } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import UserNavbar from '../UserNavbar/UserNavbar'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
const UserEditProfile = () => {
  return (
    <div>
      {/* <UserNavbar /> */}
      <div className={Style.body}>
        <div className={Style.card}>
          <div className={Style.Profileimg}>
            <img src={img} alt="" width={'200px'} height={'200px'} />
          </div>
          <div className={Style.text}>
            <TextField
              id="standard-multiline-flexible"
              label="Name"
              multiline
              maxRows={4}
              variant="standard"
              sx={{
                width: '200px', // Increase width
                '& .MuiInputBase-root': {
                  color: 'white', // Text color
                  fontSize: '18px', // Increase text size
                },
                '& .MuiInputLabel-root': {
                  color: 'white', // Label color
                  fontSize: '20px', // Increase label size
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white', // Default underline color
                },
                '& .MuiInput-underline:hover:before': {
                  borderBottomColor: 'white', // Hover underline color
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white', // Focused underline color
                },
              }}
            />
          </div>
          <div className={Style.text}>
            <TextField
              id="standard-multiline-flexible"
              label="Contact"
              multiline
              maxRows={4}
              variant="standard"
              sx={{
                width: '200px', // Increase width
                '& .MuiInputBase-root': {
                  color: 'white', // Text color
                  fontSize: '18px', // Increase text size
                },
                '& .MuiInputLabel-root': {
                  color: 'white', // Label color
                  fontSize: '20px', // Increase label size
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white', // Default underline color
                },
                '& .MuiInput-underline:hover:before': {
                  borderBottomColor: 'white', // Hover underline color
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white', // Focused underline color
                },
              }}
            />
          </div>
          <div className={Style.text}>
            <TextField
              id="standard-multiline-flexible"
              label="Email"
              multiline
              maxRows={4}
              variant="standard"
              sx={{
                width: '200px', // Increase width
                '& .MuiInputBase-root': {
                  color: 'white', // Text color
                  fontSize: '18px', // Increase text size
                },
                '& .MuiInputLabel-root': {
                  color: 'white', // Label color
                  fontSize: '20px', // Increase label size
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white', // Default underline color
                },
                '& .MuiInput-underline:hover:before': {
                  borderBottomColor: 'white', // Hover underline color
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white', // Focused underline color
                },
              }}
            />
          </div>
          <div className={Style.text}>
            <TextField
              id="standard-multiline-static"
              label="Address"
              multiline
              rows={4}
              variant="standard"
              sx={{
                width: '200px',
                '& .MuiInputBase-root': {
                  color: 'white',
                  fontSize: '18px',// Text color
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                  fontSize: '20px', // Label color
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white', // Default underline color
                },
                '& .MuiInput-underline:hover:before': {
                  borderBottomColor: 'white', // Hover underline color
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white', // Focused underline color
                },
              }}
            />

          </div>
          <div className={Style.text}>
          <Box sx={{ minWidth: 120, width: '200px' }}> {/* Set width to 200px */}
  <FormControl fullWidth>
    <InputLabel
      variant="standard"
      htmlFor="uncontrolled-native"
      sx={{
        color: 'white', // Label color
      }}
    >
      Age
    </InputLabel>
    <NativeSelect
      defaultValue={30}
      inputProps={{
        name: 'Place',
        id: 'uncontrolled-native',
      }}
      sx={{
        color: 'white', // Text color for selected option
        backgroundColor: 'transparent',
        fontSize: '20px', // Transparent background for the dropdown
        '& option': {
          backgroundColor: 'white', // Options background color
          color: 'black', 
          fontSize: '20px'// Options text color
        },
        '&:before': {
          borderBottomColor: 'white', // Default underline color
        },
        '&:hover:before': {
          borderBottomColor: 'white', // Hover underline color
        },
        '&:after': {
          borderBottomColor: 'white', // Focused underline color
        },
      }}
    >
      <option value={10}>Ten</option>
      <option value={20}>Twenty</option>
      <option value={30}>Thirty</option>
    </NativeSelect>
  </FormControl>
</Box>


          </div>
          <div className={Style.Button}>
            <Link to=""><Button variant="outlined" sx={{ height: '50px', width: '100px', fontSize: '18px', fontFamily: 'Arial Black', border: '5px solid white', borderRadius: '50px', color: 'white' }}>Save</Button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserEditProfile
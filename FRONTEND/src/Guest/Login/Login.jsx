import React, { useState } from 'react'
import Styles from './Login.module.css'
import Button from '@mui/material/Button';
import sideimg from'./img/login.gif'
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: Email,
      password:Password
    }

      axios.post("http://localhost:5000/Login", data).then((res) => {
       console.log(res.data);
       const {id,login} = res.data
       console.log(login);
       
       if(login === "user"){
        sessionStorage.setItem("uid",id)
        navigate("/User")

       }
       if(login === "admin"){
        sessionStorage.setItem("aid",id)
        navigate("/Admin")

       }
       if(login === "pcBulider"){
        sessionStorage.setItem("pid",id)
        navigate("/PcBulider")

       }

        
      }).catch((err) => {
        console.error(err)
      })
    
  }


  return (
    <div className={Styles.body}>
      <div className={Styles.Img}>
        <img src={sideimg} width='1200px' alt="" />
      </div>
      <div className={Styles.Login}>
{/* {
    sessionStorage.getItem("aid")
} */}
<Box spacing={2} direction="column" component={'form'} onSubmit={handleSubmit}>
        <div className={Styles.username}>
        <FormControl sx={{ m: 1, width: '30ch'}}variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" sx={{ color: '#5e848b'}}>User Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="User Name" sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '#5e848b', },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#5e848b', }, 
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#5e848b', }, 
            input: { color: '#5e848b',
             },
            }}  onChange={(e) => setEmail(e.target.value)}/>
        </FormControl>
        </div>
        <div className={Styles.password}>
        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password"sx={{ color: '#5e848b'}}>Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '#5e848b', },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#5e848b', }, 
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#5e848b', }, 
            input: { color: '#5e848b',
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
            onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        </div>
        <div className={Styles.button}>
        <Button variant="outlined" sx={{ color: '#5e848b', borderColor: '#5e848b'}} onClick={handleSubmit}>LOGIN</Button>
        </div>
        <div className={Styles.reg}>
        <Link to="/SeleReg"><Button variant="outlined" sx={{ color: '#5e848b', borderColor: '#5e848b'}}>REGISTRATION</Button></Link>
        </div>
        </Box>
      </div>
    </div>
  )
}

export default Login
import React from 'react'
import Style from './UserChangePassword.module.css'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import UserNavbar from '../UserNavbar/UserNavbar';
const UserChangePassword = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div> 
            {/* <UserNavbar /> */}
            <div className={Style.body}>
                <div className={Style.Card}>
                    <div className={Style.Oldpassword}>
                        <FormControl
                            sx={{ m: 1, width: '30ch', borderRadius: '50px' }}
                            variant="outlined"
                        >
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                sx={{ color: 'white' }}
                            >
                                Old Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px', // Add border radius here
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px', // Add hover radius
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px', // Add focused radius
                                    },
                                    input: {
                                        color: 'white',
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

                    <div className={Style.Newpassword}>
                        <FormControl
                            sx={{ m: 1, width: '30ch', borderRadius: '50px' }}
                            variant="outlined"
                        >
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                sx={{ color: 'white' }}
                            >
                                New  Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px', // Add border radius here
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px', // Add hover radius
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px', // Add focused radius
                                    },
                                    input: {
                                        color: 'white',
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

                    <div className={Style.ReEnterpassword}>
                        <FormControl
                            sx={{ m: 1, width: '30ch', borderRadius: '50px' }}
                            variant="outlined"
                        >
                            <InputLabel
                                htmlFor="outlined-adornment-password"
                                sx={{ color: 'white' }}
                            >
                                ReEnter Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px', // Add border radius here
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px', // Add hover radius
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px', // Add focused radius
                                    },
                                    input: {
                                        color: 'White',
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

                    <div className={Style.button}>
                        <Button variant="outlined" sx={{ color: 'Black', borderColor: 'white', bgcolor: 'white', borderRadius: '50px', height: '50px', width: '200px', fontSize: '20px' }}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserChangePassword
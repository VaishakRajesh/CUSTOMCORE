import React, { useEffect, useState } from 'react'
import Style from './UserChangePassword.module.css'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff, LockReset } from '@mui/icons-material';
import UserNavbar from '../UserNavbar/UserNavbar';
import axios from 'axios';

const UserChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    // Form data state
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (field) => (e) => {
        setFormData({
            ...formData,
            [field]: e.target.value
        });

        // Check password match if needed
        if (field === 'confirmPassword' || field === 'newPassword') {
            if (field === 'confirmPassword') {
                setPasswordMatch(e.target.value === formData.newPassword);
            } else {
                setPasswordMatch(formData.confirmPassword === e.target.value);
            }
        }
    };


    const userId = sessionStorage.getItem('uid');
    console.log('User ID from session storage:', userId);
    const [UserArray, setUserArray] = useState([])
    const fetchuser = () => {
        axios.get(`http://localhost:5000/collectionUserById/${userId}`).then((response) => {
            console.log(response.data.user.userPassword);
            setUserArray(response.data.user.userPassword)
        })
    }



    useEffect(() => {
        fetchuser();
    }, [])





    const handleSubmit = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            setPasswordMatch(false);
            return;
        }
        if (formData.oldPassword !== UserArray) {
            alert("Oops! Your current password is incorrect. Please try again.");

            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setPasswordMatch(false);
            return;
        }
        setIsSubmitting(true);

        try {
            const response = await axios.put(`http://localhost:5000/collectionUser/${userId}`,  { userPassword: formData.newPassword });
            console.log(response);
            console.log('Status updated successfully!');
        } catch (err) {
            console.log(err);
            console.log('Failed to update status. Please try again.');
            alert("Oops! Something went wrong. Please try again.");
        }



        // Simulating API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }, 1500);
    };

    return (
        <div>
            {/* <UserNavbar /> */}
            <div className={Style.body}>
                <div className={Style.Card}>
                    <div className={Style.formTitle}>
                        <LockReset sx={{ fontSize: 32, marginRight: '10px', verticalAlign: 'middle' }} />
                        Change Password
                    </div>

                    <div className={Style.Oldpassword}>
                        <FormControl
                            sx={{ m: 1, width: '30ch', borderRadius: '50px' }}
                            variant="outlined"
                        >
                            <InputLabel
                                htmlFor="old-password"
                                sx={{ color: 'white' }}
                            >
                                Old Password
                            </InputLabel>
                            <OutlinedInput
                                id="old-password"
                                value={formData.oldPassword}
                                onChange={handleChange('oldPassword')}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px',
                                        borderWidth: '2px',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px',
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
                                            edge="end"
                                            sx={{ color: 'white' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Old Password"
                            />
                        </FormControl>
                    </div>

                    <div className={Style.Newpassword}>
                        <FormControl
                            sx={{ m: 1, width: '30ch', borderRadius: '50px' }}
                            variant="outlined"
                        >
                            <InputLabel
                                htmlFor="new-password"
                                sx={{ color: 'white' }}
                            >
                                New Password
                            </InputLabel>
                            <OutlinedInput
                                id="new-password"
                                value={formData.newPassword}
                                onChange={handleChange('newPassword')}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px',
                                        borderWidth: '2px',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                        borderRadius: '50px',
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
                                            edge="end"
                                            sx={{ color: 'white' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="New Password"
                            />
                        </FormControl>
                    </div>

                    <div className={Style.passwordRequirements}>
                        Password must be at least 8 characters with numbers and special characters
                    </div>

                    <div className={Style.ReEnterpassword}>
                        <FormControl
                            sx={{ m: 1, width: '30ch', borderRadius: '50px' }}
                            variant="outlined"
                            error={!passwordMatch}
                        >
                            <InputLabel
                                htmlFor="confirm-password"
                                sx={{ color: passwordMatch ? 'white' : '#f44336' }}
                            >
                                Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                id="confirm-password"
                                value={formData.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: passwordMatch ? 'white' : '#f44336',
                                        borderRadius: '50px',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: passwordMatch ? 'white' : '#f44336',
                                        borderRadius: '50px',
                                        borderWidth: '2px',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: passwordMatch ? 'white' : '#f44336',
                                        borderRadius: '50px',
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
                                            edge="end"
                                            sx={{ color: 'white' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                        </FormControl>
                    </div>

                    <div className={Style.button}>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            sx={{
                                color: 'Black',
                                borderColor: 'white',
                                bgcolor: 'white',
                                borderRadius: '50px',
                                height: '50px',
                                width: '200px',
                                fontSize: '20px',
                                '&:hover': {
                                    bgcolor: '#e0e0e0',
                                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
                                }
                            }}>
                            {isSubmitting ? 'Processing...' : 'Submit'}
                        </Button>
                    </div>

                    <div className={`${Style.successMessage} ${showSuccess ? Style.showSuccess : ''}`}>
                        Password updated successfully!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserChangePassword
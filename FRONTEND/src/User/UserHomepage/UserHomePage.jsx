import React from 'react'
import Styles from './UserHomePage.module.css'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import { Link, Outlet } from 'react-router-dom';
import Default from './Default';
const UserHomePage = () => {
    return (
        <div className={Styles.Body}>
            <div className={Styles.Head}>
                <div className={Styles.Logo}>
                CUSTOMCORE 
                </div>
                <div className={Styles.Select}>
                    <Link to=""><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px', borderBottom: '1px solid white' }}>PreBulid PC</Button></Link>
                    <Link to=""><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px', borderBottom: '1px solid white' }}>Booking Details<BuildIcon /></Button></Link>
                    <Link to="/User/UserProfile"><Button sx={{ color: 'black', height: '40px', fontSize: '20px', borderRadius: '30px', border: '1px solid white', bgcolor: 'white' }}>Profile<PersonIcon /></Button></Link>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default UserHomePage
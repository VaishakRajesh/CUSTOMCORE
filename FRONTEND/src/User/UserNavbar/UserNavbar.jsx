import React from 'react'
import Styles from './UserNavbar.module.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
const UserNavbar = () => {
    return (
        <div className={Styles.Head}>
            <Link to="/User">
            <div className={Styles.Logo}>
            CUSTOMCORE
            </div>
            </Link>
            <div className={Styles.Select}>
                <Link to="/UserHomePage"><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px', borderBottom: '1px solid white' }}><HomeIcon/>home</Button></Link>
                <Link to=""><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px', borderBottom: '1px solid white' }}>Booking Details</Button></Link>
                <Link to=""><Button sx={{ color: 'black', height: '40px', fontSize: '20px', borderRadius: '30px', border: '1px solid white', bgcolor: 'white' }}><LogoutIcon/>LOGOUT</Button></Link>
            </div>
        </div>
    )
}

export default UserNavbar
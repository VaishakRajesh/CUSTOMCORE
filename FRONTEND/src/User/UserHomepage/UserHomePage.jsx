import React from 'react'
import Styles from './UserHomePage.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import { Link, Outlet } from 'react-router-dom';
import Default from './Default';
const UserHomePage = () => {
    return (
        <div >
            <div className={Styles.Head}>
            <Link to="/User">
            <div className={Styles.Logo}>
            CUSTOMCORE
            </div>
            </Link>
                <div className={Styles.Select}>
                    {/* <Link to=""><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px', borderBottom: '1px solid white' }}>PreBulid PC</Button></Link> */}
                    <Link to=""><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px', borderBottom: '1px solid white' }}>Booking Details<BuildIcon /></Button></Link>
                    <Link to="/User/UserProfile"><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px', borderBottom: '1px solid white' }}>Profile<PersonIcon /></Button></Link>
                    <Link to="/User/"><Button sx={{ color: 'black', height: '40px', fontSize: '20px', borderRadius: '30px', border: '1px solid white', bgcolor: 'white' }}>Logout<LogoutIcon /></Button></Link>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default UserHomePage
import React from 'react'
import Styles from './BuliderNavbar.module.css'
import { Link, Outlet } from 'react-router-dom'
import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

const BuliderNavbar = () => {
    return (

        <div>
        <div className={Styles.Head}>
            <div className={Styles.Logo}>
                CUSTOMCORE
            </div>
            <div className={Styles.Select}>
                <Link to="/PcBulider"><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px', borderBottom: '1px solid white' }}><HomeIcon />home</Button></Link>
                <Link to=""><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px', borderBottom: '1px solid white' }}>Booking Details</Button></Link>
                <Link to="/PcBulider/BuliderProfile"><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px', borderBottom: '1px solid white' }}>Profile<PersonIcon/></Button></Link>
                <Link to=""><Button sx={{ color: 'black', height: '40px', fontSize: '20px', borderRadius: '30px', border: '1px solid white', bgcolor: 'white' }}><LogoutIcon />LOGOUT</Button></Link>
            </div>
            
          
        </div>
            <Outlet/>
        </div>
            
    )
}

export default BuliderNavbar
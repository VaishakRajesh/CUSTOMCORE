import React from 'react'
import Styles from './UserHomePage.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Default from './Default';
const UserHomePage = () => {
    const navigate = useNavigate()
    const handleSignOut = () => {        
        const confirmLogout = confirm("Are you sure you want to log out?");
            if (confirmLogout) {
          sessionStorage.removeItem('uid');
          navigate('/Login');
          console.log("logged out");
        } else {
          console.log("logout canceled");
        }
      };
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
                    <Button sx={{ color: 'black', height: '40px', fontSize: '20px', borderRadius: '30px', border: '1px solid white', bgcolor: 'white' }} onClick={handleSignOut}>Logout<LogoutIcon /></Button>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default UserHomePage
import React from 'react'
import Styles from './BuliderHomePage.module.css'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import { Link } from 'react-router-dom';
const BuliderHomePage = () => {
    return (
        <div className={Styles.Body}>
            <div className={Styles.Head}>
                <div className={Styles.Logo}>
                CUSTOMCORE
                </div>
                <div className={Styles.Select}>
                <Link to=""><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px',borderBottom:'1px solid white'}}>Stocks</Button></Link>
                <Link to=""><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px',borderBottom:'1px solid white'}}>Booking Orders<BuildIcon /></Button></Link>
                <Link to="/BuliderProfile"><Button sx={{ color: 'black', height: '40px', fontSize: '20px', borderRadius: '30px',border:'1px solid white',bgcolor:'white' }}>Profile<PersonIcon /></Button></Link>
                </div>
            </div>
            <div className={Styles.Main}>
                <div className={Styles.Mainbody}>
                    {/* <h1 className={Styles.h1}></h1> */}
                    <Link to=""><Button sx={{color:'black', height: '70px', fontSize: '50px', borderRadius: '30px',border:'3px solid white',bgcolor:'white' }}>Booking Orders</Button></Link>
                    <p className={Styles.p}>Booking Orders and other details.</p>
                </div>
            </div>
        </div>
    )
}

export default BuliderHomePage
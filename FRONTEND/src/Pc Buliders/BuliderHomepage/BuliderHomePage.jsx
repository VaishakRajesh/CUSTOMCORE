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
            {/* <div className={Styles.Head}>
                <div className={Styles.Logo}>
                CUSTOMCORE
                </div>
                <div className={Styles.Select}>
                <Link to=""><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px',borderBottom:'1px solid white'}}>Stocks</Button></Link>
                <Link to=""><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px',borderBottom:'1px solid white'}}>Booking Orders<BuildIcon /></Button></Link>
                <Link to="/BuliderProfile"><Button sx={{ color: 'black', height: '40px', fontSize: '20px', borderRadius: '30px',border:'1px solid white',bgcolor:'white' }}>Profile<PersonIcon /></Button></Link>
                </div>
            </div> */}
            <div className={Styles.Main}>
                <div className={Styles.Mainbody}>
                    {/* <h1 className={Styles.h1}></h1> */}
                    <Link to="">
                        <Button
                            sx={{
                                color: 'white',
                                height: '80px',  // Reduced height
                                fontSize: '30px', // Smaller text
                                borderRadius: '20px', // Smaller rounded corners
                                border: '2px solid white', // Thinner border
                                bgcolor: 'black',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease-in-out',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                                boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)',

                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '-100%',
                                    width: '200%',
                                    height: '300%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                                    transform: 'rotate(25deg)',
                                    transition: 'left 0.4s ease-in-out',
                                },

                                '&:hover::before': {
                                    left: '100%',
                                },

                                '&:hover': {
                                    bgcolor: '#111',
                                    boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.4)',
                                    transform: 'scale(1.05)',
                                },

                                '&:active': {
                                    transform: 'scale(0.95)',
                                },

                                '@keyframes pulse': {
                                    '0%': { boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)' },
                                    '50%': { boxShadow: '0px 0px 12px rgba(255, 255, 255, 0.3)' },
                                    '100%': { boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)' },
                                },

                                animation: 'pulse 2s infinite alternate',
                            }}
                        >
                            Stock Updates
                        </Button>
                    </Link>


                    <p className={Styles.p}>Update and maintain the PC stock.</p>
                    <Link to="/PcBulider/BuilderBooking">
                        <Button
                            sx={{
                                color: 'white',
                                height: '80px',  // Reduced height
                                fontSize: '30px', // Smaller text
                                borderRadius: '20px', // Smaller rounded corners
                                border: '2px solid white', // Thinner border
                                bgcolor: 'black',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease-in-out',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                                boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)',

                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '-100%',
                                    width: '200%',
                                    height: '300%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                                    transform: 'rotate(25deg)',
                                    transition: 'left 0.4s ease-in-out',
                                },

                                '&:hover::before': {
                                    left: '100%',
                                },

                                '&:hover': {
                                    bgcolor: '#111',
                                    boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.4)',
                                    transform: 'scale(1.05)',
                                },

                                '&:active': {
                                    transform: 'scale(0.95)',
                                },

                                '@keyframes pulse': {
                                    '0%': { boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)' },
                                    '50%': { boxShadow: '0px 0px 12px rgba(255, 255, 255, 0.3)' },
                                    '100%': { boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)' },
                                },

                                animation: 'pulse 2s infinite alternate',
                            }}
                        >
                            Booking Orders
                        </Button>
                    </Link>


                    <p className={Styles.p}>Booking Orders and other details.</p>
                    <Link to="">
                        <Button
                            sx={{
                                color: 'white',
                                height: '80px',  // Reduced height
                                fontSize: '30px', // Smaller text
                                borderRadius: '20px', // Smaller rounded corners
                                border: '2px solid white', // Thinner border
                                bgcolor: 'black',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease-in-out',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                letterSpacing: '1px',
                                boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)',

                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '-100%',
                                    width: '200%',
                                    height: '300%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                                    transform: 'rotate(25deg)',
                                    transition: 'left 0.4s ease-in-out',
                                },

                                '&:hover::before': {
                                    left: '100%',
                                },

                                '&:hover': {
                                    bgcolor: '#111',
                                    boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.4)',
                                    transform: 'scale(1.05)',
                                },

                                '&:active': {
                                    transform: 'scale(0.95)',
                                },

                                '@keyframes pulse': {
                                    '0%': { boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)' },
                                    '50%': { boxShadow: '0px 0px 12px rgba(255, 255, 255, 0.3)' },
                                    '100%': { boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.2)' },
                                },

                                animation: 'pulse 2s infinite alternate',
                            }}
                        >
                            Pre-Bulid Pc
                        </Button>
                    </Link>


                    <p className={Styles.p}>Pre-Bulid Pc details.</p>
                </div>
            </div>
        </div>
    )
}

export default BuliderHomePage
import React from 'react'
import Styles from './UserHomePage.module.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const Default = () => {
  return (
    <div>
        <div className={Styles.Main}>
                    
        <div className={Styles.Mainbody}>
                    <h1 className={Styles.h1}>Let's Build PC Easily Online.</h1>
                    <Link to="/User/EasyToBulid">
                        <Button
                            sx={{
                                color: '#f5f5f5',
                                height: '70px',
                                fontSize: '45px',
                                borderRadius: '25px',
                                border: '2px solid rgba(255,255,255,0.3)',
                                background: 'linear-gradient(145deg, rgba(245,245,245,0.1), rgba(179,196,255,0.15))',
                                WebkitBackdropFilter: 'blur(8px)', // Added vendor prefix
                                backdropFilter: 'blur(8px)',
                                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                px: 4,
                                letterSpacing: '1.2px',
                                textTransform: 'none',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover': {
                                    background: 'linear-gradient(145deg, rgba(179,196,255,0.2), rgba(245,245,245,0.15))',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 25px rgba(179,196,255,0.2)',
                                    border: '2px solid rgba(255,255,255,0.4)'
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '0',
                                    left: '-100%',
                                    width: '50%',
                                    height: '100%',
                                    background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)', // Fixed line breaks
                                    transition: 'all 0.6s ease',
                                },
                                '&:hover::before': {
                                    left: '150%',
                                },
                                '&:active': {
                                    transform: 'translateY(1px)'
                                }
                            }}
                        >
                            Easy To Build
                        </Button>
                    </Link>
                    <p className={Styles.p}>Easy To Build makes customizing a PC simple and hassle-free.</p>
                    <Link to="/User/PcBuliderSelect">
                        <Button
                            sx={{
                                color: '#a9a9a9', // Metallic silver
                                height: '70px',
                                fontSize: '40px',
                                borderRadius: '30px',
                                border: '2px solid rgba(255,255,255,0.15)',
                                backgroundImage: 'linear-gradient(to right, #1a1a1a, #2d2d2d)',
                                textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover': {
                                    backgroundImage: 'linear-gradient(to right, #2d2d2d, #1a1a1a)',
                                    boxShadow: '0 0 25px rgba(169,169,169,0.3)',
                                    transform: 'translateY(-3px) scale(1.03)',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    color: 'white',
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '0',
                                    left: '-100%',
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(120deg,transparent,rgba(255,255,255,0.1),transparent)',
                                    transition: 'all 0.7s ease',
                                },
                                '&:hover::before': {
                                    left: '100%',
                                },
                                px: 5,
                                letterSpacing: '2px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                fontFamily: '"Segoe UI", sans-serif',
                                backdropFilter: 'blur(4px)',
                                '&:active': {
                                    transform: 'translateY(1px) scale(0.98)',
                                }
                            }}
                        >
                            Advance Level
                        </Button>
                    </Link>
                    <p className={Styles.p}>The advanced level helps to make more specific choices and offers a slightly more complex experience.</p>
                </div>
                </div>
    </div>
  )
}

export default Default
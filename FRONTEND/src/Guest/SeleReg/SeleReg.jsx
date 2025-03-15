import React from 'react'
import Styles from './SeleReg.module.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const SeleReg = () => {
  return (
    <div className={Styles.body}>
      <div className={Styles.button}>
        <Link to="/UserReg"><Button variant="outlined" sx={{ color: '#e9e5f7', borderColor: '#e9e5f7', height: '100px', width: '250px', fontSize: '18px', color: '#7cf8ff', fontFamily: 'Arial Black', border: '0' }}>USER REGISTRATION</Button></Link>
      </div>
      <div className={Styles.reg}>
        <Link to="/BuliderReg"><Button variant="outlined" sx={{ color: '#e9e5f7', borderColor: '#e9e5f7', height: '100px', width: '250px', fontSize: '18px', color: '#ff5eb1', fontFamily: 'Arial Black', border: '0' }}>PC BULIDERS REGISTRATION</Button></Link>
      </div>
    </div>
  )
}

export default SeleReg
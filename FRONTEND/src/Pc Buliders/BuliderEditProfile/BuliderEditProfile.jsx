import React from 'react'
import Style from './BuliderEditProfile.module.css'
import img from './img/user.gif'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import BuliderNavbar from '../BuliderNavbar/BuliderNavbar'
const BuliderEditProfile = () => {
  return (
    <div><BuliderNavbar/>
      <div className={Style.body}>
        <div className={Style.card}>
          <div className={Style.Profileimg}>
            <img src={img} alt="" width={'200px'} height={'200px'} />
          </div>
          <div className={Style.text}>UserName</div>
          <div className={Style.text}>Contact</div>
          <div className={Style.text}>Email</div>
          <div className={Style.text}>Address</div>
          <div className={Style.text}>Place</div>
          <div className={Style.Button}>
            <Link to=""><Button variant="outlined" sx={{ height: '50px', width: '100px', fontSize: '18px', fontFamily: 'Arial Black', border: '5px solid white', borderRadius: '50px', color: 'white' }}>Save</Button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuliderEditProfile
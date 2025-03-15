import React from 'react'
import Style from './BuliderProfile.module.css'
import img from './img/user.gif'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import BuliderNavbar from '../BuliderNavbar/BuliderNavbar'
const BuliderProfile = () => {
  return (
    <div><BuliderNavbar/>
    <div className={Style.body}>
      <div className={Style.card}>
        <div className={Style.Profileimgs}>
          <div className={Style.Profileimg} ><img src={img} alt="" width={'200px'} height={'200px'} /></div>
        </div>
        <div className={Style.text}>UserName: Vaishak</div>
        <div className={Style.text}>Contact: 93763456</div>
        <div className={Style.text}>Email: Vaishak@gmail.com</div>
        <div className={Style.text}>Address: hudbugbgvubfvn</div>
        <div className={Style.text}>Place: bbdch</div>
        <div className={Style.Button}>
          <Link to="/BuliderEditProfile"><Button variant="outlined" sx={{ bgcolor: 'white', color: '#1a1a2e', height: '40px', width: '160px', fontSize: '15px', fontFamily: 'Arial Black', border: '1px solid white', borderRadius: '40px' }}>Edit Profile</Button></Link>
          <Link to="/BuliderchangePassword"><Button variant="outlined" sx={{ bgcolor: 'white', color: '#1a1a2e', height: '40px', width: '185px', fontSize: '13px', fontFamily: 'Arial Black', border: '1px solid white', borderRadius: '40px' }}>Change Password</Button></Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BuliderProfile
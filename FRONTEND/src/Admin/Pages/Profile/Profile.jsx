import React from 'react'
import Style from './Profile.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import Img from '../../Img/1.png'
import { Button } from '@mui/material'
const Profile = () => {
    return (
        <div className={Style.Body}>
            <Sidebar />
            <div className={Style.container}>
                <Navbar />
                <div className={Style.Profile}>
                    <div className={Style.ProfileImg}>
                        <img src={Img} alt="" />
                    </div>
                    <div className={Style.Name}>Name: Vaishak</div>
                    <div className={Style.Email}>Email: Vaishak@gmail.com</div>
                    <div className={Style.Buttons}>
                    <div className={Style.Button1}> <Button>Edit Profile</Button></div>
                    <div className={Style.Button2}> <Button>Change Password</Button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
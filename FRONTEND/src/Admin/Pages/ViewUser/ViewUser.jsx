import React from 'react'
import Style from './ViewUser.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import Img from './img/1.png'
import { Button, TextField } from '@mui/material'

const ViewUser = () => {
    return (
        <div className={Style.Body}>
            <Sidebar />
            <div className={Style.container}>
                <Navbar />
                <div className={Style.ViewUser}>
                    <div className={Style.Title}>
                        <div className={Style.TitleText}>Name</div>
                        <div className={Style.TitleText}>Email</div>
                        <div className={Style.TitleText}>Action</div>
                    </div>
                    <div className={Style.UserDetails}>
                        <div className={Style.Name}>

                            <div className={Style.ProfilePic}>
                                <img src={Img} alt="" />
                            </div>
                            <div className={Style.userName}>Vaishak</div>
                        </div>
                        <div className={Style.details}>Vaishak@gmail.com</div>
                        <div className={Style.Button}>
                            <button>More Details</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div className={Style.UserDetails}>
                        <div className={Style.Name}>

                            <div className={Style.ProfilePic}>
                                <img src={Img} alt="" />
                            </div>
                            <div className={Style.userName}>Vaishak</div>
                        </div>
                        <div className={Style.details}>Vaishak@gmail.com</div>
                        <div className={Style.Button}>
                            <button>More Details</button>
                            <button>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUser
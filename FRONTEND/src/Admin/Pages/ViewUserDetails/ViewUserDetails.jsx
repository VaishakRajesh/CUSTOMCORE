import React from 'react'
import Style from './ViewUserDetails.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import img from './img/1.png'
const ViewUserDetails = () => {
    return (
        <div className={Style.Body}>
            <Sidebar />
            <div className={Style.container}>
                <Navbar />
                <div className={Style.ViewUserDetails}>
                    <div className={Style.left}>
                        <div className={Style.ProfilePic}>
                            <img src={img} alt="" />
                        </div>
                        <div className={Style.Button}>
                            <button> Delete user</button>
                        </div>
                    </div>
                    <div className={Style.Details}>
                        <div className={Style.text}>
                            Name:
                        </div>
                        <div className={Style.text}>
                            Address:
                        </div>
                        <div className={Style.text}>
                            Email:
                        </div>
                        <div className={Style.text}>
                            District:
                        </div>
                        <div className={Style.text}>
                            Place:
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUserDetails
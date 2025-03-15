import React, { useState } from 'react'
import Style from './New.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import { DriveFolderUploadOutlined } from '@mui/icons-material'
const New = () => {
  const [file, setFile] = useState("")
  return (
    <div className={Style.new}>
      <Sidebar/>
    <div className={Style.Container}>
      <Navbar/>
      <div className={Style.top}>
        <h1>Add New User</h1>
      </div>
      <div className={Style.bottom}>
        <div className={Style.left}>
          <img src={ file ? URL.createObjectURL(file) : "../src/img/1.png"} alt="" className={Style.userimage} />
        </div>
        <div className={Style.right}>
          <form>
            <div className={Style.forminput}>
              <label htmlFor='file'>Image: <DriveFolderUploadOutlined className={Style.icon}/></label>
              <input type="file" id='file' onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}/>
            </div>
            <div className={Style.forminput}>
              <label>UserName</label>
              <input type="text" placeholder="Vaishak_rajesh" />
            </div>
            <div className={Style.forminput}>
              <label>Name and surname</label>
              <input type="text" placeholder="Vaishak Rajesh" />
            </div>
            <div className={Style.forminput}>
              <label>Email</label>
              <input type="email" placeholder="VaishakRajesh@gamil.com" />
            </div>
            <div className={Style.forminput}>
              <label>Phone Number</label>
              <input type="text" placeholder="9342654234" />
            </div>
            <div className={Style.forminput}>
              <label>Password</label>
              <input type="password"/>
            </div>
            <div className={Style.forminput}>
              <label>country</label>
              <input type="text" placeholder='india' />
            </div>
            <button>Sent</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default New
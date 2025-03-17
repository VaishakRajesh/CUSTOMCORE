import React, { useState } from 'react'
import Style from './product.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Navbar from '../../Components/Navbar/Navbar'
import { DriveFolderUploadOutlined } from '@mui/icons-material'
import TextField from '@mui/material/TextField';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
const Product = () => {
  const [file, setFile] = useState("")
  return (
    <div className={Style.new}>
      {/* <Sidebar/> */}
    <div className={Style.Container}>
      {/* <Navbar/> */}
      <div className={Style.top}>
        <h1>Add New products</h1>
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
              <TextField
          id="standard-multiline-flexible"
          label="Name and surname"
          multiline
          maxRows={4}
          variant="standard"
        />
            </div>
            <div className={Style.forminput}>
              <TextField
          id="standard-multiline-flexible"
          label="Email"
          multiline
          maxRows={4}
          variant="standard"
        />
            </div>
            <div className={Style.forminput}>
              <label>Phone Number</label>
              <TextField
          id="standard-multiline-flexible"
          label="Phone Number"
          multiline
          maxRows={4}
          variant="standard"
        />
            </div>
            <div className={Style.forminput}>
          <TextField
          id="standard-multiline-flexible"
          label="Password"
          multiline
          maxRows={4}
          variant="standard"
        />
            </div>
            <div className={Style.forminput}>
              <TextField
          id="standard-multiline-flexible"
          label="country"
          multiline
          maxRows={4}
          variant="standard"
        />
            </div>
            <button>Sent</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Product
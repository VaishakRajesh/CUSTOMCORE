import React from 'react'
import Styles from './HomePage.module.css'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import img1 from "./img/pc1.jfif"
import img2 from "./img/pc2.gif"
import { Link } from 'react-router-dom';
const HomePage = () => {
    return (
        <div className={Styles.Body}>
            <div className={Styles.Head}>
                <div className={Styles.Logo}>
                CUSTOMCORE
                </div>
                <div className={Styles.Select}>
                    <Link to="/UserReg"><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px' ,borderBottom:'1px solid white'}}>USER REGISTRATION <PersonIcon /></Button></Link>
                    <Link to="/BuliderReg"><Button sx={{ color: 'white', height: '50px', fontSize: '20px', borderRadius: '30px' ,borderBottom:'1px solid white'}}>PC BULIDERS REGISTRATION <BuildIcon /></Button></Link>
                    <Link to="/Login"><Button sx={{ backgroundColor:'white',color: 'black', height: '40px', fontSize: '20px', borderRadius: '30px' }}>LOGIN <LoginIcon /></Button></Link>
                </div>
            </div>
            <div className={Styles.Main}>
                <div className={Styles.Mainbody}>
                    <h1 className={Styles.h1}>Bulid Your Dream PC</h1>
                    <Link to="/Login"><Button sx={{ color: 'white', height: '70px', fontSize: '50px', borderRadius: '30px' }}>LOGIN<LoginIcon sx={{ fontSize: '50px' }}/></Button></Link>
                </div>
                <div className={Styles.items1}>
                    <div className={Styles.img1}><img src={img2} alt="" height={'350px'}/></div>
                    <h1 className={Styles.itemshead1}>Unlock peak Performace and efficiency with our cutting-edge PC building solutions</h1>
                </div>
                <div className={Styles.items2}>
                    <h1 className={Styles.itemshead2}>Bulid, upgrade, and<br />Optimize your PC</h1>
                    <div className={Styles.img2}><img src={img1} alt="" height={'350px'}/></div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
import React from 'react'
import Style from './Sidebar.module.css'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import ComputerIcon from '@mui/icons-material/Computer';
import PublicIcon from '@mui/icons-material/Public';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
const Sidebar = () => {
  return (
    <div className={Style.Sidebar}>
        <div className={Style.Top}>
            <Link to="/" style={{textDecoration: "none"}}>
            <span className={Style.Logo}>lamadmin</span>
            </Link>
        </div>
        <hr/>
        <div className={Style.Center}>
            <ul>
                <p className={Style.Title}>MAIN</p>
                <Link to="/">
                <li>
                    <SpaceDashboardIcon className={Style.icons}/>
                    <span>Dashboard</span>
                </li>
                </Link>
                <p className={Style.Title}>LISTS</p>
                <Link to="/ViewUser" style={{textDecoration: "none"}}>
                <li>
                    <AccountBoxIcon className={Style.icons}/>
                    <span>View Users</span>
                </li>
                </Link>
                <Link to="/product" style={{textDecoration: "none"}}>
                <li>
                    <CategoryIcon className={Style.icons}/>
                    <span>Products</span>
                </li>
                </Link>
                {/* <li>
                    <ProductionQuantityLimitsIcon className={Style.icons}/>
                    <span>Orders</span>
                </li> */}
                 <Link to="/ViewBulider" style={{textDecoration: "none"}}>
                <li>
                    <BuildIcon className={Style.icons}/>
                    <span>View Buliders</span>
                </li>
                </Link>
                <p className={Style.Title}>USEFUL</p>
                <Link to="/Admin/Select" style={{textDecoration: "none"}}>
                <li>
                    <ComputerIcon className={Style.icons}/>
                    <span>Insert Computer parts</span>
                </li>
                </Link>
                <Link to="/Admin/District" style={{textDecoration: "none"}}>
                <li>
                    <PublicIcon className={Style.icons}/>
                    <span>Insert District</span>
                </li>
                </Link>
                <Link to="/Admin/Place" style={{textDecoration: "none"}}>
                <li>
                    <PlaceOutlinedIcon className={Style.icons}/>
                    <span>Insert Place</span>
                </li>
                </Link>
                <li>
                    <NotificationsActiveIcon className={Style.icons}/>
                    <span>Notifications</span>
                </li>
                <p className={Style.Title}>SERVICE</p>
                <li>
                    <HealthAndSafetyIcon className={Style.icons}/>
                    <span>System Health</span>
                </li>
                <li>
                    <LoginIcon className={Style.icons}/>
                    <span>Logs</span>
                </li>
                <li>
                    <SettingsIcon className={Style.icons}/>
                    <span>Setting</span>
                </li>
                <p className={Style.Title}>USER</p>
                <li>
                    <PersonIcon className={Style.icons}/>
                    <span>Profile</span>
                </li>
                <li>
                    <LogoutIcon className={Style.icons}/>
                    <span>Logout</span>
                </li>
            </ul>
        </div>
        <div className={Style.Bottom}>
        <div className={Style.ColourOption}></div>
        <div className={Style.ColourOption}></div>
        </div>
    </div>
  )
}

export default Sidebar
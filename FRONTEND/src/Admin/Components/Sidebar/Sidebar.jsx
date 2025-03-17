import React from 'react'
import Style from './Sidebar.module.css'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ForumIcon from '@mui/icons-material/Forum';import AnalyticsIcon from '@mui/icons-material/Analytics';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DevicesIcon from '@mui/icons-material/Devices';import LoginIcon from '@mui/icons-material/Login';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import ComputerIcon from '@mui/icons-material/Computer';
import PublicIcon from '@mui/icons-material/Public';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
const Sidebar = () => {
    return (
        <div className={Style.Sidebar}>
            <div className={Style.Top}>
                <Link to="/Admin" style={{ textDecoration: "none" }}>
                    <span className={Style.Logo}>CUSTOMCORE</span>
                </Link>
            </div>
            <hr />
            <div className={Style.Center}>
                <ul>
                    <p className={Style.Title}>MAIN</p>
                    <Link to="/Admin">
                        <li>
                            <SpaceDashboardIcon className={Style.icons} />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className={Style.Title}>LISTS</p>
                    <Link to="/Admin/users" style={{ textDecoration: "none" }}>
                        <li>
                            <AccountBoxIcon className={Style.icons} />
                            <span>View Users</span>
                        </li>
                    </Link>
                    <Link to="/Admin/product" style={{ textDecoration: "none" }}>
                        <li>
                            <CategoryIcon className={Style.icons} />
                            <span>Products</span>
                        </li>
                    </Link>
                    {/* <li>
                    <ProductionQuantityLimitsIcon className={Style.icons}/>
                    <span>Orders</span>
                </li> */}
                    <Link to="/Admin/ViewBulider" style={{ textDecoration: "none" }}>
                        <li>
                            <BuildIcon className={Style.icons} />
                            <span>View Pc Buliders</span>
                        </li>
                    </Link>
                    <Link to="/Admin/ViewBulider" style={{ textDecoration: "none" }}>
                        <li>
                            <DevicesIcon className={Style.icons} />
                            <span>View Pre-Bulid Pc Details</span>
                        </li>
                    </Link>
                    <p className={Style.Title}>USEFUL</p>
                    <Link to="/Admin/Select" style={{ textDecoration: "none" }}>
                        <li>
                            <ComputerIcon className={Style.icons} />
                            <span>Insert Computer parts</span>
                        </li>
                    </Link>
                    <Link to="/Admin/District" style={{ textDecoration: "none" }}>
                        <li>
                            <PublicIcon className={Style.icons} />
                            <span>Insert District</span>
                        </li>
                    </Link>
                    <Link to="/Admin/Place" style={{ textDecoration: "none" }}>
                        <li>
                            <PlaceOutlinedIcon className={Style.icons} />
                            <span>Insert Place</span>
                        </li>
                    </Link>
                    <li>
                        <NotificationsActiveIcon className={Style.icons} />
                        <span>Notifications</span>
                    </li>
                    <p className={Style.Title}>F&C</p>
                    <li>
                        <SmsFailedIcon className={Style.icons} />
                        <span>Complaint</span>
                    </li>
                    <li>
                        <ForumIcon className={Style.icons} />
                        <span>FeedBack</span>
                    </li>
                    <li>
                        <SettingsIcon className={Style.icons} />
                        <span>Setting</span>
                    </li>
                    <p className={Style.Title}>USER</p>
                    <li>
                        <PersonIcon className={Style.icons} />
                        <span>Profile</span>
                    </li>
                    <li>
                        <LogoutIcon className={Style.icons} />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            {/* <div className={Style.Bottom}>
                <div className={Style.ColourOption}></div>
                <div className={Style.ColourOption}></div>
            </div> */}
        </div>
    )
}

export default Sidebar
import React, { useEffect, useState } from 'react';
import Style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios

// Material-UI Icons
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockResetIcon from '@mui/icons-material/LockReset';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Navbar = () => {


    const navigate = useNavigate()
    const handleSignOut = () => {        
        const confirmLogout = confirm("Are you sure you want to log out?");
            if (confirmLogout) {
          sessionStorage.removeItem('aid');
          navigate('/Login');
          console.log("logged out");
        } else {
          console.log("logout canceled");
        }
      };

    const [Admin, setAdmin] = useState(null);
  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };


    useEffect(() => {
        const adminId = sessionStorage.getItem('aid');
        console.log('admin ID from session storage:', adminId);

        const fetchData = async () => {
            try {
                const Response = await axios.get(`http://localhost:5000/collectionAdminById/${adminId}`);
                console.log('admin data:', Response.data.admin);
                setAdmin(Response.data.admin);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (adminId) {
            fetchData();
        }
    }, []);

    return (
        <div className={Style.Container}>
            <div className={Style.Wrapper}>
                <div className={Style.Search}>
                    
                </div>

                <div className={Style.Items}>
                    <div 
                        className={Style.Item} 
                        onClick={toggleDropdown}
                        style={{ position: 'relative', cursor: 'pointer' }}
                    >
                        <FormatListBulletedIcon className={Style.Icon} />
                        
                        {isDropdownOpen && (
                            <div className={Style.Dropdown}>
                                <Link 
                                    to="/Admin/RegisterAdmin" 
                                    className={Style.DropdownItem}
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <PersonAddAltIcon className={Style.DropdownIcon} />
                                    Add New Admin
                                </Link>
                                <Link 
                                    to="/Admin/Editprofile" 
                                    className={Style.DropdownItem}
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <LockResetIcon className={Style.DropdownIcon} />
                                    Edit Profile & Change Password
                                </Link>
                                <div 
                                    className={Style.DropdownItem} 
                                    onClick={handleSignOut}
                                >
                                    <ExitToAppIcon className={Style.DropdownIcon} />
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Profile Image with Null Check */}
                    <Link to={"/Admin/Profile"}>
                        <div 
                            className={Style.Item} 
                            style={{ position: 'relative', cursor: 'pointer' }}
                        >
                            {Admin && Admin.adminImg ? (
                                <img 
                                    src={Admin.adminImg} 
                                    alt="Profile" 
                                    className={Style.Avater} 
                                />
                            ) : (
                                <PersonOutlineIcon className={Style.Icon} />
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
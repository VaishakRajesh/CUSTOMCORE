import React, { useState, useEffect } from 'react';
import Style from './Profile.module.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import Img from '../../Img/1.png';
import { Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [adminData, setAdminData] = useState({
        adminName: '',
        adminEmail: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch admin data when component mounts
        const fetchAdminData = async () => {
            try {
                // Get user ID from sessionStorage
                const adminId = sessionStorage.getItem('aid');
                console.log(adminId)
                if (adminId) {
                    // Fetch admin by ID
                    const response = await axios.get(`http://localhost:5000/collectionAdminById/${adminId}`);
                    setAdminData(response.data.admin);
                    console.log(adminData)
                } else {
                    // Instead of fetching all admins, show an error or redirect to login
                    setError('User ID not found. Please login again.');
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                setError('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    return (
        <div className={Style.Body}>
            <div className={Style.container}>
                <div className={Style.Profile}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                            <div className={Style.ProfileImg}>
                                <img src={adminData.adminImg} alt="" />
                            </div>
                            <div className={Style.Name}>Name: {adminData.adminName}</div>
                            <div className={Style.Email}>Email: {adminData.adminEmail}</div>
                            <div className={Style.Buttons}>
                                <Link to="/Admin/Editprofile"> <div className={Style.Button1}><Button>Edit Profile</Button></div></Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
import React, { useState, useEffect } from 'react';
import Style from './Editprofile.module.css';
import Img from '../../Img/1.png';
import { Button } from '@mui/material';
import axios from 'axios';

const Editprofile = () => {
    const [adminData, setAdminData] = useState({
        adminName: '',
        adminEmail: '',
        adminPhoto: Img
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    // Fetch initial profile data
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/profile'); // Replace with your API endpoint
                setAdminData({
                    adminName: response.data.name,
                    adminEmail: response.data.email,
                    adminPhoto: response.data.photo || Img
                });
            } catch (err) {
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    // Handle input changes for profile
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle photo upload
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAdminData(prev => ({
                    ...prev,
                    adminPhoto: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle profile save
    const handleSave = async () => {
        setLoading(true);
        try {
            await axios.put('/api/profile', adminData); // Replace with your API endpoint
            setError(null); // Clear any previous errors
        } catch (err) {
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    // Handle password change
    const handlePasswordChange = async () => {
        setLoading(true);
        try {
            await axios.put('/api/change-password', { password: newPassword }); // Replace with your API endpoint
            setNewPassword('');
            setShowPasswordForm(false);
            setError(null);
        } catch (err) {
            setError('Failed to change password');
        } finally {
            setLoading(false);
        }
    };

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
                            {!showPasswordForm ? (
                                // Edit Profile Form
                                <>
                                    <div className={Style.ProfileImg}>
                                        <img src={adminData.adminPhoto} alt="Profile" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className={Style.photoInput}
                                        />
                                    </div>

                                    <div className={Style.Name}>
                                        <input
                                            type="text"
                                            name="adminName"
                                            value={adminData.adminName}
                                            onChange={handleInputChange}
                                            placeholder="Name"
                                            className={Style.inputField}
                                        />
                                    </div>

                                    <div className={Style.Email}>
                                        <input
                                            type="email"
                                            name="adminEmail"
                                            value={adminData.adminEmail}
                                            onChange={handleInputChange}
                                            placeholder="Email"
                                            className={Style.inputField}
                                        />
                                    </div>

                                    <div className={Style.Buttons}>
                                        <div className={Style.Button1}>
                                            <Button onClick={handleSave}>Save Changes</Button>
                                        </div>
                                    </div>

                                    <div className={Style.ChangePasswordButton}>
                                        <Button onClick={() => setShowPasswordForm(true)}>
                                            Change Password
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                // Change Password Form
                                <>
                                    <div className={Style.PasswordTitle}>
                                        Change Password
                                    </div>

                                    <div className={Style.Password}>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="New Password"
                                            className={Style.inputField}
                                        />
                                    </div>

                                    <div className={Style.Buttons}>
                                        <div className={Style.Button1}>
                                            <Button onClick={handlePasswordChange}>Save Password</Button>
                                        </div>
                                        <div className={Style.Button1}>
                                            <Button onClick={() => setShowPasswordForm(false)}>Cancel</Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Editprofile;
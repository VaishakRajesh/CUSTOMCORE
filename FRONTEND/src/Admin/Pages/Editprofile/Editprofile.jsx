import React, { useState, useEffect, useRef } from 'react';
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
    const [success, setSuccess] = useState(null);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const fileInputRef = useRef(null);

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
                console.error('Error fetching profile:', err);
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

    // Handle input changes for password form
    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle photo upload
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 5000000) { // 5MB limit
            setError('Image size should be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            setAdminData(prev => ({
                ...prev,
                adminPhoto: event.target.result
            }));
        };
        reader.onerror = () => {
            setError('Failed to read file');
        };
        reader.readAsDataURL(file);
        
        // Clear the input value to allow selecting the same file again
        e.target.value = '';
    };

    // Handle profile save
    const handleSave = async () => {
        // Basic validation
        if (!adminData.adminName.trim() || !adminData.adminEmail.trim()) {
            setError('Name and email are required');
            return;
        }
        
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            // Create FormData to handle file upload
            const formData = new FormData();
            formData.append('adminName', adminData.adminName);
            formData.append('adminEmail', adminData.adminEmail);
            
            // If adminPhoto is a data URL (new upload), convert it to a file
            if (adminData.adminPhoto && adminData.adminPhoto.startsWith('data:')) {
                // Convert base64 to blob
                const response = await fetch(adminData.adminPhoto);
                const blob = await response.blob();
                const photoFile = new File([blob], "profile-photo.jpg", { type: "image/jpeg" });
                formData.append('photo', photoFile);
            }
            
            await axios.put('/api/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            setSuccess('Profile updated successfully');
            
            // Clear message after 3 seconds
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        } catch (err) {
            setError('Failed to update profile');
            console.error('Error updating profile:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handle password change
    const handlePasswordChange = async () => {
        // Validate passwords
        if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            setError('All password fields are required');
            return;
        }
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }
        
        if (passwordData.newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await axios.put('/api/change-password', { 
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword 
            });
            
            setPasswordData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setShowPasswordForm(false);
            setSuccess('Password changed successfully');
            
            // Clear message after 3 seconds
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Current password is incorrect');
            } else {
                setError('Failed to change password');
            }
            console.error('Error changing password:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handle photo upload button click
    const triggerPhotoUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={Style.Body}>
            <div className={Style.container}>
                <div className={Style.Profile}>
                    {loading && <div className={Style.loadingOverlay}>Loading...</div>}
                    
                    {success && <div className={Style.successMessage}>{success}</div>}
                    {error && <div className={Style.errorMessage}>{error}</div>}
                    
                    {!showPasswordForm ? (
                        // Edit Profile Form
                        <>
                            <div className={Style.ProfileImg} onClick={triggerPhotoUpload}>
                                <img 
                                    src={adminData.adminPhoto} 
                                    alt="Profile" 
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = Img; // Fallback image
                                    }}
                                />
                                <div className={Style.photoOverlay}>
                                    <span>Change Photo</span>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg, image/png, image/gif"
                                    onChange={handlePhotoChange}
                                    className={Style.photoInput}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <div className={Style.formField}>
                                <div className={Style.Name}>Name</div>
                                <input
                                    type="text"
                                    name="adminName"
                                    value={adminData.adminName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    className={Style.inputField}
                                />
                            </div>

                            <div className={Style.formField}>
                                <div className={Style.Email}>Email</div>
                                <input
                                    type="email"
                                    name="adminEmail"
                                    value={adminData.adminEmail}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className={Style.inputField}
                                />
                            </div>

                            <div className={Style.Buttons}>
                                <div className={Style.Button1}>
                                    <Button onClick={handleSave} disabled={loading}>
                                        Save 
                                    </Button>
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

                            <div className={Style.formField}>
                                <div className={Style.Password}>Current Password</div>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={passwordData.oldPassword}
                                    onChange={handlePasswordInputChange}
                                    placeholder="Enter current password"
                                    className={Style.inputField}
                                />
                            </div>

                            <div className={Style.formField}>
                                <div className={Style.Password}>New Password</div>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordInputChange}
                                    placeholder="Enter new password"
                                    className={Style.inputField}
                                />
                            </div>

                            <div className={Style.formField}>
                                <div className={Style.Password}>Confirm New Password</div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordInputChange}
                                    placeholder="Confirm new password"
                                    className={Style.inputField}
                                />
                            </div>

                            <div className={Style.Buttons}>
                                <div className={Style.Button1}>
                                    <Button onClick={handlePasswordChange} disabled={loading}>
                                        Save 
                                    </Button>
                                </div>
                                <div className={Style.Button1}>
                                    <Button onClick={() => {
                                        setShowPasswordForm(false);
                                        setError(null);
                                    }}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Editprofile;
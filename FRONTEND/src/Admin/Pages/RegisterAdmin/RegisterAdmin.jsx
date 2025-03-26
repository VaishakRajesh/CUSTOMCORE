import React, { useState } from 'react';
import Style from './RegisterAdmin.module.css';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const RegisterAdmin = () => {
  const [adminData, setAdminData] = useState({
    Name: '',
    Email: '',
    Password: '',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isHovered, setIsHovered] = useState({
    container: false,
    imageUpload: false,
    name: false,
    email: false,
    password: false,
    button: false
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // Handle image upload
      const file = files[0];
      setAdminData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      // Handle text inputs
      setAdminData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', adminData.Name);
    formData.append('Email', adminData.Email);
    formData.append('Password', adminData.Password);

    if (adminData.image) {
      formData.append('image', adminData.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/collectionRegisterAdmin', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('Admin registered successfully!');
      setError(null);

      // Reset form
      setAdminData({
        Name: '',
        Email: '',
        Password: '',
        image: null
      });
      setPreviewImage(null);
    } catch (error) {
      setError('Failed to register admin. Please try again.');
      setSuccess(null);
      console.error("Registration error:", error);
    }
  };

  return (
    <div 
      className={Style.Body}
      onMouseEnter={() => setIsHovered(prev => ({ ...prev, container: true }))}
      onMouseLeave={() => setIsHovered(prev => ({ ...prev, container: false }))}
    >
      <div className={`${Style.container} ${isHovered.container ? Style.containerHover : ''}`}>
        <h2>Register New Admin</h2>

        <form onSubmit={handleSubmit} className={Style.form}>
          <div 
            className={`${Style.imageUpload} ${isHovered.imageUpload ? Style.imageUploadHover : ''}`}
            onMouseEnter={() => setIsHovered(prev => ({ ...prev, imageUpload: true }))}
            onMouseLeave={() => setIsHovered(prev => ({ ...prev, imageUpload: false }))}
          >
            {previewImage ? (
              <img 
                src={previewImage} 
                alt="Preview" 
                className={Style.previewImg} 
              />
            ) : (
              <p>No Image Selected</p>
            )}
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              className={Style.fileInput}
            />
          </div>

          <TextField
            name="Name"
            label="Name"
            variant="outlined"
            fullWidth
            value={adminData.Name}
            onChange={handleChange}
            required
            margin="normal"
            onMouseEnter={() => setIsHovered(prev => ({ ...prev, name: true }))}
            onMouseLeave={() => setIsHovered(prev => ({ ...prev, name: false }))}
            className={isHovered.name ? Style.textFieldHover : ''}
          />

          <TextField
            name="Email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={adminData.Email}
            onChange={handleChange}
            required
            margin="normal"
            onMouseEnter={() => setIsHovered(prev => ({ ...prev, email: true }))}
            onMouseLeave={() => setIsHovered(prev => ({ ...prev, email: false }))}
            className={isHovered.email ? Style.textFieldHover : ''}
          />

          <TextField
            name="Password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={adminData.Password}
            onChange={handleChange}
            required
            margin="normal"
            onMouseEnter={() => setIsHovered(prev => ({ ...prev, password: true }))}
            onMouseLeave={() => setIsHovered(prev => ({ ...prev, password: false }))}
            className={isHovered.password ? Style.textFieldHover : ''}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '15px' }}
            onMouseEnter={() => setIsHovered(prev => ({ ...prev, button: true }))}
            onMouseLeave={() => setIsHovered(prev => ({ ...prev, button: false }))}
            className={isHovered.button ? Style.buttonHover : ''}
          >
            Register
          </Button>

          {error && <p className={Style.error}>{error}</p>}
          {success && <p className={Style.success}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
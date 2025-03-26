import React, { useState } from 'react';
import Style from './RegisterAdmin.module.css';
import { 
  Button, 
  TextField
} from '@mui/material';
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
    <div className={Style.Body}>
      <div className={Style.container}>
        <h2>Register New Admin</h2>
        
        <form onSubmit={handleSubmit} className={Style.form}>
          <div className={Style.imageUpload}>
            {previewImage ? (
              <img src={previewImage} alt="Preview" className={Style.previewImg} />
            ) : (
              <p>No Image Selected</p>
            )}
            <input 
              type="file" 
              accept="image/*" 
              name="image"
              onChange={handleChange} 
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
          />

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            style={{ marginTop: '15px' }}
          >
            Register
          </Button>

          {error && <p style={{color: 'red', marginTop: '10px'}}>{error}</p>}
          {success && <p style={{color: 'green', marginTop: '10px'}}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
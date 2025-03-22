import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Style from './UserEditProfile.module.css';

const UserEditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
    district: '',
    place: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className={Style.container}>
      <div className={Style.card}>
        <h2 className={Style.title}>Edit Profile</h2>
        <form onSubmit={handleSubmit} className={Style.form}>
          {/* Profile Image Upload */}
          <div className={Style.profileImg}>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className={Style.uploadLabel}>
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Profile"
                  className={Style.profileImage}
                />
              ) : (
                <div className={Style.uploadPlaceholder}>Upload Photo</div>
              )}
            </label>
          </div>

          {/* Name, Email, Address, Contact Fields (unchanged) */}
          <div className={Style.inputField}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiInputBase-root': { color: '#e2e8f0', fontSize: '16px' },
                '& .MuiInputLabel-root': { color: '#e2e8f0', fontSize: '14px' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#2e3b5e' },
                  '&:hover fieldset': { borderColor: '#4b5e91' },
                  '&.Mui-focused fieldset': { borderColor: '#5b76b8' },
                },
              }}
            />
          </div>
          <div className={Style.inputField}>
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiInputBase-root': { color: '#e2e8f0', fontSize: '16px' },
                '& .MuiInputLabel-root': { color: '#e2e8f0', fontSize: '14px' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#2e3b5e' },
                  '&:hover fieldset': { borderColor: '#4b5e91' },
                  '&.Mui-focused fieldset': { borderColor: '#5b76b8' },
                },
              }}
            />
          </div>
          <div className={Style.inputField}>
            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiInputBase-root': { color: '#e2e8f0', fontSize: '16px' },
                '& .MuiInputLabel-root': { color: '#e2e8f0', fontSize: '14px' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#2e3b5e' },
                  '&:hover fieldset': { borderColor: '#4b5e91' },
                  '&.Mui-focused fieldset': { borderColor: '#5b76b8' },
                },
              }}
            />
          </div>
          <div className={Style.inputField}>
            <TextField
              name="contact"
              label="Contact"
              value={formData.contact}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiInputBase-root': { color: '#e2e8f0', fontSize: '16px' },
                '& .MuiInputLabel-root': { color: '#e2e8f0', fontSize: '14px' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#2e3b5e' },
                  '&:hover fieldset': { borderColor: '#4b5e91' },
                  '&.Mui-focused fieldset': { borderColor: '#5b76b8' },
                },
              }}
            />
          </div>

          {/* District Dropdown (Removed InputLabel) */}
          <div className={Style.inputField}>
            <Box sx={{ minWidth: 120, width: '100%' }}>
              <FormControl fullWidth>
                <NativeSelect
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  inputProps={{ name: 'district', id: 'district' }}
                  sx={{
                    color: '#e2e8f0',
                    fontSize: '16px',
                    '& option': { backgroundColor: '#141b2d', color: '#e2e8f0' },
                    '& option:checked': { backgroundColor: '#5b76b8', color: '#fff' }, // Highlight selected
                  }}
                >
                  <option value="" disabled>Select District</option>
                  <option value="district1">District 1</option>
                  <option value="district2">District 2</option>
                  <option value="district3">District 3</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>

          {/* Place Dropdown (Removed InputLabel) */}
          <div className={Style.inputField}>
            <Box sx={{ minWidth: 120, width: '100%' }}>
              <FormControl fullWidth>
                <NativeSelect
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  inputProps={{ name: 'place', id: 'place' }}
                  sx={{
                    color: '#e2e8f0',
                    fontSize: '16px',
                    '& option': { backgroundColor: '#141b2d', color: '#e2e8f0' },
                    '& option:checked': { backgroundColor: '#5b76b8', color: '#fff' }, // Highlight selected
                  }}
                >
                  <option value="" disabled>Select Place</option>
                  <option value="place1">Place 1</option>
                  <option value="place2">Place 2</option>
                  <option value="place3">Place 3</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>

          {/* Save Button */}
          <div className={Style.buttonContainer}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#4b5e91',
                color: '#e2e8f0',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '50px',
                '&:hover': { backgroundColor: '#5b76b8' },
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditProfile;
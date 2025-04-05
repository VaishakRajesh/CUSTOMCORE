import React, { useEffect, useState } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Style from './UserEditProfile.module.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const UserEditProfile = () => {
  const fetchDistrict = () => {
    axios.get("http://localhost:5000/collectionDistrict").then((response) => {
      console.log(response.data);
      setDistrictArray(response.data.district)
    })
  }
  const fetchPlace = (e) => {
    const district = e.target.value
    axios.get(`http://localhost:5000/collectionPlaceByIdAll/${district}`).then((response) => {
      console.log(response.data);
      setPlaceArray(response.data)
    })
  }


  const userId = sessionStorage.getItem('uid');
  console.log('User ID from session storage:', userId);




  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
    district: '',
    place: '',
    photo: null,
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handlePhotoUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData({
  //       ...formData,
  //       photo: URL.createObjectURL(file),
  //     });
  //   }
  // };



  const [DistrictArray, setDistrictArray] = useState([])
  const [PlaceArray, setPlaceArray] = useState([])

  const [UserName, setUserName] = useState("")
  const [UserContact, setUserContact] = useState("")
  const [UserEmail, setUserEmail] = useState("")
  const [UserAddress, setUserAddress] = useState("")
  const [Place, setPlace] = useState("")

  const handleChange = (event) => {
    setPlace(event.target.value);
  };

  const handleSubmit = async () => {
    const Data = {
      userName: UserName,
      userEmail: UserEmail,
      userAddress: UserAddress,
      userContact: UserContact,
      placeId : Place
    };
    try {
      const response = await axios.put(`http://localhost:5000/collectionUserEdit/${userId}`, Data);
      console.log(response);
      toast.success('Updated successfully!');

    } catch (err) {
      console.log(err);
      console.log('Failed to update status. Please try again.');
      alert("Oops! Something went wrong. Please try again.");
    }
  };
  useEffect(() => {
    fetchDistrict();
  }, [])
  return (
    <div className={Style.container}>
      <div className={Style.card}>
        <h2 className={Style.title}>Edit Profile</h2>
        <form className={Style.form}>
          {/* Profile Image Upload */}
          <div className={Style.profileImg}>
            <input
              type="file"
              accept="image/*"
              // onChange={handlePhotoUpload}
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
              // value={setUserName}
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
              }} onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className={Style.inputField}>
            <TextField
              name="email"
              label="Email"
              // value={formData.email}
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
              }} onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className={Style.inputField}>
            <TextField
              name="address"
              label="Address"
              // value={formData.address}
              // onChange={handleChange}
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
              }} onChange={(e) => setUserAddress(e.target.value)}
            />
          </div>
          <div className={Style.inputField}>
            <TextField
              name="contact"
              label="Contact"
              // value={formData.contact}
              // onChange={handleChange}
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
              }} onChange={(e) => setUserContact(e.target.value)}
            />
          </div>

          {/* District Dropdown (Removed InputLabel) */}
          <div className={Style.inputField}>
            <Box sx={{ minWidth: 120, width: '100%' }}>
              <FormControl fullWidth>
                <NativeSelect
                  name="district"
                  // value={formData.district}
                  onChange={fetchPlace}
                  inputProps={{ name: 'district', id: 'district' }}
                  sx={{
                    color: '#e2e8f0',
                    fontSize: '16px',
                    '& option': { backgroundColor: '#141b2d', color: '#e2e8f0' },
                    '& option:checked': { backgroundColor: '#5b76b8', color: '#fff' }, // Highlight selected
                  }}
                >
                  {DistrictArray && DistrictArray.map((District, index) => (
                    <option key={index} value={District._id} style={{ color: 'black' }}>
                      {District.districtName}
                    </option>
                  ))}
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
                  value={Place}
                  onChange={handleChange}
                  inputProps={{ name: 'place', id: 'place' }}
                  sx={{
                    color: '#e2e8f0',
                    fontSize: '16px',
                    '& option': { backgroundColor: '#141b2d', color: '#e2e8f0' },
                    '& option:checked': { backgroundColor: '#5b76b8', color: '#fff' }, // Highlight selected
                  }}
                >
                  {PlaceArray?.map((Place, index) => (
                    <option key={index} value={Place._id} style={{ color: 'black' }}>
                      {Place.placeName}
                    </option>
                  ))}

                </NativeSelect>
              </FormControl>
            </Box>
          </div>

          {/* Save Button */}
          <div className={Style.buttonContainer}>
            <Button
              onClick={handleSubmit}
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
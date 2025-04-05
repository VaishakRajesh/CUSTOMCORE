import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Style from './UserProfile.module.css';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [placeName, setPlaceName] = useState('');

  useEffect(() => {
    const userId = sessionStorage.getItem('uid');
    console.log('User ID from session storage:', userId);

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/collectionUserById/${userId}`);
        console.log(userResponse.data.user);
        setUser(userResponse.data.user);

        // // Fetch place name using placeId
        // const placeId = userResponse.data.user.placeId;
        // const placeResponse = await axios.get(`http://localhost:5000/collectionPlaceById/${placeId}`);
        // setPlaceName(placeResponse.data.place); // Assuming the API returns the place name in the 'name' field
        // console.log(placeName.placeName)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, []);

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className={Style.body}>
      <div className={Style.card}>
        <div className={Style.Profileimgs}>
          <div className={Style.Profileimg}>
            {user.userPhoto ? (
              <img src={user.userPhoto} alt="User" width={'200px'} height={'200px'} />
            ) : (
              <div>No Photo Available</div>
            )}
          </div>
        </div>
        <div className={Style.text}>UserName: {user.userName}</div>
        <div className={Style.text}>Contact: {user.userContact}</div>
        <div className={Style.text}>Email: {user.userEmail}</div>
        <div className={Style.text}>Address: {user.userAddress}</div>
        <div className={Style.text}>Place: {user.placeId.placeName}</div> {/* Use placeName */}
        <div className={Style.Button}>
          <Link to="/User/UserEditProfile">
            <Button
              variant="outlined"
              sx={{
                bgcolor: 'white',
                color: '#1a1a2e',
                height: '40px',
                width: '160px',
                fontSize: '15px',
                fontFamily: 'Arial Black',
                border: '1px solid white',
                borderRadius: '40px',
              }}
            >
              Edit Profile
            </Button>
          </Link>
          <Link to="/User/UserchangePassword">
            <Button
              variant="outlined"
              sx={{
                bgcolor: 'white',
                color: '#1a1a2e',
                height: '40px',
                width: '185px',
                fontSize: '13px',
                fontFamily: 'Arial Black',
                border: '1px solid white',
                borderRadius: '40px',
              }}
            >
              Change Password
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

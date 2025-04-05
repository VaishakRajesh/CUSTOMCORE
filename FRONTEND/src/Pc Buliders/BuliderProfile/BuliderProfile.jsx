import React, { useState, useEffect } from 'react'
import Style from './BuliderProfile.module.css'
import img from './img/user.gif'
import { Link } from 'react-router-dom'
import { Button, CircularProgress } from '@mui/material'
import axios from 'axios'

const BuilderProfile = () => {
  const [builderData, setBuilderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch builder data on component mount
  useEffect(() => {
    // Get builder ID from sessionStorage (using 'pid' as the key)
    const builderId = sessionStorage.getItem('pid');
    
    if (builderId) {
      fetchBuilderData(builderId);
    } else {
      setError("Not logged in");
      setLoading(false);
    }
  }, []);
  
  const fetchBuilderData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/collectionPcBuliderById/${id}`);
      setBuilderData(response.data.pcBulider);
      console.log("Builder data loaded:", response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setError("Failed to load profile data");
      setLoading(false);
    }
  };

  if (loading) return (
    <div className={Style.body}>
      <CircularProgress sx={{ color: 'white' }} />
    </div>
  );
  
  if (error) return (
    <div className={Style.body}>
      <div className={Style.card}>
        <p style={{ color: 'white' }}>{error}</p>
        <Link to="/login">
          <Button variant="outlined" sx={{ bgcolor: 'white', color: '#1a1a2e', mt: 2 }}>
            Go to Login
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      {/* Uncomment this line when your BuilderNavbar component is ready */}
      {/* <BuilderNavbar/> */}
      <div className={Style.body}>
        <div className={Style.card}>
          <div className={Style.Profileimgs}>
            <div className={Style.Profileimg}>
              <img 
                src={builderData?.pcBuliderPhoto || img} 
                alt="Profile" 
                width={'200px'} 
                height={'200px'} 
              />
            </div>
          </div>
          
          <div className={Style.text}>Username: {builderData?.pcBuliderName || 'N/A'}</div>
          <div className={Style.text}>Contact: {builderData?.pcBuliderContact || 'N/A'}</div>
          <div className={Style.text}>Email: {builderData?.pcBuliderEmail || 'N/A'}</div>
          <div className={Style.text}>Address: {builderData?.pcBuliderAddress || 'N/A'}</div>
          
          <div className={Style.Button}>
            <Link to="/PcBulider/BuliderEditProfile">
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
                  transition: 'all 0.3s ease'
                }}
              >
                Edit Profile
              </Button>
            </Link>
            
            <Link to="/PcBulider/BuliderChangePassword">
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
                  transition: 'all 0.3s ease'
                }}
              >
                Change Password
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuilderProfile
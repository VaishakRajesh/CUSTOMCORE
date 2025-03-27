import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Card, 
  CardContent, 
  IconButton,
  CircularProgress
} from '@mui/material';
import { DeleteOutline, AccountCircle, EmailOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';
import styles from './Feedback.module.css';

const AdminFeedback = () => {
  const [feedbackArray, setFeedbackArray] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async (userId) => {
    try {
      // If user details already fetched, return them
      if (userDetails[userId]) return userDetails[userId];
      
      // Fetch user details
      const response = await axios.get(`http://localhost:5000/collectionUserById/${userId}`);
      
      // Update user details state
      const updatedUserDetails = {
        ...userDetails,
        [userId]: response.data.user
      };
      setUserDetails(updatedUserDetails);
      
      return response.data.user;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/collectionFeedBack');
      
      // Fetch user details for each feedback item
      const feedbackWithUserDetails = await Promise.all(
        response.data.feedback.map(async (feedback) => {
          const userDetail = await fetchUserDetails(feedback.userId);
          return {
            ...feedback,
            userDetail
          };
        })
      );

      setFeedbackArray(feedbackWithUserDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setLoading(false);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/collectionFeedBack/${id}`);
      fetchFeedback();
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedback();
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackWrapper}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'Black', 
            mb: 4, 
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Feedback Management
        </Typography>
        
        <div className={styles.feedbackGrid}>
          {feedbackArray.map((feedback, index) => (
            <motion.div
              key={feedback._id}
              className={styles.feedbackCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1 
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <Card 
                sx={{ 
                  backgroundColor: '#2C2C2C', 
                  color: 'Black', 
                  height: '100%',
                  width: '100%'
                }}
              >
                <CardContent className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    {feedback.userDetail ? (
                      <>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: '#4CAF50', 
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <AccountCircle sx={{ mr: 1 }} /> 
                          {feedback.userDetail.name || 'Unknown Name'}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#757575',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <EmailOutlined sx={{ mr: 1 }} /> 
                          {feedback.userDetail.email || 'Unknown Email'}
                        </Typography>
                      </>
                    ) : (
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#FF4444',
                          mb: 2,
                          textAlign: 'center'
                        }}
                      >
                        User details not available
                      </Typography>
                    )}
                  </div>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#B0B0B0', 
                      mb: 2,
                      fontStyle: 'italic',
                      textAlign: 'center'
                    }}
                  >
                    Feedback Reaction: {feedback.FeedbackRecation}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#757575',
                      mb: 2,
                      textAlign: 'center'
                    }}
                  >
                    Feedback Content: {feedback.FeedbackContent}
                  </Typography>
                  
                  <div className={styles.cardActions}>
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton 
                        onClick={() => deleteFeedback(feedback._id)}
                        sx={{ 
                          color: '#FF4444',
                          backgroundColor: 'rgba(255,68,68,0.1)',
                          '&:hover': { 
                            backgroundColor: 'rgba(255,68,68,0.2)' 
                          }
                        }}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {feedbackArray.length === 0 && (
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#666', 
              textAlign: 'center', 
              mt: 4 
            }}
          >
            No feedback available
          </Typography>
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;
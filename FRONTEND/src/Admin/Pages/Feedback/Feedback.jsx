import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  IconButton,
  Chip
} from '@mui/material';
import { DeleteOutline, MessageOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';
import styles from './Feedback.module.css';

const AdminFeedback = () => {
  const [feedbackArray, setFeedbackArray] = useState([]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:5000/feedback');
      setFeedbackArray(response.data.feedback);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/feedback/${id}`);
      fetchFeedback();
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

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
                    <Typography variant="h6" sx={{ color: '#4CAF50', mb: 1 }}>
                      {feedback.name}
                    </Typography>
                    <Chip 
                      icon={<MessageOutlined />} 
                      label={new Date(feedback.createdAt).toLocaleDateString()} 
                      sx={{ 
                        backgroundColor: '#333', 
                        color: 'Black' 
                      }} 
                    />
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
                    {feedback.message}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#757575',
                      textAlign: 'center'
                    }}
                  >
                    {feedback.email}
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
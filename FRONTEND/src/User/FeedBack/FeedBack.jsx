import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Style from './FeedBack.module.css';
import { TextField, Snackbar, Alert } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const FeedBack = () => {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Retrieve user ID from localStorage or your authentication method
    const storedUserId = sessionStorage.getItem('uid');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // If no user ID, you might want to handle this (e.g., redirect to login)
      console.warn('No user ID found');
    }
  }, []);

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  const handleSubmit = async () => {
    // Validate inputs
    if (!feedbackText.trim()) {
      setSnackbarMessage('Please provide feedback content');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (!userId) {
      setSnackbarMessage('User ID is required. Please log in.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/collectionFeedBack", {
        FeedbackRecation: labels[value],
        FeedbackContent: feedbackText,
        userId: userId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Success handling
      setSnackbarMessage('Feedback submitted successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Reset form
      setValue(2);
      setFeedbackText('');
    } catch (error) {
      // Error handling
      console.error('Feedback submission error:', error);
      setSnackbarMessage(
        error.response?.data?.message || 
        'Error submitting feedback. Please try again.'
      );
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className={Style.body}>
      <div className={Style.Card}>
        <div className={Style.TextField}>
          <TextField
            fullWidth
            id="filled-multiline-static"
            label="Share Your Feedback"
            multiline
            rows={4}
            variant="outlined"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Tell us about your experience..."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                '& fieldset': {
                  borderColor: 'rgba(0,0,0,0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </div>

        <div className={Style.Rating}>
          <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              size="large"
            />
            {value !== null && (
              <Box sx={{ ml: 2, color: 'text.secondary' }}>
                {labels[hover !== -1 ? hover : value]}
              </Box>
            )}
          </Box>
        </div>

        <div className={Style.button}>
          <button 
            className={Style.submitButton}
            onClick={handleSubmit}
            disabled={!feedbackText || isSubmitting}
            style={{
              backgroundColor: isSubmitting ? '#a0a0a0' : '#000',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '50px',
              fontSize: '16px',
              cursor: !feedbackText || isSubmitting ? 'not-allowed' : 'pointer',
              outline: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbarSeverity} 
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default FeedBack;
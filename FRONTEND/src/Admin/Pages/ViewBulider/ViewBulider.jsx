import React, { useState, useEffect } from 'react';
import Style from './ViewBulider.module.css';
import {
  Paper,
  Typography,
  Avatar,
  Button,
  Grid,
  Divider,
  Box,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { MoreHoriz, Delete } from '@mui/icons-material';
import Img from './img/1.png'; // Default image

const ViewBuilder = ({ placeId }) => {
  const [builders, setBuilders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Fetch builders data on component mount or when placeId changes
  useEffect(() => {
    fetchBuilders();
  }, [placeId]);

  // Function to fetch PC builders data
  const fetchBuilders = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/collectionPcBulider';
      
      // If placeId is provided, fetch builders for that specific place
      if (placeId) {
        url = `http://localhost:5000/collectionPcBuliderByIdAll/${placeId}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch builders');
      }
      
      const data = await response.json();
      // Set builders based on the API response format
      setBuilders(placeId ? data.pcBulider : data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching PC builders:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle viewing more details for a builder - FIXED
  const handleMoreDetails = (builderId) => {
    // Fixed: window.location.href is a property, not a function
    window.location.href = `/Admin/ViewBuliderDetails/${builderId}`;
  };

  // Handle deleting a builder
  const handleDelete = async (builderId) => {
    if (window.confirm('Are you sure you want to delete this builder?')) {
      try {
        const response = await fetch(`http://localhost:5000/collectionPcBulider/${builderId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete builder');
        }
        
        // Remove the deleted builder from state
        setBuilders(builders.filter(builder => builder._id !== builderId));
        
        // Show success message
        setSnackbar({
          open: true,
          message: 'Builder deleted successfully',
          severity: 'success'
        });
      } catch (err) {
        console.error('Error deleting builder:', err);
        setSnackbar({
          open: true,
          message: 'Failed to delete builder',
          severity: 'error'
        });
      }
    }
  };

  // Handle closing the snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Show loading state
  if (loading) {
    return (
      <div className={Style.body}>
        <div className={Style.container}>
          <Paper elevation={3} className={Style.paper}>
            <Box display="flex" justifyContent="center" alignItems="center" padding={4}>
              <CircularProgress />
            </Box>
          </Paper>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={Style.body}>
        <div className={Style.container}>
          <Paper elevation={3} className={Style.paper}>
            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" padding={4}>
              <Typography color="error" variant="h6">Error loading builders</Typography>
              <Button variant="contained" color="primary" onClick={fetchBuilders} sx={{ marginTop: 2 }}>
                Try Again
              </Button>
            </Box>
          </Paper>
        </div>
      </div>
    );
  }

  return (
    <div className={Style.body}>
      <div className={Style.container}>
        <Paper elevation={3} className={Style.paper}>
          {/* Header */}
          <Box className={Style.header}>
            <Typography variant="h5" className={Style.title}>
              PC Builder List
            </Typography>
          </Box>

          {/* Table Header */}
          <Grid container className={Style.tableHeader}>
            <Grid item xs={3}>
              <Typography className={Style.headerText}>Name</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={Style.headerText}>Email</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={Style.headerText}>Contact</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={Style.headerText}>Actions</Typography>
            </Grid>
          </Grid>

          <Divider />

          {/* Builder List */}
          {builders.length === 0 ? (
            <Box padding={4} textAlign="center">
              <Typography variant="body1">No builders found</Typography>
            </Box>
          ) : (
            builders.map((builder) => (
              <Grid container key={builder._id} className={Style.userRow}>
                <Grid item xs={3} className={Style.userName}>
                  <Avatar
                    src={builder.pcBuliderPhoto || Img}
                    alt={builder.pcBuliderName}
                    className={Style.avatar}
                  />
                  <Typography className={Style.nameText}>
                    {builder.pcBuliderName}
                  </Typography>
                </Grid>
                <Grid item xs={3} className={Style.email}>
                  <Typography>{builder.pcBuliderEmail}</Typography>
                </Grid>
                <Grid item xs={3} className={Style.email}>
                  <Typography>{builder.pcBuliderContact}</Typography>
                </Grid>
                <Grid item xs={3} className={Style.actions}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<MoreHoriz />}
                    className={Style.actionButton}
                    onClick={() => handleMoreDetails(builder._id)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    className={Style.actionButton}
                    onClick={() => handleDelete(builder._id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            ))
          )}
        </Paper>
      </div>

      {/* Success/Error Message */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ViewBuilder;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Avatar,
  Button,
  Grid,
  Divider,
  Box,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  IconButton,
  Fade,
  Zoom,
  Collapse
} from '@mui/material';
import {
  ArrowBack,
  Phone,
  Email,
  LocationOn,
  Assignment,
  Edit,
  Delete,
  VisibilityOutlined,
  CheckCircleOutline,
  ErrorOutline,
  InsertDriveFile
} from '@mui/icons-material';
import Img from './img/1.png'; // Default image

// Import the CSS module
import styles from './ViewBuliderDetails.module.css';

const ViewBuliderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [builder, setBuilder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [place, setPlace] = useState(null);
  const [showProofPreview, setShowProofPreview] = useState(false);
  const [proofStatus, setProofStatus] = useState('pending'); // 'pending', 'verified', 'rejected'
  const [proofImage, setProofImage] = useState(null);

  // Fetch builder data on component mount
  useEffect(() => {
    fetchBuilderDetails();
  }, [id]);

  // Fetch builder details from API
  const fetchBuilderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/collectionPcBuliderById/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch builder details');
      }
      
      const data = await response.json();
      setBuilder(data);
      
      // Simulate proof verification status (would come from the API in a real app)
      setProofStatus(data.verificationStatus || 'pending');
      
      // Set proof document image if available
      if (data.pcBuliderProof) {
        // In a real app, you might need to check the file type and handle accordingly
        setProofImage(data.pcBuliderProof);
      }
      
      // Also fetch place details if placeId exists
      if (data.placeId) {
        fetchPlaceDetails(data.placeId);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching PC builder details:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch place details
  const fetchPlaceDetails = async (placeId) => {
    try {
      const response = await fetch(`http://localhost:5000/collectionPlace/${placeId}`);
      
      if (response.ok) {
        const placeData = await response.json();
        setPlace(placeData);
      }
    } catch (err) {
      console.error('Error fetching place details:', err);
    }
  };

  // Handle delete builder
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this builder? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:5000/collectionPcBulider/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete builder');
        }
        
        // Navigate back to the builders list
        navigate('/builders');
        
      } catch (err) {
        console.error('Error deleting builder:', err);
        alert('Failed to delete builder. Please try again.');
      }
    }
  };

  // Handle edit builder
  const handleEdit = () => {
    navigate(`/edit-builder/${id}`);
  };

  // Handle go back
  const handleGoBack = () => {
    navigate(-1);
  };

  // Toggle proof preview
  const toggleProofPreview = () => {
    setShowProofPreview(!showProofPreview);
  };

  // Update proof verification status (simulated)
  const updateProofStatus = (status) => {
    setProofStatus(status);
    // In a real app you would make an API call to update the status
  };

  // Determine file type based on extension or URL
  const getFileType = (url) => {
    if (!url) return 'unknown';
    
    const extension = url.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
      return 'image';
    } else if (['pdf'].includes(extension)) {
      return 'pdf';
    } else if (['doc', 'docx'].includes(extension)) {
      return 'word';
    } else {
      return 'document';
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', minHeight: '60vh' }}>
        <Typography color="error" variant="h6">Error loading builder details</Typography>
        <Button variant="contained" color="primary" onClick={fetchBuilderDetails} sx={{ marginTop: 2 }}>
          Try Again
        </Button>
        <Button variant="outlined" onClick={handleGoBack} sx={{ marginTop: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  // If no builder data
  if (!builder) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h6">Builder not found</Typography>
        <Button variant="outlined" onClick={handleGoBack} sx={{ marginTop: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  // Get status color and icon based on verification status
  const getStatusInfo = (status) => {
    switch(status) {
      case 'verified':
        return { 
          color: 'success', 
          icon: <CheckCircleOutline />, 
          text: 'Verified' 
        };
      case 'rejected':
        return { 
          color: 'error', 
          icon: <ErrorOutline />, 
          text: 'Rejected' 
        };
      default:
        return { 
          color: 'warning', 
          icon: <VisibilityOutlined />, 
          text: 'Pending Review' 
        };
    }
  };

  const statusInfo = getStatusInfo(proofStatus);
  const fileType = getFileType(builder.pcBuliderProof);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.detailsContainer}>
        {/* Back Button */}
        <Button 
          variant="outlined" 
          startIcon={<ArrowBack />} 
          onClick={handleGoBack}
          className={styles.backButton}
        >
          Back to List
        </Button>
        
        {/* Header Card with Fade animation */}
        <Fade in={true} timeout={600}>
          <Paper elevation={3} className={styles.headerCard}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box className={styles.profileSection}>
                <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                  <Avatar
                    src={builder.pcBuliderPhoto || Img}
                    alt={builder.pcBuliderName}
                    className={styles.profileAvatar}
                  />
                </Zoom>
                <Box>
                  <Typography variant="h4" className={styles.builderName}>
                    {builder.pcBuliderName}
                  </Typography>
                  <Box className={styles.contactInfo}>
                    <Email fontSize="small" color="action" />
                    <Typography variant="body1">{builder.pcBuliderEmail}</Typography>
                  </Box>
                  <Box className={styles.contactInfo}>
                    <Phone fontSize="small" color="action" />
                    <Typography variant="body1">{builder.pcBuliderContact}</Typography>
                  </Box>
                  {place && (
                    <Chip 
                      label={place.placeName || 'Unknown Location'} 
                      icon={<LocationOn />} 
                      sx={{ marginTop: '8px' }} 
                      color="primary" 
                      variant="outlined"
                    />
                  )}
                </Box>
              </Box>
              
              {/* Action Buttons */}
              <Box className={styles.actionButtons}>
                <IconButton color="primary" onClick={handleEdit}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={handleDelete}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Fade>
        
        {/* Details Cards with staggered animation */}
        <Grid container spacing={3}>
          {/* Address Card */}
          <Grid item xs={12} md={6}>
            <Fade in={true} style={{ transitionDelay: '300ms' }}>
              <Card elevation={2} className={styles.detailCard}>
                <CardContent>
                  <Typography variant="h6" className={styles.cardTitle}>
                    Address Information
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Box className={styles.infoRow}>
                    <LocationOn color="action" sx={{ marginTop: '3px' }} />
                    <Typography variant="body1">
                      {builder.pcBuliderAddress}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          
          {/* Verification Card with enhanced animation */}
          <Grid item xs={12} md={6}>
            <Fade in={true} style={{ transitionDelay: '400ms' }}>
              <Card elevation={2} className={styles.detailCard}>
                <CardContent>
                  <Typography variant="h6" className={styles.cardTitle}>
                    Verification Details
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                    <Box className={styles.infoRow}>
                      <Assignment color="action" />
                      <Typography variant="body1">
                        Proof Document
                      </Typography>
                    </Box>
                    <Chip 
                      icon={statusInfo.icon} 
                      label={statusInfo.text} 
                      color={statusInfo.color} 
                      size="small" 
                    />
                  </Box>
                  
                  {builder.pcBuliderProof && (
                    <>
                      <Button 
                        variant="outlined" 
                        size="small"
                        startIcon={<VisibilityOutlined />}
                        onClick={toggleProofPreview}
                        fullWidth
                        sx={{ marginBottom: 1 }}
                      >
                        {showProofPreview ? 'Hide Document Preview' : 'View Document Preview'}
                      </Button>
                      
                      <Collapse in={showProofPreview}>
                        <Box 
                          sx={{ 
                            border: '1px solid #ddd', 
                            borderRadius: '4px',
                            padding: '16px',
                            marginTop: 2,
                            marginBottom: 2,
                            backgroundColor: '#f9f9f9',
                            transition: 'all 0.3s ease-in-out'
                          }}
                          className={styles.proofPreview}
                        >
                          {/* Document Preview Section */}
                          {fileType === 'image' ? (
                            // For image files
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                Image Document Preview:
                              </Typography>
                              <Box 
                                sx={{ 
                                  border: '1px solid #ccc', 
                                  borderRadius: '4px', 
                                  padding: '8px',
                                  backgroundColor: '#fff',
                                  width: '100%',
                                  display: 'flex',
                                  justifyContent: 'center'
                                }}
                              >
                                <img 
                                  src={builder.pcBuliderProof} 
                                  alt="Document preview" 
                                  style={{ 
                                    maxWidth: '100%', 
                                    maxHeight: '200px',
                                    objectFit: 'contain'
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = Img; // Fallback to default image on error
                                  }}
                                />
                              </Box>
                            </Box>
                          ) : fileType === 'pdf' ? (
                            // For PDF files
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                PDF Document Preview:
                              </Typography>
                              <Box 
                                sx={{ 
                                  border: '1px solid #ccc', 
                                  borderRadius: '4px', 
                                  padding: '16px',
                                  backgroundColor: '#fff',
                                  width: '100%',
                                  height: '200px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'column'
                                }}
                              >
                                <InsertDriveFile sx={{ fontSize: 60, color: '#f44336' }} />
                                <Typography variant="body2" sx={{ marginTop: 1 }}>
                                  PDF document - click Download to view
                                </Typography>
                              </Box>
                            </Box>
                          ) : (
                            // For other file types
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                Document Preview:
                              </Typography>
                              <Box 
                                sx={{ 
                                  border: '1px solid #ccc', 
                                  borderRadius: '4px', 
                                  padding: '16px',
                                  backgroundColor: '#fff',
                                  width: '100%',
                                  height: '200px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'column'
                                }}
                              >
                                <InsertDriveFile sx={{ fontSize: 60, color: '#2196f3' }} />
                                <Typography variant="body2" sx={{ marginTop: 1 }}>
                                  Document file - click Download to view
                                </Typography>
                              </Box>
                            </Box>
                          )}
                          
                          {/* Admin verification actions */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                            <Button 
                              variant="contained" 
                              color="success" 
                              size="small"
                              onClick={() => updateProofStatus('verified')}
                              startIcon={<CheckCircleOutline />}
                              className={`${styles.verifyButton} ${proofStatus === 'verified' ? styles.activeButton : ''}`}
                            >
                              Verify
                            </Button>
                            <Button 
                              variant="contained" 
                              color="error" 
                              size="small"
                              onClick={() => updateProofStatus('rejected')}
                              startIcon={<ErrorOutline />}
                              className={`${styles.rejectButton} ${proofStatus === 'rejected' ? styles.activeButton : ''}`}
                            >
                              Reject
                            </Button>
                          </Box>
                        </Box>
                      </Collapse>
                      
                      <Button 
                        variant="contained" 
                        size="small" 
                        color="primary"
                        onClick={() => window.open(builder.pcBuliderProof, '_blank')}
                        fullWidth
                        className={styles.downloadButton}
                      >
                        Download Document
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          
          {/* Location Card (if place data exists) */}
          {place && (
            <Grid item xs={12}>
              <Fade in={true} style={{ transitionDelay: '500ms' }}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" className={styles.cardTitle}>
                      Location Details
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Box className={styles.infoRow}>
                          <Typography variant="body2" className={styles.infoLabel}>
                            Place Name
                          </Typography>
                          <Typography variant="body1" className={styles.infoValue}>
                            {place.placeName}
                          </Typography>
                        </Box>
                      </Grid>
                      {place.placeDescription && (
                        <Grid item xs={12} md={6}>
                          <Box className={styles.infoRow}>
                            <Typography variant="body2" className={styles.infoLabel}>
                              Description
                            </Typography>
                            <Typography variant="body1" className={styles.infoValue}>
                              {place.placeDescription}
                            </Typography>
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default ViewBuliderDetails;
import React, { useState } from 'react';
import Style from './product.module.css';
import { DriveFolderUploadOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  OutlinedInput, 
  InputAdornment, 
  IconButton,
  Grid,
  Paper,
  Typography
} from '@mui/material';

const Product = () => {
  const [file, setFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    country: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, file });
  };

  return (
    <div className={Style.new}>
      <div className={Style.container}>
        <Paper elevation={3} className={Style.paper}>
          <Typography variant="h5" className={Style.title}>
            Add New Product
          </Typography>
          
          <Grid container spacing={3} className={Style.content}>
            {/* Left Section - Image Upload */}
            <Grid item xs={12} md={4} className={Style.left}>
              <div className={Style.imageContainer}>
                <img 
                  src={file ? URL.createObjectURL(file) : "../src/img/placeholder.png"} 
                  alt="Product preview" 
                  className={Style.productImage}
                />
                <label htmlFor="file" className={Style.uploadLabel}>
                  <DriveFolderUploadOutlined className={Style.icon} />
                  <span>Upload Image</span>
                </label>
                <input 
                  type="file" 
                  id="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])} 
                  className={Style.fileInput}
                />
              </div>
            </Grid>

            {/* Right Section - Form */}
            <Grid item xs={12} md={8} className={Style.right}>
              <form onSubmit={handleSubmit} className={Style.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Product Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      className={Style.submitButton}
                    >
                      Submit Product
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default Product;
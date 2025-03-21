import React, { useEffect, useState } from 'react';
import Style from './Place.module.css';
import { 
  Button, 
  TextField, 
  Paper, 
  Typography, 
  Box, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { FileUploadOutlined, DeleteOutline } from '@mui/icons-material';
import axios from 'axios';
import { motion } from 'framer-motion';
import { DataGrid } from '@mui/x-data-grid';

const Place = () => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState('');
  const [place, setPlace] = useState('');
  const [district, setDistrict] = useState('');
  const [placeArray, setPlaceArray] = useState([]);
  const [districtArray, setDistrictArray] = useState([]);
  const [activeSection, setActiveSection] = useState('view');

  const fetchPlace = async () => {
    try {
      const response = await axios.get('http://localhost:5000/collectionPlace');
      setPlaceArray(response.data.place);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchDistrict = async () => {
    try {
      const response = await axios.get('http://localhost:5000/collectionDistrict');
      setDistrictArray(response.data.district);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/collectionPlace/${id}`);
      fetchPlace();
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  const handleSubmit = async () => {
    if (!district || !place.trim()) {
      setErrors('Please fill in all fields');
      setOpen(true);
      return;
    }

    try {
      const data = {
        districtId: district,
        placeName: place
      };
      await axios.post('http://localhost:5000/collectionPlace', data);
      setErrors('Place Added Successfully');
      setPlace('');
      setDistrict('');
      fetchPlace();
      setOpen(true);
    } catch (error) {
      console.error('Error adding place:', error);
      setErrors('Place already exists');
      setOpen(true);
    }
  };

  useEffect(() => {
    fetchPlace();
    fetchDistrict();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'placeName', headerName: 'Place Name', flex: 1 },
    { field: 'district', headerName: 'District', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => deleteData(params.row._id)}
        >
          <DeleteOutline />
        </IconButton>
      ),
    },
  ];

  const rowsWithId = placeArray.map((row, index) => ({
    ...row,
    district: row.districtId?.districtName || 'N/A',
    id: index + 1
  }));

  return (
    <div className={Style.body}>
      <div className={Style.container}>
        <Paper elevation={3} className={Style.paper}>
          <Box className={Style.header}>
            <Typography variant="h5" className={Style.title}>
              Place Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<FileUploadOutlined />}
              onClick={() => setActiveSection(activeSection === 'insert' ? 'view' : 'insert')}
              className={Style.toggleButton}
            >
              {activeSection === 'insert' ? 'View Places' : 'Add Place'}
            </Button>
          </Box>

          {activeSection === 'insert' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box className={Style.formContainer}>
                <FormControl fullWidth className={Style.select}>
                  <InputLabel>District</InputLabel>
                  <Select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    label="District"
                  >
                    <MenuItem value="">
                      <em>Select District</em>
                    </MenuItem>
                    {districtArray.map((district) => (
                      <MenuItem key={district._id} value={district._id}>
                        {district.districtName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Place Name"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  variant="outlined"
                  className={Style.textField}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={Style.submitButton}
                  disabled={!district || !place.trim()}
                >
                  Add Place
                </Button>
              </Box>
            </motion.div>
          )}

          {activeSection === 'view' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Box className={Style.tableContainer}>
                <DataGrid
                  rows={rowsWithId}
                  columns={columns}
                  initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
                  pageSizeOptions={[5, 10, 20]}
                  sx={{
                    border: 0,
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                  autoHeight
                />
              </Box>
            </motion.div>
          )}
        </Paper>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{ sx: { borderRadius: '8px' } }}
        >
          <DialogContent>
            <DialogContentText className={Style.dialogText}>
              {errors}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} className={Style.dialogButton}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Place;
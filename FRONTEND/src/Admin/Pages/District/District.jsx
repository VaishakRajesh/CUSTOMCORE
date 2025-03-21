import React, { useEffect, useState } from 'react';
import Style from './District.module.css';
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
  IconButton
} from '@mui/material';
import { FileUploadOutlined, DeleteOutline, Close } from '@mui/icons-material';
import axios from 'axios';
import { motion } from 'framer-motion';
import { DataGrid } from '@mui/x-data-grid';

const District = () => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState('');
  const [district, setDistrict] = useState('');
  const [districtArray, setDistrictArray] = useState([]);
  const [activeSection, setActiveSection] = useState('view');

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
      await axios.delete(`http://localhost:5000/collectionDistrict/${id}`);
      fetchDistrict();
    } catch (error) {
      console.error('Error deleting district:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = { districtName: district };
      await axios.post('http://localhost:5000/collectionDistrict', data);
      setErrors('District Added Successfully');
      setDistrict('');
      fetchDistrict();
      setOpen(true);
    } catch (error) {
      console.error('Error adding district:', error);
      setErrors('District already exists');
      setOpen(true);
    }
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'districtName', headerName: 'District Name', flex: 1 },
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

  const rowsWithId = districtArray.map((row, index) => ({ ...row, id: index + 1 }));

  return (
    <div className={Style.body}>
      <div className={Style.container}>
        <Paper elevation={3} className={Style.paper}>
          <Box className={Style.header}>
            <Typography variant="h5" className={Style.title}>
              District Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<FileUploadOutlined />}
              onClick={() => setActiveSection(activeSection === 'insert' ? 'view' : 'insert')}
              className={Style.toggleButton}
            >
              {activeSection === 'insert' ? 'View Districts' : 'Add District'}
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
                <TextField
                  fullWidth
                  label="District Name"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  variant="outlined"
                  className={Style.textField}
                  InputProps={{
                    sx: { fontSize: '1.1rem' },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: '1.1rem' },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={Style.submitButton}
                  disabled={!district.trim()}
                >
                  Add District
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

        {/* Success/Error Dialog */}
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

export default District;
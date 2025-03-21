import React from 'react';
import Style from './ViewBulider.module.css';
import { 
  Paper, 
  Typography, 
  Avatar, 
  Button, 
  Grid, 
  Divider,
  Box
} from '@mui/material';
import { MoreHoriz, Delete } from '@mui/icons-material';
import Img from './img/1.png';

const ViewBulider = () => {
  const users = [
    {
      id: 1,
      name: 'Vaishak',
      email: 'vaishak@gmail.com',
      avatar: Img
    },
    {
      id: 2,
      name: 'Vaishak',
      email: 'vaishak@gmail.com',
      avatar: Img
    }
  ];

  const handleMoreDetails = (userId) => {
    console.log(`More details for user ${userId}`);
  };

  const handleDelete = (userId) => {
    console.log(`Delete user ${userId}`);
  };

  return (
    <div className={Style.body}>
      <div className={Style.container}>
        <Paper elevation={3} className={Style.paper}>
          {/* Header */}
          <Box className={Style.header}>
            <Typography variant="h5" className={Style.title}>
              Builder List
            </Typography>
          </Box>

          {/* Table Header */}
          <Grid container className={Style.tableHeader}>
            <Grid item xs={4}>
              <Typography className={Style.headerText}>Name</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={Style.headerText}>Email</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={Style.headerText}>Actions</Typography>
            </Grid>
          </Grid>

          <Divider />

          {/* User List */}
          {users.map((user) => (
            <Grid container key={user.id} className={Style.userRow}>
              <Grid item xs={4} className={Style.userName}>
                <Avatar 
                  src={user.avatar} 
                  alt={user.name}
                  className={Style.avatar}
                />
                <Typography className={Style.nameText}>
                  {user.name}
                </Typography>
              </Grid>
              <Grid item xs={4} className={Style.email}>
                <Typography>{user.email}</Typography>
              </Grid>
              <Grid item xs={4} className={Style.actions}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<MoreHoriz />}
                  className={Style.actionButton}
                  onClick={() => handleMoreDetails(user.id)}
                >
                  Details
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  className={Style.actionButton}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          ))}
        </Paper>
      </div>
    </div>
  );
};

export default ViewBulider;
import React from 'react'
import Style from './BuliderComplaint.module.css'
import { Button, TextField } from '@mui/material'
const BuliderComplaint = () => {
  return (
    <div className={Style.body}>
      <div className={Style.Card}>
        <div className={Style.TextField}>
          <TextField
            id="filled-multiline-static"
            label="Complaint"
            multiline
            rows={4}
            variant="filled"
            sx={{
              width: '300px', // Set width
              height: '200px', // Set height
              '& .MuiInputBase-root': {
                color: 'black', // Text color
                height: '100%', // Ensures it uses the full height
              },
              '& .MuiInputLabel-root': {
                color: 'black', // Label color
              },
              '& .MuiFilledInput-root': {
                backgroundColor: 'transparent', // Background color
                height: '100%', // Adjust input container height
                '&:before': {
                  borderBottomColor: 'black', // Default border color
                },
                '&:hover:before': {
                  borderBottomColor: 'black', // Hover border color
                },
                '&:after': {
                  borderBottomColor: 'black', // Focused border color
                },
              },
            }}
          />
        </div>
        <div className={Style.button}>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'Black', bgcolor: 'black', borderRadius: '40px', fontSize: '20px' }}>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default BuliderComplaint
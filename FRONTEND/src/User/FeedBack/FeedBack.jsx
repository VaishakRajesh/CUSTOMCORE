import React, { useState } from 'react'
import Style from './FeedBack.module.css'
import { Button, TextField } from '@mui/material'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
const FeedBack = () => {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

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
  return (
    <div className={Style.body}>
      <div className={Style.Card}>
        <div className={Style.TextField}>
          <TextField
            id="filled-multiline-static"
            label="FeedBack"
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
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        </div>
        <div className={Style.button}>
          <Button variant="outlined" sx={{ color: 'white', bgcolor: 'black', borderRadius: '50px', width: '150px', height: '50px' }}>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default FeedBack
import React from 'react';
import Style from './EasyToBulid.module.css';
import { Button } from '@mui/material';
import { useState } from 'react';

const EasyToBulid = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };

    const [handleNextClick, sethandleNextClick] = useState('');


    return (
        <div className={Style.body}>
            <div className={Style.gridContainer}>
                <Button
                    variant="contained"
                    className={`${Style.customButton} ${selectedButton === 'Gaming' ? Style.selected : ''}`}
                    sx={{
                        backgroundColor: '#1a1a1a',
                        '&:hover': {
                            backgroundColor: '#333333',
                        }
                    }}
                    onClick={() => handleButtonClick('Gaming')}
                >
                    Gaming
                </Button>
                <Button
                    variant="contained"
                    className={`${Style.customButton} ${selectedButton === 'Normal Use' ? Style.selected : ''}`}
                    sx={{
                        backgroundColor: '#1a1a1a',
                        '&:hover': {
                            backgroundColor: '#333333',
                        }
                    }}
                    onClick={() => handleButtonClick('Normal Use')}
                >
                    Normal Use
                </Button>
                <Button
                    variant="contained"
                    className={`${Style.customButton} ${selectedButton === 'Office Use' ? Style.selected : ''}`}
                    sx={{
                        backgroundColor: '#1a1a1a',
                        '&:hover': {
                            backgroundColor: '#333333',
                        }
                    }}
                    onClick={() => handleButtonClick('Office Use')}
                >
                    Office Use
                </Button>
                <Button
                    variant="contained"
                    className={`${Style.customButton} ${selectedButton === 'Programming' ? Style.selected : ''}`}
                    sx={{
                        backgroundColor: '#1a1a1a',
                        '&:hover': {
                            backgroundColor: '#333333',
                        }
                    }}
                    onClick={() => handleButtonClick('Programming')}
                >
                    Programming
                </Button>
                <Button
                    variant="contained"
                    className={`${Style.customButton} ${selectedButton === 'Video Editing' ? Style.selected : ''}`}
                    sx={{
                        backgroundColor: '#1a1a1a',
                        '&:hover': {
                            backgroundColor: '#333333',
                        }
                    }}
                    onClick={() => handleButtonClick('Video Editing')}
                >
                    Video Editing
                </Button>
                <Button
                    variant="contained"
                    className={`${Style.customButton} ${selectedButton === 'School Work' ? Style.selected : ''}`}
                    sx={{
                        backgroundColor: '#1a1a1a',
                        '&:hover': {
                            backgroundColor: '#333333',
                        }
                    }}
                    onClick={() => handleButtonClick('School Work')}
                >
                    School Work
                </Button>
            </div>
            <div className={Style.nextButtonContainer}>
                <Button
                    variant="contained"
                    className={Style.nextButton} // Changed to a new class
                    sx={{
                        backgroundColor: '#1a1a1a',
                        '&:hover': {
                            backgroundColor: '#333333',
                        }
                    }}
                    onClick={() => sethandleNextClick('next')}
                >
                    Next
                </Button>
            </div>
            {/* { handleNextClick === 'next' ? (  ) : null} */}
      <div className={Style.gridContainer}>
        <Button 
          variant="contained" 
          className={`${Style.customButton} ${selectedButton === 'Gaming' ? Style.selected : ''}`}
          sx={{ 
            backgroundColor: '#1a1a1a',
            '&:hover': { 
              backgroundColor: '#333333',
            }
          }}
          onClick={() => handleButtonClick('Gaming')}
        >
          Gaming
        </Button>
        <Button 
          variant="contained" 
          className={`${Style.customButton} ${selectedButton === 'Normal Use' ? Style.selected : ''}`}
          sx={{ 
            backgroundColor: '#1a1a1a',
            '&:hover': { 
              backgroundColor: '#333333',
            }
          }}
          onClick={() => handleButtonClick('Normal Use')}
        >
          Normal Use
        </Button>
        <Button 
          variant="contained" 
          className={`${Style.customButton} ${selectedButton === 'Office Use' ? Style.selected : ''}`}
          sx={{ 
            backgroundColor: '#1a1a1a',
            '&:hover': { 
              backgroundColor: '#333333',
            }
          }}
          onClick={() => handleButtonClick('Office Use')}
        >
          Office Use
        </Button>
        <Button 
          variant="contained" 
          className={`${Style.customButton} ${selectedButton === 'Programming' ? Style.selected : ''}`}
          sx={{ 
            backgroundColor: '#1a1a1a',
            '&:hover': { 
              backgroundColor: '#333333',
            }
          }}
          onClick={() => handleButtonClick('Programming')}
        >
          Programming
        </Button>
        <Button 
          variant="contained" 
          className={`${Style.customButton} ${selectedButton === 'Video Editing' ? Style.selected : ''}`}
          sx={{ 
            backgroundColor: '#1a1a1a',
            '&:hover': { 
              backgroundColor: '#333333',
            }
          }}
          onClick={() => handleButtonClick('Video Editing')}
        >
          Video Editing
        </Button>
        <Button 
          variant="contained" 
          className={`${Style.customButton} ${selectedButton === 'School Work' ? Style.selected : ''}`}
          sx={{ 
            backgroundColor: '#1a1a1a',
            '&:hover': { 
              backgroundColor: '#333333',
            }
          }}
          onClick={() => handleButtonClick('School Work')}
        >
          School Work
        </Button>
      </div>
      <div className={Style.nextButtonContainer}>
        <Button
          variant="contained"
          className={Style.nextButton} // Changed to a new class
          sx={{ 
            backgroundColor: '#1a1a1a',
            '&:hover': { 
              backgroundColor: '#333333',
            }
          }}
          onClick={() => sethandleNextClick('next')}
        >
          Next
        </Button>
      </div>
        </div>
    );
};

export default EasyToBulid;
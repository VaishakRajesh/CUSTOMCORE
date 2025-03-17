import React from 'react';
import Style from './EasyToBulid.module.css';
import { Button } from '@mui/material';
import { useState } from 'react';

const EasyToBulid = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedButton2, setSelectedButton2] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };
  const handleButtonClick2 = (buttonName) => {
    setSelectedButton2(buttonName);
  };

  const [handleNextClick, sethandleNextClick] = useState('');
  const [handleNextClick2, sethandleNextClick2] = useState('');

  return (
    <div className={Style.body}>
      <h3>Select your purpose for using a PC</h3>
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
      {handleNextClick && (
        <div>
          <h3>Select your budget range</h3>
          <div className={Style.gridContainer}>
            <Button
              variant="contained"
              className={`${Style.customButton} ${selectedButton2 === '₹20,000 to ₹30,000' ? Style.selected : ''}`}
              sx={{
                backgroundColor: '#1a1a1a',
                '&:hover': {
                  backgroundColor: '#333333',
                }
              }}
              onClick={() => handleButtonClick2('₹20,000 to ₹30,000')}
            >
              ₹20,000 to ₹30,000
            </Button>
            <Button
              variant="contained"
              className={`${Style.customButton} ${selectedButton2 === '₹30,000 to ₹40,000' ? Style.selected : ''}`}
              sx={{
                backgroundColor: '#1a1a1a',
                '&:hover': {
                  backgroundColor: '#333333',
                }
              }}
              onClick={() => handleButtonClick2('₹30,000 to ₹40,000')}
            >
              ₹30,000 to ₹40,000
            </Button>
            <Button
              variant="contained"
              className={`${Style.customButton} ${selectedButton2 === '₹40,000 to ₹50,000' ? Style.selected : ''}`}
              sx={{
                backgroundColor: '#1a1a1a',
                '&:hover': {
                  backgroundColor: '#333333',
                }
              }}
              onClick={() => handleButtonClick2('₹40,000 to ₹50,000')}
            >
              ₹40,000 to ₹50,000
            </Button>
            <Button
              variant="contained"
              className={`${Style.customButton} ${selectedButton2 === '₹50,000 to ₹80,000' ? Style.selected : ''}`}
              sx={{
                backgroundColor: '#1a1a1a',
                '&:hover': {
                  backgroundColor: '#333333',
                }
              }}
              onClick={() => handleButtonClick2('₹50,000 to ₹80,000')}
            >
              ₹50,000 to ₹80,000
            </Button>
            <Button
              variant="contained"
              className={`${Style.customButton} ${selectedButton2 === '₹80,000 to ₹100,000' ? Style.selected : ''}`}
              sx={{
                backgroundColor: '#1a1a1a',
                '&:hover': {
                  backgroundColor: '#333333',
                }
              }}
              onClick={() => handleButtonClick2('₹80,000 to ₹100,000')}
            >
              ₹80,000 to ₹100,000
            </Button>
            <Button
              variant="contained"
              className={`${Style.customButton} ${selectedButton2 === 'Above ₹100,000' ? Style.selected : ''}`}
              sx={{
                backgroundColor: '#1a1a1a',
                '&:hover': {
                  backgroundColor: '#333333',
                }
              }}
              onClick={() => handleButtonClick2('Above ₹100,000')}
            >
              Above ₹100,000
            </Button>
          </div>
        </div>)}
      {handleNextClick && (
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
            onClick={() => sethandleNextClick2('next')}
          >
            Next
          </Button>
        </div>)}
      {handleNextClick2 && (
        <div className={Style.Option}>
          
        </div>
      )}
    </div>
  );
};

export default EasyToBulid;
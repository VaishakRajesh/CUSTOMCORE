import React from 'react'
import Style from './Navbar.module.css'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import { IconButton, OutlinedInput } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={Style.Container}>
      <div className={Style.Wrapper}>
        <div >
          {/* <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Search</InputLabel>
            <Input
             
              sx={{
                borderRadius:'20px',
                width:'250px',
                height:'30px',
                display:'flex',
                alignItems:'center'

              }}
              id="standard-adornment-password"
              type='text'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    sx={{width:'40px',height:'40px'}}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl> */}


        </div>
        <div className={Style.Items}>
          {/* <div className={Style.Item}>
            <LanguageIcon className={Style.Icon} />
            English
          </div>
          <div className={Style.Item}>
            <DarkModeIcon className={Style.Icon} />
          </div>
          <div className={Style.Item}>
            <FullscreenExitIcon className={Style.Icon} />
          </div>
          <div className={Style.Item}>
            <NotificationsNoneIcon className={Style.Icon} />
            <div className={Style.counter}>1</div>
          </div>
          <div className={Style.Item}>
            <ChatBubbleOutlineIcon className={Style.Icon} />
            <div className={Style.counter}>2</div>
          </div> */}
          <div className={Style.Item}>
            <FormatListBulletedIcon className={Style.Icon} />
          </div>
<Link to={'/Admin/Profile'}>         <div className={Style.Item}>
            <img src="../src/Img/1.png" alt="" className={Style.Avater} />
          </div></Link> 
        </div>
      </div>
    </div>
  )
}

export default Navbar
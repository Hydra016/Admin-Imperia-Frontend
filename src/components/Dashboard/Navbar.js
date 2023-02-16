import React from 'react'
import { Typography, Toolbar, AppBar, Avatar } from '@mui/material';
import { useStyles } from '../../hooks/useStyles';
import { useSelector } from 'react-redux';
import { deepOrange } from '@mui/material/colors';


export default function Navbar() {
  const { navbar } = useStyles()
  const { user } = useSelector(state => state.user)
  console.log(user)
  const drawerWidth = 250
  return (
    <AppBar 
    position='fixed'
    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar className={navbar}>
        <Typography>
          Welcome, {user && user.data.name} 
        </Typography>
        <Avatar sx={{ backgroundColor: '#FF7B00' }}>LM</Avatar>
      </Toolbar>
    </AppBar>
  )
}

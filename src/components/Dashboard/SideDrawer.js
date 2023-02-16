import React from 'react'
import { Drawer, Typography } from '@mui/material'
import { useStyles } from '../../hooks/useStyles'
import { MainListItems } from './listItems'

export default function SideDrawer() {
  const { drawer, adminHeading } = useStyles()  
  console.log(adminHeading)

  return (
    <Drawer 
    className={drawer}
    variant="permanent"
    anchor="left"
    classes={{ paper: drawer }}
    >
        <Typography variant='h3' sx={{
            marginLeft: 3,
            marginBottom: 8,
            fontWeight: 600
        }}>
            <span style={{color: '#FF7B00'}}>Ad</span>min
        </Typography>
        <div style={{ height: '100%' }}>
        <MainListItems />
        </div>
    </Drawer>
  )
}

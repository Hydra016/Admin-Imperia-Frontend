import React from 'react'
import { CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import Navbar from './Navbar';
import { useStyles, theme } from '../../hooks/useStyles';
import SideDrawer from './SideDrawer';


export default function Dashboard({ user }) {
  const { toolbar, root } = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Toolbar />
    <div className={root}>
    <SideDrawer />
    <section className={toolbar}>
      <Outlet />
    </section>
    </div>
    </ThemeProvider>
  )
}

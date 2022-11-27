import React from 'react'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import bgLogin from '../assets/img/bg-login.png'
import { Outlet } from 'react-router-dom'

const Home = () => {
   return (
      <Box>
         <Grid
            className="login-container"
            container
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center' }}
         >
            <Grid item xs={12} md={6} lg={6} className="left-bg">
               <img
                  alt="backgraound"
                  src={bgLogin}
                  style={{ width: '100%', height: '100vh' }}
               />
            </Grid>
            <Outlet />
         </Grid>
      </Box>
   )
}
export default Home

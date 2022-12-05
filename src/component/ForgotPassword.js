import React, { useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import toast from 'react-hot-toast'
import logo from '../assets/img/OEMservice.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {
   const navigate = useNavigate()
   const [registerEmail, setRegisterEmail] = useState('')

   const getResetLink = async () => {
      const regex =
         /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      if (registerEmail !== '' && regex.test(registerEmail) === true) {
         try {
            await axios
               .post(`${process.env.REACT_APP_API_URL}forgotPassword`, {
                  email: registerEmail,
               })
               .then((result) => {
                  if (result.data.status) {
                     toast.success('Email reset link sent to your mail')
                     setRegisterEmail('')
                  } else {
                     toast.error(result.data.data)
                  }
               })
         } catch (error) {
            if (process.env.REACT_APP_MODE) console.log(error)
         }
      } else {
         toast.error('Email is not valid')
      }
   }

   return (
      <Grid className="right-bg" item xs={12} md={6} lg={6}>
         <Box
            sx={{
               flexGrow: 1,
               justifyContent: 'center',
               alignItems: 'center',
               display: 'flex',
               flexDirection: 'column',
               gap: '20px',
            }}
            className="login-form"
         >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
               <img alt="logo" src={logo} style={{ width: '100%' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
               Enter your registered email...
            </Box>
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="filled"
                  type="email"
                  fullWidth
                  placeholder="Registered Email"
                  value={registerEmail}
                  onChange={(e) => {
                     setRegisterEmail(e.target.value)
                  }}
               />
            </Box>
            <Box>
               <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={getResetLink}
               >
                  GET RESET LINK
               </Button>
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
               }}
            >
               Can't Change Password?
               <a
                  onClick={() => {
                     navigate('/')
                  }}
                  style={{
                     cursor: 'pointer',
                     textDecoration: 'underline',
                     color: 'blue',
                  }}
               >
                  Sign In
               </a>
            </Box>
         </Box>
      </Grid>
   )
}

export default ForgotPassword

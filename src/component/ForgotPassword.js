import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import toast from 'react-hot-toast'
import logo1 from '../assets/img/blue-logo.png'
import logo2 from '../assets/img/white-logo.png'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import axios from 'axios'

const ForgotPassword = () => {
   const navigate = useNavigate()
   const [registerEmail, setRegisterEmail] = useState('')
   const [mobileView, setMobileView] = useState(false)
   const getResetLink = async () => {
      if (registerEmail && validator.isEmail(registerEmail)) {
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

   const getWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

   useEffect(() => {
      const setResponsiveness = () => {
         getWidth() < 900 ? setMobileView(true) : setMobileView(false)
      }
      window.addEventListener('resize', setResponsiveness)
      return () => {
         window.removeEventListener('resize', setResponsiveness)
      }
   }, [])

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
               <img
                  alt="logo"
                  src={mobileView ? logo2 : logo1}
                  style={{ width: '100%' }}
               />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
               Enter your registered email...
            </Box>
            <Box>
               <TextField
                  hiddenLabel
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
               <span
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
               </span>
            </Box>
         </Box>
      </Grid>
   )
}

export default ForgotPassword

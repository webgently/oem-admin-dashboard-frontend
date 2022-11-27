import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import logo from '../assets/img/logo.png'
import axios from 'axios'

const ResetPassword = () => {
   const navigate = useNavigate()
   const [password, setPassword] = useState('')
   const [cpassword, setCPassword] = useState('')

   const checkLink = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}checkResetLink`, {
               link: window.location.href,
            })
            .then((result) => {
               if (!result.data.status) {
                  toast.error(result.data.data)
                  setTimeout(() => {
                     navigate('/forgot-password')
                  }, 2000)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const Reset = async () => {
      if (password === '') {
         toast.error('Please input password!')
      } else if (cpassword === '') {
         toast.error('Please input confirm password!')
      } else if (password !== cpassword) {
         toast.error('Password not match with Confirm Password')
      }
      const linkElement = window.location.href.split('/')
      const email = linkElement[4]
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}resetPassword`, {
               link: window.location.href,
               email,
               password,
            })
            .then((result) => {
               if (result.data.status) {
                  toast.success(result.data.data)
                  setTimeout(() => {
                     navigate('/')
                  }, 2000)
               } else {
                  toast.error(result.data.data)
                  setTimeout(() => {
                     navigate('/forgot-password')
                  }, 2000)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   useEffect(() => {
      checkLink()
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
                  src={logo}
                  style={{ width: '200px', height: '90px' }}
               />
            </Box>
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="filled"
                  fullWidth
                  type="password"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => {
                     setPassword(e.target.value)
                  }}
               />
            </Box>
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="filled"
                  fullWidth
                  placeholder="Confirm Password*"
                  value={cpassword}
                  type="password"
                  onChange={(e) => {
                     setCPassword(e.target.value)
                  }}
               />
            </Box>
            <Box>
               <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={Reset}
               >
                  Reset Password
               </Button>
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '6vh',
               }}
            >
               Can't Reset Password?
               <a
                  onClick={() => {
                     navigate('/')
                  }}
                  style={{
                     textAlign: 'right',
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
export default ResetPassword

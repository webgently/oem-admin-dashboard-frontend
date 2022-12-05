import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import logo from '../assets/img/OEMservice.png'
import axios from 'axios'
import { setAccountData } from '../features/account/account'

const Login = () => {
   const account = useSelector((state) => state.account)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [mail, setMail] = useState('')
   const [pass, setPass] = useState('')
   const SignIn = async () => {
      const regex =
         /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      if (mail !== '' && regex.test(mail) === true) {
         if (pass !== '') {
            let data = {
               mail,
               pass,
            }
            console.log(process.env.REACT_APP_API_URL)
            try {
               await axios
                  .post(`${process.env.REACT_APP_API_URL}signin`, { data })
                  .then((result) => {
                     const data = result.data
                     delete data.__v
                     if (data === 'not exist') {
                        toast.error('This email is not exist!')
                     } else if (data === 'password') {
                        toast.error('Password Incorrect!')
                     } else {
                        if (data.permission === 'user') navigate('dashboard')
                        else if (data.permission === 'admin')
                           navigate('admin_dashboard')
                        toast.success('Login Successed')
                        dispatch(setAccountData(data))
                     }
                  })
            } catch (error) {
               if (process.env.REACT_APP_MODE) console.log(error)
            }
         } else {
            toast.error('Please input password!')
         }
      } else {
         toast.error('Email is not valid')
      }
   }

   useEffect(() => {
      try {
         if (account) {
            switch (account.permission) {
               case 'admin':
                  navigate('admin_dashboard')
                  break
               case 'user':
                  navigate('dashboard')
                  break
               default:
                  break
            }
            dispatch(setAccountData(account))
         } else {
            if (process.env.REACT_APP_MODE)
               console.log('storage is emtry or broken')
         }
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }, [account])

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
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="filled"
                  type="email"
                  fullWidth
                  placeholder="Input the Email Address"
                  value={mail}
                  onChange={(e) => {
                     setMail(e.target.value)
                  }}
               />
            </Box>
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="filled"
                  type="password"
                  placeholder="Input the password"
                  fullWidth
                  value={pass}
                  onChange={(e) => {
                     setPass(e.target.value)
                  }}
               />
            </Box>
            <Box>
               <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={SignIn}
               >
                  Sign In
               </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
               <a
                  onClick={() => {
                     navigate('forgot-password')
                  }}
                  style={{
                     cursor: 'pointer',
                     textDecoration: 'underline',
                     color: 'blue',
                  }}
               >
                  Forgot password?
               </a>
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  paddingTop: '6vh',
               }}
            >
               Don't have an account yet?
               <a
                  onClick={() => {
                     navigate('/register')
                  }}
                  style={{
                     textAlign: 'right',
                     cursor: 'pointer',
                     textDecoration: 'underline',
                     color: 'blue',
                  }}
               >
                  Sign Up
               </a>
            </Box>
         </Box>
      </Grid>
   )
}
export default Login

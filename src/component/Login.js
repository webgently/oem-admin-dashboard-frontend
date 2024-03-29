import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button, Grid, TextField } from '@mui/material'
import validator from 'validator'
import { Box } from '@mui/system'
import logo1 from '../assets/img/blue-logo.png'
import logo2 from '../assets/img/white-logo.png'
import axios from 'axios'
import { setAccountData } from '../features/account/account'

const Login = () => {
   // const account = useSelector((state) => state.account)
   const [account, setAccount] = useState(null)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [mobileView, setMobileView] = useState(false)
   const [mail, setMail] = useState('')
   const [pass, setPass] = useState('')

   const SignIn = async () => {
      if (mail && validator.isEmail(mail)) {
         if (pass !== '') {
            let data = {
               mail,
               pass,
            }
            try {
               await axios
                  .post(`${process.env.REACT_APP_API_URL}signin`, { data })
                  .then((result) => {
                     console.log(result)
                     if (result.data.login) {
                        const Data = result.data.data
                        console.log(Data)

                        delete Data.__v
                        // dispatch(setAccountData(Data))
                        localStorage.setItem('user', JSON.stringify(Data));
                        toast.success('Login Successed')
                        if (Data.permission === 'user') {
                           window.location.replace(`${window.origin}/dashboard`)
                        }
                        if (Data.permission === 'admin') {
                           window.location.replace(
                              `${window.origin}/admin_dashboard`
                           )
                        }
                        // navigate('admin_dashboard')
                     } else {
                        toast.error(result.data.data)
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

   useEffect(() => {
      let user = localStorage.getItem('user')
      if (user) {
         let parse = JSON.parse(user)
         setAccount(parse)
      }
   }, [])

   // useEffect(() => {
   //    if (account) {
   //       switch (account?.permission) {
   //          case 'admin':
   //             navigate('admin_dashboard')
   //             break
   //          case 'user':
   //             navigate('dashboard')
   //             break
   //          default:
   //             break
   //       }
   //       dispatch(setAccountData(account))
   //    }
   // }, [account, dispatch, navigate])

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
            <Box>
               <TextField
                  variant="filled"
                  type="email"
                  fullWidth
                  label="Email*"
                  value={mail}
                  onChange={(e) => {
                     setMail(e.target.value)
                  }}
               />
            </Box>
            <Box>
               <TextField
                  variant="filled"
                  type="password"
                  label="Password*"
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
               <p
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
               </p>
            </Box>
            <Box
               sx={{
                  display: 'flex',
               }}
            >
               Don't have an account yet?&nbsp;&nbsp;
               <span
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
               </span>
            </Box>
         </Box>
      </Grid>
   )
}
export default Login

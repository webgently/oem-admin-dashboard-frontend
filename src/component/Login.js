import React, { useEffect, useState } from 'react'
import { Button, Checkbox, FormControl, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import toast, { Toaster } from 'react-hot-toast'
import bgLogin from '../assets/img/bg-login.png'
import logo from '../assets/img/logo.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAccountData } from '../features/account/account'

const isTest = process.env.REACT_APP_MODE

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const Login = () => {
   const account = useSelector((state) => state.account)
   const [mail, setMail] = useState('')
   const [pass, setPass] = useState('')
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [phone, setPhone] = useState('')
   const [address, setAddress] = useState('')
   const [city, setCity] = useState('')
   const [country, setCountry] = useState('')
   const [zcode, setZcode] = useState('')
   const [password, setPassword] = useState('')
   const [cpassword, setCPassword] = useState('')
   const [checkflag, setCheck] = useState(false)
   const [pageFlag, setPageFlag] = useState('signin')
   const [subcontinent, setSubcontinent] = useState('')
   const [vatNumber, setVatNumber] = useState('')

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleChangeSubcontinent = () => {
      if (subcontinent === 'europe') {
         setSubcontinent('other')
      } else {
         setSubcontinent('europe')
      }
   }

   const SignIn = async () => {
      const regex =
         /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      if (mail !== '' && regex.test(mail) === true) {
         if (pass !== '') {
            let data = {
               mail,
               pass,
            }
            await axios
               .post(`${process.env.REACT_APP_API_Url}signin`, { data })
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
         } else {
            toast.error('Please input password!')
         }
      } else {
         toast.error('Email is not valid')
      }
   }

   const SignUp = async () => {
      const regex =
         /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      if (name === '') {
         toast.error('Please input name!')
      } else if (email === '' || regex.test(email) === false) {
         toast.error('Email is not valid')
      } else if (phone === '') {
         toast.error('Please input phone number!')
      } else if (address === '') {
         toast.error('Please input address!')
      } else if (city === '') {
         toast.error('Please input city!')
      } else if (country === '') {
         toast.error('Please input country!')
      } else if (zcode === '') {
         toast.error('Please input zip code!')
      } else if (subcontinent === '') {
         toast.error('Please select Area')
      } else if (
         subcontinent === 'europe' &&
         vatNumber === '' &&
         checkflag === false
      ) {
         toast.error('Please input the VAT Number')
      } else if (password === '') {
         toast.error('Please input password!')
      } else if (cpassword === '') {
         toast.error('Please input confirm password!')
      } else if (password !== cpassword) {
         toast.error('Password not match with Confirm Password')
      } else {
         let data = {
            name,
            email,
            phone,
            address,
            city,
            country,
            zcode,
            subcontinent,
            vatNumber,
            checkflag,
            password,
         }
         await axios
            .post(`${process.env.REACT_APP_API_Url}signup`, { data })
            .then((result) => {
               if (result.data.status === false) {
                  toast.error('Internal Server Error!')
               } else if (
                  result.data.status === true &&
                  result.data.data === 'already exist'
               ) {
                  toast.error('Already Exist!')
               } else {
                  setMail('')
                  setPass('')
                  setName('')
                  setEmail('')
                  setPhone('')
                  setAddress('')
                  setCity('')
                  setCountry('')
                  setZcode('')
                  setPassword('')
                  setCPassword('')
                  setCheck(false)
                  setPageFlag('')
                  setSubcontinent('')
                  setVatNumber('')
                  toast.success('Success Signup!')
                  setPageFlag('signin')
               }
            })
      }
   }

   useEffect(() => {
      try {
         const account = JSON.parse(localStorage.getItem('user'))
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
            if (isTest) console.log('storage is emtry or broken')
         }
      } catch (error) {
         console.log(error)
      }
   }, [])

   return (
      <Box sx={{ flexGrow: 1 }}>
         <Toaster />
         <Grid
            container
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center' }}
         >
            <Grid item xs={0} md={6}>
               <img
                  alt="backgraound"
                  src={bgLogin}
                  style={{ width: '100%', height: '100vh' }}
               />
            </Grid>

            <Grid
               item
               xs={12}
               md={6}
               sx={{ height: '100%', overflowY: 'overlay' }}
            >
               {pageFlag === 'signin' ? (
                  <Box
                     sx={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                     }}
                  >
                     <Box sx={{ flexGrow: 1 }}>
                        <img
                           alt="logo"
                           src={logo}
                           style={{ width: '200px', height: '90px' }}
                        />
                     </Box>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
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
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
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
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <Button
                           variant="contained"
                           size="small"
                           fullWidth
                           onClick={SignIn}
                        >
                           Sign In
                        </Button>
                     </Box>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}></Box>
                     <Box
                        sx={{
                           flexGrow: 1,
                           width: '25vw',
                           display: 'flex',
                        }}
                     >
                        Don't have an account yet?
                        <a
                           onClick={() => {
                              setPageFlag('signUp')
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
               ) : (
                  <Box
                     sx={{
                        flexGrow: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        height: '100vh',
                        overflowY: 'overlay',
                     }}
                  >
                     <Box
                        sx={{
                           flexGrow: 1,
                           width: '25vw',
                           display: 'flex',
                           justifyContent: 'center',
                        }}
                     >
                        <img
                           alt="logo"
                           src={logo}
                           style={{ width: '200px', height: '90px' }}
                        />
                     </Box>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
                           variant="filled"
                           type="string"
                           fullWidth
                           placeholder="Name*"
                           value={name}
                           onChange={(e) => {
                              setName(e.target.value)
                           }}
                        />
                     </Box>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
                           variant="filled"
                           type="email"
                           fullWidth
                           placeholder="Email*"
                           value={email}
                           onChange={(e) => {
                              setEmail(e.target.value)
                           }}
                        />
                     </Box>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
                           variant="filled"
                           placeholder="Mobile Number*"
                           fullWidth
                           value={phone}
                           onChange={(e) => {
                              setPhone(e.target.value)
                           }}
                        />
                     </Box>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
                           variant="filled"
                           fullWidth
                           placeholder="Address*"
                           value={address}
                           onChange={(e) => {
                              setAddress(e.target.value)
                           }}
                        />
                     </Box>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
                           variant="filled"
                           fullWidth
                           placeholder="City*"
                           value={city}
                           onChange={(e) => {
                              setCity(e.target.value)
                           }}
                        />
                     </Box>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
                           variant="filled"
                           fullWidth
                           placeholder="Country*"
                           value={country}
                           onChange={(e) => {
                              setCountry(e.target.value)
                           }}
                        />
                     </Box>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
                           variant="filled"
                           fullWidth
                           placeholder="Zip Code*"
                           value={zcode}
                           onChange={(e) => {
                              setZcode(e.target.value)
                           }}
                        />
                     </Box>
                     <FormControl
                        variant="filled"
                        sx={{ m: 1, minWidth: 120, width: '25vw' }}
                     >
                        <InputLabel id="demo-simple-select-filled-label">
                           Sub Continent
                        </InputLabel>
                        <Select
                           labelId="demo-simple-select-filled-label"
                           id="demo-simple-select-filled"
                           value={subcontinent}
                           onChange={handleChangeSubcontinent}
                        >
                           <MenuItem value={'europe'}>Europe</MenuItem>
                           <MenuItem value={'other'}>Other</MenuItem>
                        </Select>
                     </FormControl>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
                           variant="filled"
                           fullWidth
                           type="string"
                           placeholder="VAT Number*"
                           value={vatNumber}
                           onChange={(e) => {
                              setVatNumber(e.target.value)
                           }}
                           disabled={subcontinent === 'europe' ? false : true}
                        />
                     </Box>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <Checkbox
                           {...label}
                           value={checkflag}
                           onChange={() => {
                              setCheck(!checkflag)
                           }}
                           disabled={subcontinent === 'europe' ? false : true}
                        />{' '}
                        No VAT?
                     </Box>
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
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
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <TextField
                           hiddenLabel
                           id="filled-hidden-label-normal"
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
                     <Box sx={{ flexGrow: 1, width: '25vw' }}>
                        <Button
                           variant="contained"
                           size="small"
                           fullWidth
                           onClick={SignUp}
                        >
                           SignUp
                        </Button>
                     </Box>
                     <Box
                        sx={{
                           flexGrow: 1,
                           width: '25vw',
                           display: 'flex',
                           marginBottom: '50px',
                        }}
                     >
                        Already have an account?
                        <a
                           onClick={() => {
                              setPageFlag('signin')
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
               )}
            </Grid>
         </Grid>
      </Box>
   )
}
export default Login

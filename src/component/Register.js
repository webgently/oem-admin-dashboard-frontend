import React, { useState } from 'react'
import { Button, Checkbox, FormControl, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import toast from 'react-hot-toast'
import logo from '../assets/img/logo.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const Regiter = () => {
   const navigate = useNavigate()
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
   const [subcontinent, setSubcontinent] = useState('')
   const [vatNumber, setVatNumber] = useState('')

   const handleChangeSubcontinent = () => {
      if (subcontinent === 'europe') {
         setSubcontinent('other')
      } else {
         setSubcontinent('europe')
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
         try {
            await axios
               .post(`${process.env.REACT_APP_API_URL}signup`, { data })
               .then((result) => {
                  if (result.data.status === false) {
                     toast.error('Internal Server Error!')
                  } else if (
                     result.data.status === true &&
                     result.data.data === 'already exist'
                  ) {
                     toast.error('Already Exist!')
                  } else {
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
                     setSubcontinent('')
                     setVatNumber('')
                     toast.success('Success Signup!')
                  }
               })
         } catch (error) {
            if (process.env.REACT_APP_MODE) console.log(error)
         }
      }
   }

   return (
      <Grid className="right-bg" item xs={12} md={6} lg={6}>
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
            className="register-form"
         >
            <Box
               sx={{
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
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
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
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
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
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="filled"
                  placeholder="Mobile Number*"
                  fullWidth
                  value={phone}
                  onChange={(e) => {
                     setPhone(e.target.value)
                  }}
               />
            </Box>
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="filled"
                  fullWidth
                  placeholder="Address*"
                  value={address}
                  onChange={(e) => {
                     setAddress(e.target.value)
                  }}
               />
            </Box>
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="filled"
                  fullWidth
                  placeholder="City*"
                  value={city}
                  onChange={(e) => {
                     setCity(e.target.value)
                  }}
               />
            </Box>
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="filled"
                  fullWidth
                  placeholder="Country*"
                  value={country}
                  onChange={(e) => {
                     setCountry(e.target.value)
                  }}
               />
            </Box>
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
                  variant="filled"
                  fullWidth
                  placeholder="Zip Code*"
                  value={zcode}
                  onChange={(e) => {
                     setZcode(e.target.value)
                  }}
               />
            </Box>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
            <Box>
               <TextField
                  hiddenLabel
                  id="outlined-basic"
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
            <Box>
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
export default Regiter

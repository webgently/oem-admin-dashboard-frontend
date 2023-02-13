import React, { useEffect, useRef, useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import {
   Avatar,
   Button,
   Divider,
   IconButton,
   Modal,
   TextField,
} from '@mui/material'
import bgCar from '../../assets/img/bgCar.jpg'
import EditIcon from '@mui/icons-material/Edit'
import PersonIcon from '@mui/icons-material/Person'
import toast from 'react-hot-toast'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import PhoneInput from 'react-phone-input-2'
import Autocomplete from '@mui/material/Autocomplete'
import { setAccountData } from '../../features/account/account'
import Key from '../../assets/img/changepassword.png'

const Item1 = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: '0px',
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   textAlign: 'center',
   borderLeft: '5px solid #1976d2',
   color: theme.palette.text.secondary,
}))

const ServiceStyle1 = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '500px',
   height: '740px',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

const ServiceStyle2 = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '380px',
   height: '330px',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

export default function Profile() {
   const account = useSelector((state) => state.account)
   const dispatch = useDispatch()
   const [userData, setUserData] = useState([])
   const [userName, setUserName] = useState('')
   const [userID, setUserID] = useState('')
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [phone, setPhone] = useState('')
   const [vatNumber, setVatNumber] = useState('')
   const [region, setRegion] = useState('')
   const [country, setCountry] = useState('')
   const [city, setCity] = useState('')
   const [address, setAddress] = useState('')
   const [open1, setOpen1] = useState(false)
   const [bgProfile, setBgProfile] = useState('')
   const getBg = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getBg`)
            .then((result) => {
               if (result.data.status) {
                  if (result.data.data === 'logo/') setBgProfile('')
                  else
                     setBgProfile(
                        process.env.REACT_APP_BASE_URL + result.data.data
                     )
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }
   const changeCountry = (data) => {
      if (data) {
         setCountry(data.label)
         setPhone(data.phone)
      } else {
         setPhone('')
      }
   }
   // Avatar setting
   const [avatar, setAvatar] = useState('')
   const [open2, setOpen2] = useState(false)
   const [avatarFile, setAvatarFile] = useState({})
   const [isLoading1, setIsLoading1] = useState(false)
   const [avatarPreview, setAvatarPreview] = useState('')
   const avatarInputElement = useRef('fileInput')
   const changeAvatar = async () => {
      setOpen2(true)
      setAvatarPreview(avatar)
   }
   const handleClose2 = async () => {
      setOpen2(false)
   }


   const avatarHandleFileload = () => {
      avatarInputElement.current.click()
   }
   const avatarGetFile = async (e) => {
      const file = e.target.files[0]
      if (
         file?.type === 'image/jpeg' ||
         file?.type === 'image/png' ||
         file?.type === 'image/svg' ||
         file?.type === 'image/gif' ||
         file?.type === 'image/tiff'
      ) {
         setAvatarFile(e.target.files[0])
         setAvatarPreview(URL.createObjectURL(e.target.files[0]))
      } else {
         setAvatarFile({})
         setAvatarPreview('')
      }
   }
   const avatarHandleFileUpload = async () => {
      let params = new FormData()
      params.append('file', avatarFile)
      params.append('userId', JSON.stringify(account._id))
      if (avatar !== avatarPreview) {
         if (!isLoading1) {
            setIsLoading1(true)
            if (!avatarFile.name) {
               toast.error('Please select an image')
            } else {
               if (
                  avatarFile.type === 'image/jpeg' ||
                  avatarFile.type === 'image/png' ||
                  avatarFile.type === 'image/svg' ||
                  avatarFile.type === 'image/gif' ||
                  avatarFile.type === 'image/tiff'
               ) {
                  try {
                     await axios
                        .post(
                           `${process.env.REACT_APP_API_URL}uploadAvatar`,
                           params
                        )
                        .then((result) => {
                           if (result.data.status) {
                              setAvatarFile({})
                              setAvatar(
                                 process.env.REACT_APP_BASE_URL +
                                    result.data.data
                              )
                              toast.success('Image Uploaded Successfully')
                              setOpen2(false)
                              setIsLoading1(false)
                           } else {
                              toast.error(result.data.data)
                           }
                        })
                  } catch (error) {
                     if (process.env.REACT_APP_MODE) console.log(error)
                  }
               } else {
                  toast.error('This isn`t an image')
               }
            }
         } else {
            toast.error('Loading...')
         }
      } else {
         toast.error('Already selected the image')
      }
   }
   const getAvatar = async (userId) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getAvatar`, { userId })
            .then((result) => {
               if (result.data.status) {
                  if (result.data.data === 'logo/') setAvatar('')
                  else
                     setAvatar(
                        process.env.REACT_APP_BASE_URL + result.data.data
                     )
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }
   const handleOpen1 = () => {
      setName(account.name)
      setEmail(account.email)
      setPhone(account.phone)
      setVatNumber(account.vatNumber)
      setRegion(account.subcontinent)
      setCountry(account.country)
      setCity(account.city)
      setAddress(account.address)
      setOpen1(true)
   }
   const handleClose1 = () => setOpen1(false)
   const saveProfile = async () => {
      if (!name) {
         toast.error('Input the name')
         return
      }
      if (!email) {
         toast.error('Input the email')
         return
      }
      if (!address) {
         toast.error('Input the address')
         return
      }
      if (!city) {
         toast.error('Input the city')
         return
      }
      if (!country) {
         toast.error('Input the country')
         return
      }
      if (!phone) {
         toast.error('Input the phone number')
         return
      }
      if (!region) {
         toast.error('Input the region')
         return
      }
      if (!vatNumber) {
         toast.error('Input the VAT Number')
         return
      }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updateProfile`, {
               _id: userID,
               name,
               email,
               phone,
               vatNumber,
               region,
               country,
               city,
               address,
            })
            .then((result) => {
               if (result.data.status) {
                  const data = result.data.result
                  delete data._v
                  setName(data.name)
                  setUserData([
                     { label: 'Email:', value: data.email },
                     {
                        label: 'Account Status:',
                        value: data.status,
                     },
                     { label: 'Address:', value: data.address },
                     { label: 'City:', value: data.city },
                     { label: 'Country:', value: data.country },
                     { label: 'Phone:', value: data.phone },
                     { label: 'Region:', value: data.subcontinent },
                     { label: 'VAT Number:', value: data.vatNumber },
                  ])
                  localStorage.setItem('user', JSON.stringify(data))
                  const account = JSON.parse(localStorage.getItem('user'))
                  dispatch(setAccountData(account))
                  setOpen1(false)
                  toast.success('Details Updated Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }
   // change password
   const [oldPassword, setOldPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const changePassword = async () => {
      if (!oldPassword) {
         toast.error('Input Old Password')
         return
      }
      if (!newPassword) {
         toast.error('Input New Password')
         return
      }
      if (!confirmPassword) {
         toast.error('Input Confirm Password')
         return
      }

      if (confirmPassword !== newPassword) {
         toast.error('Please check Confirm password again')
         return
      }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}changePassword`, {
               _id: userID,
               oldPassword,
               newPassword,
            })
            .then((result) => {
               if (result.data.status) {
                  const data = result.data.result
                  delete data._v
                  localStorage.setItem('user', JSON.stringify(data))
                  setNewPassword('')
                  setOldPassword('')
                  setConfirmPassword('')
                  toast.success('Password Updated Successfully')
               } else {
                  toast.error('Old passoword is wrong')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   useEffect(() => {
      if (account._id) {
         setUserName(account.name)
         setUserID(account._id)
         getAvatar(account._id)
         getBg()
      }
      setUserData([
         { label: 'Email:', value: account.email },
         {
            label: 'Account Status:',
            value: account.status,
         },
         { label: 'Address:', value: account.address },
         { label: 'City:', value: account.city },
         { label: 'Country:', value: account.country },
         { label: 'Phone:', value: account.phone },
         { label: 'Region:', value: account.subcontinent },
         { label: 'VAT Number:', value: account.vatNumber },
      ])
   }, [account])

   return (
      <>
         <Box
            sx={{
               flexGrow: 1,
               p: 3,
               bgcolor: 'rgb(229, 229, 229)',
               overflowY: 'overlay',
            }}
         >
            <Box sx={{ mt: '80px' }}>
               <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
               >
                  <Grid item xs={12} sm={12} md={12}>
                     <Item1>
                        <Box
                           sx={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              background: `${
                                 bgProfile === ''
                                    ? `url(${bgCar})`
                                    : `url(${bgProfile})`
                              }`,
                              height: '400px',
                              width: '100%',
                              position: 'relative',
                              backgroundSize: '100% 100%',
                           }}
                        >
                           <Box
                              sx={{
                                 position: 'absolute',
                                 bottom: '-30px',
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: '10px',
                                 pl: '20px',
                              }}
                           >
                              <Avatar
                                 sx={{
                                    width: '120px',
                                    height: '120px',
                                 }}
                                 className="user-avata"
                                 onClick={changeAvatar}
                              >
                                 <IconButton className="edit-btn">
                                    <EditIcon />
                                 </IconButton>
                                 {avatar === '' ? (
                                    <PersonIcon style={{ fontSize: '80px' }} />
                                 ) : (
                                    <img
                                       src={avatar}
                                       alt="Avatar"
                                       width="120px"
                                    />
                                 )}
                              </Avatar>
                              <Box
                                 sx={{
                                    color: 'white',
                                    fontSize: '30px',
                                 }}
                              >
                                 {userName}
                              </Box>
                           </Box>
                        </Box>
                        <Box
                           sx={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              mt: '30px',
                              p: '20px',
                           }}
                        >
                           <Grid
                              container
                              spacing={{
                                 xs: 2,
                                 md: 3,
                              }}
                              columns={{
                                 xs: 4,
                                 sm: 8,
                                 md: 12,
                              }}
                           >
                              <Grid item xs={12} sm={12} md={12}>
                                 <Box
                                    sx={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       px: '0px 25px',
                                    }}
                                 >
                                    <Box
                                       sx={{
                                          fontSize: '25px',
                                          fontWeight: 'bold',
                                       }}
                                    >
                                       Other Details
                                    </Box>
                                    <Box
                                       sx={{
                                          flex: '1',
                                       }}
                                    ></Box>
                                    <Box>
                                       <IconButton onClick={handleOpen1}>
                                          <EditIcon />
                                       </IconButton>
                                    </Box>
                                 </Box>
                                 <Divider />
                              </Grid>
                              {userData.map((item, ind) => {
                                 return (
                                    <Grid
                                       item
                                       xs={12}
                                       sm={12}
                                       md={12}
                                       key={item.label}
                                    >
                                       <Grid
                                          container
                                          spacing={{
                                             xs: 2,
                                             md: 3,
                                          }}
                                          columns={{
                                             xs: 4,
                                             sm: 8,
                                             md: 12,
                                          }}
                                       >
                                          <Grid
                                             item
                                             xs={12}
                                             sm={6}
                                             md={6}
                                             sx={{
                                                textAlign: 'left',
                                                pl: '50px !important',
                                             }}
                                          >
                                             {item.label}
                                          </Grid>
                                          <Grid
                                             item
                                             xs={12}
                                             sm={6}
                                             md={6}
                                             sx={{
                                                textAlign: 'left',
                                                pl: '50px !important',
                                             }}
                                          >
                                             {item.value}
                                          </Grid>
                                       </Grid>
                                       <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          pt={2.5}
                                       >
                                          <Divider />
                                       </Grid>
                                    </Grid>
                                 )
                              })}
                           </Grid>
                        </Box>
                     </Item1>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                     <Box sx={{ pt: '20px', fontSize: '25px' }}>
                        Change Password
                     </Box>
                     <Box
                        sx={{
                           p: 4,
                           my: 3,
                           borderRadius: '12px',
                           bgcolor: 'white',
                        }}
                     >
                        <Grid
                           container
                           spacing={{ xs: 2, md: 3 }}
                           columns={{
                              xs: 4,
                              sm: 8,
                              md: 12,
                           }}
                        >
                           <Grid
                              item
                              xs={12}
                              sm={12}
                              md={6}
                              sx={{
                                 display: 'flex',
                                 gap: '20px',
                                 justifyContent: 'center',
                              }}
                           >
                              <img src={Key} alt="key" />
                           </Grid>

                           <Grid
                              item
                              xs={12}
                              sm={12}
                              md={6}
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 gap: '20px',
                              }}
                           >
                              <TextField
                                 type="password"
                                 placeholder="Old password"
                                 value={oldPassword}
                                 onChange={(e) =>
                                    setOldPassword(e.target.value)
                                 }
                              />
                              <TextField
                                 type="password"
                                 placeholder="New password"
                                 value={newPassword}
                                 onChange={(e) =>
                                    setNewPassword(e.target.value)
                                 }
                              />
                              <TextField
                                 type="password"
                                 placeholder="Confirm password"
                                 value={confirmPassword}
                                 onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                 }
                              />
                              <Button
                                 variant="contained"
                                 onClick={() => {
                                    changePassword()
                                 }}
                              >
                                 Change Password
                              </Button>
                           </Grid>
                        </Grid>
                     </Box>
                  </Grid>
               </Grid>
            </Box>
         </Box>
         <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={ServiceStyle1}>
               <Box
                  sx={{
                     px: 3,
                     py: 1,
                     bgcolor: '#1976d2',
                     borderRadius: 1,
                     color: 'white',
                     display: 'flex',
                     alignItems: 'center',
                  }}
               >
                  <Box>Update Other Details</Box>
                  <Box sx={{ flex: '1' }}></Box>
                  <Box>
                     <IconButton
                        onClick={() => {
                           handleClose1()
                        }}
                     >
                        <CloseIcon sx={{ color: 'white' }} />
                     </IconButton>
                  </Box>
               </Box>
               <Box sx={{ p: 3 }}>
                  <Box sx={{ mt: '30px' }}>
                     <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ mt: '30px' }}>
                     <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ mt: '30px' }}>
                     <TextField
                        label="Address"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ mt: '30px' }}>
                     <TextField
                        label="City"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ mt: '30px' }}>
                     <Autocomplete
                        fullWidth
                        onChange={(event, newValue) => {
                           changeCountry(newValue)
                        }}
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                           <Box
                              component="li"
                              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                              {...props}
                           >
                              <img
                                 loading="lazy"
                                 width="20"
                                 src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                 srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                 alt=""
                              />
                              {option.label} ({option.code}) +{option.phone}
                           </Box>
                        )}
                        renderInput={(params) => (
                           <TextField
                              variant="outlined"
                              {...params}
                              label="Country"
                              size="small"
                              fullWidth
                              inputProps={{
                                 ...params.inputProps,
                                 autoComplete: 'new-password', // disable autocomplete and autofill
                              }}
                           />
                        )}
                     />
                  </Box>
                  <Box sx={{ mt: '30px' }}>
                     <PhoneInput
                        size="small"
                        country={'us'}
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                     />
                  </Box>
                  <Box sx={{ mt: '30px' }}>
                     <TextField
                        label="Region"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ mt: '30px' }}>
                     <TextField
                        label="VAT Number"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={vatNumber}
                        onChange={(e) => setVatNumber(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                     <Box sx={{ flex: '1' }}></Box>
                     <Box sx={{ mt: 5, display: 'flex', gap: 1 }}>
                        <Button
                           size="small"
                           variant="contained"
                           onClick={() => {
                              handleClose1()
                           }}
                        >
                           Close
                        </Button>
                        <Button
                           size="small"
                           variant="contained"
                           onClick={() => saveProfile()}
                        >
                           Update Profile
                        </Button>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Modal>
         <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={ServiceStyle2}>
               <Box
                  sx={{
                     px: 3,
                     py: 1,
                     bgcolor: '#1976d2',
                     borderRadius: 1,
                     color: 'white',
                     display: 'flex',
                     alignItems: 'center',
                  }}
               >
                  <Box>Update Avatar</Box>
                  <Box sx={{ flex: '1' }}></Box>
                  <Box>
                     <IconButton
                        onClick={() => {
                           handleClose2()
                        }}
                     >
                        <CloseIcon sx={{ color: 'white' }} />
                     </IconButton>
                  </Box>
               </Box>
               <Box sx={{ p: 3 }}>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                     }}
                  >
                     <Avatar
                        sx={{
                           width: '140px',
                           height: '140px',
                        }}
                     >
                        {avatarPreview === '' ? (
                           <PersonIcon style={{ fontSize: '100px' }} />
                        ) : (
                           <img
                              src={avatarPreview}
                              alt="Avatar"
                              width="140px"
                           />
                        )}
                     </Avatar>
                  </Box>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                     }}
                  >
                     <Box sx={{ mt: 5, display: 'flex', gap: 1 }}>
                        <Box>
                           <input
                              ref={avatarInputElement}
                              type="file"
                              style={{ display: 'none' }}
                              onChange={(e) => avatarGetFile(e)}
                           />
                           <Button
                              variant="contained"
                              onClick={avatarHandleFileload}
                           >
                              Browse File
                           </Button>
                        </Box>
                        <Box>
                           <Button
                              variant="contained"
                              style={{
                                 padding: '6px 4px',
                                 width: '150px',
                                 height: '36px',
                              }}
                              onClick={avatarHandleFileUpload}
                           >
                              {isLoading1 ? (
                                 <BeatLoader color="#fff" size={10} />
                              ) : (
                                 'Upload Avatar'
                              )}
                           </Button>
                        </Box>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </>
   )
}
const countries = [
   { code: 'AD', label: 'Andorra', phone: '376' },
   {
      code: 'AE',
      label: 'United Arab Emirates',
      phone: '971',
   },
   { code: 'AF', label: 'Afghanistan', phone: '93' },
   {
      code: 'AG',
      label: 'Antigua and Barbuda',
      phone: '1-268',
   },
   { code: 'AI', label: 'Anguilla', phone: '1-264' },
   { code: 'AL', label: 'Albania', phone: '355' },
   { code: 'AM', label: 'Armenia', phone: '374' },
   { code: 'AO', label: 'Angola', phone: '244' },
   { code: 'AQ', label: 'Antarctica', phone: '672' },
   { code: 'AR', label: 'Argentina', phone: '54' },
   { code: 'AS', label: 'American Samoa', phone: '1-684' },
   { code: 'AT', label: 'Austria', phone: '43' },
   {
      code: 'AU',
      label: 'Australia',
      phone: '61',
      suggested: true,
   },
   { code: 'AW', label: 'Aruba', phone: '297' },
   { code: 'AX', label: 'Alland Islands', phone: '358' },
   { code: 'AZ', label: 'Azerbaijan', phone: '994' },
   {
      code: 'BA',
      label: 'Bosnia and Herzegovina',
      phone: '387',
   },
   { code: 'BB', label: 'Barbados', phone: '1-246' },
   { code: 'BD', label: 'Bangladesh', phone: '880' },
   { code: 'BE', label: 'Belgium', phone: '32' },
   { code: 'BF', label: 'Burkina Faso', phone: '226' },
   { code: 'BG', label: 'Bulgaria', phone: '359' },
   { code: 'BH', label: 'Bahrain', phone: '973' },
   { code: 'BI', label: 'Burundi', phone: '257' },
   { code: 'BJ', label: 'Benin', phone: '229' },
   { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
   { code: 'BM', label: 'Bermuda', phone: '1-441' },
   { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
   { code: 'BO', label: 'Bolivia', phone: '591' },
   { code: 'BR', label: 'Brazil', phone: '55' },
   { code: 'BS', label: 'Bahamas', phone: '1-242' },
   { code: 'BT', label: 'Bhutan', phone: '975' },
   { code: 'BV', label: 'Bouvet Island', phone: '47' },
   { code: 'BW', label: 'Botswana', phone: '267' },
   { code: 'BY', label: 'Belarus', phone: '375' },
   { code: 'BZ', label: 'Belize', phone: '501' },
   {
      code: 'CA',
      label: 'Canada',
      phone: '1',
      suggested: true,
   },
   {
      code: 'CC',
      label: 'Cocos (Keeling) Islands',
      phone: '61',
   },
   {
      code: 'CD',
      label: 'Congo, Democratic Republic of the',
      phone: '243',
   },
   {
      code: 'CF',
      label: 'Central African Republic',
      phone: '236',
   },
   {
      code: 'CG',
      label: 'Congo, Republic of the',
      phone: '242',
   },
   { code: 'CH', label: 'Switzerland', phone: '41' },
   { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
   { code: 'CK', label: 'Cook Islands', phone: '682' },
   { code: 'CL', label: 'Chile', phone: '56' },
   { code: 'CM', label: 'Cameroon', phone: '237' },
   { code: 'CN', label: 'China', phone: '86' },
   { code: 'CO', label: 'Colombia', phone: '57' },
   { code: 'CR', label: 'Costa Rica', phone: '506' },
   { code: 'CU', label: 'Cuba', phone: '53' },
   { code: 'CV', label: 'Cape Verde', phone: '238' },
   { code: 'CW', label: 'Curacao', phone: '599' },
   { code: 'CX', label: 'Christmas Island', phone: '61' },
   { code: 'CY', label: 'Cyprus', phone: '357' },
   { code: 'CZ', label: 'Czech Republic', phone: '420' },
   {
      code: 'DE',
      label: 'Germany',
      phone: '49',
      suggested: true,
   },
   { code: 'DJ', label: 'Djibouti', phone: '253' },
   { code: 'DK', label: 'Denmark', phone: '45' },
   { code: 'DM', label: 'Dominica', phone: '1-767' },
   {
      code: 'DO',
      label: 'Dominican Republic',
      phone: '1-809',
   },
   { code: 'DZ', label: 'Algeria', phone: '213' },
   { code: 'EC', label: 'Ecuador', phone: '593' },
   { code: 'EE', label: 'Estonia', phone: '372' },
   { code: 'EG', label: 'Egypt', phone: '20' },
   { code: 'EH', label: 'Western Sahara', phone: '212' },
   { code: 'ER', label: 'Eritrea', phone: '291' },
   { code: 'ES', label: 'Spain', phone: '34' },
   { code: 'ET', label: 'Ethiopia', phone: '251' },
   { code: 'FI', label: 'Finland', phone: '358' },
   { code: 'FJ', label: 'Fiji', phone: '679' },
   {
      code: 'FK',
      label: 'Falkland Islands (Malvinas)',
      phone: '500',
   },
   {
      code: 'FM',
      label: 'Micronesia, Federated States of',
      phone: '691',
   },
   { code: 'FO', label: 'Faroe Islands', phone: '298' },
   {
      code: 'FR',
      label: 'France',
      phone: '33',
      suggested: true,
   },
   { code: 'GA', label: 'Gabon', phone: '241' },
   { code: 'GB', label: 'United Kingdom', phone: '44' },
   { code: 'GD', label: 'Grenada', phone: '1-473' },
   { code: 'GE', label: 'Georgia', phone: '995' },
   { code: 'GF', label: 'French Guiana', phone: '594' },
   { code: 'GG', label: 'Guernsey', phone: '44' },
   { code: 'GH', label: 'Ghana', phone: '233' },
   { code: 'GI', label: 'Gibraltar', phone: '350' },
   { code: 'GL', label: 'Greenland', phone: '299' },
   { code: 'GM', label: 'Gambia', phone: '220' },
   { code: 'GN', label: 'Guinea', phone: '224' },
   { code: 'GP', label: 'Guadeloupe', phone: '590' },
   { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
   { code: 'GR', label: 'Greece', phone: '30' },
   {
      code: 'GS',
      label: 'South Georgia and the South Sandwich Islands',
      phone: '500',
   },
   { code: 'GT', label: 'Guatemala', phone: '502' },
   { code: 'GU', label: 'Guam', phone: '1-671' },
   { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
   { code: 'GY', label: 'Guyana', phone: '592' },
   { code: 'HK', label: 'Hong Kong', phone: '852' },
   {
      code: 'HM',
      label: 'Heard Island and McDonald Islands',
      phone: '672',
   },
   { code: 'HN', label: 'Honduras', phone: '504' },
   { code: 'HR', label: 'Croatia', phone: '385' },
   { code: 'HT', label: 'Haiti', phone: '509' },
   { code: 'HU', label: 'Hungary', phone: '36' },
   { code: 'ID', label: 'Indonesia', phone: '62' },
   { code: 'IE', label: 'Ireland', phone: '353' },
   { code: 'IL', label: 'Israel', phone: '972' },
   { code: 'IM', label: 'Isle of Man', phone: '44' },
   { code: 'IN', label: 'India', phone: '91' },
   {
      code: 'IO',
      label: 'British Indian Ocean Territory',
      phone: '246',
   },
   { code: 'IQ', label: 'Iraq', phone: '964' },
   {
      code: 'IR',
      label: 'Iran, Islamic Republic of',
      phone: '98',
   },
   { code: 'IS', label: 'Iceland', phone: '354' },
   { code: 'IT', label: 'Italy', phone: '39' },
   { code: 'JE', label: 'Jersey', phone: '44' },
   { code: 'JM', label: 'Jamaica', phone: '1-876' },
   { code: 'JO', label: 'Jordan', phone: '962' },
   {
      code: 'JP',
      label: 'Japan',
      phone: '81',
      suggested: true,
   },
   { code: 'KE', label: 'Kenya', phone: '254' },
   { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
   { code: 'KH', label: 'Cambodia', phone: '855' },
   { code: 'KI', label: 'Kiribati', phone: '686' },
   { code: 'KM', label: 'Comoros', phone: '269' },
   {
      code: 'KN',
      label: 'Saint Kitts and Nevis',
      phone: '1-869',
   },
   {
      code: 'KP',
      label: "Korea, Democratic People's Republic of",
      phone: '850',
   },
   { code: 'KR', label: 'Korea, Republic of', phone: '82' },
   { code: 'KW', label: 'Kuwait', phone: '965' },
   { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
   { code: 'KZ', label: 'Kazakhstan', phone: '7' },
   {
      code: 'LA',
      label: "Lao People's Democratic Republic",
      phone: '856',
   },
   { code: 'LB', label: 'Lebanon', phone: '961' },
   { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
   { code: 'LI', label: 'Liechtenstein', phone: '423' },
   { code: 'LK', label: 'Sri Lanka', phone: '94' },
   { code: 'LR', label: 'Liberia', phone: '231' },
   { code: 'LS', label: 'Lesotho', phone: '266' },
   { code: 'LT', label: 'Lithuania', phone: '370' },
   { code: 'LU', label: 'Luxembourg', phone: '352' },
   { code: 'LV', label: 'Latvia', phone: '371' },
   { code: 'LY', label: 'Libya', phone: '218' },
   { code: 'MA', label: 'Morocco', phone: '212' },
   { code: 'MC', label: 'Monaco', phone: '377' },
   {
      code: 'MD',
      label: 'Moldova, Republic of',
      phone: '373',
   },
   { code: 'ME', label: 'Montenegro', phone: '382' },
   {
      code: 'MF',
      label: 'Saint Martin (French part)',
      phone: '590',
   },
   { code: 'MG', label: 'Madagascar', phone: '261' },
   { code: 'MH', label: 'Marshall Islands', phone: '692' },
   {
      code: 'MK',
      label: 'Macedonia, the Former Yugoslav Republic of',
      phone: '389',
   },
   { code: 'ML', label: 'Mali', phone: '223' },
   { code: 'MM', label: 'Myanmar', phone: '95' },
   { code: 'MN', label: 'Mongolia', phone: '976' },
   { code: 'MO', label: 'Macao', phone: '853' },
   {
      code: 'MP',
      label: 'Northern Mariana Islands',
      phone: '1-670',
   },
   { code: 'MQ', label: 'Martinique', phone: '596' },
   { code: 'MR', label: 'Mauritania', phone: '222' },
   { code: 'MS', label: 'Montserrat', phone: '1-664' },
   { code: 'MT', label: 'Malta', phone: '356' },
   { code: 'MU', label: 'Mauritius', phone: '230' },
   { code: 'MV', label: 'Maldives', phone: '960' },
   { code: 'MW', label: 'Malawi', phone: '265' },
   { code: 'MX', label: 'Mexico', phone: '52' },
   { code: 'MY', label: 'Malaysia', phone: '60' },
   { code: 'MZ', label: 'Mozambique', phone: '258' },
   { code: 'NA', label: 'Namibia', phone: '264' },
   { code: 'NC', label: 'New Caledonia', phone: '687' },
   { code: 'NE', label: 'Niger', phone: '227' },
   { code: 'NF', label: 'Norfolk Island', phone: '672' },
   { code: 'NG', label: 'Nigeria', phone: '234' },
   { code: 'NI', label: 'Nicaragua', phone: '505' },
   { code: 'NL', label: 'Netherlands', phone: '31' },
   { code: 'NO', label: 'Norway', phone: '47' },
   { code: 'NP', label: 'Nepal', phone: '977' },
   { code: 'NR', label: 'Nauru', phone: '674' },
   { code: 'NU', label: 'Niue', phone: '683' },
   { code: 'NZ', label: 'New Zealand', phone: '64' },
   { code: 'OM', label: 'Oman', phone: '968' },
   { code: 'PA', label: 'Panama', phone: '507' },
   { code: 'PE', label: 'Peru', phone: '51' },
   { code: 'PF', label: 'French Polynesia', phone: '689' },
   { code: 'PG', label: 'Papua New Guinea', phone: '675' },
   { code: 'PH', label: 'Philippines', phone: '63' },
   { code: 'PK', label: 'Pakistan', phone: '92' },
   { code: 'PL', label: 'Poland', phone: '48' },
   {
      code: 'PM',
      label: 'Saint Pierre and Miquelon',
      phone: '508',
   },
   { code: 'PN', label: 'Pitcairn', phone: '870' },
   { code: 'PR', label: 'Puerto Rico', phone: '1' },
   {
      code: 'PS',
      label: 'Palestine, State of',
      phone: '970',
   },
   { code: 'PT', label: 'Portugal', phone: '351' },
   { code: 'PW', label: 'Palau', phone: '680' },
   { code: 'PY', label: 'Paraguay', phone: '595' },
   { code: 'QA', label: 'Qatar', phone: '974' },
   { code: 'RE', label: 'Reunion', phone: '262' },
   { code: 'RO', label: 'Romania', phone: '40' },
   { code: 'RS', label: 'Serbia', phone: '381' },
   { code: 'RU', label: 'Russian Federation', phone: '7' },
   { code: 'RW', label: 'Rwanda', phone: '250' },
   { code: 'SA', label: 'Saudi Arabia', phone: '966' },
   { code: 'SB', label: 'Solomon Islands', phone: '677' },
   { code: 'SC', label: 'Seychelles', phone: '248' },
   { code: 'SD', label: 'Sudan', phone: '249' },
   { code: 'SE', label: 'Sweden', phone: '46' },
   { code: 'SG', label: 'Singapore', phone: '65' },
   { code: 'SH', label: 'Saint Helena', phone: '290' },
   { code: 'SI', label: 'Slovenia', phone: '386' },
   {
      code: 'SJ',
      label: 'Svalbard and Jan Mayen',
      phone: '47',
   },
   { code: 'SK', label: 'Slovakia', phone: '421' },
   { code: 'SL', label: 'Sierra Leone', phone: '232' },
   { code: 'SM', label: 'San Marino', phone: '378' },
   { code: 'SN', label: 'Senegal', phone: '221' },
   { code: 'SO', label: 'Somalia', phone: '252' },
   { code: 'SR', label: 'Suriname', phone: '597' },
   { code: 'SS', label: 'South Sudan', phone: '211' },
   {
      code: 'ST',
      label: 'Sao Tome and Principe',
      phone: '239',
   },
   { code: 'SV', label: 'El Salvador', phone: '503' },
   {
      code: 'SX',
      label: 'Sint Maarten (Dutch part)',
      phone: '1-721',
   },
   {
      code: 'SY',
      label: 'Syrian Arab Republic',
      phone: '963',
   },
   { code: 'SZ', label: 'Swaziland', phone: '268' },
   {
      code: 'TC',
      label: 'Turks and Caicos Islands',
      phone: '1-649',
   },
   { code: 'TD', label: 'Chad', phone: '235' },
   {
      code: 'TF',
      label: 'French Southern Territories',
      phone: '262',
   },
   { code: 'TG', label: 'Togo', phone: '228' },
   { code: 'TH', label: 'Thailand', phone: '66' },
   { code: 'TJ', label: 'Tajikistan', phone: '992' },
   { code: 'TK', label: 'Tokelau', phone: '690' },
   { code: 'TL', label: 'Timor-Leste', phone: '670' },
   { code: 'TM', label: 'Turkmenistan', phone: '993' },
   { code: 'TN', label: 'Tunisia', phone: '216' },
   { code: 'TO', label: 'Tonga', phone: '676' },
   { code: 'TR', label: 'Turkey', phone: '90' },
   {
      code: 'TT',
      label: 'Trinidad and Tobago',
      phone: '1-868',
   },
   { code: 'TV', label: 'Tuvalu', phone: '688' },
   {
      code: 'TW',
      label: 'Taiwan, Republic of China',
      phone: '886',
   },
   {
      code: 'TZ',
      label: 'United Republic of Tanzania',
      phone: '255',
   },
   { code: 'UA', label: 'Ukraine', phone: '380' },
   { code: 'UG', label: 'Uganda', phone: '256' },
   {
      code: 'US',
      label: 'United States',
      phone: '1',
      suggested: true,
   },
   { code: 'UY', label: 'Uruguay', phone: '598' },
   { code: 'UZ', label: 'Uzbekistan', phone: '998' },
   {
      code: 'VA',
      label: 'Holy See (Vatican City State)',
      phone: '379',
   },
   {
      code: 'VC',
      label: 'Saint Vincent and the Grenadines',
      phone: '1-784',
   },
   { code: 'VE', label: 'Venezuela', phone: '58' },
   {
      code: 'VG',
      label: 'British Virgin Islands',
      phone: '1-284',
   },
   {
      code: 'VI',
      label: 'US Virgin Islands',
      phone: '1-340',
   },
   { code: 'VN', label: 'Vietnam', phone: '84' },
   { code: 'VU', label: 'Vanuatu', phone: '678' },
   { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
   { code: 'WS', label: 'Samoa', phone: '685' },
   { code: 'XK', label: 'Kosovo', phone: '383' },
   { code: 'YE', label: 'Yemen', phone: '967' },
   { code: 'YT', label: 'Mayotte', phone: '262' },
   { code: 'ZA', label: 'South Africa', phone: '27' },
   { code: 'ZM', label: 'Zambia', phone: '260' },
   { code: 'ZW', label: 'Zimbabwe', phone: '263' },
]

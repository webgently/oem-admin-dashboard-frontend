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
   borderLeft: '5px solid red',
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
   const [contact, setContact] = useState('')
   const [vatNumber, setVatNumber] = useState('')
   const [region, setRegion] = useState('')
   const [country, setCountry] = useState('')
   const [city, setCity] = useState('')
   const [address, setAddress] = useState('')
   const [open1, setOpen1] = useState(false)
   // Avatar setting
   const [avatar, setAvatar] = useState('')
   const [open2, setOpen2] = useState(false)
   const [avatarFile, setAvatarFile] = useState({})
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
                  .post(`${process.env.REACT_APP_API_URL}uploadAvatar`, params)
                  .then((result) => {
                     if (result.data.status) {
                        setAvatarFile({})
                        setAvatar(
                           process.env.REACT_APP_BASE_URL + result.data.data
                        )
                        toast.success('Image Uploaded Successfully')
                        setOpen2(false)
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
      setContact(account.phone)
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
      if (!contact) {
         toast.error('Input the contact')
         return
      }
      if (!vatNumber) {
         toast.error('Input the VAT Number')
         return
      }
      if (!region) {
         toast.error('Input the region')
         return
      }
      if (!country) {
         toast.error('Input the country')
         return
      }
      if (!city) {
         toast.error('Input the city')
         return
      }
      if (!address) {
         toast.error('Input the address')
         return
      }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updateProfile`, {
               _id: userID,
               name,
               email,
               contact,
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
                     { label: 'Contact:', value: data.phone },
                     { label: 'VAT Number:', value: data.vatNumber },
                     {
                        label: 'Account Status:',
                        value: data.status,
                     },
                     { label: 'Region:', value: data.subcontinent },
                     { label: 'Country:', value: data.country },
                     { label: 'City:', value: data.city },
                     { label: 'Address:', value: data.address },
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
      }
      setUserData([
         { label: 'Email:', value: account.email },
         { label: 'Contact:', value: account.phone },
         { label: 'VAT Number:', value: account.vatNumber },
         {
            label: 'Account Status:',
            value: account.status,
         },
         { label: 'Region:', value: account.subcontinent },
         { label: 'Country:', value: account.country },
         { label: 'City:', value: account.city },
         { label: 'Address:', value: account.address },
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
                              background: `url(${bgCar})`,
                              height: '300px',
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
                              <img src={Key} />
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
                        id="outlined-basic"
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
                        id="outlined-basic"
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
                        id="outlined-basic"
                        label="Contact"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ mt: '30px' }}>
                     <TextField
                        id="outlined-basic"
                        label="VAT Number"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={vatNumber}
                        onChange={(e) => setVatNumber(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ mt: '30px' }}>
                     <TextField
                        id="outlined-basic"
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
                        id="outlined-basic"
                        label="Country"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ mt: '30px' }}>
                     <TextField
                        id="outlined-basic"
                        label="City"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ mt: '30px' }}>
                     <TextField
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                              onClick={avatarHandleFileUpload}
                           >
                              Upload Avatar
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

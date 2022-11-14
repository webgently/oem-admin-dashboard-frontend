import React, { useEffect, useState } from 'react'
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
import toast, { Toaster } from 'react-hot-toast'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import { useSelector } from 'react-redux'

const columns = [
   { id: 'id', label: 'Sr #', minWidth: 50 },
   { id: 'day', label: 'Day', minWidth: 50 },
   { id: 'open', label: 'Opening time', minWidth: 100 },
   { id: 'close', label: 'Closing time', minWidth: 150 },
   { id: 'holyday', label: 'Holiday', minWidth: 100 },
   { id: 'action', label: 'Action' },
]

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

const ServiceStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '50vw',
   height: '50vh',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

export default function Profile() {
   const account = useSelector((state) => state.account)
   const [userData, setUserData] = useState([])
   const [userName, setUserName] = useState('')
   const [userID, setUserID] = useState('')
   const [contact, setContact] = useState('')
   const [address, setAddress] = useState('')
   const [city, setCity] = useState('')
   const [open, setOpen] = useState(false)
   const handleOpen1 = () => {
      setContact(userData[1].value)
      setAddress(userData[6].value)
      setCity(userData[5].value)
      setOpen(true)
   }
   const handleClose = () => setOpen(false)
   const saveProfile = async () => {
      if (!contact) {
         toast.error('Input contact')
         return
      }
      if (!address) {
         toast.error('Input address')
         return
      }
      if (!city) {
         toast.error('Input city')
         return
      }
      await axios
         .post(`${process.env.REACT_APP_API_Url}updateProfile`, {
            _id: userID,
            contact,
            address,
            city,
         })
         .then((result) => {
            if (result.data.status) {
               const data = result.data.result
               delete data._v
               setUserData([
                  { label: 'Email:', value: data.email },
                  { label: 'Contact:', value: data.phone },
                  { label: 'VAT Number:', value: data.vatNumber },
                  {
                     label: 'Account Status:',
                     value: data.status,
                  },
                  { label: 'Region:', value: data.country },
                  { label: 'City:', value: data.city },
                  { label: 'Address:', value: data.address },
               ])
               localStorage.setItem('user', JSON.stringify(data))
               setOpen(false)
               toast.success('Details Updated Successfully')
            }
         })
   }

   useEffect(() => {
      setUserName(account.name)
      setUserID(account._id)
      setUserData([
         { label: 'Email:', value: account.email },
         { label: 'Contact:', value: account.phone },
         { label: 'VAT Number:', value: account.vatNumber },
         {
            label: 'Account Status:',
            value: account.status,
         },
         { label: 'Region:', value: account.country },
         { label: 'City:', value: account.city },
         { label: 'Address:', value: account.address },
      ])
   }, [])

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
                              height: '200px',
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
                              >
                                 CA
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
               </Grid>
            </Box>
         </Box>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={ServiceStyle}>
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
                           handleClose()
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
                        id="outlined-basic"
                        label="City"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                     />
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                     <Box sx={{ flex: '1' }}></Box>
                     <Box sx={{ mt: 5, display: 'flex', gap: 1 }}>
                        <Button
                           size="small"
                           variant="contained"
                           onClick={() => {
                              handleClose()
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
         <Toaster />
      </>
   )
}

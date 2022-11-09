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
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import bgCar from '../assets/img/bgCar.jpg'
import EditIcon from '@mui/icons-material/Edit'

import TablePagination from '@mui/material/TablePagination'
import { ButtonGroup } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
import logo from '../assets/img/OEMservice2.jpg'
import Key from '../assets/img/changepassword.png'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'

const columns = [
   { id: 'id', label: 'Sr #', minWidth: 50 },
   { id: 'day', label: 'Day', minWidth: 50 },
   { id: 'open', label: 'Opening time', minWidth: 100 },
   { id: 'close', label: 'Closing time', minWidth: 150 },
   { id: 'holiday', label: 'Holiday', minWidth: 100 },
   { id: 'action', label: 'Action' },
]

function createData(id, day, open, close, holiday, action) {
   return { id, day, open, close, holiday, action }
}

const rows = [
   createData('India', 'IN', 1324171354, 3287263),
   createData('China', 'CN', 1403500365, 9596961),
   createData('Italy', 'IT', 60483973, 301340),
   createData('United States', 'US', 327167434, 9833520),
   createData('Canada', 'CA', 37602103, 9984670),
   createData('Australia', 'AU', 25475400, 7692024),
   createData('Germany', 'DE', 83019200, 357578),
   createData('Ireland', 'IE', 4857000, 70273),
   createData('Mexico', 'MX', 126577691, 1972550),
   createData('Japan', 'JP', 126317000, 377973),
   createData('France', 'FR', 67022000, 640679),
   createData('United Kingdom', 'GB', 67545757, 242495),
   createData('Russia', 'RU', 146793744, 17098246),
   createData('Nigeria', 'NG', 200962417, 923768),
   createData('Brazil', 'BR', 210147125, 8515767),
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
   height: '40vh',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

export default function AdminProfliesetting() {
   const [page, setPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }
   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   // profile setting
   const [userData, setUserData] = useState([])
   const [userName, setUserName] = useState('')
   const [userID, setUserID] = useState('')
   const [contact, setContact] = useState('')
   const [address, setAddress] = useState('')
   const [city, setCity] = useState('')
   const [open1, setOpen1] = useState(false)
   const handleOpen1 = () => {
      setContact(userData[1].value)
      setAddress(userData[6].value)
      setCity(userData[5].value)
      setOpen1(true)
   }
   const handleClose1 = () => setOpen1(false)
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
         .post(`${process.env.REACT_APP_Base_Url}updateProfile`, {
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
               toast.success('Details Updated Successfully')
            }
         })
   }

   // privacy setting
   const [privacyContent, setPrivacyContent] = useState('')
   const [privacyMsg, setPrivacyMsg] = useState('')
   const [privacyID, setPrivacyID] = useState('')
   const [open2, setOpen2] = useState(false)
   const handleOpen2 = () => {
      setOpen2(true)
   }
   const handleClose2 = () => setOpen2(false)
   const savePrivacy = async () => {
      if (!privacyMsg) {
         toast.error('Input privacy policy Content')
         return
      }
      await axios
         .post(`${process.env.REACT_APP_Base_Url}savePrivacy`, {
            id: privacyID,
            privacyMsg,
         })
         .then((result) => {
            if (result.data.status) {
               console.log(result.data)
               setPrivacyContent(privacyMsg)
               setOpen2(false)
               toast.success('Content Updated Successfully')
            }
         })
   }

   const getPrivacy = async () => {
      await axios
         .post(`${process.env.REACT_APP_Base_Url}getPrivacy`)
         .then((result) => {
            setPrivacyMsg(result.data.privacy)
            setPrivacyContent(result.data.privacy)
            setPrivacyID(result.data._id)
         })
   }

   useEffect(() => {
      const account = JSON.parse(localStorage.getItem('user'))
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
      getPrivacy()
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
            <Box
               sx={{
                  color: 'red',
                  py: '20px',
                  fontSize: '25px',
               }}
            >
               Profile
            </Box>
            <Box>
               <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{
                     xs: 4,
                     sm: 8,
                     md: 12,
                  }}
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

            <Box sx={{ pt: '20px', fontSize: '25px' }}>Store Timings</Box>
            <Box
               sx={{
                  bgcolor: 'white',
                  borderRadius: '12px',
               }}
            >
               <TableContainer
                  sx={{
                     mt: 2,
                  }}
               >
                  <Table stickyHeader aria-label="sticky table">
                     <TableHead>
                        <TableRow>
                           {columns.map((column) => (
                              <TableCell
                                 key={column.id}
                                 align={column.align}
                                 style={{
                                    minWidth: column.minWidth,
                                    backgroundColor: '#3791e9',
                                    color: 'white',
                                 }}
                              >
                                 {column.label}
                              </TableCell>
                           ))}
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {rows
                           .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                           )
                           .map((row, ind) => {
                              return (
                                 <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={`${row.id}` + ind}
                                 >
                                    {columns.map((column) => {
                                       const value = row[column.id]
                                       return (
                                          <TableCell
                                             key={column.id}
                                             align={column.align}
                                          >
                                             {column.id === 'profile' ? (
                                                <Avatar
                                                   alt="Remy Sharp"
                                                   src={value}
                                                />
                                             ) : column.id === 'action' ? (
                                                <ButtonGroup
                                                   variant="outlined"
                                                   aria-label="outlined button group"
                                                >
                                                   <IconButton
                                                      color="primary"
                                                      aria-label="add to shopping cart"
                                                   >
                                                      <EditIcon />
                                                   </IconButton>
                                                </ButtonGroup>
                                             ) : (
                                                value
                                             )}
                                          </TableCell>
                                       )
                                    })}
                                 </TableRow>
                              )
                           })}
                     </TableBody>
                  </Table>
               </TableContainer>
               <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
               />
            </Box>

            <Box sx={{ pt: '20px', fontSize: '25px' }}>
               Privacy Policy
               <IconButton onClick={() => handleOpen2()}>
                  <EditIcon />
               </IconButton>
            </Box>
            <Box
               sx={{
                  p: 5,
                  my: 3,
                  bgcolor: 'white',
                  borderRadius: '10px',
               }}
            >
               {privacyContent}
            </Box>

            <Box sx={{ pt: '20px', fontSize: '25px' }}>Update Logo</Box>
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
                     sm={4}
                     md={4}
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                     }}
                  >
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                           border: '1px dotted',
                           borderRadius: '20px',
                           flexDirection: 'column',
                           p: '30px',
                           gap: '10px',
                           alignItems: 'center',
                        }}
                     >
                        <Box>
                           <CloudUploadIcon
                              sx={{
                                 color: 'red',
                                 fontSize: '70px',
                              }}
                           />
                        </Box>
                        <Box>Drag amd Drop your File here</Box>
                        <Box>Or</Box>
                        <Box>
                           <Button
                              variant="outlined"
                              sx={{
                                 border: '1px solid red',
                                 borderRadius: '12px',
                                 color: 'red',
                              }}
                           >
                              Browse File
                           </Button>
                        </Box>
                     </Box>
                  </Grid>
                  <Grid
                     item
                     xs={12}
                     sm={8}
                     md={8}
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        width: '100%',
                     }}
                  >
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'center',
                           flexDirection: 'column',
                           p: '30px',
                           gap: '10px',
                           height: '250px',
                           width: '100%',
                           alignItems: 'center',
                        }}
                     >
                        <img
                           src={logo}
                           style={{
                              height: '100%',
                           }}
                        />
                     </Box>
                  </Grid>
               </Grid>
            </Box>

            <Box sx={{ pt: '20px', fontSize: '25px' }}>Change Password</Box>
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
                     sm={6}
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
                     sm={6}
                     md={6}
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                     }}
                  >
                     <TextField type="password" placeholder="Old password" />
                     <TextField type="password" placeholder="New password" />
                     <TextField
                        type="password"
                        placeholder="Confirm password"
                     />
                     <Button variant="contained">Change Password</Button>
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
                           handleClose1()
                        }}
                     >
                        <CloseIcon sx={{ color: 'white' }} />
                     </IconButton>
                  </Box>
               </Box>
               <Box sx={{ p: 3 }}>
                  <Box>
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
                  <Box sx={{ mt: '20px' }}>
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
                  <Box sx={{ mt: '20px' }}>
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
                     <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
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
                  <Box>Privacy Policy</Box>
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
                  <TextField
                     id="outlined-multiline-static"
                     label="Type here: Privacy Policy Content"
                     multiline
                     fullWidth
                     value={privacyMsg}
                     rows={6}
                     onChange={(e) => setPrivacyMsg(e.target.value)}
                  />

                  <Box sx={{ display: 'flex' }}>
                     <Box sx={{ flex: '1' }}></Box>
                     <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                        <Button
                           size="small"
                           variant="contained"
                           onClick={() => savePrivacy()}
                        >
                           Update Content
                        </Button>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </>
   )
}

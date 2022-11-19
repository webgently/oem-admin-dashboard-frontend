import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
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
import toast from 'react-hot-toast'
import Key from '../assets/img/changepassword.png'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import LogoIcon from '../assets/img/OEMservice2.jpg'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const columns = [
   { id: 'id', label: 'Sr #', minWidth: 50 },
   { id: 'day', label: 'Day', minWidth: 100, align: 'center' },
   { id: 'open', label: 'Opening time', minWidth: 100, align: 'center' },
   { id: 'close', label: 'Closing time', minWidth: 100, align: 'center' },
   { id: 'holyday', label: 'Holiday', minWidth: 100, align: 'center' },
   { id: 'action', label: 'Action', align: 'center' },
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
   height: '54vh',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

export default function AdminProfliesetting() {
   const account = useSelector((state) => state.account)
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
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updateProfile`, {
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
                  setOpen1(false)
                  toast.success('Details Updated Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }
   // Store Timings
   const [open3, setOpen3] = useState(false)
   const [dailyTable, setDailyTable] = useState([])
   const [openTime, setOpenTime] = useState(new Date())
   const [openTimeFlag, setOpenTimeFlag] = useState(true)
   const [closeTime, setCloseTime] = useState(new Date())
   const [closeTimeFlag, setCloseTimeFlag] = useState(true)
   const [dayID, setDayID] = useState()
   const [day, setDay] = useState()
   const [holyDay, setHolyDay] = useState(false)
   const handleOpen3 = (id) => {
      setOpen3(true)
      setDayID(id)
      getOneDaily(id)
   }
   const handleClose3 = () => {
      setOpen3(false)
   }
   const getAllDaily = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getAllDaily`)
            .then((result) => {
               if (result.data.status) {
                  setDailyTable(result.data.table)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }
   const updateDaily = async () => {
      let data = {}
      if (holyDay) {
         data = {
            id: dayID,
            holyDay,
            openTime: '--:--:--',
            closeTime: '--:--:--',
         }
      } else {
         if (!openTime) {
            toast.error('Select the time')
            return
         }
         if (!closeTime) {
            toast.error('Select the time')
            return
         }
         data = {
            id: dayID,
            holyDay,
            openTime,
            closeTime,
         }
      }

      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updateDaily`, {
               data,
            })
            .then((result) => {
               if (result.data.status) {
                  setDailyTable(result.data.result)
                  setOpen3(false)
                  toast.success('Timing Updated Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }
   const getOneDaily = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getOneDaily`, {
               id,
            })
            .then((result) => {
               if (result.data.status) {
                  setHolyDay(result.data.data.holyday)
                  setOpenTimeFlag(result.data.data.holyday)
                  setCloseTimeFlag(result.data.data.holyday)
                  setDay(result.data.data.day)
                  if (holyDay) {
                     setOpenTime(null)
                     setCloseTime(null)
                  } else {
                     setOpenTime(result.data.data.open)
                     setCloseTime(result.data.data.close)
                  }
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }
   useEffect(() => {
      if (holyDay) {
         setOpenTimeFlag(true)
         setCloseTimeFlag(true)
      } else {
         setOpenTimeFlag(false)
         setCloseTimeFlag(false)
      }
   }, [holyDay])
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
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}savePrivacy`, {
               id: privacyID,
               privacyMsg,
            })
            .then((result) => {
               if (result.data.status) {
                  setPrivacyContent(privacyMsg)
                  setOpen2(false)
                  toast.success('Content Updated Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }
   const getPrivacy = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getPrivacy`)
            .then((result) => {
               setPrivacyMsg(result.data.privacy)
               setPrivacyContent(result.data.privacy)
               setPrivacyID(result.data._id)
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
   // upload logo image
   const [logo, setLogo] = useState('')
   const [fileData, setFileData] = useState({})
   const inputElement = useRef('fileInput')
   const handleFileload = () => {
      inputElement.current.click()
   }
   const getFile = async (e) => {
      setFileData(e.target.files[0])
   }
   const handleFileUpload = async () => {
      let params = new FormData()
      let data = {
         name: fileData.name,
         size: fileData.size,
         type: fileData.type,
         rename: fileData.lastModified,
      }
      params.append('file', fileData)
      params.append('data', JSON.stringify(data))
      if (!fileData.name) {
         toast.error('Please select an image')
      } else {
         if (
            fileData.type === 'image/jpeg' ||
            fileData.type === 'image/png' ||
            fileData.type === 'image/svg' ||
            fileData.type === 'image/gif' ||
            fileData.type === 'image/tiff'
         ) {
            try {
               await axios
                  .post(`${process.env.REACT_APP_API_URL}uploadLogo`, params)
                  .then((result) => {
                     if (result.data.status) {
                        setFileData({})
                        setLogo(
                           process.env.REACT_APP_BASE_URL + result.data.data
                        )
                        toast.success('Image Uploaded Successfully')
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
   const getLogo = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getLogo`)
            .then((result) => {
               if (result.data.status) {
                  setLogo(process.env.REACT_APP_BASE_URL + result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }
   /* file modal */
   const [fileOpen, setFileOpen] = useState(false)

   const deleteFile = () => {
      setFileData({})
      setFileOpen(false)
   }

   useEffect(() => {
      if (account._id) {
         setUserName(account.name)
         setUserID(account._id)
      }
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
   }, [account])

   useEffect(() => {
      getPrivacy()
      getAllDaily()
      getLogo()
   }, [])

   useEffect(() => {
      if (fileData?.name) setFileOpen(true)
      else setFileOpen(false)
   }, [fileData])

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
                                 {userName}
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
                        {dailyTable
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
                                       let value = ''
                                       if (
                                          column.id === 'open' ||
                                          column.id === 'close'
                                       ) {
                                          if (row[column.id] === '--:--:--') {
                                             value = '--:--:--'
                                          } else {
                                             const d = new Date(row[column.id])
                                             let hour = d.getHours()
                                             let minute = d.getMinutes()
                                             let second = d.getSeconds()
                                             if (hour < 10) hour = '0' + hour
                                             if (minute < 10)
                                                minute = '0' + minute
                                             if (second < 10)
                                                second = '0' + second
                                             value = `${hour}:${minute}:${second}`
                                          }
                                       } else {
                                          value = row[column.id]
                                       }
                                       return (
                                          <TableCell
                                             key={column.id}
                                             align={column.align}
                                          >
                                             {column.id === 'id' ? (
                                                ind + 1
                                             ) : column.id === 'holyday' &&
                                               value ? (
                                                'holiday'
                                             ) : column.id === 'action' ? (
                                                <ButtonGroup
                                                   variant="outlined"
                                                   aria-label="outlined button group"
                                                   onClick={() =>
                                                      handleOpen3(row._id)
                                                   }
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
                  count={dailyTable.length}
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
                     sm={12}
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
                        {fileOpen ? (
                           <Box className="select-file" mt={4}>
                              <Box className="file-group-box">
                                 <Box className="upload-img-box">
                                    <UploadFileIcon className="upload-img-icon" />
                                 </Box>
                                 <Box className="file-info">
                                    <Box>
                                       <Box>{fileData?.name}</Box>
                                       <Box>
                                          {(fileData?.size / 1000000).toFixed(
                                             2
                                          )}{' '}
                                          MB
                                       </Box>
                                    </Box>
                                 </Box>
                              </Box>
                              <Box className="close-img-box">
                                 <HighlightOffIcon
                                    className="close-img-icon"
                                    onClick={() => deleteFile()}
                                 />
                              </Box>
                           </Box>
                        ) : (
                           <>
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
                           </>
                        )}

                        <Box sx={{ display: 'flex' }} gap={1}>
                           <Box>
                              <input
                                 ref={inputElement}
                                 type="file"
                                 style={{ display: 'none' }}
                                 onChange={(e) => getFile(e)}
                              />
                              <Button
                                 variant="outlined"
                                 sx={{
                                    border: '1px solid red',
                                    borderRadius: '12px',
                                    color: 'red',
                                 }}
                                 onClick={handleFileload}
                              >
                                 Browse File
                              </Button>
                           </Box>
                           <Box>
                              <Button
                                 variant="outlined"
                                 sx={{
                                    border: '1px solid red',
                                    borderRadius: '12px',
                                    color: 'red',
                                 }}
                                 onClick={handleFileUpload}
                              >
                                 Upload File
                              </Button>
                           </Box>
                        </Box>
                     </Box>
                  </Grid>
                  <Grid
                     item
                     xs={12}
                     sm={12}
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
                           src={logo === '' ? LogoIcon : logo}
                           alt="Logo Upload Image"
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
                        onChange={(e) => setOldPassword(e.target.value)}
                     />
                     <TextField
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                     />
                     <TextField
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                     rows={9}
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

         <Modal
            open={open3}
            onClose={handleClose3}
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
                  <Box>Update Store Timing</Box>
                  <Box sx={{ flex: '1' }}></Box>
                  <Box>
                     <IconButton
                        onClick={() => {
                           handleClose3()
                        }}
                     >
                        <CloseIcon sx={{ color: 'white' }} />
                     </IconButton>
                  </Box>
               </Box>
               <Box sx={{ p: 3 }}>
                  <Box>
                     <Box>You are Updating {day} Timing</Box>
                     <FormControlLabel
                        control={
                           <Switch
                              checked={holyDay}
                              onChange={(e) => setHolyDay(e.target.checked)}
                           />
                        }
                        label="Holiday"
                     />
                     <br />
                     <br />

                     <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                           <TimePicker
                              label="Opening Time"
                              value={new Date(openTime)}
                              onChange={(e) => {
                                 setOpenTime(e.$d)
                              }}
                              disabled={openTimeFlag}
                              renderInput={(params) => (
                                 <TextField {...params} />
                              )}
                           />
                           <TimePicker
                              label="Closing Time"
                              value={new Date(closeTime)}
                              onChange={(e) => {
                                 setCloseTime(e.$d)
                              }}
                              disabled={closeTimeFlag}
                              renderInput={(params) => (
                                 <TextField {...params} />
                              )}
                           />
                        </Stack>
                     </LocalizationProvider>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                     <Box sx={{ flex: '1' }}></Box>
                     <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                        <Button
                           size="small"
                           variant="contained"
                           onClick={() => {
                              handleClose3()
                           }}
                        >
                           Cancel
                        </Button>
                        <Button
                           size="small"
                           variant="contained"
                           onClick={() => updateDaily()}
                        >
                           Update
                        </Button>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </>
   )
}

import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const columns = [
   { id: 'orderId', label: 'Code', minWidth: 120 },
   { id: 'vehicletype', label: 'Vehicle Type', minWidth: 150 },
   {
      id: 'createAt',
      label: 'Date',
      minWidth: 120,
   },
   {
      id: 'status',
      label: 'Status',
      minWidth: 50,
      align: 'center',
   },
]

const Item1 = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: '20px 20px 20px 20px',
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   textAlign: 'center',
   borderLeft: '5px solid #1976d2',
   color: theme.palette.text.secondary,
}))
const Item2 = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: '20px 20px 20px 20px',
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   textAlign: 'center',
   borderLeft: '5px solid #ffc800',
   color: theme.palette.text.secondary,
}))
const Item3 = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: '20px 20px 20px 20px',
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   textAlign: 'center',
   borderLeft: '5px solid #01ef92',
   color: theme.palette.text.secondary,
}))

export default function Dashboard() {
   const account = useSelector((state) => state.account)
   const [allData, setAllData] = useState([])
   const [openTime, setOpenTime] = useState('')
   const [closeTime, setCloseTime] = useState('')
   const [creditAmount, setCreditAmount] = useState(0)
   const navigate = useNavigate()
   const customTime = (date) => {
      const d = new Date(date)
      let hour = d.getHours()
      let minute = d.getMinutes()
      let second = d.getSeconds()
      if (hour < 10) hour = '0' + hour
      if (minute < 10) minute = '0' + minute
      if (second < 10) second = '0' + second
      return `${hour}:${minute}:${second}`
   }
   const getDataByFilter = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getDataByFilter`, {
               filter: 'all',
               id,
            })
            .then((result) => {
               if (result.data.status) {
                  setAllData(result.data.data)
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }
   const getServiceTime = async () => {
      const weekdaylist = [
         'Sunday',
         'Monday',
         'Tuesday',
         'Wednesday',
         'Thursday',
         'Friday',
         'Saturday',
      ]
      const d = new Date()
      const day = weekdaylist[d.getDay()]

      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getServiceTime`, { day })
            .then((result) => {
               if (result.data.status) {
                  if (result.data.data.open === '--:--:--') {
                     setOpenTime('Office Close Today')
                     setCloseTime('Office Close Today')
                  } else {
                     setOpenTime(customTime(result.data.data.open))
                     setCloseTime(customTime(result.data.data.close))
                  }
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }
   const getSumCredit = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getSumCredit`, { id })
            .then((result) => {
               if (result.data.status) {
                  setCreditAmount(result.data.data)
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   useEffect(() => {
      if (account._id) {
         getDataByFilter(account._id)
         getServiceTime()
         getSumCredit(account._id)
      }
   }, [account])

   return (
      <Box
         sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: 'rgb(229, 229, 229)',
            overflowY: 'auto',
         }}
      >
         <Box sx={{ mt: '80px' }}>
            <Grid
               container
               spacing={{ xs: 2, md: 3 }}
               columns={{ xs: 4, sm: 8, md: 12 }}
            >
               <Grid item xs={6} sm={4} md={4}>
                  <Item1>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h3 style={{ margin: '0px' }}>Credit</h3>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h2 style={{ margin: '0px' }}>{creditAmount}</h2>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <Button
                           variant="contained"
                           onClick={() => navigate('/buyCredit')}
                        >
                           Buy Now
                        </Button>
                     </Box>
                  </Item1>
               </Grid>
               <Grid item xs={6} sm={4} md={4}>
                  <Item2>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h3 style={{ margin: '0px' }}>Opening Time</h3>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h2 style={{ margin: '0px' }}>{openTime}</h2>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     ></Box>
                  </Item2>
               </Grid>
               <Grid item xs={6} sm={4} md={4}>
                  <Item3>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h3 style={{ margin: '0px' }}>Closing Time</h3>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h2 style={{ margin: '0px' }}>{closeTime}</h2>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     ></Box>
                  </Item3>
               </Grid>
            </Grid>
         </Box>
         <Box sx={{ mt: '30px' }}>
            <Grid
               container
               spacing={{ xs: 2, md: 3 }}
               columns={{ xs: 4, sm: 8, md: 12 }}
            >
               <Grid item xs={12} sm={12} md={12}>
                  <Item2>
                     <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                     >
                        <Grid item xs={12} sm={12} md={6}>
                           <Box
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'flex-start',
                              }}
                           >
                              <h3 style={{ margin: '0px' }}>Uploaded Files</h3>
                           </Box>
                           <Box
                              sx={{
                                 marginTop: '20px',
                                 display: 'flex',
                                 justifyContent: 'flex-start',
                                 border: '1px dotted',
                                 borderRadius: '20px',
                                 flexDirection: 'column',
                                 p: '30px',
                                 gap: '10px',
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
                              <Box>Click to Upload File</Box>
                              <Box>
                                 <Button
                                    variant="outlined"
                                    sx={{
                                       border: '1px solid red',
                                       borderRadius: '12px',
                                       color: 'red',
                                    }}
                                    onClick={() => navigate('/upload')}
                                 >
                                    Browse File
                                 </Button>
                              </Box>
                           </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                           <Box
                              sx={{
                                 display: 'flex',
                                 alignItems: 'flex-start',
                                 flexDirection: 'column',
                              }}
                           >
                              <h4 style={{ margin: '0px' }}>Recent Files</h4>
                           </Box>
                           <Box
                              sx={{
                                 marginTop: '20px',
                                 display: 'flex',
                                 justifyContent: 'flex-start',
                                 flexDirection: 'column',
                              }}
                           >
                              {allData.length > 0 ? (
                                 <TableContainer
                                    component={Paper}
                                    style={{
                                       overflowY: 'auto',
                                       height: '260px',
                                    }}
                                 >
                                    <Table
                                       sx={{ width: '100%' }}
                                       aria-label="simple table"
                                    >
                                       <TableHead>
                                          <TableRow>
                                             {columns.map((column) => (
                                                <TableCell
                                                   key={column.id}
                                                   align={column.align}
                                                   style={{
                                                      minWidth: column.minWidth,
                                                   }}
                                                >
                                                   {column.label}
                                                </TableCell>
                                             ))}
                                          </TableRow>
                                       </TableHead>
                                       <TableBody>
                                          {allData.map((row) => (
                                             <TableRow
                                                key={row._id}
                                                sx={{
                                                   '&:last-child td, &:last-child th':
                                                      {
                                                         border: 0,
                                                      },
                                                }}
                                             >
                                                <TableCell
                                                   component="th"
                                                   scope="row"
                                                >
                                                   {row.orderId}
                                                </TableCell>
                                                <TableCell align="left">
                                                   {row.vehicleType}
                                                </TableCell>
                                                <TableCell align="left">
                                                   {row.createdAt}
                                                </TableCell>
                                                <TableCell align="center">
                                                   <span
                                                      className={
                                                         row.status ===
                                                         'requested'
                                                            ? 'request-status'
                                                            : row.status ===
                                                              'completed'
                                                            ? 'success-status'
                                                            : row.status ===
                                                              'cancelled'
                                                            ? 'cancel-status'
                                                            : 'progress-status'
                                                      }
                                                      onClick={() =>
                                                         navigate('/overview')
                                                      }
                                                   >
                                                      {row.status}
                                                   </span>
                                                </TableCell>
                                             </TableRow>
                                          ))}
                                       </TableBody>
                                    </Table>
                                 </TableContainer>
                              ) : (
                                 <Box
                                    sx={{
                                       display: 'flex',
                                       flexDirection: 'column',
                                       m: '40px',
                                       alignItems: 'center',
                                    }}
                                 >
                                    <InsertDriveFileIcon
                                       sx={{ fontSize: '60px' }}
                                    />
                                    No recent file
                                 </Box>
                              )}
                           </Box>
                        </Grid>
                     </Grid>
                  </Item2>
               </Grid>
            </Grid>
         </Box>
      </Box>
   )
}

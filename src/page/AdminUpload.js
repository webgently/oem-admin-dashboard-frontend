import React, { useEffect, useRef, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import AutoModeIcon from '@mui/icons-material/AutoMode'
import {
   Box,
   Button,
   ButtonGroup,
   Divider,
   FormControl,
   Grid,
   IconButton,
   MenuItem,
   Modal,
   Select,
   TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import toast from 'react-hot-toast'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { BeatLoader } from 'react-spinners'
import axios from 'axios'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const columns = [
   { id: 'orderId', label: 'ID', minWidth: 100 },
   { id: 'client', label: 'Client', minWidth: 100 },
   { id: 'vehicleType', label: 'Vehicle Type', minWidth: 150 },
   { id: 'buildYear', label: 'Build Year', minWidth: 100 },
   { id: 'HP', label: 'HP', minWidth: 100 },
   { id: 'status', label: 'Status', minWidth: 50 },
   { id: 'tuningType', label: 'Tuning Type', minWidth: 100 },
   { id: 'action', label: 'Action', align: 'center' },
]

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '90vw',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

export default function AdminUpload() {
   const socket = io(process.env.REACT_APP_BASE_URL)
   const account = useSelector((state) => state.account)
   const [page, setPage] = useState(0)
   const [myID, setMyID] = useState('')
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [uploadBtnFlag, setUploadBtnFlag] = useState(true)
   const [creditBtnFlag, setCreditBtnFlag] = useState(true)
   const [allData, setAllData] = useState([])
   const [oneData, setOneData] = useState({
      ECUBuild: '',
      ECUProducer: '',
      HP: '',
      KW: '',
      buildYear: '',
      chasis: '',
      client: '',
      createdAt: '',
      fileName: [],
      fileRename: [],
      fileSize: [],
      fileType: [],
      message: '',
      note: '',
      orderId: '',
      readMethod: '',
      status: '',
      transmission: '',
      tuningType: '',
      usedTool: '',
      userId: '',
      vehicleBrand: '',
      vehicleEngine: '',
      vehicleSeries: '',
      vehicleType: '',
      availableCredit: 0,
      chargedCredit: 0,
   })
   const [status, setStatus] = useState('')
   const [note, setNote] = useState('')
   const [credit, setCredit] = useState(0)
   const [open, setOpen] = useState(false)
   const [fileData, setFileData] = useState({})
   const [isLoading, setIsLoading] = useState(false)
   const inputElement = useRef('fileInput')
   /* file modal */
   const [fileOpen, setFileOpen] = useState(false)

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   const handleFileload = () => {
      inputElement.current.click()
   }

   const getFile = async (e) => {
      setFileData(e.target.files[0])
   }

   const upload = async () => {
      if (!uploadBtnFlag)
         if (!fileData.name) {
            toast.error('Select the file')
            return
         }
      if (!status) {
         toast.error('Select the status')
         return
      }
      if (!note) {
         toast.error('Field the note')
         return
      }
      if (!creditBtnFlag) {
         if (credit < 0) {
            toast.error('Field the credit')
            return
         }
      }
      if (!isLoading) {
         setIsLoading(true)
         try {
            if (status === 'completed') {
               let params = new FormData()
               const data = {
                  id: oneData._id,
                  userId: oneData.userId,
                  orderId: oneData.orderId,
                  status,
                  note,
                  credit,
                  date: getCustomDate(),
               }
               params.append('file', fileData)
               params.append('data', JSON.stringify(data))
               await axios
                  .post(`${process.env.REACT_APP_API_URL}updateUpload`, params)
                  .then((result) => {
                     if (result.data.status) {
                        toast.success(result.data.data)
                        getRequests()
                        setOpen(false)
                        setFileData('')
                        setStatus('')
                        setNote('')
                        setCredit(0)
                        socket.emit('reply', {
                           from: myID,
                           to: oneData.userId,
                           orderId: oneData.orderId,
                        })
                     } else {
                        toast.error(result.data.data)
                     }
                  })
            } else {
               const data = {
                  id: oneData._id,
                  userId: oneData.userId,
                  status,
                  note,
                  credit,
                  orderId: oneData.orderId,
               }
               await axios
                  .post(`${process.env.REACT_APP_API_URL}uploadStatusSave`, {
                     data,
                  })
                  .then((result) => {
                     if (result.data.status) {
                        toast.success(result.data.data)
                        getRequests()
                        setOpen(false)
                        setStatus('')
                        setNote('')
                        socket.emit('reply', {
                           from: myID,
                           to: oneData.userId,
                        })
                        setIsLoading(false)
                     } else {
                        toast.error(result.data.data)
                     }
                  })
            }
         } catch (error) {
            if (process.env.REACT_APP_MODE) console.log(error)
         }
      } else {
         toast.error('Loading...')
      }
   }

   const getOneRequest = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getOneRequest`, { id })
            .then((result) => {
               if (result.data.status) {
                  let data = result.data.data
                  data.availableCredit = result.data.available
                  data.chargedCredit = result.data.charged
                  setOneData(data)
                  if (result.data.charged > 0) setCredit(result.data.charged)
                  setNote(data.note)
                  setOpen(true)
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const handleClose = () => setOpen(false)

   const getRequests = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getRequests`)
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

   const changeStatus = async (id, userId, orderId) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}changeStatus`, { id })
            .then((result) => {
               if (result.data.status) {
                  toast.success(result.data.data)
                  socket.emit('reply', {
                     from: myID,
                     to: userId,
                     orderId,
                  })
                  getRequests()
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getCustomDate = () => {
      const d = new Date()
      const weekdaylist = [
         'Sunday',
         'Monday',
         'Tuesday',
         'Wednesday',
         'Thursday',
         'Friday',
         'Saturday',
      ]
      let year = d.getFullYear()
      let month = d.getMonth() + 1
      let day = d.getDate()
      let hour = d.getHours()
      let minute = d.getMinutes()

      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      if (hour < 10) hour = '0' + hour
      if (minute < 10) minute = '0' + minute
      const ampm = hour >= 12 ? 'pm' : 'am'

      return `${day}-${month}-${year} ${hour}:${minute} ${ampm}`
   }

   const deleteFile = () => {
      setFileData({})
      setFileOpen(false)
   }

   useEffect(() => {
      getRequests()
   }, [])

   useEffect(() => {
      if (status === 'completed') {
         setUploadBtnFlag(false)
         setCreditBtnFlag(false)
      } else if (status === 'in-progress') {
         setUploadBtnFlag(true)
         setCreditBtnFlag(true)
      } else {
         setUploadBtnFlag(true)
         setCreditBtnFlag(true)
      }
   }, [status])

   useEffect(() => {
      if (account._id) {
         setMyID(account._id)
      }
   }, [account])

   useEffect(() => {
      if (fileData?.name) setFileOpen(true)
      else setFileOpen(false)
   }, [fileData])

   return (
      <Paper
         sx={{
            width: '100%',
            overflow: 'hidden',
            p: 3,
            overflowY: 'overlay',
         }}
      >
         Requests
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
                  {allData
                     .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                     )
                     .map((row) => {
                        return (
                           <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row._id}
                           >
                              {columns.map((column) => {
                                 let value = ''
                                 if (column.id === 'buildYear') {
                                    const d = new Date(row.buildYear)
                                    value = d.getFullYear()
                                 } else {
                                    value = row[column.id]
                                 }
                                 return (
                                    <TableCell
                                       key={column.id}
                                       align={column.align}
                                    >
                                       {column.id === 'action' ? (
                                          <ButtonGroup
                                             variant="outlined"
                                             aria-label="outlined button group"
                                          >
                                             {row.status === 'requested' ? (
                                                <IconButton
                                                   onClick={() =>
                                                      changeStatus(
                                                         row._id,
                                                         row.userId,
                                                         row.orderId
                                                      )
                                                   }
                                                   color="primary"
                                                   aria-label="add to shopping cart"
                                                >
                                                   <AutoModeIcon />
                                                </IconButton>
                                             ) : (
                                                <></>
                                             )}
                                             <IconButton
                                                onClick={() =>
                                                   getOneRequest(row._id)
                                                }
                                                color="primary"
                                                aria-label="add to shopping cart"
                                             >
                                                <VisibilityIcon />
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
            count={allData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Box
                  sx={{
                     px: 3,
                     py: 1,
                     bgcolor: '#1976d2',
                     borderRadius: 1,
                     color: 'white',
                     display: 'flex',
                     alignItems: 'center',
                     position: 'fixed',
                     width: '100%',
                  }}
               >
                  <Box>View Complete Service Request</Box>
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
               <Box
                  sx={{
                     p: 3,
                     mt: 9,
                     height: '70vh',
                     overflowY: 'overlay',
                  }}
               >
                  <Box>
                     <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                     >
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
                                             <Box className="filename-string">
                                                {fileData?.name}
                                             </Box>
                                             <Box>
                                                {(
                                                   fileData?.size / 1000000
                                                ).toFixed(4)}{' '}
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
                                    disabled={uploadBtnFlag}
                                    onClick={handleFileload}
                                 >
                                    Browse File
                                 </Button>
                              </Box>
                           </Box>
                           <Box>
                              Available Credits: {oneData.availableCredit}
                           </Box>
                           <Box>Charged Credits: {oneData.chargedCredit}</Box>
                           <Box>
                              Update Status
                              <FormControl fullWidth size="small">
                                 <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                 >
                                    <MenuItem value="completed">
                                       Completed
                                    </MenuItem>
                                    <MenuItem value="in-progress">
                                       In Progress
                                    </MenuItem>
                                    <MenuItem value="cancelled">
                                       Cancelled
                                    </MenuItem>
                                 </Select>
                              </FormControl>
                           </Box>
                           <Box>
                              Note
                              <TextField
                                 id="outlined-basic"
                                 placeholder={
                                    oneData.chargedCredit > 0
                                       ? `X-note : ${oneData.note}`
                                       : 'Add a short note'
                                 }
                                 variant="outlined"
                                 size="small"
                                 fullWidth
                                 value={note}
                                 onChange={(e) => setNote(e.target.value)}
                              />
                           </Box>
                           <Box>
                              CHARGE CREDITS
                              <TextField
                                 id="outlined-basic"
                                 type="number"
                                 variant="outlined"
                                 size="small"
                                 fullWidth
                                 disabled={creditBtnFlag}
                                 value={credit}
                                 onChange={(e) => setCredit(e.target.value)}
                              />
                           </Box>
                           <Box>
                              <Button
                                 variant="contained"
                                 size="small"
                                 fullWidth
                                 endIcon={<ArrowForwardIcon />}
                                 onClick={upload}
                              >
                                 {isLoading ? (
                                    <BeatLoader color="#fff" size={10} />
                                 ) : (
                                    'Upload'
                                 )}
                              </Button>
                           </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                           <Box>
                              <Box
                                 sx={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                 }}
                              >
                                 Request From ({oneData?.client})
                              </Box>
                              <Divider />
                              <Grid lineHeight={'4px'}>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>Name:</Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.client}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          Vehicle Type:
                                       </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.vehicleType}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          Vehicle Series:
                                       </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.vehicleSeries}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          Vehicle Engine:
                                       </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.vehicleEngine}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>HP:</Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.HP}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>KW:</Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.KW}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          Build Year:
                                       </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {new Date(
                                             oneData?.buildYear
                                          ).getFullYear()}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          Transmission:
                                       </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.transmission}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>Chassis#:</Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.chasis}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          Tunnig Type:
                                       </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.tuningType}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          Read Method:
                                       </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.readMethod}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          ECU Producer:
                                       </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.ECUProducer}
                                       </Box>
                                    </Grid>
                                 </Grid>

                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>ECU Build:</Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.ECUBuild}
                                       </Box>
                                    </Grid>
                                 </Grid>
                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>Used Tool:</Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.usedTool}
                                       </Box>
                                    </Grid>
                                 </Grid>

                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          Work Status:
                                       </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>
                                          {oneData?.status}
                                       </Box>
                                    </Grid>
                                 </Grid>

                                 <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                 >
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box sx={{ my: '20px' }}>Message:</Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                       <Box
                                          sx={{
                                             my: '20px',
                                             overflowWrap: 'break-word',
                                             lineHeight: '20px',
                                          }}
                                       >
                                          {oneData?.message}
                                       </Box>
                                    </Grid>
                                 </Grid>
                              </Grid>

                              <Grid
                                 container
                                 spacing={{ xs: 2, md: 3 }}
                                 columns={{ xs: 4, sm: 8, md: 12 }}
                              >
                                 <Grid item xs={12} sm={12} md={12}>
                                    <Box
                                       sx={{
                                          my: '20px',
                                          fontSize: '20px',
                                          fontWeight: '600',
                                       }}
                                    >
                                       Upload
                                    </Box>
                                    <ul>
                                       <li>
                                          <a
                                             href={`${process.env.REACT_APP_BASE_URL}/fileService/${oneData?.fileRename[0]}`}
                                             download={oneData?.fileName[0]}
                                          >
                                             {oneData?.fileName[0]}
                                          </a>
                                       </li>
                                    </ul>
                                 </Grid>
                              </Grid>
                              <Grid
                                 container
                                 spacing={{ xs: 2, md: 3 }}
                                 columns={{ xs: 4, sm: 8, md: 12 }}
                              >
                                 <Grid item xs={12} sm={12} md={12}>
                                    <Box
                                       sx={{
                                          my: '20px',
                                          fontSize: '20px',
                                          fontWeight: '600',
                                       }}
                                    >
                                       Uploaded by Support team
                                    </Box>
                                    <ul>
                                       {oneData?.fileName.map((item, ind) => {
                                          if (ind === 0) return
                                          return (
                                             <li key={ind}>
                                                <a
                                                   href={`${process.env.REACT_APP_BASE_URL}/fileService/${oneData?.fileRename[ind]}`}
                                                   download={item}
                                                >
                                                   {item}
                                                </a>
                                             </li>
                                          )
                                       })}
                                    </ul>
                                 </Grid>
                              </Grid>
                           </Box>
                        </Grid>
                     </Grid>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </Paper>
   )
}

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
import toast, { Toaster } from 'react-hot-toast'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import axios from 'axios'

const columns = [
   { id: 'orderId', label: 'ID', minWidth: 50 },
   { id: 'client', label: 'Client', minWidth: 50 },
   { id: 'vehicleType', label: 'Vehicle Type', minWidth: 100 },
   { id: 'buildYear', label: 'Build Year', minWidth: 150 },
   { id: 'HP', label: 'HP', minWidth: 100 },
   { id: 'status', label: 'Status', minWidth: 50 },
   { id: 'tuningType', label: 'Tuning Type', minWidth: 100 },
   { id: 'action', label: 'Action' },
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
   const [page, setPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)
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
   })
   const [status, setStatus] = useState('')
   const [note, setNote] = useState('')
   const [credit, setCredit] = useState(0)

   const [fileData, setFileData] = useState({})
   const inputElement = useRef('fileInput')
   const handleFileload = () => {
      inputElement.current.click()
   }
   const getFile = async (e) => {
      setFileData(e.target.files[0])
   }

   const upload = async () => {
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
      if (credit <= 0) {
         toast.error('Field the credit')
         return
      }
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
         .post(`${process.env.REACT_APP_API_Url}updateUpload`, params)
         .then((result) => {
            if (result.data.status) {
               toast.success(result.data.data)
               getRequests()
               setOpen(false)
               setFileData('')
               setStatus('')
               setNote('')
               setCredit(0)
            } else {
               toast.error(result.data.data)
            }
         })
   }

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   const [open, setOpen] = useState(false)
   const handleOpen = async (id) => {
      console.log(id)
      await axios
         .post(`${process.env.REACT_APP_API_Url}getOneRequest`, { id })
         .then((result) => {
            if (result.data.status) {
               console.log(result.data.data[0])
               setOneData(result.data.data[0])
               setOpen(true)
            } else {
               toast.error(result.data.data)
            }
         })
   }
   const handleClose = () => setOpen(false)

   const getRequests = async () => {
      await axios
         .post(`${process.env.REACT_APP_API_Url}getRequests`)
         .then((result) => {
            if (result.data.status) {
               setAllData(result.data.data)
            } else {
               toast.error(result.data.data)
            }
         })
   }

   const changeStatus = async (id) => {
      await axios
         .post(`${process.env.REACT_APP_API_Url}changeStatus`, { id })
         .then((result) => {
            if (result.data.status) {
               toast.success(result.data.data)
               getRequests()
            } else {
               toast.error(result.data.data)
            }
         })
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
      let month = d.getMonth()
      let day = d.getDate()
      let hour = d.getHours()
      let minute = d.getMinutes()

      if (month < 10) month = '0' + (month + 1)
      if (day < 10) day = '0' + day
      if (hour < 10) hour = '0' + hour
      if (minute < 10) minute = '0' + minute
      const ampm = hour >= 12 ? 'pm' : 'am'

      const result = `${day}-${month}-${year} ${hour}:${minute} ${ampm}`
      return result
   }

   useEffect(() => {
      getRequests()
   }, [])

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
                                 const value = row[column.id]
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
                                                      changeStatus(row._id)
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
                                                   handleOpen(row._id)
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
                           </Box>
                           <Box>Available Credits: 1000000</Box>
                           <Box>Charged Credits: 0</Box>
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
                                    <MenuItem value="in-prograss">
                                       In Process
                                    </MenuItem>
                                 </Select>
                              </FormControl>
                           </Box>
                           <Box>
                              Note
                              <TextField
                                 id="outlined-basic"
                                 placeholder="X-node : Tar 100 span till"
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
                                 placeholder=""
                                 variant="outlined"
                                 size="small"
                                 fullWidth
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
                                 Upload
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
                                 Request From(Herman Performance)
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
                                          {oneData?.buildYear}
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
                                       <Box sx={{ my: '20px' }}>
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
                                             href={`${process.env.REACT_APP_Base_Url}/fileService/${oneData?.fileRename[0]}`}
                                             download
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
                                                   href={`${process.env.REACT_APP_Base_Url}/fileService/${oneData?.fileRename[ind]}`}
                                                   download
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
         <Toaster />
      </Paper>
   )
}

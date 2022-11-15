import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { ButtonGroup, IconButton, InputAdornment, Modal } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import ChatIcon from '@mui/icons-material/Chat'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import TablePagination from '@mui/material/TablePagination'
import toast, { Toaster } from 'react-hot-toast'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'

const columns = [
   { id: 'orderId', label: 'Order Id', minWidth: 100 },
   { id: 'createdAt', label: 'Created at', minWidth: 120 },
   {
      id: 'vehicleInformation',
      label: 'Vehicle Information',
      minWidth: 200,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
   },
   {
      id: 'note',
      label: 'Note',
      minWidth: 200,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
   },
   {
      id: 'status',
      label: 'Request Status',
      minWidth: 120,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
   },
   {
      id: 'downloadFiles',
      label: 'Download Files',
      minWidth: 50,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
   },
   {
      id: 'support',
      label: 'Support',
      minWidth: 50,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
   },
]

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

export default function Overview() {
   const account = useSelector((state) => state.account)
   const [page, setPage] = React.useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [allData, setAllData] = useState([])
   const [filterSetting, setFilterSetting] = useState('all')
   const [OrderID, setOrderID] = useState('')
   const [downloadList, setDownloadList] = useState({
      origin: [],
      rename: [],
   })
   const [open1, setOpen1] = useState(false)

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   const getDataByOrderID = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_Url}getDataByOrderID`, {
               order: OrderID,
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
         console.log(error)
      }
   }

   const getDataByFilter = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_Url}getDataByFilter`, {
               filter: filterSetting,
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
         console.log(error)
      }
   }

   const handleOpen1 = async (origin, rename) => {
      setDownloadList({
         origin,
         rename,
      })
      setOpen1(true)
   }

   const handleClose1 = () => {
      setOpen1(false)
   }

   useEffect(() => {
      if (account._id) {
         if (!OrderID) {
            getDataByFilter(account._id)
         } else {
            getDataByOrderID(account._id)
         }
      }
   }, [OrderID, filterSetting, account])

   return (
      <Box
         sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: 'rgb(229, 229, 229)',
            overflowY: 'overlay',
         }}
      >
         <Box sx={{ mt: '80px' }}>
            <h3 style={{ margin: '0px' }}>Files Overview</h3>
         </Box>
         <Box
            sx={{
               mt: '10px',
               borderTop: '5px solid #ffc800',
               bgcolor: 'white',
               borderBottomRightRadius: '5px',
               borderBottomLeftRadius: '5px',
               p: '10px',
            }}
         >
            <Grid
               container
               spacing={{ xs: 2, md: 3 }}
               columns={{ xs: 4, sm: 8, md: 12 }}
            >
               <Grid item xs={12} sm={6} md={6}>
                  <TextField
                     fullWidth
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <SearchIcon />
                           </InputAdornment>
                        ),
                     }}
                     placeholder="Search by Order Id"
                     size="small"
                     value={OrderID}
                     onChange={(e) => setOrderID(e.target.value)}
                  />
               </Grid>
               <Grid item xs={12} sm={3} md={3}></Grid>
               <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
               >
                  <FormControl fullWidth>
                     <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterSetting}
                        onChange={(e) => setFilterSetting(e.target.value)}
                     >
                        <MenuItem value="all">All Requests</MenuItem>
                        <MenuItem value="completed">Complete Requests</MenuItem>
                        <MenuItem value="in-progress">
                           Pending Requests
                        </MenuItem>
                     </Select>
                  </FormControl>
               </Grid>
            </Grid>
            <TableContainer
               sx={{
                  maxHeight: 440,
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
                                          {column.id === 'support' ? (
                                             <ButtonGroup
                                                variant="outlined"
                                                aria-label="outlined button group"
                                             >
                                                <IconButton
                                                   color="primary"
                                                   aria-label="add to shopping cart"
                                                >
                                                   <ChatIcon />
                                                </IconButton>
                                             </ButtonGroup>
                                          ) : column.id === 'downloadFiles' ? (
                                             <ButtonGroup
                                                variant="outlined"
                                                aria-label="outlined button group"
                                                onClick={() =>
                                                   handleOpen1(
                                                      row.fileName,
                                                      row.fileRename
                                                   )
                                                }
                                             >
                                                <IconButton
                                                   color="primary"
                                                   aria-label="add to shopping cart"
                                                >
                                                   <DownloadForOfflineIcon />
                                                </IconButton>
                                             </ButtonGroup>
                                          ) : column.id ===
                                            'vehicleInformation' ? (
                                             <div style={{ lineHeight: '6px' }}>
                                                <p>{row.vehicleType}</p>
                                                <p>{row.vehicleBrand}</p>
                                                <p>{row.transmission}</p>
                                             </div>
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
                  <Box>File Overview</Box>
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
               <Box sx={{ px: 3 }}>
                  <h3>Click link to Download File</h3>
                  <Box pt={2}>
                     <Box>User Files</Box>
                     <ul>
                        <li>
                           <a
                              href={`${process.env.REACT_APP_Base_Url}/fileService/${downloadList?.rename[0]}`}
                              download
                           >
                              {downloadList?.origin[0]}
                           </a>
                        </li>
                     </ul>
                  </Box>
                  {downloadList?.rename.length > 0 ? (
                     <Box pt={2}>
                        <Box>Admin Files</Box>
                        <ul style={{ overflowY: 'auto', height: '100px' }}>
                           {downloadList.origin.map((item, ind) => {
                              if (ind === 0) return
                              return (
                                 <li key={ind}>
                                    <a
                                       href={`${process.env.REACT_APP_Base_Url}/fileService/${downloadList.rename[ind]}`}
                                       download
                                    >
                                       {item}
                                    </a>
                                 </li>
                              )
                           })}
                        </ul>
                     </Box>
                  ) : (
                     <></>
                  )}
               </Box>
            </Box>
         </Modal>
         <Toaster />
      </Box>
   )
}

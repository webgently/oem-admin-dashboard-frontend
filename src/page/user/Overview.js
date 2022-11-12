import React, { useEffect, useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { ButtonGroup, IconButton, InputAdornment } from '@mui/material'
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
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import { alpha } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import TablePagination from '@mui/material/TablePagination'
import axios from 'axios'
import toast from 'react-hot-toast'

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

const StyledMenu = styled((props) => (
   <Menu
      elevation={0}
      anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'center',
      }}
      transformOrigin={{
         vertical: 'top',
         horizontal: 'center',
      }}
      {...props}
   />
))(({ theme }) => ({
   '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
         theme.palette.mode === 'light'
            ? 'rgb(55, 65, 81)'
            : theme.palette.grey[300],
      boxShadow:
         'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
         padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
         '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
         },
         '&:active': {
            backgroundColor: alpha(
               theme.palette.primary.main,
               theme.palette.action.selectedOpacity
            ),
         },
      },
   },
}))

export default function Overview() {
   const [page, setPage] = React.useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [allData, setAllData] = useState([])
   const [filterSetting, setFilterSetting] = useState('all')
   const [OrderID, setOrderID] = useState('')

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   const getDataByOrderID = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_Url}getDataByOrderID`, {
               data: OrderID,
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

   const getDataByFilter = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_Url}getDataByFilter`, {
               data: filterSetting,
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

   useEffect(() => {
      if (!OrderID) {
         getDataByFilter()
      } else {
         getDataByOrderID()
      }
   }, [OrderID, filterSetting])

   return (
      <Box
         sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: 'rgb(229, 229, 229)',
            overflowY: 'overlay',
         }}
      >
         <Box sx={{ mt: '130px' }}>
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
                                             >
                                                <IconButton
                                                   color="primary"
                                                   aria-label="add to shopping cart"
                                                >
                                                   <a
                                                      href={`${process.env.REACT_APP_Base_Url}/fileService/${row.fileRename}`}
                                                      download
                                                   >
                                                      <DownloadForOfflineIcon />
                                                   </a>
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
      </Box>
   )
}

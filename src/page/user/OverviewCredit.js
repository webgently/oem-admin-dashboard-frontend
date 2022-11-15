import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Button, InputAdornment } from '@mui/material'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'
import toast from 'react-hot-toast'

const columns = [
   { id: 'orderId', label: 'Id', minWidth: 200 },
   { id: 'credit', label: 'Credit', minWidth: 200 },
   { id: 'date', label: 'Date/Time', minWidth: 50 },
]

export default function OverviewCredit() {
   const account = useSelector((state) => state.account)
   const navigate = useNavigate()
   const [page, setPage] = React.useState(0)
   const [rowsPerPage, setRowsPerPage] = React.useState(10)
   const [userId, setUserId] = useState('')
   const [OrderID, setOrderID] = useState('')
   const [allData, setAllData] = useState([])

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   const getCreditHistory = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_Url}getCreditHistory`, {
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

   const getCreditByOrderID = async () => {
      await axios
         .post(`${process.env.REACT_APP_API_Url}getCreditByOrderID`, {
            order: OrderID,
            id: userId,
         })
         .then((result) => {
            if (result.data.status) {
               setAllData(result.data.data)
            } else {
               toast.error(result.data.data)
            }
         })
   }

   useEffect(() => {
      if (account._id) {
         setUserId(account._id)
         if (OrderID) {
            getCreditByOrderID()
         } else {
            getCreditHistory(account._id)
         }
      }
   }, [OrderID])

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
            <h3 style={{ margin: '0px' }}>Credit History</h3>
         </Box>
         <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
         >
            <Grid item xs={12} sm={8} md={8}>
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
                                    <TableRow key={row._id}>
                                       {columns.map((column) => {
                                          const value = row[column.id]
                                          return (
                                             <TableCell
                                                key={column.id}
                                                align={column.align}
                                             >
                                                {value}
                                             </TableCell>
                                          )
                                       })}
                                    </TableRow>
                                 )
                              })}
                        </TableBody>
                     </Table>
                  </TableContainer>
                  {allData.length < 0 ? (
                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           m: '40px',
                           alignItems: 'center',
                        }}
                     >
                        <InsertDriveFileIcon
                           sx={{ fontSize: '60px', color: 'gray' }}
                        />
                        No Credit History
                     </Box>
                  ) : (
                     <></>
                  )}
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
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
               <Box
                  sx={{
                     mt: '10px',
                     borderTop: '5px solid red',
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
                     <Grid item xs={12} sm={12} md={12}>
                        <h3 style={{ color: 'gray', margin: '0px' }}>
                           Buy Credits
                        </h3>
                     </Grid>
                  </Grid>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: '40px',
                        alignItems: 'center',
                     }}
                  >
                     <InsertDriveFileIcon
                        sx={{ fontSize: '60px', color: 'gray' }}
                     />
                     No Credit History
                  </Box>
                  <Box>
                     <Button
                        fullWidth
                        className="btn_red"
                        sx={{ color: 'white' }}
                        size="small"
                        onClick={() => navigate('/buyCredit')}
                     >
                        Buy Now
                     </Button>
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </Box>
   )
}

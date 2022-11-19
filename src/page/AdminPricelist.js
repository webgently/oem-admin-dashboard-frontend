import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import {
   Box,
   Button,
   ButtonGroup,
   FormControl,
   IconButton,
   MenuItem,
   Modal,
   Select,
   TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import toast from 'react-hot-toast'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

const columns = [
   { id: 'id', label: 'ID', minWidth: 50 },
   { id: 'serviceType', label: 'Service Type', minWidth: 100 },
   { id: 'service', label: 'Service', minWidth: 150 },
   { id: 'credit', label: 'Credit', minWidth: 100 },
   { id: 'action', label: 'Action', minWidth: 50, align: 'center' },
]

const ServiceStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '30vw',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

export default function AdminPricelist() {
   const [page, setPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   const [serviceTypeData, setServiceTypeData] = useState([])
   const [currentServiceType, setCurrentServiceType] = useState('')
   const [pricesData, setPricesData] = useState([])
   const [modalBtnText, setModalBtnText] = useState('')
   const [credit, setCredit] = useState('')
   const [service, setService] = useState('')
   const [currentID, setCurrentID] = useState()
   const [open, setOpen] = useState(false)

   const handleOpen = (flag, id) => {
      getServeType()
      setCredit('')
      setService('')
      setCurrentServiceType('')
      setModalBtnText(flag)
      if (flag === 'update') {
         getOnePrice(id)
         setCurrentID(id)
      }
      setOpen(true)
   }

   const handleClose = () => setOpen(false)

   const getServeType = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getServiceType`)
            .then((result) => {
               setServiceTypeData(result.data)
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const savePriceType = (flag) => {
      if (!currentServiceType) {
         toast.error('Select Service Type')
         return
      }
      if (!credit) {
         toast.error('Input credit')
         return
      }
      if (!service) {
         toast.error('Input Service')
         return
      }
      if (flag === 'add') addPrice()
      else updatePrice(currentID)
   }

   const addPrice = async () => {
      let data = { serviceType: currentServiceType, service, credit }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}addPrice`, {
               data: data,
            })
            .then((result) => {
               if (result.status) {
                  setPricesData([...pricesData, result.data.data])
                  setOpen(false)
                  toast.success('Price List Create Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const updatePrice = async (id) => {
      let data = { _id: id, serviceType: currentServiceType, service, credit }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updatePrice`, {
               data: data,
            })
            .then((result) => {
               if (result.data === 'success') {
                  getAllPrice()
                  setOpen(false)
                  toast.success('Price List Update Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const deletePrice = async (row) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}deletePrice`, {
               _id: row._id,
            })
            .then((result) => {
               if (result.data === 'success') {
                  getAllPrice()
                  toast.success('Price List Delete Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getOnePrice = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getOnePrice`, {
               _id: id,
            })
            .then((result) => {
               if (result) {
                  setCredit(result.data.credit)
                  setService(result.data.service)
                  setCurrentServiceType(result.data.serviceType)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getAllPrice = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getAllPrice`)
            .then((result) => {
               if (result) {
                  setPricesData(result.data)
               } else {
                  toast.error('Interanal server error')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   useEffect(() => {
      getAllPrice()
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
         Price Control Section
         <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ flex: '1' }}></Box>
            <Box>
               <Button
                  variant="contained"
                  endIcon={<AddIcon />}
                  onClick={() => handleOpen('add', 0)}
               >
                  Price
               </Button>
            </Box>
         </Box>
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
                  {pricesData
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
                              key={row._id}
                           >
                              {columns.map((column) => {
                                 const value = row[column.id]
                                 return (
                                    <TableCell
                                       key={column.id}
                                       align={column.align}
                                    >
                                       {column.id === 'id' ? (
                                          ind + 1
                                       ) : column.id === 'action' ? (
                                          <ButtonGroup
                                             variant="outlined"
                                             aria-label="outlined button group"
                                             key={column.id}
                                          >
                                             <IconButton
                                                onClick={() => {
                                                   handleOpen('update', row._id)
                                                }}
                                                color="primary"
                                                aria-label="add to shopping cart"
                                             >
                                                <EditIcon />
                                             </IconButton>
                                             <IconButton
                                                color="primary"
                                                aria-label="add to shopping cart"
                                                onClick={() => deletePrice(row)}
                                             >
                                                <DeleteIcon />
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
            count={pricesData.length}
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
                  <Box>
                     {modalBtnText === 'add' ? 'Create' : 'Edit'} Price List
                  </Box>
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
                  <Box>
                     <FormControl fullWidth size="small">
                        <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={currentServiceType}
                           onChange={(e) =>
                              setCurrentServiceType(e.target.value)
                           }
                        >
                           {serviceTypeData.map((item) => {
                              return (
                                 <MenuItem
                                    value={item.serviceType}
                                    key={item._id}
                                 >
                                    {item.serviceType}
                                 </MenuItem>
                              )
                           })}
                        </Select>
                     </FormControl>
                  </Box>
                  <Box sx={{ mt: '20px' }}>
                     <TextField
                        id="outlined-basic"
                        label="Service"
                        variant="outlined"
                        size="small"
                        value={service}
                        fullWidth
                        onChange={(e) => setService(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ mt: '20px' }}>
                     <TextField
                        id="outlined-number"
                        label="Credit"
                        type="number"
                        size="small"
                        variant="outlined"
                        value={credit}
                        fullWidth
                        onChange={(e) => setCredit(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                     <Box sx={{ flex: '1' }}></Box>
                     <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
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
                           onClick={() => savePriceType(modalBtnText)}
                        >
                           {modalBtnText}
                        </Button>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </Paper>
   )
}

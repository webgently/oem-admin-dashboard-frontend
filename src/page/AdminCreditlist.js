import React, { useState, useEffect } from 'react'
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
   IconButton,
   Modal,
   TextField,
} from '@mui/material'
import KRIcon from '../assets/img/kr.svg'
import CloseIcon from '@mui/icons-material/Close'
import toast from 'react-hot-toast'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

const columns = [
   { id: 'id', label: 'ID', minWidth: 150 },
   { id: 'credit', label: 'Credit', minWidth: 150 },
   { id: 'price', label: 'Price', minWidth: 150 },
   { id: 'action', label: 'Action', minWidth: 50, align: 'center' },
]

const ServiceStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '320px',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

export default function AdminCreditlist() {
   const [page, setPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   const [creditsData, setCreditsData] = useState([])
   const [modalBtnText, setModalBtnText] = useState('')
   const [credit, setCredit] = useState('')
   const [price, setPrice] = useState('')
   const [currentID, setCurrentID] = useState()
   const [open, setOpen] = useState(false)

   const [handleFee, setHandleFee] = useState(0)
   const [feeID, setFeeID] = useState('')
   const [handleFeeOpen, setHandleFeeOpen] = useState(false)

   const handleOpenGetFee = async () => {
      setHandleFeeOpen(true)
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getFee`)
            .then((result) => {
               setHandleFee(result.data.fee)
               setFeeID(result.data._id)
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const handleCloseAddservice = () => setHandleFeeOpen(false)

   const updateFee = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updateFee`, {
               id: feeID,
               handleFee,
            })
            .then((result) => {
               if (result.status) {
                  setHandleFeeOpen(false)
                  toast.success('Handling Fee Updated Successfully')
               } else toast.error('Interanal server error')
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const handleOpen = (flag, id) => {
      setCredit('')
      setPrice('')
      setModalBtnText(flag)
      if (flag === 'update') {
         getOneCredit(id)
         setCurrentID(id)
      }
      setOpen(true)
   }

   const handleClose = () => setOpen(false)

   const saveCreditType = (flag) => {
      if (!credit) {
         toast.error('Input credit')
         return
      }
      if (!price) {
         toast.error('Input price')
         return
      }
      if (flag === 'add') addCredit()
      else updateCredit(currentID)
   }

   const addCredit = async () => {
      let data = { credit, price }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}createCredit`, {
               data: data,
            })
            .then((result) => {
               if (result.status) {
                  setCreditsData([...creditsData, result.data.data])
                  setOpen(false)
                  toast.success('Credit Category Create Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const updateCredit = async (id) => {
      let data = { _id: id, credit, price }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updateCredit`, {
               data: data,
            })
            .then((result) => {
               if (result.data === 'success') {
                  getAllCredit()
                  setOpen(false)
                  toast.success('Credit Category Update Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const deleteCredit = async (row) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}deleteCredit`, {
               _id: row._id,
            })
            .then((result) => {
               if (result.data === 'success') {
                  getAllCredit()
                  toast.success('Credit Category Delete Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getOneCredit = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getOneCredit`, {
               _id: id,
            })
            .then((result) => {
               if (result) {
                  setCredit(result.data.credit)
                  setPrice(result.data.price)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getAllCredit = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getAllCredit`)
            .then((result) => {
               if (result) {
                  setCreditsData(result.data)
               } else {
                  toast.error('Interanal server error')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   useEffect(() => {
      getAllCredit()
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
         Credits
         <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ flex: '1' }}></Box>
            <Box>
               <Button
                  sx={{ mr: '20px' }}
                  variant="contained"
                  endIcon={<AddIcon />}
                  onClick={handleOpenGetFee}
               >
                  Handling Fee
               </Button>
               <Button
                  variant="contained"
                  endIcon={<AddIcon />}
                  onClick={() => handleOpen('add', 0)}
               >
                  Credit
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
                  {creditsData
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
                                          ind + 1 + page * rowsPerPage
                                       ) : column.id === 'action' ? (
                                          <ButtonGroup
                                             variant="outlined"
                                             aria-label="outlined button group"
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
                                                onClick={() =>
                                                   deleteCredit(row)
                                                }
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
            count={creditsData.length}
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
                  <Box>{modalBtnText === 'add' ? 'Create' : 'Edit'} Credit</Box>
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
                     <TextField
                        id="outlined-number"
                        label="Credit"
                        type="number"
                        size="small"
                        variant="outlined"
                        fullWidth
                        value={credit}
                        onChange={(e) => setCredit(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ mt: '20px' }}>
                     <TextField
                        id="outlined-number"
                        label="Price"
                        size="small"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
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
                           onClick={() => saveCreditType(modalBtnText)}
                        >
                           {modalBtnText}
                        </Button>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Modal>
         <Modal
            open={handleFeeOpen}
            onClose={handleCloseAddservice}
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
                  <Box>Handling Fee Section</Box>
                  <Box sx={{ flex: '1' }}></Box>
                  <Box>
                     <IconButton
                        onClick={() => {
                           handleCloseAddservice()
                        }}
                     >
                        <CloseIcon sx={{ color: 'white' }} />
                     </IconButton>
                  </Box>
               </Box>
               <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                     <Box sx={{ flex: '1' }}>
                        <Box sx={{ fontSize: '25px', color: 'green' }}>
                           Handling FEE
                        </Box>
                        <Box
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              fontSize: '20px',
                           }}
                        >
                           <img src={KRIcon} alt="kr" /> {handleFee}
                        </Box>
                     </Box>
                     <TextField
                        id="outlined-number"
                        label="Update Handling Fee"
                        size="small"
                        type="number"
                        fullWidth
                        sx={{ flex: '1' }}
                        value={handleFee}
                        onChange={(e) => setHandleFee(e.target.value)}
                     />
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                     <Box sx={{ flex: '1' }}></Box>
                     <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                        <Button
                           size="small"
                           variant="contained"
                           onClick={() => {
                              handleCloseAddservice()
                           }}
                        >
                           Close
                        </Button>
                        <Button
                           size="small"
                           variant="contained"
                           onClick={updateFee}
                        >
                           Update Fee
                        </Button>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </Paper>
   )
}

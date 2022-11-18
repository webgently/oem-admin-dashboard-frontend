import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
import { Box, ButtonGroup, Divider, IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import toast, { Toaster } from 'react-hot-toast'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DownloadIcon from '@mui/icons-material/Download'
import axios from 'axios'

const columns = [
   { id: 'id', label: 'ID', minWidth: 50 },
   { id: 'name', label: 'Name', minWidth: 50 },
   { id: 'email', label: 'Email', minWidth: 100 },
   { id: 'vatNumber', label: 'Vat Number', minWidth: 150 },
   { id: 'credits', label: 'Credit', minWidth: 150 },
   { id: 'netAmount', label: 'Net Amount', minWidth: 150 },
   { id: 'invoice', label: 'Invoice', minWidth: 150, align: 'center' },
   { id: 'action', label: 'Action', minWidth: 150, align: 'center' },
]

const ServiceStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '70vw',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

export default function AdminInvoice() {
   const [page, setPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   const [open, setOpen] = useState(false)

   const handleClose = () => setOpen(false)

   const [allData, setAllData] = useState([])
   const [oneData, setOneData] = useState({})
   const [invoice, setInvoice] = useState({
      receipt: '',
      paidAmount: 0,
      paidDate: '',
      paymentMethod: '',
      name: '',
      email: '',
      contact: '',
      vatNumber: '',
      accountStatus: '',
      region: '',
      country: '',
      city: '',
      address: '',
      zipCode: '',
      credits: '',
      price: '',
      handleFee: '',
      amountCharge: '',
      vatCharge: 0,
   })
   const getAllInvoice = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_Url}getAllInvoice`)
            .then((result) => {
               if (result.data.stauts) {
                  setAllData(result.data.data)
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         console.log(error)
      }
   }

   const getOneInvoice = async (id, userId) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_Url}getOneInvoice`, {
               id,
               userId,
            })
            .then((result) => {
               if (result.data.status) {
                  const result1 = result.data.result1
                  const result2 = result.data.result2
                  setInvoice({
                     receipt: result1.receipt,
                     paidAmount: result1.netAmount,
                     paidDate: result1.date,
                     paymentMethod: result1.method,
                     name: result2.name,
                     email: result2.email,
                     contact: result2.phone,
                     vatNumber: result2.vatNumber,
                     accountStatus: result2.status,
                     region: result2.subcontinent,
                     country: result2.country,
                     city: result2.city,
                     address: result2.address,
                     zipCode: result2.zcode,
                     credits: result1.credits,
                     price: result1.netAmount - result1.fee,
                     handleFee: result1.fee,
                     vatCharge: result1.vatCharge,
                     amountCharge: result1.netAmount,
                  })
                  setOpen(true)
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      getAllInvoice()
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
         Credit Invoices
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
                     .map((row, ind) => {
                        return (
                           <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={ind}
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
                                       ) : column.id === 'profile' ? (
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
                                                onClick={() =>
                                                   getOneInvoice(
                                                      row._id,
                                                      row.userId
                                                   )
                                                }
                                                color="primary"
                                                aria-label="add to shopping cart"
                                             >
                                                <RemoveRedEyeIcon />
                                             </IconButton>
                                          </ButtonGroup>
                                       ) : column.id === 'invoice' ? (
                                          <IconButton
                                             color="primary"
                                             aria-label="add to shopping cart"
                                          >
                                             <DownloadIcon />
                                          </IconButton>
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
            <Box sx={ServiceStyle}>
               <Box
                  sx={{
                     px: 4,
                     py: 1,
                     bgcolor: '#1976d2',
                     borderRadius: 1,
                     color: 'white',
                     display: 'flex',
                     alignItems: 'center',
                  }}
               >
                  <Box>Invoice Details</Box>
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
               <Box sx={{ p: 3, overflowY: 'auto', height: '80vh' }}>
                  <Box
                     sx={{
                        textAlign: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                     }}
                  >
                     Receipt from ZipTuning Team
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                     Receipt #: {invoice.receipt}
                  </Box>
                  <Box sx={{ display: 'flex', pt: 8 }}>
                     <Box sx={{ flex: '1' }}>
                        <Box
                           sx={{
                              fontSize: '15px',
                              fontWeight: 'bold',
                           }}
                        >
                           Amount Paid
                        </Box>
                        <Box>{invoice.paidAmount}</Box>
                     </Box>
                     <Box sx={{ flex: '1' }}>
                        <Box
                           sx={{
                              fontSize: '15px',
                              fontWeight: 'bold',
                           }}
                        >
                           Date Paid
                        </Box>
                        <Box>{invoice.paidDate}</Box>
                     </Box>
                     <Box sx={{ flex: '1' }}>
                        <Box
                           sx={{
                              fontSize: '15px',
                              fontWeight: 'bold',
                           }}
                        >
                           Payment Method
                        </Box>
                        <Box>{invoice.paymentMethod}</Box>
                     </Box>
                  </Box>
                  <Box sx={{ pt: 5, fontSize: '20px', fontWeight: 'bold' }}>
                     Customer Details
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', py: 3, px: 2 }}>
                     <Box sx={{ flex: '1' }}>
                        <Box sx={{ py: '5px' }}>Name:</Box>
                        <Box sx={{ py: '5px' }}>Email:</Box>
                        <Box sx={{ py: '5px' }}>Contact:</Box>
                        <Box sx={{ py: '5px' }}>VAT Number:</Box>
                        <Box sx={{ py: '5px' }}>Account Status:</Box>
                        <Box sx={{ py: '5px' }}>Region:</Box>
                        <Box sx={{ py: '5px' }}>Country:</Box>
                        <Box sx={{ py: '5px' }}>City:</Box>
                        <Box sx={{ py: '5px' }}>Address:</Box>
                        <Box sx={{ py: '5px' }}>Zip Code:</Box>
                     </Box>
                     <Box sx={{ flex: '1' }}>
                        <Box sx={{ py: '5px' }}>{invoice.name}</Box>
                        <Box sx={{ py: '5px' }}>{invoice.email}</Box>
                        <Box sx={{ py: '5px' }}>{invoice.contact}</Box>
                        <Box sx={{ py: '5px' }}>{invoice.vatNumber}</Box>
                        <Box sx={{ py: '5px' }}>{invoice.accountStatus}</Box>
                        <Box sx={{ py: '5px' }}>{invoice.region}</Box>
                        <Box sx={{ py: '5px' }}>{invoice.country}</Box>
                        <Box sx={{ py: '5px' }}>{invoice.city}</Box>
                        <Box sx={{ py: '5px' }}>{invoice.address}</Box>
                        <Box sx={{ py: '5px' }}>{invoice.zipCode}</Box>
                     </Box>
                  </Box>
                  <Box sx={{ pt: 2, fontSize: '20px', fontWeight: 'bold' }}>
                     Summary
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', p: 4 }}>
                     <Box sx={{ flex: '1' }}>
                        <Box sx={{ py: '5px' }}>
                           Bought {invoice.credits} Credits.
                        </Box>
                        <Divider />
                        <Box sx={{ py: '5px' }}>Handling Fee</Box>
                        <Divider />
                        <Box sx={{ py: '5px' }}>25% VAT Charges</Box>
                        <Divider />
                        <Box sx={{ py: '5px' }}>Amount Charged</Box>
                     </Box>
                     <Box sx={{ flex: '1' }}>
                        <Box sx={{ py: '5px' }}>
                           {invoice.paidAmount - invoice.handleFee}
                        </Box>
                        <Divider />
                        <Box sx={{ py: '5px' }}>{invoice.handleFee}</Box>
                        <Divider />
                        <Box sx={{ py: '5px' }}>{invoice.vatCharge}</Box>
                        <Divider />
                        <Box sx={{ py: '5px' }}>{invoice.paidAmount}</Box>
                     </Box>
                  </Box>
                  <br />
                  <br />
                  <Divider />
                  <Box
                     sx={{
                        py: 2,
                        fontSize: '20px',
                        textAlign: 'center',
                     }}
                  >
                     If you have any questions, contact us at jonas@ecmtweaks.se
                  </Box>
                  <Divider />
                  <Box
                     sx={{
                        py: 4,
                        fontSize: '20px',
                        textAlign: 'center',
                     }}
                  >
                     You're receiving this email because you made a purchase at
                     ZipTuning
                  </Box>
               </Box>
            </Box>
         </Modal>
         <Toaster />
      </Paper>
   )
}

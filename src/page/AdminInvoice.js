import React, { useEffect, useState } from 'react'
import Logo from '../assets/img/logo.jpg';
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
import toast from 'react-hot-toast'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DownloadIcon from '@mui/icons-material/Download'
import axios from 'axios'
import Pdf from 'react-to-pdf'

const columns = [
   { id: 'id', label: 'ID', minWidth: 100 },
   { id: 'name', label: 'Name', minWidth: 150 },
   { id: 'email', label: 'Email', minWidth: 150 },
   { id: 'vatNumber', label: 'Vat Number', minWidth: 150 },
   { id: 'credits', label: 'Credit', minWidth: 100 },
   { id: 'netAmount', label: 'Net Amount', minWidth: 100 },
   { id: 'action', label: 'Invoice', minWidth: 100, align: 'center' },
]

const ServiceStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '800px',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

export default function AdminInvoice() {
   const invoiceRef = React.createRef()
   const [page, setPage] = useState(0)
   const [open, setOpen] = useState(false)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [allData, setAllData] = useState([])
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
      adminMail: '',
   })

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   const handleClose = () => setOpen(false)

   const getAllInvoice = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getAllInvoice`)
            .then((result) => {
               if (result.data.stauts) {
                  setAllData(result.data.data)
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getOneInvoice = async (id, userId) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getOneInvoice`, {
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
                     adminMail: result.data.adminMail,
                  })
                  setOpen(true)
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
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
                                          ind + 1 + page * rowsPerPage
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
                     <Pdf
                        targetRef={invoiceRef}
                        filename={'invoice' + invoice.receipt + '.pdf'}
                     >
                        {({ toPdf }) => (
                           <IconButton onClick={toPdf}>
                              <DownloadIcon sx={{ color: 'white' }} />
                           </IconButton>
                        )}
                     </Pdf>
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
                     px: 5,
                     pt: 2,
                     overflowY: 'auto',
                     height: '840px',
                  }}
                  ref={invoiceRef}
               >
                  <Box style={{textAlign: 'center'}}>
                     <img src={Logo} width="75%" />
                  </Box>
                  <Box
                     sx={{
                        textAlign: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        paddingTop: 2,
                     }}
                  >
                     Receipt from OEM Automotive Svenska AB
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                     Reciept number: {invoice.receipt}
                  </Box>
                  <Box sx={{ display: 'flex', pt: 2, fontSize: '14px' }}>
                     <Box
                        sx={{
                           flex: '1',
                           display: 'flex',
                           justifyContent: 'center',
                        }}
                     >
                        <Box>
                           <Box
                              sx={{
                                 fontWeight: 'bold',
                              }}
                           >
                              Amount Paid
                           </Box>
                           <Box>{Number(invoice.paidAmount).toFixed(2)} SEK</Box>
                        </Box>
                     </Box>
                     <Box
                        sx={{
                           flex: '1',
                           display: 'flex',
                           justifyContent: 'center',
                        }}
                     >
                        <Box>
                           <Box
                              sx={{
                                 fontWeight: 'bold',
                              }}
                           >
                              Date Paid
                           </Box>
                           <Box>{invoice.paidDate}</Box>
                        </Box>
                     </Box>
                     <Box
                        sx={{
                           flex: '1',
                           display: 'flex',
                           justifyContent: 'center',
                        }}
                     >
                        <Box>
                           <Box
                              sx={{
                                 fontWeight: 'bold',
                              }}
                           >
                              Payment Method
                           </Box>
                           <Box>{invoice.paymentMethod}</Box>
                        </Box>
                     </Box>
                  </Box>
                  <Box sx={{ pt: 2, fontSize: '18px', fontWeight: 'bold' }}>
                     Customer Details
                  </Box>
                  <Divider style={{ borderColor: 'black' }} />
                  <Box
                     sx={{
                        display: 'flex',
                        py: 0.5,
                        px: 2,
                     }}
                  >
                     <Box sx={{ flex: '1', fontWeight: 'bold' }}>
                        <Box>Name:</Box>
                        <Box>Address:</Box>
                        <Box>Zip Code:</Box>
                        <Box>City:</Box>
                        <Box>Country:</Box>
                        <Box>Telephone:</Box>
                        <Box>VAT number:</Box>
                     </Box>
                     <Box sx={{ flex: '1' }}>
                        <Box>{invoice.name}</Box>
                        <Box>{invoice.address}</Box>
                        <Box>{invoice.zipCode}</Box>
                        <Box>{invoice.city}</Box>
                        <Box>{invoice.country}</Box>
                        <Box>{invoice.contact}</Box>
                        <Box>{invoice.vatNumber}</Box>
                     </Box>
                  </Box>
                  <Box sx={{ pt: 1, fontSize: '20px', fontWeight: 'bold' }}>
                     Summary
                  </Box>
                  <Divider style={{ borderColor: 'black' }} />
                  <Box sx={{ display: 'flex', px: 4, py: 2 }}>
                     <Box sx={{ flex: '1' }}>
                        <Box sx={{ py: '5px' }}>
                           {invoice.credits} Filservice credit(s)
                        </Box>
                        <Divider
                           style={{ borderColor: 'rgba(0, 0, 0, 0.2)' }}
                        />
                        <Box sx={{ py: '5px' }}>Handling fee</Box>
                        <Divider
                           style={{ borderColor: 'rgba(0, 0, 0, 0.2)' }}
                        />
                        <Box sx={{ py: '5px' }}>
                           VAT({Number((100 * invoice.vatCharge)/(invoice.paidAmount - invoice.handleFee - invoice.vatCharge))}%)
                        </Box>
                        {Number((100 * invoice.vatCharge) / (invoice.paidAmount - invoice.handleFee - invoice.vatCharge)) === 0 &&
                           <Box sx={{ py: '5px' }}>
                              Tax to be paid on reverse charge basis
                           </Box>
                        }
                        <Divider
                           style={{ borderColor: 'rgba(0, 0, 0, 0.2)' }}
                        />
                        <Box sx={{ py: '5px', fontWeight: 'bold' }}>
                           Amount Charged
                        </Box>
                     </Box>
                     <Box sx={{ flex: '1' }}>
                        <Box sx={{ py: '5px' }}>
                           {Number(invoice.paidAmount - invoice.handleFee - invoice.vatCharge).toFixed(2)}
                        </Box>
                        <Divider
                           style={{ borderColor: 'rgba(0, 0, 0, 0.2)' }}
                        />
                        <Box sx={{ py: '5px' }}>{Number(invoice.handleFee).toFixed(2)}</Box>
                        <Divider
                           style={{ borderColor: 'rgba(0, 0, 0, 0.2)' }}
                        />
                        <Box sx={{ py: '5px' }}>{Number(invoice.vatCharge).toFixed(2)}</Box>
                        {Number((100 * invoice.vatCharge) / (invoice.paidAmount - invoice.handleFee - invoice.vatCharge)) === 0 &&
                           <Box sx={{ py: '5px' }}>
                              &nbsp;
                           </Box>
                        }
                        <Divider
                           style={{ borderColor: 'rgba(0, 0, 0, 0.2)' }}
                        />
                        <Box sx={{ py: '5px', fontWeight: 'bold' }}>
                           {Number(invoice.paidAmount).toFixed(2)} SEK
                        </Box>
                     </Box>
                  </Box>
                  <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.5)' }} />
                  <Box
                     sx={{
                        py: 1,
                        fontSize: '16px',
                        textAlign: 'center',
                     }}
                  >
                     If you have any questions, contact us at{' '}
                     <span style={{ fontWeight: 'bold', color: 'blue', textDecoration: 'underline' }}>
                        {invoice.adminMail}
                     </span>
                  </Box>
                  <Divider style={{ borderColor: 'rgba(0, 0, 0, 0.5)' }} />
                  <Box
                     sx={{
                        py: 2,
                        fontSize: '16px',
                        textAlign: 'center',
                     }}
                  >
                     OEM Automotive Svenska AB – Org: 559417-9839 – VAT: SE559417983901
                  </Box>
               </Box>
            </Box>
         </Modal>
      </Paper>
   )
}

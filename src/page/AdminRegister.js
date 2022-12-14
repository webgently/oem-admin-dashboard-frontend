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
import {
   Box,
   Button,
   ButtonGroup,
   Divider,
   IconButton,
   Modal,
   TextField,
} from '@mui/material'
import KRIcon from '../assets/img/kr.svg'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import PercentIcon from '@mui/icons-material/Percent'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import CloseIcon from '@mui/icons-material/Close'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useConfirm } from 'material-ui-confirm'

const columns = [
   { id: 'id', label: 'No', minWidth: 50 },
   { id: 'profile', label: 'Profile', minWidth: 50 },
   { id: 'name', label: 'Name', minWidth: 50 },
   { id: 'email', label: 'Email', minWidth: 200 },
   { id: 'note', label: 'Note', minWidth: 120 },
   { id: 'permission', label: 'Role', minWidth: 50 },
   { id: 'date', label: 'Date', minWidth: 100 },
   { id: 'credit', label: 'Credits', minWidth: 50 },
   { id: 'tax', label: 'Tax', minWidth: 50 },
   { id: 'status', label: 'Status', minWidth: 50 },
   { id: 'action', label: 'Action', minWidth: 50, align: 'center' },
]

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '50vw',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

const style1 = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '400px',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}

export default function AdminRegister() {
   const [creditAddFlag, setCreditAddFlag] = useState(true)
   const confirm = useConfirm()
   const [page, setPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [userData, setUserData] = useState([])
   const [curNote, setCurNote] = useState(0)
   const [curId, setCurId] = useState(0)
   const [addCredit, setAddCredit] = useState(0)
   const [minusCredit, setMinusCredit] = useState(0)
   const [currentRow, setCurrentRow] = useState()
   const [tax, setTax] = useState(0)
   const [curTotalCredit, setCurTotalCredit] = useState(0)
   const [subTotalCredit, setSubTotalCredit] = useState(0)
   const [open, setOpen] = useState(false)
   const [open2, setOpen2] = useState(false)
   const [open3, setOpen3] = useState(false)

   const AddCredit = async () => {
      let data = { _id: currentRow._id, credit: addCredit }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}addCredit`, { data: data })
            .then((result) => {
               if (result.data === 'success') {
                  getUserData()
                  setOpen2(false)
                  toast.success('Added Credit Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const SubtractCredit = async () => {
      let data = { _id: currentRow._id, credit: minusCredit }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}subtractCredit`, {
               data: data,
            })
            .then((result) => {
               if (result.data === 'success') {
                  getUserData()
                  setOpen2(false)
                  toast.success('Subtracted Credit Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
   }

   const handleOpen = (row) => {
      console.log(row._id)
      setCurId(row._id)
      setCurNote(row.note)
      setOpen(true)
   }

   const handleClose = () => setOpen(false)

   const handleOpen2 = async (row) => {
      setCurrentRow(row)
      setOpen2(true)
      const i = userData.map((e) => e._id).indexOf(row._id)
      setCurTotalCredit(userData[i].credit)
      setSubTotalCredit(userData[i].credit)
   }

   const handleClose2 = () => setOpen2(false)

   const getUserData = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getUserData`)
            .then((result) => {
               setUserData(result.data)
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const UpdateNote = async () => {
      let data = { _id: curId, note: curNote }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updateNote`, { data: data })
            .then((result) => {
               if (result.data === 'success') {
                  getUserData()
                  setOpen(false)
                  toast.success('Update Note Successfully')
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const handleOpen3 = async (row) => {
      setCurrentRow(row)
      setCurId(row._id)
      setOpen3(true)
      const i = userData.map((e) => e._id).indexOf(row._id)
      setTax(userData[i].tax)
   }

   const handleClose3 = () => {
      setOpen3(false)
   }

   const UpdateTax = async () => {
      let data = { _id: curId, tax: tax }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updatetax`, {
               data: data,
            })
            .then((result) => {
               if (result.data === 'success') {
                  getUserData()
                  setOpen3(false)
                  toast.success(`Update Tax Successfully`)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const changestatus = async (row) => {
      let status = 'active'
      if (row.status === 'active') {
         status = 'in-active'
      }
      let data = { _id: row._id, status: status }
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updatestatus`, {
               data: data,
            })
            .then((result) => {
               if (result.data === 'success') {
                  getUserData()
                  setOpen(false)
                  toast.success(`User ${status} Successfully`)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const DeleteUser = (row) => {
      confirm({
         title: 'Delete this User?',
         description: 'This action is permanent!',
      })
         .then(() => {
            try {
               axios
                  .post(`${process.env.REACT_APP_API_URL}deleteUser`, {
                     _id: row._id,
                  })
                  .then((result) => {
                     if (result.data === 'success') {
                        getUserData()
                        toast.success('User Delete Successfully')
                     }
                  })
            } catch (error) {
               if (process.env.REACT_APP_MODE) console.log(error)
            }
         })
         .catch((error) => {
            if (process.env.REACT_APP_MODE) console.log(error)
         })
   }

   useEffect(() => {
      getUserData()
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
         Registered Users
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
                  {userData
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
                              {columns.map((column, k) => {
                                 let value = row[column.id]
                                 if (column.id === 'date') {
                                    const d = new Date(row[column.id])
                                    let year = d.getFullYear()
                                    let month = d.getMonth() + 1
                                    let day = d.getDate()
                                    if (month < 10) month = '0' + month
                                    if (day < 10) day = '0' + day
                                    value = `${day}-${month}-${year}`
                                 }
                                 return (
                                    <TableCell key={k}>
                                       {column.id === 'id' ? (
                                          ind + 1 + page * rowsPerPage
                                       ) : column.id === 'profile' ? (
                                          <Avatar
                                             alt="avatar"
                                             src={
                                                value === ''
                                                   ? row[column.id].name
                                                   : process.env
                                                        .REACT_APP_BASE_URL +
                                                     'logo/' +
                                                     value
                                             }
                                          />
                                       ) : column.id === 'action' ? (
                                          <ButtonGroup
                                             variant="outlined"
                                             aria-label="outlined button group"
                                          >
                                             <IconButton
                                                onClick={() => {
                                                   handleOpen(row)
                                                }}
                                                color="primary"
                                                aria-label="add to shopping cart"
                                             >
                                                <StickyNote2Icon />
                                             </IconButton>
                                             <IconButton
                                                onClick={() => {
                                                   handleOpen2(row)
                                                }}
                                                color="primary"
                                                aria-label="add to shopping cart"
                                             >
                                                <img src={KRIcon} alt="kr" />
                                             </IconButton>
                                             <IconButton
                                                onClick={() => {
                                                   handleOpen3(row)
                                                }}
                                                color="primary"
                                                aria-label="add to shopping cart"
                                             >
                                                <PercentIcon />
                                             </IconButton>
                                             <IconButton
                                                onClick={() => {
                                                   changestatus(row)
                                                }}
                                                color="primary"
                                                aria-label="add to shopping cart"
                                             >
                                                <CheckIcon />
                                             </IconButton>
                                             <IconButton
                                                onClick={() => {
                                                   DeleteUser(row)
                                                }}
                                                color="primary"
                                                aria-label="add to shopping cart"
                                             >
                                                <ClearIcon />
                                             </IconButton>
                                          </ButtonGroup>
                                       ) : column.id === 'note' &&
                                         value === '' ? (
                                          '---'
                                       ) : column.id === '_id' ? (
                                          value.slice(0, 5) +
                                          '...' +
                                          value.slice(-5)
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
            count={userData.length}
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
                  }}
               >
                  <Box>Add Note</Box>
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
                        label="Note"
                        variant="outlined"
                        size="small"
                        value={curNote}
                        style={{ width: '100%' }}
                        onChange={(e) => {
                           setCurNote(e.target.value)
                        }}
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
                           onClick={UpdateNote}
                        >
                           Update
                        </Button>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Modal>
         <Modal
            open={open2}
            onClose={handleClose2}
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
                  }}
               >
                  <Box>Credits</Box>
                  <Box sx={{ flex: '1' }}></Box>
                  <Box>
                     <IconButton
                        onClick={() => {
                           handleClose2()
                        }}
                     >
                        <CloseIcon sx={{ color: 'white' }} />
                     </IconButton>
                  </Box>
               </Box>
               <Box
                  sx={{
                     p: 3,
                     display: 'flex',
                     flexDirection: 'column',
                     gap: '20px',
                  }}
               >
                  <Box
                     style={{ width: '100%' }}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                        color: 'text.secondary',
                        '& svg': {
                           m: 1.5,
                        },
                        '& hr': {
                           mx: 0.5,
                        },
                     }}
                  >
                     <Button
                        size="small"
                        variant="text"
                        sx={{ width: '50%' }}
                        onClick={() => {
                           setCreditAddFlag(true)
                        }}
                     >
                        Add More Credits
                     </Button>
                     <Divider orientation="vertical" sx={{ height: '40px' }} />
                     <Button
                        size="small"
                        variant="text"
                        sx={{ width: '50%' }}
                        onClick={() => {
                           setCreditAddFlag(false)
                        }}
                     >
                        Subtract Credits
                     </Button>
                  </Box>
                  {creditAddFlag ? (
                     <>
                        <Box>
                           <TextField
                              type="number"
                              label="Enter More Credits"
                              variant="outlined"
                              size="small"
                              style={{ width: '100%' }}
                              value={addCredit}
                              onChange={(e) => {
                                 setAddCredit(e.target.value)
                              }}
                           />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                           <Box sx={{ flex: '1' }}></Box>
                           <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                 size="small"
                                 variant="contained"
                                 onClick={() => {
                                    handleClose2()
                                 }}
                              >
                                 Cancel
                              </Button>
                              <Button
                                 size="small"
                                 variant="contained"
                                 onClick={AddCredit}
                              >
                                 Add
                              </Button>
                           </Box>
                        </Box>
                     </>
                  ) : (
                     <>
                        <Box sx={{ display: 'flex' }}>
                           <Box>Total Credits : {curTotalCredit}</Box>
                           <Box sx={{ flex: '1' }}></Box>
                           <Box>After Subtraction : {subTotalCredit}</Box>
                        </Box>
                        <Box>
                           <TextField
                              type="number"
                              label="Update Credits"
                              variant="outlined"
                              size="small"
                              style={{ width: '100%' }}
                              value={minusCredit}
                              onChange={(e) => {
                                 setMinusCredit(e.target.value)
                                 setSubTotalCredit(
                                    curTotalCredit - e.target.value
                                 )
                              }}
                           />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                           <Box sx={{ flex: '1' }}></Box>
                           <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button
                                 size="small"
                                 variant="contained"
                                 onClick={() => {
                                    handleClose2()
                                 }}
                              >
                                 Cancel
                              </Button>
                              <Button
                                 size="small"
                                 variant="contained"
                                 onClick={SubtractCredit}
                              >
                                 Subtract
                              </Button>
                           </Box>
                        </Box>
                     </>
                  )}
               </Box>
            </Box>
         </Modal>
         <Modal
            open={open3}
            onClose={handleClose3}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style1}>
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
                  <Box>Update Tax</Box>
                  <Box sx={{ flex: '1' }}></Box>
                  <Box>
                     <IconButton onClick={handleClose3}>
                        <CloseIcon sx={{ color: 'white' }} />
                     </IconButton>
                  </Box>
               </Box>
               <Box sx={{ p: 3 }}>
                  <Box>
                     <TextField
                        label="Note"
                        type="number"
                        variant="outlined"
                        size="small"
                        value={tax}
                        style={{ width: '100%' }}
                        onChange={(e) => {
                           setTax(e.target.value)
                        }}
                     />
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                     <Box sx={{ flex: '1' }}></Box>
                     <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                        <Button
                           size="small"
                           variant="contained"
                           onClick={handleClose3}
                        >
                           Close
                        </Button>
                        <Button
                           size="small"
                           variant="contained"
                           onClick={UpdateTax}
                        >
                           Update
                        </Button>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </Paper>
   )
}

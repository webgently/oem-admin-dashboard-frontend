import React, { useEffect, useRef, useState } from 'react'
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
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import TablePagination from '@mui/material/TablePagination'
import toast from 'react-hot-toast'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import Fab from '@mui/material/Fab'
import SendIcon from '@mui/icons-material/Send'
import { experimentalStyled as styled } from '@mui/material/styles'
import io from 'socket.io-client'

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
const ServiceStyle1 = {
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
const ServiceStyle2 = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '60vw',
   height: '80vh',
   bgcolor: 'background.paper',
   border: '0px',
   borderRadius: 1,
   boxShadow: 24,
   p: 0,
}
const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: '20px 20px 20px 20px',
   height: '70vh',
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   textAlign: 'center',
   borderLeft: '5px solid #1976d2',
   color: theme.palette.text.secondary,
}))
const socket = io(process.env.REACT_APP_BASE_URL)

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
   const [open2, setOpen2] = useState(false)

   /* chatting */
   const [myID, setMyID] = useState('')
   const [name, setName] = useState('')
   const [dataId, setDataId] = useState('')
   const [orderId, setOrderId] = useState('')
   const [supportID, setSupportID] = useState('')
   const [chattingMsg, setChattingMsg] = useState('')
   const [unreadFileCount, setUnreadFileCount] = useState({})
   const [allMsg, setAllMsg] = useState([])
   const [chatBoxWidth, setChatBoxWidth] = useState(null)
   const [isLoading, setIsLoading] = useState(true)
   const messagesEndRef = useRef(null)
   const inputRef = useRef(null)

   const sendChatting = async () => {
      const date = await getCustomDate()
      const data = {
         from: myID + dataId + orderId,
         to: supportID,
         msg: chattingMsg,
         date: date,
         status: false,
      }
      if (chattingMsg.trim() === '') {
         toast.error('Write the message')
      } else {
         socket.emit('sendToSupportPerFile', {
            data,
            orderId,
            name,
         })
         await setAllMsg([...allMsg, data])
      }
      setChattingMsg('')
      inputRef.current.focus()
   }

   const getKeyCode = async (e) => {
      if (e === 13) {
         await sendChatting()
      }
   }

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
            .post(`${process.env.REACT_APP_API_URL}getDataByOrderID`, {
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
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getDataByFilter = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getDataByFilter`, {
               filter: filterSetting,
               id,
            })
            .then((result) => {
               if (result.data.status) {
                  setUnreadFileCount(result.data.unreadCount)
                  setAllData(result.data.data)
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
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

   const getChattingHistory = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getChattingHistory`, {
               id: id,
            })
            .then(async (result) => {
               if (result.data.status) {
                  await setAllMsg(result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const handleOpen2 = async (userId, dataId, orderId) => {
      setOpen2(true)
      getChattingHistory(userId + dataId + orderId)
      setMyID(userId)
      setDataId(dataId)
      setOrderId(orderId)
      const data = {
         _id: userId + dataId + orderId,
         to: supportID,
         userId,
         dataId,
         orderId,
         name: `${account.name}/R-ID: ${orderId}`,
         profile: 'file',
      }
      const copy = { ...unreadFileCount }
      copy[dataId] = 0
      setUnreadFileCount(copy)
      socket.emit('addChattingListPerFile', data)
   }

   const handleClose2 = () => {
      setOpen2(false)
   }

   const getSupportID = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getSupportID`)
            .then(async (result) => {
               if (result.data.status) await setSupportID(result.data.data)
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
      let weekday = d.getDay()
      let hour = d.getHours()
      let minute = d.getMinutes()
      let second = d.getSeconds()

      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      if (hour < 10) hour = '0' + hour
      if (minute < 10) minute = '0' + minute
      if (second < 10) second = '0' + second
      return `${day}-${month}-${year} ${hour}:${minute}:${second} ${weekdaylist[weekday]}`
   }

   const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({
         behavior: 'smooth',
         block: 'start',
      })
   }

   useEffect(() => {
      const setResponsiveness = () => {
         return setChatBoxWidth(window.innerWidth - window.innerWidth / 2 - 50)
      }
      setResponsiveness()
      window.addEventListener('resize', () => setResponsiveness())
   }, [window.innerWidth])

   useEffect(() => {
      if (account._id) {
         setMyID(account._id)
         setName(account.name)
         if (!OrderID) {
            getDataByFilter(account._id)
         } else {
            getDataByOrderID(account._id)
         }
         getSupportID()
      }
   }, [OrderID, filterSetting, account])

   useEffect(() => {
      let deleteId = ''
      socket.on(myID + dataId + orderId, async (e) => {
         await setAllMsg([...allMsg, e.data])
         deleteId = myID + dataId + orderId
      })
      socket.on('fileReply' + myID, async (e) => {
         const copy = { ...unreadFileCount }
         copy[e.from] += 1
         setUnreadFileCount(copy)
         deleteId = 'fileReply' + myID
      })
      if (dataId && orderId && myID)
         setTimeout(() => {
            scrollToBottom()
         }, 100)
      return () => {
         socket.off('connect')
         socket.off('disconnect')
         socket.off(deleteId)
      }
   }, [allMsg, unreadFileCount])

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
               justifyContent={'space-between'}
               spacing={{ xs: 2, md: 3 }}
               columns={{ xs: 4, sm: 8, md: 12 }}
            >
               <Grid item xs={6} sm={6} md={6}>
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
               <Grid
                  item
                  xs={3}
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
                        <MenuItem value="requested">
                           Requested Requests
                        </MenuItem>
                        <MenuItem value="cancelled">Cancel Requests</MenuItem>
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
                                                onClick={() =>
                                                   handleOpen2(
                                                      row.userId,
                                                      row._id,
                                                      row.orderId
                                                   )
                                                }
                                             >
                                                <IconButton
                                                   color="primary"
                                                   aria-label="add to shopping cart"
                                                   style={{
                                                      position: 'relative',
                                                   }}
                                                >
                                                   <span
                                                      style={{
                                                         position: 'absolute',
                                                         right: -4,
                                                         top: 6,
                                                         color: 'blue',
                                                         fontWeight: 'bold',
                                                         fontSize: '20px',
                                                      }}
                                                   >
                                                      {unreadFileCount[row._id]}
                                                   </span>{' '}
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
            <Box sx={ServiceStyle1}>
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
                              href={`${process.env.REACT_APP_BASE_URL}/fileService/${downloadList?.rename[0]}`}
                              download={downloadList?.origin[0]}
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
                                       href={`${process.env.REACT_APP_BASE_URL}/fileService/${downloadList.rename[ind]}`}
                                       download={item}
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

         <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={ServiceStyle2}>
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
                  <Box>Chat Section</Box>
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
               <Box sx={{ px: 3 }}>
                  <Item>
                     <Grid
                        container
                        justifyContent="space-between"
                        alignItems="flex-end"
                        paddingX={'2vw'}
                        height={'94%'}
                        fontSize={'16px'}
                        style={{
                           overflowY: 'auto',
                        }}
                     >
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                           {allMsg.map((item, ind) => (
                              <Box
                                 key={ind}
                                 textAlign={
                                    item.from.search(myID) >= 0
                                       ? 'right'
                                       : 'left'
                                 }
                                 color={
                                    item.from.search(myID) >= 0
                                       ? '#1976d2'
                                       : '#e10000'
                                 }
                                 className="chatting-group"
                                 position={'relative'}
                              >
                                 <Box>
                                    <p
                                       className="chatting-msg"
                                       style={{ width: chatBoxWidth }}
                                    >
                                       {item.msg}
                                    </p>
                                    {item.from.search(myID) >= 0 ? (
                                       <p className="chatting-right-date">
                                          {item.date}
                                       </p>
                                    ) : (
                                       <p className="chatting-left-date">
                                          {item.date}
                                       </p>
                                    )}
                                 </Box>
                              </Box>
                           ))}
                           <div ref={messagesEndRef} />
                        </Grid>
                     </Grid>
                     <Grid
                        container
                        justifyContent={'space-between'}
                        paddingX={'2vw'}
                     >
                        <Grid item xs={10.8}>
                           <TextField
                              id="filled-multiline-flexible"
                              ref={inputRef}
                              label="Type Something"
                              multiline
                              variant="filled"
                              minRows={1}
                              maxRows={3}
                              fullWidth
                              value={chattingMsg}
                              onKeyUp={(e) => getKeyCode(e.keyCode)}
                              onChange={(e) => setChattingMsg(e.target.value)}
                           />
                        </Grid>
                        <Grid item xs={1}>
                           <Fab
                              color="secondary"
                              aria-label="edit"
                              onClick={() => sendChatting()}
                           >
                              <SendIcon />
                           </Fab>
                        </Grid>
                     </Grid>
                  </Item>
               </Box>
            </Box>
         </Modal>
      </Box>
   )
}

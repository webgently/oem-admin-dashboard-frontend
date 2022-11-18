import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Fab from '@mui/material/Fab'
import SendIcon from '@mui/icons-material/Send'
import TextField from '@mui/material/TextField'
import { experimentalStyled as styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'
import Badge from '@mui/material/Badge'
import toast, { Toaster } from 'react-hot-toast'
import io from 'socket.io-client'

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

export default function AdminSupport() {
   const socket = io(process.env.REACT_APP_Base_Url)
   const account = useSelector((state) => state.account)
   const [selectedIndex, setSelectedIndex] = React.useState(0)
   const [myID, setMyID] = useState('')
   const [allUserList, setAllUserList] = useState([])
   const [unreadCount, setUnreadCount] = useState([])
   const [chattingMsg, setChattingMsg] = useState('')
   const [allMsg, setAllMsg] = useState([])
   const messagesEndRef = useRef(null)
   const inputRef = useRef(null)

   const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number
   ) => {
      setSelectedIndex(index)
      setAllMsg([])
      getChattingHistory(index)
      updateReadStatus(myID, index)
   }

   const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({
         behavior: 'smooth',
         block: 'start',
      })
   }

   const updateReadStatus = async (id, index) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_Url}updateReadStatus`, {
               from: index,
               to: id,
            })
            .then((result) => {
               if (result.data.status) {
                  allUserList.map((item, i) => {
                     if (item._id === index) {
                        let newArray = [...unreadCount]
                        newArray[i] = 0
                        setUnreadCount(newArray)
                     }
                  })
               }
            })
      } catch (error) {
         console.log(error)
      }
   }

   const getUserList = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_Url}getUserList`, { id: id })
            .then((result) => {
               if (result.data.status) {
                  setUnreadCount(result.data.unreadCount)
                  setAllUserList(result.data.userList)
               }
            })
      } catch (error) {
         console.log(error)
      }
   }

   const sendChatting = async () => {
      const date = await getCustomDate()
      const data = {
         from: myID,
         to: selectedIndex,
         msg: chattingMsg,
         date: date,
         status: false,
      }
      if (chattingMsg.trim() === '') {
         toast.error('Write the message')
      } else {
         if (selectedIndex !== 0) {
            socket.emit('sendToUser', data)
            await setAllMsg([...allMsg, data])
         } else {
            toast.error('Select the user')
         }
      }
      setChattingMsg('')
      inputRef.current.focus()
   }

   const getKeyCode = async (e) => {
      if (e === 13) {
         await sendChatting()
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

      const result = `${day}-${month}-${year} ${hour}:${minute}:${second} ${weekdaylist[weekday]}`
      return result
   }

   const getChattingHistory = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_Url}getChattingHistory`, {
               id: id,
            })
            .then((result) => {
               if (result.data.status) setAllMsg(result.data.data)
            })
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      if (account._id) {
         setMyID(account._id)
         getUserList(account._id)
      }
   }, [account])

   useEffect(() => {
      socket.on(account._id, async (e) => {
         if (selectedIndex === e.data.from) {
            await setAllMsg([...allMsg, e.data])
            updateReadStatus(account._id, selectedIndex)
         }
         allUserList.map((item, i) => {
            if (item._id === e.data.from) {
               let newArray = [...unreadCount]
               newArray[i] += 1
               setUnreadCount(newArray)
            }
         })
      })
      return () => {
         socket.off('connect')
         socket.off('disconnect')
         socket.off(myID)
         setTimeout(() => {
            scrollToBottom()
         }, 100)
      }
   }, [allUserList, unreadCount])

   return (
      <Box
         sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: 'rgb(229, 229, 229)',
            overflowY: 'overlay',
         }}
      >
         <Box sx={{ mt: '30px' }}>
            <Grid
               container
               spacing={{ xs: 2, md: 3 }}
               columns={{ xs: 4, sm: 8, md: 12 }}
               paddingX={'2vw'}
               paddingY={'2vh'}
            >
               <Grid
                  sx={{
                     width: '100%',
                     maxWidth: 500,
                     bgcolor: 'background.paper',
                  }}
                  item
                  xs={12}
                  sm={12}
                  md={3}
                  lg={3}
                  paddingRight={3}
                  borderRadius={2}
               >
                  <List
                     component="nav"
                     aria-label="main mailbox folders"
                     style={{
                        overflowY: 'auto',
                        height: '70vh',
                     }}
                  >
                     {allUserList.map((item, ind) => {
                        return (
                           <div key={item._id}>
                              <ListItemButton
                                 selected={selectedIndex === item._id}
                                 onClick={(event) =>
                                    handleListItemClick(event, item._id)
                                 }
                                 style={{
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                 }}
                              >
                                 <Badge
                                    badgeContent={unreadCount[ind]}
                                    color="success"
                                    anchorOrigin={{
                                       vertical: 'top',
                                       horizontal: 'left',
                                    }}
                                 >
                                    <ListItemIcon>
                                       <Avatar alt="Remy Sharp" src="" />
                                    </ListItemIcon>
                                 </Badge>
                                 <ListItemText primary={`${item.name}`} />
                              </ListItemButton>
                              <Divider />
                           </div>
                        )
                     })}
                  </List>
               </Grid>
               <Grid item xs={12} sm={12} md={9} lg={9}>
                  <Box
                     color={'#1976d2'}
                     fontSize={'25px'}
                     marginTop={1}
                     paddingBottom={1}
                  >
                     Support Area | Chat Section
                  </Box>
                  <Item>
                     <Grid
                        container
                        justifyContent="space-between"
                        alignItems="flex-end"
                        paddingX={'2vw'}
                        height={'100%'}
                        fontSize={'16px'}
                        style={{ overflowY: 'auto' }}
                     >
                        {selectedIndex ? (
                           <>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                 {allMsg.map((item, ind) => (
                                    <Box
                                       textAlign={
                                          myID === item.from ? 'right' : 'left'
                                       }
                                       lineHeight={'2px'}
                                       paddingTop={'0.5px'}
                                       color={
                                          myID === item.from
                                             ? '#1976d2'
                                             : '#e10000'
                                       }
                                       key={ind}
                                    >
                                       <p className="break-string">
                                          {item.msg}
                                       </p>
                                       <p style={{ fontSize: '10px' }}>
                                          {item.date}
                                       </p>
                                    </Box>
                                 ))}
                              </Grid>
                              <div ref={messagesEndRef} />
                           </>
                        ) : (
                           <></>
                        )}
                     </Grid>
                     <Grid
                        container
                        justifyContent={'space-between'}
                        alignItems={'flex-end'}
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
                              onClick={() => {
                                 sendChatting()
                              }}
                           >
                              <SendIcon />
                           </Fab>
                        </Grid>
                     </Grid>
                  </Item>
               </Grid>
            </Grid>
         </Box>
         <Toaster />
      </Box>
   )
}

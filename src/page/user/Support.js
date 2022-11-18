import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Fab from '@mui/material/Fab'
import SendIcon from '@mui/icons-material/Send'
import { experimentalStyled as styled } from '@mui/material/styles'
import toast, { Toaster } from 'react-hot-toast'
import TextField from '@mui/material/TextField'
import axios from 'axios'
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

export default function Support() {
   const socket = io(process.env.REACT_APP_BASE_URL)
   const account = useSelector((state) => state.account)
   const [myID, setMyID] = useState('')
   const [supportID, setSupportID] = useState('')
   const [chattingMsg, setChattingMsg] = useState('')
   const [allMsg, setAllMsg] = useState([])
   const messagesEndRef = useRef(null)
   const inputRef = useRef(null)

   const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({
         behavior: 'smooth',
         block: 'start',
      })
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

   const sendChatting = async () => {
      const date = await getCustomDate()
      const data = {
         from: myID,
         to: supportID,
         msg: chattingMsg,
         date: date,
         status: false,
      }
      if (chattingMsg.trim() === '') {
         toast.error('Write the message')
      } else {
         socket.emit('sendToSupport', data)
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

   useEffect(() => {
      if (account._id) {
         setMyID(account._id)
         getChattingHistory(account._id)
         getSupportID()
      }
   }, [account])

   useEffect(() => {
      socket.on(myID, async (e) => {
         await setAllMsg([...allMsg, e.data])
      })
      setTimeout(() => {
         scrollToBottom()
      }, 100)
      return () => {
         socket.off('connect')
         socket.off('disconnect')
         socket.off(myID)
      }
   }, [allMsg])

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
            <Grid
               container
               spacing={{ xs: 2, md: 3 }}
               columns={{ xs: 4, sm: 8, md: 12 }}
               paddingX={'8vw'}
               paddingY={'2vh'}
            >
               <Grid item xs={12} sm={12} md={12}>
                  <Box color={'#1976d2'} fontSize={'25px'}>
                     Support Area | Chat Section
                  </Box>
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
                                 textAlign={
                                    myID === item.from ? 'right' : 'left'
                                 }
                                 lineHeight={'2px'}
                                 paddingTop={'0.5px'}
                                 color={
                                    myID === item.from ? '#1976d2' : '#e10000'
                                 }
                                 key={ind}
                              >
                                 <Box>
                                    <p>{item.msg}</p>
                                    <p style={{ fontSize: '10px' }}>
                                       {item.date}
                                    </p>
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
               </Grid>
            </Grid>
         </Box>
         <Toaster />
      </Box>
   )
}

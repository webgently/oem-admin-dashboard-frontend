import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import SendIcon from '@mui/icons-material/Send'
import { experimentalStyled as styled } from '@mui/material/styles'
import toast from 'react-hot-toast'
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
const socket = io(process.env.REACT_APP_BASE_URL)

export default function Support() {
   const account = useSelector((state) => state.account)
   const messagesEndRef = useRef(null)
   const inputRef = useRef(null)
   const [myID, setMyID] = useState('')
   const [name, setName] = useState('')
   const [supportID, setSupportID] = useState('')
   const [chattingMsg, setChattingMsg] = useState('')
   const [allMsg, setAllMsg] = useState([])
   const [chatBoxWidth, setChatBoxWidth] = useState(null)
   const [fileData, setFileData] = useState({})
   const [fileOpen, setFileOpen] = useState(false)
   const inputElement = useRef('fileInput')

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
      let data = {}
      let flag
      if (fileData?.name) {
         data = {
            from: myID,
            to: supportID,
            msg: '',
            date: date,
            status: false,
         }
         flag = true
      } else {
         data = {
            from: myID,
            to: supportID,
            msg: chattingMsg,
            date: date,
            status: false,
         }
         flag = false
      }
      if (chattingMsg.trim() === '' && fileData?.name === '') {
         toast.error('Write the message')
         return
      }

      if (fileData?.size / 1000000 > 2) {
         toast.error(`Can't upload 2MB files`)
         return
      }
      if (flag) {
         let params = new FormData()
         params.append('file', fileData)
         params.append('data', JSON.stringify(data))
         await axios
            .post(`${process.env.REACT_APP_API_URL}sendToSupport`, params)
            .then(async (result) => {
               if (result.data.status) {
                  data.msg = result.data.data
                  await setAllMsg([...allMsg, data])
               } else {
                  toast.error(result.data.data)
               }
            })
      } else {
         socket.emit('sendToSupport', { data, name })
         await setAllMsg([...allMsg, data])
      }
      if (fileOpen) {
         setFileData({})
         setFileOpen(false)
      } else {
         setChattingMsg('')
         inputRef.current.focus()
      }
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

      return `${day}-${month}-${year} ${hour}:${minute}:${second} ${weekdaylist[weekday]}`
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

   const handleFileload = () => {
      inputElement.current.click()
   }

   const getFile = async (e) => {
      setFileData(e.target.files[0])
      setChattingMsg('')
   }

   const deleteFile = () => {
      setFileData({})
      setFileOpen(false)
   }

   useEffect(() => {
      if (fileData?.name) setFileOpen(true)
      else setFileOpen(false)
   }, [fileData])

   useEffect(() => {
      const setResponsiveness = () => {
         return setChatBoxWidth(window.innerWidth - window.innerWidth / 2)
      }
      setResponsiveness()
      window.addEventListener('resize', () => setResponsiveness())
   }, [window.innerWidth])

   useEffect(() => {
      if (account._id) {
         setMyID(account._id)
         setName(account.name)
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
                           {allMsg.map((item, ind) => {
                              const arr = item.msg.split('->')
                              const type = arr[arr.length - 1]
                              return (
                                 <Box
                                    key={ind}
                                    textAlign={
                                       myID === item.from ? 'right' : 'left'
                                    }
                                    color={
                                       myID === item.from
                                          ? '#1976d2'
                                          : '#e10000'
                                    }
                                    className="chatting-group"
                                    position={'relative'}
                                 >
                                    <Box>
                                       {type === 'file' ? (
                                          <p
                                             className="chatting-msg"
                                             style={{
                                                width: chatBoxWidth,
                                             }}
                                          >
                                             <a
                                                style={{
                                                   color: `${
                                                      myID === item.from
                                                         ? 'blue'
                                                         : 'green'
                                                   }`,
                                                }}
                                                href={`${
                                                   process.env
                                                      .REACT_APP_BASE_URL
                                                }chatFile/${
                                                   arr[arr.length - 2]
                                                }`}
                                                download={arr[0]}
                                             >
                                                {arr[0]}
                                             </a>
                                          </p>
                                       ) : (
                                          <p
                                             className="chatting-msg"
                                             style={{
                                                width: chatBoxWidth,
                                             }}
                                          >
                                             {item.msg}
                                          </p>
                                       )}
                                       {myID === item.from ? (
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
                              )
                           })}
                           <div ref={messagesEndRef} />
                        </Grid>
                     </Grid>
                     <Grid
                        container
                        justifyContent={'space-between'}
                        alignItems={'flex-end'}
                     >
                        <Grid item xs={0.5}>
                           <input
                              ref={inputElement}
                              type="file"
                              style={{ display: 'none' }}
                              onChange={(e) => getFile(e)}
                           />
                           <IconButton
                              color="primary"
                              component="label"
                              onClick={handleFileload}
                           >
                              <AttachFileIcon />
                           </IconButton>
                        </Grid>
                        {fileOpen ? (
                           <Grid className="select-file" item xs={10}>
                              <Box className="file-group-box">
                                 <Box className="upload-img-box">
                                    <UploadFileIcon className="upload-img-icon" />
                                 </Box>
                                 <Box className="file-info">
                                    <Box>
                                       <Box className="filename-string">
                                          {fileData?.name}
                                       </Box>
                                       <Box>
                                          {(fileData?.size / 1000000).toFixed(
                                             4
                                          )}{' '}
                                          MB
                                       </Box>
                                    </Box>
                                 </Box>
                              </Box>
                              <Box className="close-img-box">
                                 <HighlightOffIcon
                                    className="close-img-icon"
                                    onClick={() => deleteFile()}
                                 />
                              </Box>
                           </Grid>
                        ) : (
                           <Grid item xs={10}>
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
                                 onChange={(e) =>
                                    setChattingMsg(e.target.value)
                                 }
                              />
                           </Grid>
                        )}
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
      </Box>
   )
}

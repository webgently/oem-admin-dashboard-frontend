import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import TextField from '@mui/material/TextField'
import { experimentalStyled as styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import SearchIcon from '@mui/icons-material/Search'
import DescriptionIcon from '@mui/icons-material/Description'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import axios from 'axios'
import Badge from '@mui/material/Badge'
import toast from 'react-hot-toast'
import io from 'socket.io-client'

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: '20px 20px 20px 20px',
   height: '75vh',
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   textAlign: 'center',
   borderLeft: '5px solid #1976d2',
   color: theme.palette.text.secondary,
}))

const socket = io(process.env.REACT_APP_BASE_URL)
export default function AdminArchive() {
   // const account = useSelector((state) => state.account)
   const [account , setAccount] = useState(null);
   const [selectedIndex, setSelectedIndex] = useState('')
   const [myID, setMyID] = useState('')
   const [allUserList, setAllUserList] = useState([])
   const [unreadCount, setUnreadCount] = useState({})
   const [chatBoxWidth, setChatBoxWidth] = useState(null)
   const [allMsg, setAllMsg] = useState([])
   const [search, setSearch] = useState('')
   const [userSelect, setUserSelect] = useState([])
   const [archive, setArchive] = useState(true)
   const messagesEndRef = useRef(null)

   const handleListItemClick = (event, index) => {
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
      updateReadStatus(myID, selectedIndex)
   }

   const updateReadStatus = async (id, index) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updateReadStatus`, {
               from: index,
               to: id,
            })
            .then((result) => {
               if (result.data.status) {
                  const copy = { ...unreadCount }
                  copy[index] = 0
                  setUnreadCount(copy)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getUserList = async (id, search) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getUserList`, {
               id: id,
               search,
               support: false,
            })
            .then((result) => {
               if (result.data.status) {
                  setUnreadCount(result.data.unreadCount)
                  setAllUserList(result.data.userList)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getChattingHistory = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getChattingHistory`, {
               id: id,
            })
            .then((result) => {
               if (result.data.status) setAllMsg(result.data.data)
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const move = (from, to, arr) => {
      const newArr = [...arr]
      const item = newArr.splice(from, 1)[0]
      newArr.splice(to, 0, item)
      return newArr
   }

   const getWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

   const selectUsers = (status, id) => {
      if (status) setUserSelect([...userSelect, id])
      else setUserSelect(userSelect.filter((item) => item !== id))
   }

   const sendToChatBox = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}sendToChatBox`, userSelect)
            .then((result) => {
               if (result.data.status) {
                  toast.success(result.data.data)
                  getUserList(myID, search)
                  const exist = userSelect.indexOf(selectedIndex)
                  if (exist > -1) {
                     setAllMsg([])
                     setSelectedIndex('')
                  }
                  setUserSelect([])
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   useEffect(() => {
      if (userSelect.length > 0) setArchive(false)
      else setArchive(true)
   }, [userSelect])

   useEffect(() => {
      const setResponsiveness = () => {
         setChatBoxWidth(getWidth() - getWidth() / 2)
      }
      setResponsiveness()
      window.addEventListener('resize', setResponsiveness)
   }, [])

  
   useEffect(()=>{
      const user = localStorage.getItem('user');
      if(user){
         let parse = JSON.parse(user);
         setAccount(parse);
      }
   },[]);


   useEffect(() => {
      if (account) {
         setMyID(account?._id)
         getUserList(account?._id, search)
      }
   }, [account, search])

   useEffect(() => {
      socket.on(myID, async (e) => {
         if (!e.support) {
            const index = allUserList.map((e) => e._id).indexOf(e.data.from)
            const swap = await move(index, 0, allUserList)
            setAllUserList(swap)
            if (
               selectedIndex === e.data.from &&
               window.location.href.search('admin_archive') > 0
            ) {
               await setAllMsg([...allMsg, e.data])
            }
            const copy = { ...unreadCount }
            copy[e.data.from] += 1
            setUnreadCount(copy)
         }
      })

      return () => {
         socket.off('connect')
         socket.off('disconnect')
         socket.off(myID)
      }
   }, [allMsg, allUserList, unreadCount, myID, selectedIndex])

   useEffect(() => {
      if (selectedIndex !== '')
         setTimeout(() => {
            scrollToBottom()
         }, 100)
   }, [allMsg, selectedIndex])

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
                  <TextField
                     fullWidth
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <SearchIcon />
                           </InputAdornment>
                        ),
                     }}
                     placeholder="Search..."
                     size="small"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
                  <List
                     component="nav"
                     aria-label="main mailbox folders"
                     style={{
                        overflowY: 'auto',
                        height: '73vh',
                     }}
                  >
                     {allUserList.map((item, ind) => {
                        return (
                           <div
                              key={item._id}
                              style={{
                                 position: 'relative',
                                 display: 'flex',
                                 alignItems: 'center',
                              }}
                           >
                              <Checkbox
                                 style={{
                                    position: 'absolute',
                                    left: 0,
                                 }}
                                 size="small"
                                 onChange={(e) =>
                                    selectUsers(e.target.checked, item._id)
                                 }
                              />
                              <ListItemButton
                                 id={item._id}
                                 selected={selectedIndex === item._id}
                                 onClick={(event) =>
                                    handleListItemClick(event, item._id)
                                 }
                                 style={{
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    paddingLeft: '2rem',
                                 }}
                              >
                                 <Badge
                                    badgeContent={unreadCount[item._id]}
                                    color="success"
                                    anchorOrigin={{
                                       vertical: 'top',
                                       horizontal: 'left',
                                    }}
                                 >
                                    <ListItemIcon>
                                       {item.profile === '' ? (
                                          <Avatar alt="avatar" src="" />
                                       ) : item.profile === 'file' ? (
                                          <Avatar alt="avatar">
                                             <DescriptionIcon />
                                          </Avatar>
                                       ) : (
                                          <Avatar
                                             alt="avatar"
                                             src={
                                                process.env.REACT_APP_BASE_URL +
                                                'logo/' +
                                                item.profile
                                             }
                                          />
                                       )}
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
                  <Grid
                     container
                     spacing={{ xs: 2, md: 3 }}
                     columns={{ xs: 4, sm: 8, md: 12 }}
                     justifyContent={'space-between'}
                  >
                     <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        color={'#1976d2'}
                        fontSize={'25px'}
                        marginTop={1}
                        paddingBottom={1}
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                        }}
                     >
                        Archive Area | Chat History
                     </Grid>
                     <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'flex-end',
                        }}
                     >
                        <Button
                           variant="contained"
                           endIcon={<SendIcon />}
                           onClick={sendToChatBox}
                           disabled={archive}
                        >
                           Send&nbsp;To&nbsp;Support
                        </Button>
                     </Grid>
                  </Grid>
                  <Item>
                     <Grid
                        container
                        justifyContent="space-between"
                        alignItems="flex-end"
                        paddingX={'2vw'}
                        height={'100%'}
                        fontSize={'16px'}
                        style={{ overflowY: 'auto', overflowX: 'hidden' }}
                     >
                        {selectedIndex ? (
                           <>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                 {allMsg.map((item, ind) => {
                                    const arr = item.msg.split('->')
                                    const type = arr[arr.length - 1]
                                    return (
                                       <Box
                                          key={ind}
                                          textAlign={
                                             myID === item.from
                                                ? 'right'
                                                : 'left'
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
                           </>
                        ) : (
                           <></>
                        )}
                     </Grid>
                  </Item>
               </Grid>
            </Grid>
         </Box>
      </Box>
   )
}

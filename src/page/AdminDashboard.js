import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import { IconButton } from '@mui/material'
import axios from 'axios'
import toast from 'react-hot-toast'
import io from 'socket.io-client'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import CloudUpload from '@mui/icons-material/CloudUpload'

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   cursor: 'pointer',
   padding: '0px 20px 20px 20px',
   textAlign: 'center',
   borderLeft: '5px solid gray',
   color: theme.palette.text.secondary,
}))

export default function AdminDashboard() {
   const socket = io(process.env.REACT_APP_BASE_URL)
   const account = useSelector((state) => state.account)
   const navigate = useNavigate()
   const [userCount, setUserCount] = useState(0)
   const [serviceCount, setServiceCount] = useState(0)
   const [requestCount, setRequestCount] = useState(0)
   const [unreadCount, setUnreadCount] = useState(0)
   const [requestAlert, setRequestAlert] = useState(true)

   const getDashBoardData = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getDashBoardData`, { id })
            .then((result) => {
               setUserCount(result.data.userCount)
               setServiceCount(result.data.serviceCount)
               setRequestCount(result.data.requestCount)
               setUnreadCount(result.data.supportCount)
               setRequestAlert(result.data.requestAlert)
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const setRequestStatus = async () => {
      navigate('/admin_upload')
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}setRequestStatus`)
            .then((result) => {
               if (!result.data.status) toast.error(result.data.data)
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   useEffect(() => {
      let deleteId = ''
      if (account._id) {
         getDashBoardData(account._id)
         socket.on(account._id, async (e) => {
            setUnreadCount(unreadCount + 1)
            deleteId = account._id
         })
         socket.on('request' + account._id, async () => {
            setRequestCount(requestCount + 1)
            deleteId = 'request' + account._id
         })
         return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off(deleteId)
         }
      }
   }, [account, unreadCount, requestCount])

   return (
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'rgb(229, 229, 229)' }}>
         <Box>
            <Grid
               container
               spacing={{ xs: 2, md: 3 }}
               columns={{ xs: 4, sm: 8, md: 12 }}
            >
               <Grid item xs={12} sm={6} md={3}>
                  <Item
                     onClick={() => {
                        navigate('/admin_user')
                     }}
                  >
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-end',
                        }}
                     >
                        <IconButton size="large">
                           <SupervisorAccountIcon />
                        </IconButton>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h3 style={{ margin: '0px' }}>Total Users</h3>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h2 style={{ margin: '0px' }}>{userCount}</h2>
                     </Box>
                  </Item>
               </Grid>
               <Grid item xs={12} sm={6} md={3}>
                  <Item
                     onClick={() => {
                        navigate('/admin_service')
                     }}
                  >
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-end',
                        }}
                     >
                        <IconButton size="large">
                           <BusinessCenterIcon />
                        </IconButton>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h3 style={{ margin: '0px' }}>Active Services</h3>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h2 style={{ margin: '0px' }}>{serviceCount}</h2>
                     </Box>
                  </Item>
               </Grid>
               <Grid item xs={12} sm={6} md={3}>
                  <Item
                     onClick={() => setRequestStatus()}
                     className={requestAlert ? '' : 'shaking-animation'}
                  >
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-end',
                        }}
                     >
                        <IconButton size="large">
                           <CloudUpload />
                        </IconButton>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h3 style={{ margin: '0px' }}>Total Requests</h3>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h2 style={{ margin: '0px' }}>{requestCount}</h2>
                     </Box>
                  </Item>
               </Grid>
               <Grid item xs={12} sm={6} md={3}>
                  <Item
                     onClick={() => {
                        navigate('/admin_support')
                     }}
                     className={unreadCount > 0 ? 'shaking-animation' : ''}
                  >
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-end',
                        }}
                     >
                        <IconButton size="large">
                           <SupervisorAccountIcon />
                        </IconButton>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h3 style={{ margin: '0px' }}>Unread Chart</h3>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-start',
                        }}
                     >
                        <h2 style={{ margin: '0px' }}>{unreadCount}</h2>
                     </Box>
                  </Item>
               </Grid>
            </Grid>
         </Box>
      </Box>
   )
}

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import WalletIcon from '@mui/icons-material/Wallet'
import GroupsIcon from '@mui/icons-material/Groups'
import { Button, Collapse, Menu, MenuItem } from '@mui/material'
import ListIcon from '@mui/icons-material/List'
import UploadIcon from '@mui/icons-material/Upload'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoIcon from '../assets/img/blue-logo.png'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned'
import DescriptionIcon from '@mui/icons-material/Description'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useNavigate, Outlet } from 'react-router-dom'
import CloudUpload from '@mui/icons-material/CloudUpload'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import axios from 'axios'
import MenuIcon from '@mui/icons-material/Menu'
import { clearAccountData } from '../features/account/account'
import io from 'socket.io-client'
import toast from 'react-hot-toast'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
   ({ theme, open }) => ({
      flexGrow: 1,
      padding: '0px',
      transition: theme.transitions.create('margin', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
         transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
         }),
         marginLeft: 0,
      }),
   })
)

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
   transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   padding: theme.spacing(0, 1),
   ...theme.mixins.toolbar,
   justifyContent: 'flex-end',
}))

const socket = io(process.env.REACT_APP_BASE_URL)
export default function UserSidebar() {
   // const account = useSelector((state) => state.account)
   const [account, setAccount] = useState(null)
   const theme = useTheme()
   const dispatch = useDispatch()
   const [open, setOpen] = useState(true)
   const [logo, setLogo] = useState('')
   const [myID, setMyID] = useState('')
   const [anchorElUser, setAnchorElUser] = useState(null)
   const navigate = useNavigate()
   const [listopen, setListOpen] = useState(true)
   const [creditopen, setCreditOpen] = useState(true)
   const [unreadCount, setUnreadCount] = useState(0)
   const [unreadFileCount, setUnreadFileCount] = useState(0)
   const [creditAmount, setCreditAmount] = useState(0)
   const [mobileView, setMobileView] = useState(false)

   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget)
   }

   const handleCloseUserMenu = () => {
      setAnchorElUser(null)
   }

   const handleDrawerClose = () => {
      setOpen(false)
   }

   const getUserUnreadCount = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getUserUnreadCount`, {
               id: id,
            })
            .then((result) => {
               if (result.data.status) {
                  setUnreadCount(result.data.supportUnreadCount)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getUserUnreadPerFileCount = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getUserUnreadPerFileCount`, {
               id: id,
            })
            .then((result) => {
               if (result.data.status) {
                  setUnreadFileCount(result.data.unreadCount)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getLogo = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getLogo`)
            .then((result) => {
               if (result.data.status) {
                  setLogo(process.env.REACT_APP_BASE_URL + result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const checkMsg = async () => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}updateUserReadStatus`, {
               id: myID,
            })
            .then((result) => {
               if (result.data.status) {
                  navigate('/support')
                  setUnreadCount(0)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getSumCredit = async (id) => {
      try {
         await axios
            .post(`${process.env.REACT_APP_API_URL}getSumCredit`, { id })
            .then((result) => {
               if (result.data.status) {
                  setCreditAmount(result.data.data)
               } else {
                  toast.error(result.data.data)
               }
            })
      } catch (error) {
         if (process.env.REACT_APP_MODE) console.log(error)
      }
   }

   const getWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

   useEffect(() => {
      const user = localStorage.getItem('user')
      if (user) {
         let parse = JSON.parse(user);
         setAccount(parse)
      }
   }, [])

   useEffect(() => {
      const setResponsiveness = () => {
         getWidth() < 600 ? setMobileView(true) : setMobileView(false)
      }
      window.addEventListener('resize', setResponsiveness)
      return () => {
         window.removeEventListener('resize', setResponsiveness)
      }
   }, [])

   useEffect(() => {
      const check = window.location.href.search('support')
      if (check > 0) {
         checkMsg()
      }
   }, [window.location, unreadCount])

   useEffect(() => {
      getLogo()
      if (account) {
         setMyID(account?._id)
         getSumCredit(account?._id)
         socket.on(account?._id, async (e) => {
            setUnreadCount(unreadCount + 1)
         })
         socket.on('fileReply' + account?._id, async (e) => {
            setUnreadFileCount(unreadFileCount + 1)
            setListOpen(true)
         })
         socket.on('totalUnreadCount' + account?._id, async (e) => {
            setUnreadFileCount(unreadFileCount - e.count)
         })
         socket.on('creditCheck' + account?._id, async () => {
            getSumCredit(account?._id)
         })

         return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off(account?._id)
            socket.off('fileReply' + account?._id)
            socket.off('totalUnreadCount' + account?._id)
            socket.off('creditCheck' + account?._id)
         }
      }
   }, [account, unreadCount, unreadFileCount])

   useEffect(() => {
      if (account) {
         getUserUnreadCount(account?._id)
         getUserUnreadPerFileCount(account?._id)
      }
   }, [account])
   return (
      <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <AppBar position="fixed" open={open}>
            <Toolbar
               style={{
                  backgroundColor: 'white',
                  justifyContent: 'space-between',
               }}
            >
               <Box display={'flex'}>
                  {open ? (
                     <></>
                  ) : (
                     <img
                        src={logo === '' ? LogoIcon : logo}
                        style={{
                           width: '120px',
                           height: '50px',
                           borderRadius: '5px',
                        }}
                        alt="logo"
                     />
                  )}
                  <IconButton
                     aria-label="open drawer"
                     onClick={() => setOpen(true)}
                     edge="start"
                     sx={{ mx: 1, ...(open && { display: 'none' }) }}
                  >
                     <MenuIcon />
                  </IconButton>
               </Box>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                     sx={{
                        color: 'black',
                        display: 'flex',
                        pr: '10px',
                        fontSize: '14px',
                        alignItems: 'center',
                     }}
                  >
                     <CreditCardIcon sx={{ color: '#1976d2' }} />
                     {creditAmount} Credit
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        color: 'black',
                        cursor: 'pointer',
                     }}
                     onClick={() => navigate('support')}
                  >
                     {mobileView ? '' : 'Chat with'}
                     <GroupsIcon />{' '}
                  </Box>
               </Box>
            </Toolbar>
            <Toolbar sx={{ bgcolor: 'rgb(229, 229, 229)', p: '10px' }}>
               <div style={{ flex: '1' }}></div>
               <Button
                  onClick={() => {
                     navigate('buyCredit')
                  }}
                  sx={{
                     bgcolor: 'transparent',
                     color: 'black',
                     border: '1px solid gray',
                     mr: '20px',
                  }}
                  variant="outlined"
               >
                  <ListIcon /> {mobileView ? '' : 'Price List'}
               </Button>
               <Button
                  sx={{
                     bgcolor: 'transparent',
                     color: 'black',
                     border: '1px solid gray',
                     mr: '20px',
                  }}
                  onClick={() => {
                     navigate('upload')
                  }}
                  variant="outlined"
               >
                  <UploadIcon /> {mobileView ? '' : 'Upload File'}
               </Button>
               <Button
                  sx={{ bgcolor: 'transparent', color: 'black' }}
                  onClick={handleOpenUserMenu}
               >
                  <PersonIcon /> {mobileView ? '' : 'Dashboard'}
               </Button>
               <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
               >
                  <MenuItem
                     onClick={() => {
                        handleCloseUserMenu()
                        navigate('profile')
                     }}
                  >
                     <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem
                     onClick={() => {
                        localStorage.clear();
                         window.location.replace(`${window.origin}/`)
                     }}
                  >
                     <Typography textAlign="center">LogOut</Typography>
                  </MenuItem>
               </Menu>
            </Toolbar>
         </AppBar>
         <Drawer
            sx={{
               width: drawerWidth,
               flexShrink: 0,
               '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
               },
            }}
            variant="persistent"
            anchor="left"
            open={open}
         >
            <DrawerHeader>
               <img
                  src={logo === '' ? LogoIcon : logo}
                  style={{ width: '120px', height: '60px' }}
                  alt="logo"
               />
               <div style={{ flex: '1' }}></div>
               <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? (
                     <ChevronLeftIcon />
                  ) : (
                     <ChevronRightIcon />
                  )}
               </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
               <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate('dashboard')}>
                     <ListItemIcon>
                        <DashboardIcon />
                     </ListItemIcon>
                     <ListItemText>Dashboard</ListItemText>
                  </ListItemButton>
               </ListItem>
               <ListItem disablePadding>
                  <ListItemButton
                     onClick={() => {
                        setListOpen(!listopen)
                     }}
                  >
                     <ListItemIcon>
                        <AssignmentReturnedIcon />
                     </ListItemIcon>
                     <ListItemText>File Service</ListItemText>
                  </ListItemButton>
               </ListItem>
               <Collapse in={listopen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                     <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => {
                           navigate('upload')
                        }}
                     >
                        <ListItemIcon>
                           <CloudUpload />
                        </ListItemIcon>
                        <ListItemText>Upload</ListItemText>
                     </ListItemButton>
                     <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => {
                           navigate('overview')
                        }}
                     >
                        <ListItemIcon>
                           <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText>
                           Overview{' '}
                           <span style={{ color: 'blue', fontWeight: 'bold' }}>
                              {unreadFileCount}
                           </span>
                        </ListItemText>
                     </ListItemButton>
                  </List>
               </Collapse>
               <ListItem disablePadding>
                  <ListItemButton
                     onClick={() => {
                        setCreditOpen(!creditopen)
                     }}
                  >
                     <ListItemIcon>
                        <CreditCardIcon />
                     </ListItemIcon>
                     <ListItemText>Credits</ListItemText>
                  </ListItemButton>
               </ListItem>
               <Collapse in={creditopen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                     <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => {
                           navigate('overviewCredit')
                        }}
                     >
                        <ListItemIcon>
                           <CreditCardIcon />
                        </ListItemIcon>
                        <ListItemText>Overview</ListItemText>
                     </ListItemButton>
                     <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => {
                           navigate('buyCredit')
                        }}
                     >
                        <ListItemIcon>
                           <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText>Buy File Credits</ListItemText>
                     </ListItemButton>
                  </List>
               </Collapse>
               <ListItem disablePadding>
                  <ListItemButton
                     onClick={() => {
                        navigate('profile')
                     }}
                  >
                     <ListItemIcon>
                        <PersonIcon />
                     </ListItemIcon>
                     <ListItemText>Profile</ListItemText>
                  </ListItemButton>
               </ListItem>
               <ListItem disablePadding>
                  <ListItemButton>
                     <ListItemIcon>
                        <ErrorOutlineIcon />
                     </ListItemIcon>
                     <ListItemText onClick={checkMsg}>
                        Support{' '}
                        <span style={{ color: 'blue', fontWeight: 'bold' }}>
                           {unreadCount}
                        </span>
                     </ListItemText>
                  </ListItemButton>
               </ListItem>
            </List>
         </Drawer>
         <Main open={open}>
            <DrawerHeader />
            <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
               {!open ? (
                  <Drawer
                     sx={{
                        position: 'relative !important',
                        width: '80px',
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                           position: 'relative',
                           boxSizing: 'border-box',
                        },
                     }}
                     variant="persistent"
                     anchor="left"
                     open={!open}
                  >
                     <List>
                        <ListItem disablePadding>
                           <ListItemButton
                              onClick={() => navigate('dashboard')}
                           >
                              <ListItemIcon>
                                 <DashboardIcon />
                              </ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                           <ListItemButton
                              onClick={() => {
                                 setListOpen(!listopen)
                              }}
                           >
                              <ListItemIcon>
                                 <AssignmentReturnedIcon />
                              </ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                        <Collapse in={listopen} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                              <ListItemButton
                                 sx={{ pl: 4 }}
                                 onClick={() => {
                                    navigate('upload')
                                 }}
                              >
                                 <ListItemIcon>
                                    <CloudUpload />
                                 </ListItemIcon>
                              </ListItemButton>
                           </List>
                           <List component="div" disablePadding>
                              <ListItemButton
                                 sx={{ pl: 4 }}
                                 onClick={() => {
                                    navigate('overview')
                                 }}
                              >
                                 <ListItemIcon>
                                    <DescriptionIcon />
                                    <span
                                       style={{
                                          color: 'blue',
                                          fontWeight: 'bold',
                                       }}
                                    >
                                       {unreadFileCount}
                                    </span>
                                 </ListItemIcon>
                              </ListItemButton>
                           </List>
                        </Collapse>
                        <ListItem
                           disablePadding
                           onClick={() => {
                              setCreditOpen(!creditopen)
                           }}
                        >
                           <ListItemButton>
                              <ListItemIcon>
                                 <CreditCardIcon />
                              </ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                        <Collapse in={creditopen} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                              <ListItemButton
                                 sx={{ pl: 4 }}
                                 onClick={() => {
                                    navigate('overviewCredit')
                                 }}
                              >
                                 <ListItemIcon>
                                    <CreditCardIcon />
                                 </ListItemIcon>
                              </ListItemButton>
                              <ListItemButton
                                 sx={{ pl: 4 }}
                                 onClick={() => {
                                    navigate('buyCredit')
                                 }}
                              >
                                 <ListItemIcon>
                                    <ShoppingCartIcon />
                                 </ListItemIcon>
                              </ListItemButton>
                           </List>
                        </Collapse>
                        <ListItem disablePadding>
                           <ListItemButton
                              onClick={() => {
                                 navigate('profile')
                              }}
                           >
                              <ListItemIcon>
                                 <PersonIcon />
                              </ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                           <ListItemButton onClick={checkMsg}>
                              <ListItemIcon>
                                 <ErrorOutlineIcon />{' '}
                                 <span
                                    style={{
                                       textAlign: 'center',
                                       color: 'blue',
                                       fontWeight: 'bold',
                                    }}
                                 >
                                    {unreadCount}
                                 </span>
                              </ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                     </List>
                  </Drawer>
               ) : (
                  <></>
               )}
               <Outlet />
            </div>
         </Main>
      </Box>
   )
}

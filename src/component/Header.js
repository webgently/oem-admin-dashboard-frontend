import React, { useEffect, useState } from 'react'
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
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoIcon from '../assets/img/OEMservice2.jpg'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import SettingsIcon from '@mui/icons-material/Settings'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import { Collapse, Menu, MenuItem } from '@mui/material'
import { useNavigate, Outlet } from 'react-router-dom'
import CloudUpload from '@mui/icons-material/CloudUpload'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import EuroIcon from '@mui/icons-material/Euro'
import { useDispatch } from 'react-redux'
import { clearAccountData } from '../features/account/account'
import axios from 'axios'

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
   // necessary for content to be below app bar
   ...theme.mixins.toolbar,
   justifyContent: 'flex-end',
}))

export default function PersistentDrawerLeft() {
   const theme = useTheme()
   const [open, setOpen] = useState(false)
   const [logo, setLogo] = useState('')
   const [anchorElUser, setAnchorElUser] = useState(null)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [listopen, setListOpen] = useState(false)

   const handleClickList = () => {
      setListOpen(!listopen)
   }

   const [creditopen, setCreditOpen] = useState(false)

   const handleClickCreditlist = () => {
      setCreditOpen(!creditopen)
   }

   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget)
   }

   const handleCloseUserMenu = () => {
      setAnchorElUser(null)
   }

   const handleDrawerOpen = () => {
      setOpen(true)
   }

   const handleDrawerClose = () => {
      setOpen(false)
   }

   const gotoDashboard = () => {
      navigate('admin_dashboard')
   }

   const gotoRegisteredUsers = () => {
      navigate('admin_user')
   }
   const getLogo = async () => {
      await axios
         .post(`${process.env.REACT_APP_API_Url}getLogo`)
         .then((result) => {
            if (result.data.status) {
               setLogo(process.env.REACT_APP_Base_Url + result.data.data)
            }
         })
   }
   useEffect(() => {
      getLogo()
   }, [])

   return (
      <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <AppBar position="fixed" open={open}>
            <Toolbar>
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
                  />
               )}
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mx: 1, ...(open && { display: 'none' }) }}
               >
                  <MenuIcon />
               </IconButton>
               <Typography variant="h6" noWrap component="div">
                  Dashboard
               </Typography>
               <div style={{ flex: '1' }}></div>
               Admin
               <IconButton
                  sx={{ ml: '20px', bgcolor: 'white' }}
                  onClick={handleOpenUserMenu}
               >
                  <PersonIcon />
               </IconButton>
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
                        localStorage.removeItem('user')
                        dispatch(clearAccountData())
                        navigate('/')
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
                  <ListItemButton onClick={gotoDashboard}>
                     <ListItemIcon>
                        <DashboardIcon />
                     </ListItemIcon>
                     <ListItemText>Dashboard</ListItemText>
                  </ListItemButton>
               </ListItem>
               <ListItem disablePadding>
                  <ListItemButton onClick={gotoRegisteredUsers}>
                     <ListItemIcon>
                        <PersonIcon />
                     </ListItemIcon>
                     <ListItemText>User</ListItemText>
                  </ListItemButton>
               </ListItem>
               <ListItem disablePadding>
                  <ListItemButton onClick={handleClickList}>
                     <ListItemIcon>
                        <AssignmentReturnedIcon />
                     </ListItemIcon>
                     <ListItemText>File System</ListItemText>
                  </ListItemButton>
               </ListItem>
               <Collapse in={listopen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                     <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => {
                           navigate('admin_upload')
                        }}
                     >
                        <ListItemIcon>
                           <CloudUpload />
                        </ListItemIcon>
                        <ListItemText>Upload</ListItemText>
                     </ListItemButton>
                  </List>
               </Collapse>

               <ListItem disablePadding>
                  <ListItemButton
                     onClick={() => {
                        navigate('admin_service')
                     }}
                  >
                     <ListItemIcon>
                        <BusinessCenterIcon />
                     </ListItemIcon>
                     <ListItemText>Services</ListItemText>
                  </ListItemButton>
               </ListItem>
               <ListItem disablePadding>
                  <ListItemButton onClick={handleClickCreditlist}>
                     <ListItemIcon>
                        <AssignmentReturnedIcon />
                     </ListItemIcon>
                     <ListItemText>Credit</ListItemText>
                  </ListItemButton>
               </ListItem>
               <Collapse in={creditopen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                     <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => {
                           navigate('admin_creditlist')
                        }}
                     >
                        <ListItemIcon>
                           <CreditCardIcon />
                        </ListItemIcon>
                        <ListItemText>Credit List</ListItemText>
                     </ListItemButton>
                     <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => {
                           navigate('admin_pricelist')
                        }}
                     >
                        <ListItemIcon>
                           <EuroIcon />
                        </ListItemIcon>
                        <ListItemText>Price List</ListItemText>
                     </ListItemButton>
                  </List>
               </Collapse>
               <ListItem disablePadding>
                  <ListItemButton
                     onClick={() => {
                        navigate('admin_profilsetting')
                     }}
                  >
                     <ListItemIcon>
                        <SettingsIcon />
                     </ListItemIcon>
                     <ListItemText>Setting</ListItemText>
                  </ListItemButton>
               </ListItem>
               <ListItem disablePadding>
                  <ListItemButton
                     onClick={() => {
                        navigate('admin_invoice')
                     }}
                  >
                     <ListItemIcon>
                        <FormatAlignLeftIcon />
                     </ListItemIcon>
                     <ListItemText>Invoices</ListItemText>
                  </ListItemButton>
               </ListItem>
               <ListItem disablePadding>
                  <ListItemButton>
                     <ListItemIcon>
                        <ErrorOutlineIcon />
                     </ListItemIcon>
                     <ListItemText
                        onClick={() => {
                           navigate('admin_support')
                        }}
                     >
                        Support
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
                           <ListItemButton onClick={gotoDashboard}>
                              <ListItemIcon>
                                 <DashboardIcon />
                              </ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                           <ListItemButton onClick={gotoRegisteredUsers}>
                              <ListItemIcon>
                                 <PersonIcon />
                              </ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                           <ListItemButton onClick={handleClickList}>
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
                                    navigate('admin_upload')
                                 }}
                              >
                                 <ListItemIcon>
                                    <CloudUpload />
                                 </ListItemIcon>
                              </ListItemButton>
                           </List>
                        </Collapse>

                        <ListItem disablePadding>
                           <ListItemButton
                              onClick={() => {
                                 navigate('admin_service')
                              }}
                           >
                              <ListItemIcon>
                                 <BusinessCenterIcon />
                              </ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                        <ListItem
                           disablePadding
                           onClick={handleClickCreditlist}
                        >
                           <ListItemButton>
                              <ListItemIcon>
                                 <AssignmentReturnedIcon />
                              </ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                        <Collapse in={creditopen} timeout="auto" unmountOnExit>
                           <List component="div" disablePadding>
                              <ListItemButton
                                 sx={{ pl: 4 }}
                                 onClick={() => {
                                    navigate('admin_creditlist')
                                 }}
                              >
                                 <ListItemIcon>
                                    <CreditCardIcon />
                                 </ListItemIcon>
                              </ListItemButton>
                              <ListItemButton
                                 sx={{ pl: 4 }}
                                 onClick={() => {
                                    navigate('admin_pricelist')
                                 }}
                              >
                                 <ListItemIcon>
                                    <EuroIcon />
                                 </ListItemIcon>
                              </ListItemButton>
                           </List>
                        </Collapse>
                        <ListItem disablePadding>
                           <ListItemButton
                              onClick={() => {
                                 navigate('admin_profilsetting')
                              }}
                           >
                              <ListItemIcon>
                                 <SettingsIcon />
                              </ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                           <ListItemButton
                              onClick={() => {
                                 navigate('admin_invoice')
                              }}
                           >
                              <ListItemIcon>
                                 <FormatAlignLeftIcon />
                              </ListItemIcon>
                           </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                           <ListItemButton
                              onClick={() => {
                                 navigate('admin_support')
                              }}
                           >
                              <ListItemIcon>
                                 <ErrorOutlineIcon />
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

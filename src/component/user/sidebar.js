import React, { useState, useEffect } from 'react'
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
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import LogoIcon from '../../assets/img/OEMservice2.jpg'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import SettingsIcon from '@mui/icons-material/Settings'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { Navigate, Outlet } from 'react-router-dom'
import { Button, Collapse, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import WalletIcon from '@mui/icons-material/Wallet'
import GroupsIcon from '@mui/icons-material/Groups'
import ListIcon from '@mui/icons-material/List'
import UploadIcon from '@mui/icons-material/Upload'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DescriptionIcon from '@mui/icons-material/Description'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useSelector } from 'react-redux'

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
    const navigate = useNavigate()
    const account = useSelector((state) => state.account)
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [listopen, setListOpen] = useState(false)
    const [creditopen, setCreditOpen] = useState(false)

    const handleClickList = () => {
        setListOpen(!listopen)
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
        navigate('dashboard')
    }

    const gotoRegisteredUsers = () => {
        navigate('users')
    }

    useEffect(() => {
        if (account.permission === 'admin') {
            navigate('admin_dashboard')
        } else if (account.permission === '') {
            navigate('/')
        }
    }, [])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ width: '85vw' }}>
                <Box sx={{ bgcolor: 'white', display: 'flex' }}>
                    <Box sx={{ flex: '1' }} />
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
                            <WalletIcon sx={{ color: 'red' }} />0 Credit
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
                        >
                            Chat with
                            <GroupsIcon />{' '}
                        </Box>
                    </Box>
                </Box>
                <Toolbar sx={{ bgcolor: 'rgb(229, 229, 229)', p: '20px' }}>
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
                        <ListIcon /> Price List
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
                        <UploadIcon /> Upload File
                    </Button>
                    <Button
                        sx={{ bgcolor: 'transparent', color: 'black' }}
                        onClick={handleOpenUserMenu}
                    >
                        <PersonIcon /> Dashboard
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
                                handleCloseUserMenu()
                                navigate('/')
                            }}
                        >
                            <Typography textAlign="center">LogOut</Typography>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Main open={true}>
                <div style={{ display: 'flex', height: '100vh' }}>
                    <Drawer
                        sx={{
                            position: 'relative !important',
                            width: '15vw',
                            justifyContent: 'center',
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                position: 'relative',
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={true}
                    >
                        <DrawerHeader sx={{ justifyContent: 'center' }}>
                            <img
                                src={LogoIcon}
                                style={{ width: '120px', height: '120px' }}
                            />
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
                                <ListItemButton
                                    onClick={() => {
                                        setListOpen(!listopen)
                                    }}
                                >
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText>File Service</ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <Collapse
                                in={listopen}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    <ListItemButton
                                        sx={{ pl: 4 }}
                                        onClick={() => {
                                            navigate('upload')
                                        }}
                                    >
                                        <ListItemIcon>
                                            <CloudUploadIcon />
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
                                        <ListItemText>Overview</ListItemText>
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
                            <Collapse
                                in={creditopen}
                                timeout="auto"
                                unmountOnExit
                            >
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
                                        <ListItemText>Buy Credits</ListItemText>
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
                                    <ListItemText>Support</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Drawer>
                    <Outlet />
                </div>
            </Main>
        </Box>
    )
}

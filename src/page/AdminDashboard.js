import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import { IconButton } from '@mui/material'
import axios from 'axios'

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
    const navigate = useNavigate()
    const [userCount, setUserCount] = useState(0)
    const [serviceCount, setServiceCount] = useState(0)

    useEffect(() => {
        getDashBoardData()
    }, [])

    const getDashBoardData = async () => {
        await axios
            .post(`${process.env.REACT_APP_API_Url}getDashBoardData`)
            .then((result) => {
                setUserCount(result.data.userCount)
                setServiceCount(result.data.serviceCount)
            })
    }
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
                                <h3 style={{ margin: '0px' }}>
                                    Active Services
                                </h3>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <h2 style={{ margin: '0px' }}>
                                    {serviceCount}
                                </h2>
                            </Box>
                        </Item>
                    </Grid>
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
                                <h3 style={{ margin: '0px' }}>
                                    Total Requests
                                </h3>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <h2 style={{ margin: '0px' }}>N/A</h2>
                            </Box>
                        </Item>
                    </Grid>
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
                                <h3 style={{ margin: '0px' }}>Unread Chart</h3>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <h2 style={{ margin: '0px' }}>N/A</h2>
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

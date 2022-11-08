import * as React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import { Avatar, Button, Divider, Icon, IconButton } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import bgCar from '../../assets/img/bgCar.jpg'
import EditIcon from '@mui/icons-material/Edit'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein }
}

const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '0px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    textAlign: 'center',
    borderLeft: '5px solid red',
    color: theme.palette.text.secondary,
}))

export default function ResponsiveGrid() {
    return (
        <Box
            sx={{
                flexGrow: 1,
                p: 3,
                bgcolor: 'rgb(229, 229, 229)',
                overflowY: 'overlay',
            }}
        >
            <Box sx={{ mt: '130px' }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid item xs={12} sm={12} md={12}>
                        <Item1>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    background: `url(${bgCar})`,
                                    height: '200px',
                                    width: '100%',
                                    position: 'relative',
                                    backgroundSize: '100% 100%',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: '-30px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        pl: '20px',
                                    }}
                                >
                                    <Avatar
                                        sx={{ width: '120px', height: '120px' }}
                                    >
                                        CA
                                    </Avatar>
                                    <Box
                                        sx={{
                                            color: 'white',
                                            fontSize: '30px',
                                        }}
                                    >
                                        Carlos Arthur
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    mt: '30px',
                                    p: '20px',
                                }}
                            >
                                <Grid
                                    container
                                    spacing={{ xs: 2, md: 3 }}
                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                >
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                px: '0px 25px',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontSize: '25px',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Other Details
                                            </Box>
                                            <Box sx={{ flex: '1' }}></Box>
                                            <Box>
                                                <IconButton>
                                                    <EditIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Grid
                                            container
                                            spacing={{ xs: 2, md: 3 }}
                                            columns={{ xs: 4, sm: 8, md: 12 }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                sx={{
                                                    textAlign: 'left',
                                                    pl: '50px !important',
                                                }}
                                            >
                                                Email
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                sx={{
                                                    textAlign: 'left',
                                                    pl: '50px !important',
                                                }}
                                            >
                                                carlosarthur0323@gmail.com
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Grid
                                            container
                                            spacing={{ xs: 2, md: 3 }}
                                            columns={{ xs: 4, sm: 8, md: 12 }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                sx={{
                                                    textAlign: 'left',
                                                    pl: '50px !important',
                                                }}
                                            >
                                                Email
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                sx={{
                                                    textAlign: 'left',
                                                    pl: '50px !important',
                                                }}
                                            >
                                                carlosarthur0323@gmail.com
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Grid
                                            container
                                            spacing={{ xs: 2, md: 3 }}
                                            columns={{ xs: 4, sm: 8, md: 12 }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                sx={{
                                                    textAlign: 'left',
                                                    pl: '50px !important',
                                                }}
                                            >
                                                Email
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                sx={{
                                                    textAlign: 'left',
                                                    pl: '50px !important',
                                                }}
                                            >
                                                carlosarthur0323@gmail.com
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Grid
                                            container
                                            spacing={{ xs: 2, md: 3 }}
                                            columns={{ xs: 4, sm: 8, md: 12 }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                sx={{
                                                    textAlign: 'left',
                                                    pl: '50px !important',
                                                }}
                                            >
                                                Email
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                sx={{
                                                    textAlign: 'left',
                                                    pl: '50px !important',
                                                }}
                                            >
                                                carlosarthur0323@gmail.com
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Grid
                                            container
                                            spacing={{ xs: 2, md: 3 }}
                                            columns={{ xs: 4, sm: 8, md: 12 }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                sx={{
                                                    textAlign: 'left',
                                                    pl: '50px !important',
                                                }}
                                            >
                                                Email
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={6}
                                                sx={{
                                                    textAlign: 'left',
                                                    pl: '50px !important',
                                                }}
                                            >
                                                carlosarthur0323@gmail.com
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Divider />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Item1>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

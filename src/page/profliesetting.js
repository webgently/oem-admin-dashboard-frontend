import React, { useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import {
    Avatar,
    Button,
    Divider,
    Icon,
    IconButton,
    TextField,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import bgCar from '../assets/img/bgCar.jpg'
import EditIcon from '@mui/icons-material/Edit'

import TablePagination from '@mui/material/TablePagination'
import { ButtonGroup } from '@mui/material'
import EuroIcon from '@mui/icons-material/Euro'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import CloseIcon from '@mui/icons-material/Close'
import toast, { Toaster } from 'react-hot-toast'
import logo from '../assets/img/OEMservice2.jpg'
import Key from '../assets/img/changepassword.png'

const columns = [
    { id: 'id', label: 'Sr #', minWidth: 50 },
    { id: 'day', label: 'Day', minWidth: 50 },
    { id: 'open', label: 'Opening time', minWidth: 100 },
    { id: 'close', label: 'Closing time', minWidth: 150 },
    { id: 'holiday', label: 'Holiday', minWidth: 100 },
    { id: 'action', label: 'Action' },
]

function createData(id, day, open, close, holiday, action) {
    return { id, day, open, close, holiday, action }
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
]

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
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    return (
        <Box
            sx={{
                flexGrow: 1,
                p: 3,
                bgcolor: 'rgb(229, 229, 229)',
                overflowY: 'overlay',
            }}
        >
            <Box sx={{ color: 'red', py: '20px', fontSize: '25px' }}>
                Profile
            </Box>
            <Box>
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
            <Box sx={{ pt: '20px', fontSize: '25px' }}>Store Timings</Box>
            <Box sx={{ bgcolor: 'white', borderRadius: '12px' }}>
                <TableContainer
                    sx={{
                        mt: 2,
                    }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            backgroundColor: '#3791e9',
                                            color: 'white',
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.code}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id]
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column.id ===
                                                        'profile' ? (
                                                            <Avatar
                                                                alt="Remy Sharp"
                                                                src={value}
                                                            />
                                                        ) : column.id ===
                                                          'action' ? (
                                                            <ButtonGroup
                                                                variant="outlined"
                                                                aria-label="outlined button group"
                                                            >
                                                                <IconButton
                                                                    color="primary"
                                                                    aria-label="add to shopping cart"
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </ButtonGroup>
                                                        ) : (
                                                            value
                                                        )}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
            <Box sx={{ pt: '20px', fontSize: '25px' }}>
                Privacy Policy
                <IconButton>
                    <EditIcon />
                </IconButton>
            </Box>
            <Box sx={{ p: 5, my: 3, bgcolor: 'white', borderRadius: '10px' }}>
                This will be updated shortly! NO CASH REFUND - CREDIT REFUND
                AFTER AGREEMENTS -
            </Box>
            <Box sx={{ pt: '20px', fontSize: '25px' }}>Update Logo</Box>
            <Box sx={{ p: 4, my: 3, borderRadius: '12px', bgcolor: 'white' }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                border: '1px dotted',
                                borderRadius: '20px',
                                flexDirection: 'column',
                                p: '30px',
                                gap: '10px',
                                alignItems: 'center',
                            }}
                        >
                            <Box>
                                <CloudUploadIcon
                                    sx={{ color: 'red', fontSize: '70px' }}
                                />
                            </Box>
                            <Box>Drag amd Drop your File here</Box>
                            <Box>Or</Box>
                            <Box>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        border: '1px solid red',
                                        borderRadius: '12px',
                                        color: 'red',
                                    }}
                                >
                                    Browse File
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={8}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                p: '30px',
                                gap: '10px',
                                height: '250px',
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <img src={logo} style={{ height: '100%' }} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ pt: '20px', fontSize: '25px' }}>Change Password</Box>
            <Box sx={{ p: 4, my: 3, borderRadius: '12px', bgcolor: 'white' }}>
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
                            display: 'flex',
                            gap: '20px',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={Key} />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <TextField type="password" placeholder="Old password" />
                        <TextField type="password" placeholder="New password" />
                        <TextField
                            type="password"
                            placeholder="Confirm password"
                        />
                        <Button variant="contained">Change Password</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

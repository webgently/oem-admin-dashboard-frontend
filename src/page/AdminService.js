import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import {
    Box,
    Button,
    ButtonGroup,
    IconButton,
    Modal,
    TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import toast, { Toaster } from 'react-hot-toast'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

const columns = [
    { id: '_id', label: 'ID', minWidth: 50 },
    { id: 'serviceType', label: 'Service Type', minWidth: 150 },
    { id: 'status', label: 'Status', minWidth: 150 },
    { id: 'action', label: 'Action', minWidth: 50 },
]

const ServiceStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw',
    bgcolor: 'background.paper',
    border: '0px',
    borderRadius: 1,
    boxShadow: 24,
    p: 0,
}

export default function AdminService() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const [serviceType, setServiceType] = useState('')
    const [serviceData, setServiceData] = useState([])
    const [currentID, setCurrentID] = useState()
    const [modalBtnText, setModalBtnText] = useState('')
    const [open, setOpen] = useState(false)

    const handleOpen = (flag, id) => {
        setServiceType('')
        setModalBtnText(flag)
        if (flag === 'update') {
            getOneService(id)
            setCurrentID(id)
        }
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveServiceType = (flag) => {
        if (!serviceType) {
            toast.error('Select Service Type')
            return
        }
        if (flag === 'add') addService()
        else updateService(currentID)
    }

    const addService = async () => {
        let data = { serviceType }
        await axios
            .post(`${process.env.REACT_APP_Base_Url}addService`, {
                data: data,
            })
            .then((result) => {
                if (result.status) {
                    setServiceData((serviceData) => [
                        ...serviceData,
                        result.data.data,
                    ])
                    setOpen(false)
                    toast.success('Service Type Create Successfully')
                } else {
                    toast.success(result.data.data)
                }
            })
    }

    const updateService = async (id) => {
        let data = { _id: id, serviceType: serviceType }
        await axios
            .post(`${process.env.REACT_APP_Base_Url}updateService`, {
                data: data,
            })
            .then((result) => {
                if (result.data === 'success') {
                    getAllService()
                    setOpen(false)
                    toast.success('Service Type Update Successfully')
                }
            })
    }

    const deleteService = async (row) => {
        await axios
            .post(`${process.env.REACT_APP_Base_Url}deleteService`, {
                _id: row._id,
            })
            .then((result) => {
                if (result.data === 'success') {
                    getAllService()
                    toast.success('Service Type Delete Successfully')
                }
            })
    }

    const getOneService = async (id) => {
        await axios
            .post(`${process.env.REACT_APP_Base_Url}getOneService`, {
                _id: id,
            })
            .then((result) => {
                if (result) {
                    setServiceType(result.data.serviceType)
                }
            })
    }

    const getAllService = async () => {
        await axios
            .post(`${process.env.REACT_APP_Base_Url}getAllService`)
            .then((result) => {
                if (result) {
                    setServiceData(result.data)
                } else {
                    toast.error('Interanal server error')
                }
            })
    }

    useEffect(() => {
        getAllService()
    }, [])

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                p: 3,
                overflowY: 'overlay',
            }}
        >
            Service Types
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ flex: '1' }}></Box>
                <Box>
                    <Button
                        variant="contained"
                        endIcon={<AddIcon />}
                        onClick={() => handleOpen('add', 0)}
                    >
                        Service Type
                    </Button>
                </Box>
            </Box>
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
                        {serviceData
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
                                        key={row._id}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.id === 'action' ? (
                                                        <ButtonGroup
                                                            variant="outlined"
                                                            aria-label="outlined button group"
                                                            key={column.id}
                                                        >
                                                            <IconButton
                                                                onClick={() => {
                                                                    handleOpen(
                                                                        'update',
                                                                        row._id
                                                                    )
                                                                }}
                                                                color="primary"
                                                                aria-label="add to shopping cart"
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                color="primary"
                                                                aria-label="add to shopping cart"
                                                                onClick={() =>
                                                                    deleteService(
                                                                        row
                                                                    )
                                                                }
                                                            >
                                                                <DeleteIcon />
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
                count={serviceData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ServiceStyle}>
                    <Box
                        sx={{
                            px: 3,
                            py: 1,
                            bgcolor: '#1976d2',
                            borderRadius: 1,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Box>Edit Service Type</Box>
                        <Box sx={{ flex: '1' }}></Box>
                        <Box>
                            <IconButton
                                onClick={() => {
                                    handleClose()
                                }}
                            >
                                <CloseIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ p: 3 }}>
                        <Box>
                            <TextField
                                id="outlined-basic"
                                label="Service Type"
                                variant="outlined"
                                size="small"
                                fullWidth
                                value={serviceType}
                                onChange={(e) => setServiceType(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ flex: '1' }}></Box>
                            <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    Close
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() =>
                                        saveServiceType(modalBtnText)
                                    }
                                >
                                    {modalBtnText}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <Toaster />
        </Paper>
    )
}

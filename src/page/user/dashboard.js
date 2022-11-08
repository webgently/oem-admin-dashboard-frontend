import * as React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import { Button, IconButton } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein }
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
]

const Item1 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '20px 20px 20px 20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    textAlign: 'center',
    borderLeft: '5px solid #1976d2',
    color: theme.palette.text.secondary,
}))
const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '20px 20px 20px 20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    textAlign: 'center',
    borderLeft: '5px solid #ffc800',
    color: theme.palette.text.secondary,
}))
const Item3 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '20px 20px 20px 20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    textAlign: 'center',
    borderLeft: '5px solid #01ef92',
    color: theme.palette.text.secondary,
}))

export default function ResponsiveGrid() {
    return (
        <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'rgb(229, 229, 229)' }}>
            <Box sx={{ mt: '130px' }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid item xs={6} sm={4} md={4}>
                        <Item1>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <h3 style={{ margin: '0px' }}>Credit</h3>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <h2 style={{ margin: '0px' }}>0</h2>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <Button variant="contained">Buy Now</Button>
                            </Box>
                        </Item1>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                        <Item2>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <h3 style={{ margin: '0px' }}>Opening Time</h3>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <h2 style={{ margin: '0px' }}>09:00</h2>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            ></Box>
                        </Item2>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                        <Item3>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <h3 style={{ margin: '0px' }}>Closing Time</h3>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <h2 style={{ margin: '0px' }}>17:00</h2>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            ></Box>
                        </Item3>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: '30px' }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid item xs={12} sm={12} md={12}>
                        <Item2>
                            <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                                <Grid item xs={6} sm={6} md={6}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                        }}
                                    >
                                        <h3 style={{ margin: '0px' }}>
                                            Uploaded Files
                                        </h3>
                                    </Box>
                                    <Box
                                        sx={{
                                            marginTop: '20px',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            border: '1px dotted',
                                            borderRadius: '20px',
                                            flexDirection: 'column',
                                            p: '30px',
                                            gap: '10px',
                                        }}
                                    >
                                        <Box>
                                            <CloudUploadIcon
                                                sx={{
                                                    color: 'red',
                                                    fontSize: '70px',
                                                }}
                                            />
                                        </Box>
                                        <Box>Click to Upload File</Box>
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
                                <Grid item xs={6} sm={6} md={6}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <h4 style={{ margin: '0px' }}>
                                            Recent Files
                                        </h4>
                                    </Box>
                                    <Box
                                        sx={{
                                            marginTop: '20px',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <TableContainer component={Paper}>
                                            <Table
                                                sx={{ width: '100%' }}
                                                aria-label="simple table"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            Code
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            Vehicle type
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            Date
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            Status
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                {/* <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right">
                                {row.calories}
                              </TableCell>
                              <TableCell align="right">{row.fat}</TableCell>
                              <TableCell align="right">{row.carbs}</TableCell>
                              <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody> */}
                                            </Table>
                                        </TableContainer>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                m: '40px',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <InsertDriveFileIcon
                                                sx={{ fontSize: '60px' }}
                                            />
                                            No recent file
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Item2>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

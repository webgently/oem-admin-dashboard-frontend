import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "client", label: "Client", minWidth: 50 },
  { id: "vehicle", label: "Vehicle Type", minWidth: 100 },
  { id: "build", label: "Build Year", minWidth: 150 },
  { id: "hp", label: "HP", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 50 },
  { id: "tuning", label: "Tuning Type", minWidth: 100 },
  { id: "credit", label: "Credits", minWidth: 50 },
  { id: "action", label: "Action" },
];

function createData(id, client, vehicle, build) {
  return { id, client, vehicle, build };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  bgcolor: "background.paper",
  border: "0px",
  borderRadius: 1,
  boxShadow: 24,
  p: 0,
};

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [creditAddFlag, setCreditAddFlag] = useState(true);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", p: 3, overflowY: "overlay" }}
    >
      Requests
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
                    backgroundColor: "#3791e9",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "profile" ? (
                            <Avatar alt="Remy Sharp" src={value} />
                          ) : column.id === "action" ? (
                            <ButtonGroup
                              variant="outlined"
                              aria-label="outlined button group"
                            >
                              <IconButton
                                onClick={handleOpen}
                                color="primary"
                                aria-label="add to shopping cart"
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </ButtonGroup>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              px: 3,
              py: 1,
              bgcolor: "#1976d2",
              borderRadius: 1,
              color: "white",
              display: "flex",
              alignItems: "center",
              position: "fixed",
              width: "100%",
            }}
          >
            <Box>View Complete Service Request</Box>
            <Box sx={{ flex: "1" }}></Box>
            <Box>
              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ p: 3, mt: 9, height: "70vh", overflowY: "overlay" }}>
            <Box>
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
                  sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      border: "1px dotted",
                      borderRadius: "20px",
                      flexDirection: "column",
                      p: "30px",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <CloudUploadIcon
                        sx={{ color: "red", fontSize: "70px" }}
                      />
                    </Box>
                    <Box>Drag amd Drop your File here</Box>
                    <Box>Or</Box>
                    <Box>
                      <Button
                        variant="outlined"
                        sx={{
                          border: "1px solid red",
                          borderRadius: "12px",
                          color: "red",
                        }}
                      >
                        Browse File
                      </Button>
                    </Box>
                  </Box>
                  <Box>Available Credits: 1000000</Box>
                  <Box>Charged Credits: 0</Box>
                  <Box>
                    Update Status
                    <FormControl fullWidth size="small">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    Note
                    <TextField
                      id="outlined-basic"
                      placeholder="X-node : Tar 100 span till"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      endIcon={<ArrowForwardIcon />}
                    >
                      Upload
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box>
                    <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>
                      Request From(Herman Performance)
                    </Box>
                    <Divider />
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Name</Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Value</Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Name</Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Value</Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Name</Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Value</Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Name</Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Value</Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Name</Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Value</Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Name</Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Value</Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Name</Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Value</Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Name</Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box sx={{ my: "20px" }}>Value</Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={12} md={12}>
                        <Box
                          sx={{
                            my: "20px",
                            fontSize: "20px",
                            fontWeight: "600",
                          }}
                        >
                          Upload
                        </Box>
                        <ul>
                          <li>
                            <a style={{ color: "blue" }} href="#">
                              XCN891_MPPS_OBD_READ_1037395572.Bin
                            </a>
                          </li>
                        </ul>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={12} md={12}>
                        <Box
                          sx={{
                            my: "20px",
                            fontSize: "20px",
                            fontWeight: "600",
                          }}
                        >
                          Uploaded by Support team
                        </Box>
                        <ul>
                          <li>
                            <a style={{ color: "blue" }} href="#">
                              jeep_edc16cp31_bench_fullbackup_20220428135143_ext_flash
                              (1).bin
                            </a>
                          </li>
                          <li>
                            <a style={{ color: "blue" }} href="#">
                              jeep_edc16cp31_bench_fullbackup_20220428135143_ext_flash
                              (1).bin
                            </a>
                          </li>
                        </ul>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Toaster />
    </Paper>
  );
}

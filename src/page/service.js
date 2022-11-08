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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "type", label: "Service Type", minWidth: 50 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 150 },
];

function createData(id, type, status, action) {
  return { id, type, status, action };
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

const ServiceStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
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

  const [addservice, setaddservice] = useState(false);
  const handleOpenAddservice = () => setaddservice(true);
  const handleCloseAddservice = () => setaddservice(false);

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", p: 3, overflowY: "overlay" }}
    >
      Service Types
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ flex: "1" }}></Box>
        <Box>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleOpenAddservice}
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
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="primary"
                                aria-label="add to shopping cart"
                              >
                                <DeleteIcon />
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
        <Box sx={ServiceStyle}>
          <Box
            sx={{
              px: 3,
              py: 1,
              bgcolor: "#1976d2",
              borderRadius: 1,
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>Edit Service Type</Box>
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
          <Box sx={{ p: 3 }}>
            <Box>
              <TextField
                id="outlined-basic"
                label="Service Type"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: "1" }}></Box>
              <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Close
                </Button>
                <Button size="small" variant="contained">
                  Update
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={addservice}
        onClose={handleCloseAddservice}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ServiceStyle}>
          <Box
            sx={{
              px: 3,
              py: 1,
              bgcolor: "#1976d2",
              borderRadius: 1,
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>Service Type</Box>
            <Box sx={{ flex: "1" }}></Box>
            <Box>
              <IconButton
                onClick={() => {
                  handleCloseAddservice();
                }}
              >
                <CloseIcon sx={{ color: "white" }} />
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
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: "1" }}></Box>
              <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    handleCloseAddservice();
                  }}
                >
                  Close
                </Button>
                <Button size="small" variant="contained">
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Toaster />
    </Paper>
  );
}

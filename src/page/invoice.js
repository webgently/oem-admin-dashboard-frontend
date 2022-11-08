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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 50 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "vat", label: "Vat Number", minWidth: 150 },
  { id: "credit", label: "Credit", minWidth: 150 },
  { id: "netamount", label: "Net Amount", minWidth: 150 },
  { id: "invoice", label: "Invoice", minWidth: 150 },
  { id: "action", label: "Action", minWidth: 150 },
];

function createData(id, name, email, vat, credit, netamount) {
  return { id, name, email, vat, credit, netamount };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263, 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961, 1324171354, 3287263),
  createData("Italy", "IT", 60483973, 301340, 1324171354, 3287263),
  createData("United States", "US", 327167434, 9833520, 1324171354, 3287263),
  createData("Canada", "CA", 37602103, 9984670, 1324171354, 3287263),
  createData("Australia", "AU", 25475400, 7692024, 1324171354, 3287263),
  createData("Germany", "DE", 83019200, 357578, 1324171354, 3287263),
  createData("Ireland", "IE", 4857000, 70273, 1324171354, 3287263),
  createData("Mexico", "MX", 126577691, 1972550, 1324171354, 3287263),
  createData("Japan", "JP", 126317000, 377973, 1324171354, 3287263),
  createData("France", "FR", 67022000, 640679, 1324171354, 3287263),
  createData("United Kingdom", "GB", 67545757, 242495, 1324171354, 3287263),
  createData("Russia", "RU", 146793744, 17098246, 1324171354, 3287263),
  createData("Nigeria", "NG", 200962417, 923768, 1324171354, 3287263),
  createData("Brazil", "BR", 210147125, 8515767, 1324171354, 3287263),
];

const ServiceStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
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
  const [age, setAge] = useState("");

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
      Credit Invoices
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
                                <RemoveRedEyeIcon />
                              </IconButton>
                            </ButtonGroup>
                          ) : column.id === "invoice" ? (
                            <IconButton
                              color="primary"
                              aria-label="add to shopping cart"
                            >
                              <DownloadIcon />
                            </IconButton>
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
            <Box>Invoice Details</Box>
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
            <Box
              sx={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}
            >
              Receipt from ZipTuning Team
            </Box>
            <Box sx={{ textAlign: "center" }}>Receipt #: 1</Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: "1" }}>
                <Box sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  Amount Paid
                </Box>
                <Box>300.00</Box>
              </Box>
              <Box sx={{ flex: "1" }}>
                <Box sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  Date Paid
                </Box>
                <Box>2022-10-02</Box>
              </Box>
              <Box sx={{ flex: "1" }}>
                <Box sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  Payment Method
                </Box>
                <Box>mastercard-4444</Box>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ py: 3, fontSize: "20px", fontWeight: "bold" }}>
              Customer Details
            </Box>
            <Divider />
            <Box sx={{ display: "flex", py: 3 }}>
              <Box sx={{ flex: "1" }}>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
              </Box>
              <Box sx={{ flex: "1" }}>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
                <Box sx={{ py: "5px" }}>Name</Box>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ py: 4, fontSize: "20px", textAlign: "center" }}>
              If you have any questions, contact us at jonas@ecmtweaks.se
            </Box>
            <Divider />
            <Box sx={{ py: 4, fontSize: "20px", textAlign: "center" }}>
              You're receiving this email because you made a purchase at
              ZipTuning
            </Box>
          </Box>
        </Box>
      </Modal>
      <Toaster />
    </Paper>
  );
}

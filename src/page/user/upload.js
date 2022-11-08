import React, { useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import {
  Button,
  FormHelperText,
  FormLabel,
  IconButton,
  RadioGroup,
  TextareaAutosize,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Radio from "@mui/joy/Radio";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import FormControlJoy from "@mui/joy/FormControl";
import FormLabelJoy from "@mui/joy/FormLabel";
import RadioJoy from "@mui/joy/Radio";
import RadioGroupJoy from "@mui/joy/RadioGroup";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function ResponsiveGrid() {
  const [age, setAge] = useState("");
  const [value, setValue] = useState(dayjs("2022-04-07"));
  const [Radiovalue, setRadioValue] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeRadio = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        bgcolor: "rgb(229, 229, 229)",
        overflowY: "overlay",
      }}
    >
      <Box sx={{ mt: "130px" }}>
        <h3 style={{ color: "red", margin: "0px" }}>Upload File</h3>
        <span>Upload here the original file</span>
      </Box>
      <Box
        sx={{
          mt: "10px",
          borderTop: "5px solid red",
          bgcolor: "white",
          borderBottomRightRadius: "5px",
          borderBottomLeftRadius: "5px",
          p: "10px",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12} sm={6} md={6}>
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
                <CloudUploadIcon sx={{ color: "red", fontSize: "70px" }} />
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
          </Grid>
          <Grid item xs={12} sm={6} md={6}></Grid>
          <Grid item xs={12} sm={6} md={6}>
            Vehicle type
            <FormControl fullWidth>
              <Select
                size="small"
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
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            Vehicle type
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year"]}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField size="small" {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            Vehicle type
            <FormControl fullWidth>
              <TextField size="small" />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            Vehicle type
            <FormControl fullWidth>
              <Select
                size="small"
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
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            Vehicle type
            <FormControl fullWidth>
              <Select
                size="small"
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
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            Vehicle type
            <FormControl fullWidth>
              <Select
                size="small"
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
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            Vehicle type
            <FormControl fullWidth>
              <Select
                size="small"
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
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            Vehicle type
            <FormControl fullWidth>
              <Select
                size="small"
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
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            Vehicle type
            <FormControl fullWidth>
              <Select
                size="small"
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
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            Vehicle type
            <FormControl fullWidth>
              <Select
                size="small"
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
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            Message : "To our Engineers/Special Request"
            <Textarea minRows={4} size="sm" placeholder="Type Message..." />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControlJoy>
              <RadioGroupJoy
                defaultValue="female"
                name="controlled-radio-buttons-group"
                value={Radiovalue}
                onChange={handleChangeRadio}
                sx={{ my: 1 }}
              >
                <RadioJoy
                  value="female"
                  label="I accept the terms and condition"
                />
              </RadioGroupJoy>
            </FormControlJoy>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Button variant="contained" className="btn_red" fullWidth>
              Upload
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  cursor: "pointer",
  padding: "0px 20px 20px 20px",
  textAlign: "center",
  borderLeft: "5px solid gray",
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, p: 3, bgcolor: "rgb(229, 229, 229)" }}>
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Item
              onClick={() => {
                navigate("/admin_user");
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton size="large">
                  <SupervisorAccountIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <h3 style={{ margin: "0px" }}>Total Users</h3>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <h2 style={{ margin: "0px" }}>11</h2>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item
              onClick={() => {
                navigate("/admin_user");
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton size="large">
                  <SupervisorAccountIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <h3 style={{ margin: "0px" }}>Active Services</h3>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <h2 style={{ margin: "0px" }}>2</h2>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item
              onClick={() => {
                navigate("/admin_user");
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton size="large">
                  <SupervisorAccountIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <h3 style={{ margin: "0px" }}>Total Requests</h3>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <h2 style={{ margin: "0px" }}>5</h2>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item
              onClick={() => {
                navigate("/admin_user");
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton size="large">
                  <SupervisorAccountIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <h3 style={{ margin: "0px" }}>Unread Chart</h3>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <h2 style={{ margin: "0px" }}>6</h2>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

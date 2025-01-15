import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
            Movie Search App
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

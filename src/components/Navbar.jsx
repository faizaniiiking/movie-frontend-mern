import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm")); // Check for small screens

  return (
    <AppBar position="static" style={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
          <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
            Movie Search App
          </Typography>
          <Box display="flex" flexDirection={isMobile ? "column" : "row"} alignItems="center">
            <Button color="inherit" component={Link} to="/" style={{ margin: isMobile ? "5px 0" : "0 10px" }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/movies" style={{ margin: isMobile ? "5px 0" : "0 10px" }}>
              Search Movies
            </Button>
            <Button color="inherit" component={Link} to="/login" style={{ margin: isMobile ? "5px 0" : "0 10px" }}>
              Login
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

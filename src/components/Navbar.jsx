import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, useMediaQuery, IconButton, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"; // Import Menu Icon
import CloseIcon from "@mui/icons-material/Close"; // Import Close Icon

const Navbar = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
          <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
            Movie Search App
          </Typography>
          
          {/* Menu Button for Mobile */}
          {isMobile && (
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          
          {/* Drawer for mobile */}
          <Drawer anchor="right" open={open} onClose={toggleDrawer}>
            <Box width={250} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
              {/* Close Button */}
              <IconButton onClick={toggleDrawer} style={{ position: "absolute", top: 10, right: 10 }}>
                <CloseIcon />
              </IconButton>
              <Button color="inherit" component={Link} to="/" fullWidth>Home</Button>
              <Button color="inherit" component={Link} to="/movies" fullWidth>Search Movies</Button>
              <Button color="inherit" component={Link} to="/login" fullWidth>Login</Button>
            </Box>
          </Drawer>

          {/* Desktop Navbar Links */}
          {!isMobile && (
            <Box display="flex" flexDirection="row" alignItems="center">
              <Button color="inherit" component={Link} to="/" style={{ margin: "0 10px" }}>
                Home
              </Button>
              <Button color="inherit" component={Link} to="/movies" style={{ margin: "0 10px" }}>
                Search Movies
              </Button>
              <Button color="inherit" component={Link} to="/login" style={{ margin: "0 10px" }}>
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

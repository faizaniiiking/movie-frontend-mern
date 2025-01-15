// src/pages/NotFoundPage.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f0f0f0"
      textAlign="center"
      p={3}
    >
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        The page you are looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/" sx={{ mt: 2 }}>
        Go Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;

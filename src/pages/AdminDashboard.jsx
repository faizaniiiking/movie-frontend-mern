import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in and has admin role
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    const decoded = jwt_decode(token);
    if (decoded.role !== "admin") {
      navigate("/"); // Redirect to homepage if not an admin
    }
  }, [navigate]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome, Admin! Here you can manage users, settings, and more.
      </Typography>
    </Box>
  );
};

export default AdminDashboard;

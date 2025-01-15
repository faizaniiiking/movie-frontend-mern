    import React, { useState } from "react";
    import { TextField, Button, Box, Typography } from "@mui/material";
    import { useNavigate } from "react-router-dom";

    const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        // For now, we simulate successful login and redirect to the homepage
        if (username === "admin" && password === "password") {
        alert("Login successful!");
        navigate("/");
        } else {
        alert("Invalid username or password.");
        }
    };

    return (
        <Box p={4}>
        <Typography variant="h5" gutterBottom>
            Login to Movie Search App
        </Typography>
        <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
        />
        <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
        />
        <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
            </Button>
        </Box>
        </Box>
    );
    };

    export default LoginPage;

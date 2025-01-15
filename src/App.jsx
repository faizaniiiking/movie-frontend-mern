import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";  // Updated import
import LoginPage from "./pages/LoginPage";  // Updated impor
import MovieSearch from "./pages/MovieSearch";
import AdminDashboard from "./pages/AdminDashboard";
const theme = createTheme(); 


const App = () => {
  return (
    <ThemeProvider theme={theme}>

    <Router>
      {/* <Navbar /> */}

      <Navbar/>

    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieSearch />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />


      </Routes>
    </Router>
    </ThemeProvider>

  );
};

export default App;

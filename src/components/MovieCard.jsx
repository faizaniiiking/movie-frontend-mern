import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const MovieCard = ({ movie }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  const {
    Title,
    Year,
    Poster,
    imdbRating,
    Runtime,
    Plot,
    Released,
    Genre,
    imdbID,
  } = movie;

  // API key for fetching detailed movie data
  const apiKey = "71478495";

  // Fetch detailed movie data when the imdbID is available
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
          setMovieDetails(data); // Set full movie details
        } else {
          alert("Movie details not available");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (imdbID) {
      fetchMovieDetails();
    }
  }, [imdbID]);

  // Format values with defaults
  const formattedRating = imdbRating && imdbRating !== "N/A" ? parseFloat(imdbRating).toFixed(1) : "N/A";
  const formattedRuntime = Runtime && Runtime !== "N/A" ? Runtime : "N/A";
  const formattedReleaseDate = Released || "Release date not available";
  const formattedGenre = Genre || "Genre not available";

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Movie Poster */}
      <CardMedia
        component="img"
        height="200"
        image={Poster !== "N/A" ? Poster : "https://via.placeholder.com/200"}
        alt={Title}
        sx={{
          filter: "brightness(90%)",
        }}
      />

      {/* Content Section */}
      <CardContent
        sx={{
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          color: "white",
          padding: 2,
        }}
      >
        {/* Movie Title */}
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {Title}
        </Typography>

        {/* Movie Info */}
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="body2">
            <strong>Year:</strong> {Year}
          </Typography>
          <Typography variant="body2">
            <strong>Rating:</strong> {formattedRating} / 10
          </Typography>
          <Typography variant="body2">
            <strong>Duration:</strong> {formattedRuntime}
          </Typography>
          <Typography variant="body2">
            <strong>Release Date:</strong> {formattedReleaseDate}
          </Typography>
          <Typography variant="body2">
            <strong>Genre:</strong> {formattedGenre}
          </Typography>
        </Box>

        {/* Plot Section */}
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            color: "rgba(255, 255, 255, 0.85)",
            fontStyle: "italic",
          }}
        >
          {movieDetails?.Plot || "Plot information is not available."}
        </Typography>
      </CardContent>

      {/* Rating Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          borderRadius: "50%",
          width: 50,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "14px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        {formattedRating}
      </Box>
    </Card>
  );
};

export default MovieCard;

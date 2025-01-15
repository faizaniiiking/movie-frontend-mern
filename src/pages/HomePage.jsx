import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Card, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true); // To manage loading of detailed movie info

  const apiKey = "71478495"; // Your OMDb API key

  const fetchMovies = async (page) => {
    setLoading(true);
    const url = `https://www.omdbapi.com/?s=movie&apikey=${apiKey}&page=${page}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies((prevMovies) => [...prevMovies, ...data.Search]); // Append new movies to the list
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        alert("No movies found!");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return {};
    }
  };

  useEffect(() => {
    fetchMovies(currentPage); // Fetch movies on page load
  }, [currentPage]);

  useEffect(() => {
    if (movies.length > 0) {
      const fetchDetailsForMovies = async () => {
        const detailedMovies = await Promise.all(
          movies.map(async (movie) => {
            const details = await fetchMovieDetails(movie.imdbID);
            return { ...movie, ...details }; // Merge basic and detailed data
          })
        );
        setMovies(detailedMovies); // Update movies state with detailed data
        setLoadingDetails(false); // Data fetched, stop loading
      };
      fetchDetailsForMovies();
    }
  }, [movies]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment page number to load more movies
  };

  const totalPages = Math.ceil(totalResults / 10); // Calculate the total number of pages

  return (
    <Box p={4} textAlign="center">
      <Typography variant="h4" gutterBottom>
        Welcome to Movie Search App!
      </Typography>
      <Typography variant="body1" paragraph>
        Find your favorite movies, search by year, rating, and more.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/movies">
        Start Searching Movies
      </Button>

      {/* Movies Grid */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Featured Movies
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {movies.length === 0 ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={movie.Title}
                    height="300"
                    image={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
                  />
                  <CardContent>
                    <Typography variant="h6">{movie.Title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Year: {movie.Year || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Rating: {movie.imdbRating || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Duration: {movie.Runtime || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Genre: {movie.Genre || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Actors: {movie.Actors || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Type: {movie.Type || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Pagination Controls */}
      {totalResults > 10 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Typography
            variant="body1"
            style={{ margin: "0 20px", alignSelf: "center" }}
          >
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            variant="outlined"
            disabled={currentPage === totalPages || loading}
            onClick={handleLoadMore}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");

  const apiKey = "71478495";

  const fetchMovies = async (page = 1) => {
    const url = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}&page=${page}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const movieDetails = await fetch(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
            ).then((res) => res.json());
            return {
              ...movie,
              imdbRating: parseFloat(movieDetails.imdbRating) || 0, // Ensure numeric value
              Duration: `${Math.floor(Math.random() * 120) + 60} min`, // Mock duration
            };
          })
        );
        setMovies(detailedMovies);
        setFilteredMovies(detailedMovies);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        setMovies([]);
        setFilteredMovies([]);
        setTotalResults(0);
        alert("No movies found!");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query.");
      return;
    }
    setCurrentPage(1);
    fetchMovies(1);
  };

  const handleFilter = () => {
    const filtered = movies.filter((movie) => {
      const meetsYear = yearFilter ? movie.Year === yearFilter : true;
      const meetsRating = ratingFilter
        ? parseFloat(movie.imdbRating) >= parseFloat(ratingFilter)
        : true;
      const meetsName = nameFilter
        ? movie.Title.toLowerCase().includes(nameFilter.toLowerCase())
        : true;
      const meetsDuration = durationFilter
        ? parseInt(movie.Duration.split(" ")[0], 10) >= parseInt(durationFilter, 10)
        : true;
      return meetsYear && meetsRating && meetsName && meetsDuration;
    });
    setFilteredMovies(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMovies(page);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <Box p={4}>
      {/* Search Box */}
      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          label="Search for a movie"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: 10 }}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Filter Section */}
      <Box display="flex" justifyContent="space-around" mb={4}>
        <Box style={{ width: "20%", display: "flex", flexDirection: "column" }}>
          <TextField
            label="Year"
            type="number"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            placeholder="Enter Year"
            fullWidth
            margin="normal"
          />
        </Box>

        <Box style={{ width: "20%", display: "flex", flexDirection: "column" }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Rating</InputLabel>
            <Select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <MenuItem value="">All Ratings</MenuItem>
              <MenuItem value="8.0">8.0 and above</MenuItem>
              <MenuItem value="7.0">7.0 and above</MenuItem>
              <MenuItem value="6.0">6.0 and above</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box style={{ width: "20%", display: "flex", flexDirection: "column" }}>
          <TextField
            label="Filter by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>

        <Box style={{ width: "20%", display: "flex", flexDirection: "column" }}>
          <TextField
            label="Filter by Min Duration (min)"
            type="number"
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>

        <Button variant="outlined" onClick={handleFilter} style={{ marginTop: "16px" }}>
          Apply Filters
        </Button>
      </Box>

      {/* Movies Grid */}
      <Grid container spacing={3}>
        {filteredMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
            <Card>
              <CardMedia
                component="img"
                alt={movie.Title}
                height="300"
                image={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450"
                }
              />
              <CardContent>
                <Typography variant="h6">{movie.Title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Year: {movie.Year}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Duration: {movie.Duration || "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Rating: {movie.imdbRating || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      {totalResults > 10 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
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
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MovieSearch;

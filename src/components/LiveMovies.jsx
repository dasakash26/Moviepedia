import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { movieNames } from "../utils/movieNames";

const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

function LiveMovies({ setMovie }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const isInitialLoad = useRef(true);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getRandomMovies = (count) => {
    const existingIds = new Set(movies.map((m) => m.imdbID));
    const shuffled = [...movieNames].sort(() => 0.5 - Math.random());
    return shuffled.filter((name) => !existingIds.has(name)).slice(0, count);
  };

  const calculateConfidenceScore = (movie) => {
    const rating = parseFloat(movie.imdbRating);
    const votes = parseInt(movie.imdbVotes?.replace(/,/g, "")) || 0;
    const year = parseInt(movie.Year);

    let score = 0;
    if (!isNaN(rating)) score += rating * 4;
    score += Math.min(votes / 10000, 20);
    if (!isNaN(year)) score += Math.max(0, Math.min(15, (year - 1950) / 5));

    const hasValidMetadata =
      movie.Plot !== "N/A" &&
      movie.Director !== "N/A" &&
      movie.Poster !== "N/A" &&
      movie.Genre !== "N/A" &&
      movie.Actors !== "N/A";

    return score + (hasValidMetadata ? 25 : 0);
  };

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const movieCount = isInitialLoad.current ? 3 : 6;
      const selectedMovies = getRandomMovies(movieCount);
      const movieDetails = [];

      for (const name of selectedMovies) {
        await delay(250);
        const res = await axios.get(
          `${apiURL}?apikey=${apiKey}&t=${encodeURIComponent(name)}`
        );
        if (res.data.Response === "True") {
          const rating = parseFloat(res.data.imdbRating);
          const confidenceScore = calculateConfidenceScore(res.data);

          if (
            rating >= 6.0 &&
            confidenceScore >= 60 &&
            res.data.Poster !== "N/A"
          ) {
            movieDetails.push({ ...res.data, confidenceScore });
          }
        }
      }

      if (isInitialLoad.current) {
        isInitialLoad.current = false;
      }

      setMovies((prev) => [
        ...prev,
        ...movieDetails.sort((a, b) => b.confidenceScore - a.confidenceScore),
      ]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleMovieClick = useCallback(
    async (imdbID) => {
      try {
        const response = await axios.get(
          `${apiURL}?apikey=${apiKey}&i=${imdbID}`
        );
        if (response.data.Response === "True") {
          setMovie(response.data);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
    [setMovie]
  );

  return (
    <section className="w-full my-8 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-400 tracking-tight">
          Discover Good Movies ({movies.length})
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie, index) => (
          <MovieCard
            key={`${movie.imdbID}-${index}`}
            movie={movie}
            onClick={() => handleMovieClick(movie.imdbID)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={fetchMovies}
          disabled={loading}
          className="group relative px-8 py-3 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
                     text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed
                     min-h-[52px] min-w-[200px] flex items-center justify-center font-semibold
                     shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.5)]
                     transition-all duration-300 ease-out border border-blue-600/20
                     backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]
                     before:absolute before:inset-0 before:rounded-xl
                     before:bg-gradient-to-br before:from-blue-600 before:via-blue-700 before:to-blue-800
                     before:opacity-0 before:transition-opacity hover:before:opacity-100
                     disabled:before:opacity-0"
        >
          <span className="relative flex items-center gap-2">
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4.75V6.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.1266 6.87347L16.0659 7.93413"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.25 12L17.75 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.1266 17.1265L16.0659 16.0659"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 19.25V17.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.9342 17.1265L8.99486 16.0659"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.75 12L6.25 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.9342 6.87347L8.99486 7.93413"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="animate-pulse">Discovering Movies...</span>
              </>
            ) : (
              <>
                <span>Discover More Movies</span>
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </>
            )}
          </span>
        </button>
      </div>
    </section>
  );
}

export default React.memo(LiveMovies);

import React, { useState, useEffect, useCallback, useRef } from "react";
import { fetchFromOMDB } from "../services/api.js";
import MovieCard from "./MovieCard";
import { movieNames } from "../utils/movieNames";
import { useToast } from "../hooks/useToast";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

function LiveMovies({ setMovie }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const isInitialLoad = useRef(true);
  const hasShownWelcome = useRef(false);
  const loadMoreRef = useRef(null);
  const toast = useToast();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

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
    if (loading || (!initialLoadComplete && !isInitialLoad.current)) return;

    setLoading(true);
    let attempts = 0;
    const maxAttempts = 2;

    try {
      const movieCount = isInitialLoad.current ? 3 : 6;
      const selectedMovies = getRandomMovies(movieCount);
      const movieDetails = [];

      for (const name of selectedMovies) {
        await delay(250);
        const data = await fetchFromOMDB(`?t=${encodeURIComponent(name)}`);
        if (data.Response === "True") {
          const rating = parseFloat(data.imdbRating);
          const confidenceScore = calculateConfidenceScore(data);

          if (rating >= 6.0 && confidenceScore >= 60 && data.Poster !== "N/A") {
            movieDetails.push({ ...data, confidenceScore });
          }
        }
      }

      if (movieDetails.length === 0 && ++attempts === maxAttempts) {
        toast.info(
          "Couldn't find any new movies this time. Try scrolling more!"
        );
      }

      const newMovies = movieDetails.sort(
        (a, b) => b.confidenceScore - a.confidenceScore
      );
      setMovies((prev) => [...prev, ...newMovies]);

      if (
        isInitialLoad.current &&
        newMovies.length > 0 &&
        !hasShownWelcome.current
      ) {
        toast.success("Welcome! Here are some movies to get you started!");
        hasShownWelcome.current = true;
      }

      if (isInitialLoad.current) {
        isInitialLoad.current = false;
        setInitialLoadComplete(true);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useInfiniteScroll(
    fetchMovies,
    loadMoreRef,
    !loading && initialLoadComplete,
    300
  );

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleMovieClick = useCallback(
    (movie) => {
      setMovie(movie);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setMovie]
  );

  return (
    <section className="w-full my-8 max-w-7xl mx-auto px-4 scroll-mt-16">
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
            onClick={() => handleMovieClick(movie)}
          />
        ))}
      </div>
      <div ref={loadMoreRef} className="h-10 w-full mt-8">
        {loading && (
          <div className="flex justify-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
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
          </div>
        )}
      </div>
    </section>
  );
}

export default React.memo(LiveMovies);

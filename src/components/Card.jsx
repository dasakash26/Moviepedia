import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import ErrorCard from "./ErrorCard";
import { useToast } from "../hooks/useToast";
const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

function Card({ movie, setMovie, setLoading, likedMovies, setLikedMovies }) {
  const [liked, setLiked] = useState(false);
  const [isFullPlotFetched, setIsFullPlotFetched] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setIsFullPlotFetched(false);
    setLiked(likedMovies.some((m) => m.imdbID === movie.imdbID));
  }, [movie.Title, likedMovies, movie.imdbID]);

  const handleLikeToggle = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);

    if (newLikedState) {
      toast.success(`Added "${movie.Title}" to your favorites!`);
      setLikedMovies((prev) => {
        const updated = [...prev, movie];
        localStorage.setItem("likedMovies", JSON.stringify(updated));
        return updated;
      });
    } else {
      toast.warning(`Removed "${movie.Title}" from your favorites`);
      setLikedMovies((prev) => {
        const updated = prev.filter((m) => m.imdbID !== movie.imdbID);
        localStorage.setItem("likedMovies", JSON.stringify(updated));
        return updated;
      });
    }
  };

  if (movie.Response === "False") {
    return (
      <ErrorCard errorMessage={movie.Error} movieTitle={movie.searchText} />
    );
  }

  const getFullPlot = async () => {
    try {
      setLoading(true);
      if (isFullPlotFetched) return;

      const fullPlotURL = `${apiURL}?apikey=${apiKey}&t=${encodeURIComponent(
        movie.Title
      )}&plot=full`;
      const response = await axios.get(fullPlotURL);

      setMovie((prevMovie) => ({
        ...prevMovie,
        Plot: response.data.Plot,
      }));

      setIsFullPlotFetched(true);
    } catch (error) {
      console.error("Error fetching full plot:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col md:flex-row bg-gray-800/95 text-white shadow-2xl rounded-xl overflow-hidden mb-8 w-full border border-blue-600/40 hover:border-blue-500/60 transition-all duration-300 hover:shadow-blue-500/10">
        {/* Add close button */}
        <button
          onClick={() => {
            setMovie(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="absolute top-6 left-6 z-10 flex items-center px-3 py-2 bg-slate-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <button
          onClick={handleLikeToggle}
          className={`absolute top-6 right-6 z-10 flex items-center px-3 py-2 ${
            liked ? "bg-red-500" : "bg-slate-600"
          } text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
            liked ? "hover:bg-red-600" : "hover:bg-slate-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          <FavoriteIcon className={` ${liked ? "animate-pulse" : ""}`} />
        </button>

        <div className="w-full md:w-2/5 lg:w-1/3 h-[450px] md:h-auto relative">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover md:min-h-[600px]"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x450?text=No+Poster";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:hidden"></div>
        </div>

        <div className="flex-1 p-8 md:p-10 flex flex-col">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-400 leading-tight">
              {movie.Title}{" "}
              <span className="text-gray-400 text-2xl md:text-3xl">
                ({movie.Year})
              </span>
            </h2>

            <div className="flex flex-wrap gap-6 text-lg">
              <p className="flex items-center bg-gray-700/50 px-4 py-2 rounded-lg">
                <span className="font-semibold text-gray-300">IMDb:</span>
                <span className="ml-2 text-yellow-400 font-bold">
                  {movie.imdbRating}/10
                </span>
                <span className="ml-2 text-sm text-gray-400">
                  ({movie.imdbVotes} votes)
                </span>
              </p>

              <p className="bg-gray-700/50 px-4 py-2 rounded-lg">
                <span className="font-semibold text-gray-300">Genre:</span>
                <span className="ml-2">{movie.Genre}</span>
              </p>
            </div>

            <div className="space-y-3 bg-gray-700/30 p-4 rounded-lg">
              <p>
                <span className="font-semibold text-gray-300">Director:</span>
                <span className="ml-2">{movie.Director}</span>
              </p>

              <p>
                <span className="font-semibold text-gray-300">Actors:</span>
                <span className="ml-2">{movie.Actors}</span>
              </p>
            </div>

            <div className="mt-2">
              <span className="font-semibold text-gray-300 text-lg">Plot:</span>
              <p className="mt-3 leading-relaxed text-gray-100">{movie.Plot}</p>
            </div>
          </div>

          <button
            onClick={getFullPlot}
            disabled={isFullPlotFetched}
            className={`mt-auto px-6 py-3 border-2 border-blue-500 text-blue-400 rounded-lg transition-all duration-300 font-semibold
              ${
                isFullPlotFetched
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-500 hover:text-white hover:scale-102 hover:shadow-lg"
              }`}
          >
            {isFullPlotFetched ? "Full Plot Loaded" : "Load Full Plot"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;

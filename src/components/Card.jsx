import React, { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import MovieIcon from "@mui/icons-material/Movie";
import YouTubeIcon from "@mui/icons-material/YouTube";
import StarIcon from "@mui/icons-material/Star";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import ErrorCard from "./ErrorCard";
import { useToast } from "../hooks/useToast";
const apiURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY9;

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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: movie.Title,
          text: `Check out ${movie.Title} (${movie.Year}) - IMDb Rating: ${movie.imdbRating}/10`,
          url: `https://www.imdb.com/title/${movie.imdbID}`,
        });
        toast.success("Shared successfully!");
      } else {
        // Fallback to copying link to clipboard
        await navigator.clipboard.writeText(
          `https://www.imdb.com/title/${movie.imdbID}`
        );
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share");
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

  const formatBoxOffice = (value) => {
    if (!value || value === "N/A") return "N/A";
    const num = parseInt(value.replace(/[,$]/g, ""));
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleWatchTrailer = () => {
    const searchQuery = encodeURIComponent(
      `${movie.Title} ${movie.Year} trailer`
    );
    window.open(
      `https://www.youtube.com/results?search_query=${searchQuery}`,
      "_blank"
    );
  };

  const handleIMDbLink = () => {
    window.open(`https://www.imdb.com/title/${movie.imdbID}`, "_blank");
  };

  const handleStreamSearch = () => {
    const searchQuery = encodeURIComponent(
      `${movie.Title} ${movie.Year} streaming watch online`
    );
    window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
  };

  const formatRuntime = (runtime) => {
    if (!runtime || runtime === "N/A") return "N/A";
    const minutes = parseInt(runtime.replace(" min", ""));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatAwards = (awards) => {
    if (!awards || awards === "N/A") return null;
    const oscarCount = (awards.match(/Oscar/g) || []).length;
    const totalAwards = awards.split(" ").find((word) => !isNaN(word)) || 0;
    return { oscarCount, totalAwards, fullText: awards };
  };

  return (
    <>
      <div className="relative flex flex-col md:flex-row bg-gradient-to-br from-gray-800/95 to-gray-900/95 text-white shadow-2xl rounded-xl overflow-hidden mb-8 w-full border border-blue-600/40 hover:border-blue-500/60 transition-all duration-500 hover:shadow-blue-500/20 hover:shadow-2xl hover:-translate-y-0.5">
        {/* Updated top buttons layout */}
        <div className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-start">
          <button
            onClick={() => {
              setMovie(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            title="Go back to search"
            className="group flex items-center gap-2 px-3 py-1.5 bg-gray-900/80 hover:bg-gray-800/90 text-gray-400 hover:text-white rounded-lg backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLikeToggle}
              title={liked ? "Remove from favorites" : "Add to favorites"}
              className={`flex items-center justify-center w-10 h-10 rounded-lg backdrop-blur-sm transition-all duration-300 ${
                liked
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-900/80 hover:bg-gray-800/90"
              }`}
            >
              <FavoriteIcon
                className={`text-white transform transition-all duration-300 ${
                  liked ? "scale-110 animate-pulse" : "scale-90 hover:scale-110"
                }`}
              />
            </button>

            <button
              onClick={handleShare}
              title="Share this movie"
              className="flex items-center justify-center w-10 h-10 bg-gray-900/80 hover:bg-gray-800/90 text-blue-400 hover:text-blue-300 rounded-lg backdrop-blur-sm transition-all duration-300"
            >
              <ShareIcon className="transform scale-90 hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Enhanced Poster section */}
        <div className="w-full md:w-1/3 h-[400px] md:h-auto relative group overflow-hidden">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover md:min-h-[600px] transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x450?text=No+Poster";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent md:from-transparent md:via-transparent md:to-transparent md:group-hover:from-gray-900/70 transition-all duration-500"></div>
        </div>

        {/* Enhanced Content section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col relative">
          {/* Title and Meta Section with enhanced styling */}
          <div className="mb-6 group">
            <h2 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300">
              {movie.Title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-400">
              <span className="bg-gray-700/50 px-2 py-0.5 rounded-md">
                {movie.Year}
              </span>
              <span>•</span>
              <span className="bg-gray-700/50 px-2 py-0.5 rounded-md flex items-center gap-1">
                <AccessTimeIcon className="w-4 h-4" />
                {formatRuntime(movie.Runtime)}
              </span>
              <span>•</span>
              <span className="bg-gray-700/50 px-2 py-0.5 rounded-md">
                {movie.Genre}
              </span>
            </div>
          </div>

          {/* Enhanced Ratings Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div
              title={`IMDb Rating: ${movie.imdbRating}/10 from ${movie.imdbVotes} votes`}
              className="flex items-center bg-gray-700/30 hover:bg-gray-700/50 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-default"
            >
              <StarIcon className="text-yellow-400 w-4 h-4" />
              <span className="ml-1 text-yellow-400 font-bold">
                {movie.imdbRating}
              </span>
            </div>

            {movie.Ratings?.map(
              (rating) =>
                rating.Source === "Rotten Tomatoes" && (
                  <div
                    key="rt"
                    className="flex items-center bg-gray-700/30 hover:bg-gray-700/50 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-default"
                  >
                    <span className="text-red-500 transform transition-transform group-hover:scale-110">
                      🍅
                    </span>
                    <span className="ml-1 text-red-400 font-bold">
                      {rating.Value}
                    </span>
                  </div>
                )
            )}

            {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
              <div
                title={`Box Office: ${movie.BoxOffice}`}
                className="flex items-center bg-gray-700/30 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg"
              >
                <AttachMoneyIcon className="text-green-400 w-4 h-4" />
                <span className="ml-1 text-green-400 font-bold">
                  {formatBoxOffice(movie.BoxOffice)}
                </span>
              </div>
            )}

            {formatAwards(movie.Awards) && (
              <div
                title={formatAwards(movie.Awards).fullText}
                className="flex items-center bg-gray-700/30 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg"
              >
                <EmojiEventsIcon className="text-amber-400 w-4 h-4" />
                {formatAwards(movie.Awards).oscarCount > 0 && (
                  <span className="ml-1 text-amber-400 font-bold">
                    {formatAwards(movie.Awards).oscarCount} Oscar
                    {formatAwards(movie.Awards).oscarCount > 1 ? "s" : ""}
                  </span>
                )}
                {formatAwards(movie.Awards).totalAwards > 0 && (
                  <span className="ml-1 text-gray-300 text-sm">
                    {formatAwards(movie.Awards).oscarCount > 0 ? " + " : ""}
                    {formatAwards(movie.Awards).totalAwards} awards
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Credits Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3 bg-gray-700/30 p-4 rounded-lg backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-gray-700/50 transition-all duration-300 hover:-translate-y-0.5 group cursor-default">
              <PersonIcon className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <span className="text-gray-400 text-sm font-medium">
                  Director
                </span>
                <p className="text-gray-100 mt-1 leading-snug">
                  {movie.Director}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-700/30 p-4 rounded-lg backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-gray-700/50 transition-all duration-300 hover:-translate-y-0.5 group cursor-default">
              <GroupsIcon className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <span className="text-gray-400 text-sm font-medium">Cast</span>
                <p className="text-gray-100 mt-1 leading-snug">
                  {movie.Actors}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Plot Section */}
          <div className="flex-1 mb-6">
            <div className="bg-gray-700/30 p-4 rounded-lg backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-gray-700/50 transition-all duration-300 group cursor-default">
              <p className="text-gray-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                {movie.Plot}
              </p>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="mt-auto pt-4 border-t border-gray-700/50">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleIMDbLink}
                title="View on IMDb"
                className="flex-1 min-w-[140px] px-4 py-3 bg-gray-700/30 text-yellow-400 rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:bg-yellow-500 hover:text-white group shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:shadow-yellow-500/20"
              >
                <MovieIcon className="group-hover:scale-110 transition-transform" />
                <span>IMDb</span>
              </button>

              <button
                onClick={handleWatchTrailer}
                title="Watch trailer on YouTube"
                className="flex-1 min-w-[140px] px-4 py-2 bg-gray-700/30 text-red-400 rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white group"
              >
                <PlayCircleIcon className="group-hover:scale-110 transition-transform" />
                <span>Trailer</span>
              </button>

              <button
                onClick={handleStreamSearch}
                title="Find streaming options"
                className="flex-1 min-w-[140px] px-4 py-2 bg-gray-700/30 text-green-400 rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white group"
              >
                <YouTubeIcon className="group-hover:scale-110 transition-transform" />
                <span>Stream</span>
              </button>

              <button
                onClick={getFullPlot}
                disabled={isFullPlotFetched}
                title={
                  isFullPlotFetched
                    ? "Full plot already loaded"
                    : "Load complete plot summary"
                }
                className={`flex-1 min-w-[140px] px-4 py-2 bg-gray-700/30 text-blue-400 rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 
                  ${
                    isFullPlotFetched
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-500 hover:text-white group"
                  }`}
              >
                <span>
                  {isFullPlotFetched ? "Full Plot" : "Load Full Plot"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;

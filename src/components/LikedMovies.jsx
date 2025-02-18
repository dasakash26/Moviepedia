import React, { memo } from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

const LikedMovies = memo(
  ({ likedMovies, setMovie }) => {
    return (
      <section className="w-full my-8">
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Liked Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {likedMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setMovie(movie);
              }}
            />
          ))}
        </div>
      </section>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.likedMovies === nextProps.likedMovies;
  }
);

LikedMovies.propTypes = {
  likedMovies: PropTypes.array.isRequired,
  setMovie: PropTypes.func.isRequired,
};

LikedMovies.displayName = "LikedMovies";

export default LikedMovies;

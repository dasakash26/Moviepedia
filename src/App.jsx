import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LikedMovies from "./components/LikedMovies";
import LiveMovies from "./components/LiveMovies";

function App() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    const loadLikedMovies = () => {
      try {
        const saved = localStorage.getItem("likedMovies");
        if (!saved) {
          return [];
        }

        return JSON.parse(saved);
      } catch (error) {
        console.error("Error loading liked movies:", error);
        localStorage.removeItem("likedMovies");
        return [];
      }
    };

    setLikedMovies(loadLikedMovies());
  }, []);

  useEffect(() => {
    const saveLikedMovies = () => {
      try {
        const uniqueLikedMovies = likedMovies.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.imdbID === movie.imdbID)
        );

        if (uniqueLikedMovies.length !== likedMovies.length) {
          setLikedMovies(uniqueLikedMovies);
          return;
        }

        localStorage.setItem("likedMovies", JSON.stringify(uniqueLikedMovies));
      } catch (error) {
        console.error("Error saving liked movies:", error);
      }
    };

    if (likedMovies.length > 0) {
      saveLikedMovies();
    }
  }, [likedMovies]);

  return (
    <>
      {isLoading && <Loading />}
      <main className="flex flex-col justify-center items-center w-[90vw] md:w-[80vw] m-auto">
        <Header />
        {movie && (
          <Card
            movie={movie}
            setMovie={setMovie}
            setLoading={setLoading}
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
          />
        )}
        <Hero movie={setMovie} setLoading={setLoading} />
        <LikedMovies likedMovies={likedMovies} setMovie={setMovie} />
        <LiveMovies setMovie={setMovie} />
        <Footer />
      </main>
    </>
  );
}

export default App;

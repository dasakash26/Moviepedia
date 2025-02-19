import { useState, useEffect } from "react";
import { useAlertStore } from "./stores/alertStore";
import { AlertToastContainer } from "./components/AlertToast";
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
  const { alerts, removeAlert } = useAlertStore();

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

  useEffect(() => {
    // Prevent initial scroll
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <main className="flex flex-col justify-center items-center w-[90vw] md:w-[80vw] m-auto min-h-screen">
        <Header />
        {movie ? (
          <div className="w-full animate-fadeIn">
            <Card
              movie={movie}
              setMovie={setMovie}
              setLoading={setLoading}
              likedMovies={likedMovies}
              setLikedMovies={setLikedMovies}
            />
          </div>
        ) : (
          <Hero movie={setMovie} setLoading={setLoading} />
        )}
        <LikedMovies likedMovies={likedMovies} setMovie={setMovie} />
        <LiveMovies setMovie={setMovie} />
        <Footer />
      </main>
      <AlertToastContainer alerts={alerts} removeAlert={removeAlert} />
    </>
  );
}

export default App;

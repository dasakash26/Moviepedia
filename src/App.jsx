import { useState, useEffect } from "react";
import { useAlertStore } from "./stores/alertStore";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { AlertToastContainer } from "./components/AlertToast";
import ErrorBoundary from "./components/ErrorBoundary";
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
  const [likedMovies, setLikedMovies] = useLocalStorage("likedMovies", []);
  const { alerts, removeAlert } = useAlertStore();

  useEffect(() => {
    if (likedMovies.length > 0) {
      const uniqueLikedMovies = likedMovies.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.imdbID === movie.imdbID)
      );

      if (uniqueLikedMovies.length !== likedMovies.length) {
        setLikedMovies(uniqueLikedMovies);
      }
    }
  }, [likedMovies, setLikedMovies]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <ErrorBoundary>
      <div className="grid-background fixed inset-0 z-[-1]"></div>
      {isLoading && <Loading />}
      <main className="flex flex-col justify-center items-center w-[90vw] md:w-[80vw] m-auto min-h-screen relative">
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
    </ErrorBoundary>
  );
}

export default App;

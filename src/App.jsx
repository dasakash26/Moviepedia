import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import Card from "./Card";
import Loading from "./Loading";

function App() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      {isLoading && <Loading />}
      <main className="flex flex-col justify-center items-center w-[90vw] md:w-[80vw] m-auto">
        <Header />
        {movie && (
          <Card movie={movie} setMovie={setMovie} setLoading={setLoading} />
        )}
        <Hero movie={setMovie} setLoading={setLoading} />
        <Footer />
      </main>
    </>
  );
}

export default App;

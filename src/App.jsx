import React, { useRef } from "react";
import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import StatsBar   from "./components/StatsBar";
import SearchForm from "./components/SearchForm";
import Results    from "./components/Results";
import { useSchemes, STATUS } from "./hooks/useSchemes";

export default function App() {
  const { status, schemes, error, profile, search, reset } = useSchemes();
  const resultsRef = useRef(null);

  async function handleSearch(formProfile) {
    await search(formProfile);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }

  const isLoading = status === STATUS.LOADING;
  const showForm  = status === STATUS.IDLE || status === STATUS.ERROR;

  return (
    <div>
      <Navbar />
      <StatsBar />
      <Hero />
      {showForm && <SearchForm onSubmit={handleSearch} loading={isLoading} />}
      <div ref={resultsRef}>
        <Results status={status} schemes={schemes} error={error} profile={profile} onReset={reset} />
      </div>
    </div>
  );
}

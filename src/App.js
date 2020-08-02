import React, { useState } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    totalResults: 0,
    selected: {},
    currentPage: 0,
    resultsFound: false,
    hasMore: true,
  });

  const baseURL = "http://omdbapi.com/?apikey=44d38241";

  const search = (e) => {
    if (e.key === "Enter" && state.s !== "") {
      axios(baseURL + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;
        let resultsFound = data.Response;
        let totalResults = data.totalResults;
        setState((prevState) => {
          return {
            ...prevState,
            results,
            totalResults,
            currentPage: 1,
            resultsFound,
            lastSearch: state.s,
            hasMore: true,
          };
        });
      });
    }
  };

  const fetchNextPage = () => {
    let page = state.currentPage + 1;
    axios(baseURL + "&s=" + state.s + "&page=" + page).then(({ data }) => {
      if (!data.Search) {
        setState((prevState) => {
          return { ...prevState, hasMore: false };
        });
        return;
      }

      let newResults = data.Search;
      setState((prevState) => {
        return {
          ...prevState,
          results: [...prevState.results, ...newResults],
          currentPage: prevState.currentPage + 1,
          hasMore: true,
        };
      });
    });
  };

  const handleInput = (e) => {
    let s = e.target.value;
    setState((prevState) => {
      return { ...prevState, s };
    });
  };

  const openPopup = (id) => {
    axios(baseURL + "&i=" + id).then(({ data }) => {
      let result = data;
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  return (
    <div className="App">
      <header>
        <img src={require("./assets/images/moovies-md.png")} alt="Moovies" />
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results
          results={state.results}
          totalResults={state.totalResults}
          openPopup={openPopup}
          search={state.lastSearch}
          fetchNextPage={fetchNextPage}
          resultsFound={state.resultsFound}
          hasMore={state.hasMore}
        />
        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
      {state.results && state.results.length === 0 && (
        <section className="info-section">
          <h1>Welcome to Moovies!</h1>
          <h2>Start by searching for a movie, a series or an episode.</h2>
        </section>
      )}
    </div>
  );
}

export default App;

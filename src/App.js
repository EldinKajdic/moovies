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
  });

  const baseURL = "http://omdbapi.com/?apikey=44d38241";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(baseURL + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;
        let totalResults = data.totalResults;

        console.log(data);

        setState((prevState) => {
          return { ...prevState, results, totalResults };
        });
      });
    }
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
          search={state.s}
        />
        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
    </div>
  );
}

export default App;

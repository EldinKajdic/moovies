import React from "react";
import Result from "./Result";

function Results({ results, openPopup, search, totalResults }) {
  return (
    <section className="results">
      {totalResults > 0 && (
        <div className="total-results">
          <h2>
            Showing results for "{search}" ({totalResults} results)
          </h2>
        </div>
      )}
      {results ? (
        results.map((result) => (
          <Result result={result} key={result.imdbID} openPopup={openPopup} />
        ))
      ) : (
        <div className="no-results">
          <h2>No results were found</h2>
        </div>
      )}
    </section>
  );
}

export default Results;

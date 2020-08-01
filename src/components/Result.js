import React from "react";

function Result({ result, openPopup }) {
  return (
    <div className="result" onClick={() => openPopup(result.imdbID)}>
      <img src={result.Poster} alt="Poster" />
      <div className="result-footer">
        <h3>
          {result.Title} ({result.Year})
        </h3>
      </div>
    </div>
  );
}

export default Result;

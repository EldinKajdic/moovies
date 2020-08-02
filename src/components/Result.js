import React from "react";
import fallbackImg from "../assets/images/fallback.png";

function Result({ result, openPopup }) {
  return (
    <div className="result" onClick={() => openPopup(result.imdbID)}>
      <img
        src={result.Poster}
        onError={() => (result.Poster = fallbackImg)}
        alt={result.Title}
      />
      <div className="result-footer">
        <h3>
          {result.Title} ({result.Year})
        </h3>
      </div>
    </div>
  );
}

export default Result;

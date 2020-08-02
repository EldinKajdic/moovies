import React from "react";
import Result from "./Result";
import InfiniteScroll from "react-infinite-scroll-component";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function Results({
  results,
  openPopup,
  search,
  totalResults,
  fetchNextPage,
  resultsFound,
  hasMore,
}) {
  const [state, setState] = React.useState({
    moviesChecked: false,
    seriesChecked: false,
    episodeChecked: false,
    filteredResults: [],
  });

  const getFilteredResults = () => {
    let filteredResults = [];

    if (!state.moviesChecked && !state.seriesChecked && !state.episodeChecked)
      return results;

    if (state.moviesChecked) {
      filteredResults = [
        ...filteredResults,
        ...results.filter((x) => x.Type === "movie"),
      ];
    }
    if (state.seriesChecked) {
      filteredResults = [
        ...filteredResults,
        ...results.filter((x) => x.Type === "series"),
      ];
    }
    if (state.episodeChecked) {
      filteredResults = [
        ...filteredResults,
        ...results.filter((x) => x.Type === "episode"),
      ];
    }

    return filteredResults;
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name + "Checked"]: event.target.checked,
    });
  };

  return (
    <section className="results">
      {resultsFound && totalResults > 0 ? (
        <React.Fragment>
          <div>
            <h3 className="filter-results inline">
              Filter:{" "}
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    className="filter-checkbox"
                    name="movies"
                  />
                }
                label="Movies"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    className="filter-checkbox"
                    name="series"
                  />
                }
                label="Series"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    className="filter-checkbox"
                    name="episode"
                  />
                }
                label="Episode"
              />
            </h3>
          </div>
          <div className="total-results">
            <h2>
              {getFilteredResults().length > 0 ? (
                <div>
                  {" "}
                  Showing {getFilteredResults().length}/{totalResults} results
                  for "{search}"
                </div>
              ) : (
                <div>
                  No results found. Maybe you have turned on too many filters?
                </div>
              )}
            </h2>
          </div>
          <div className="scroll-container">
            {results.length > 0 && (
              <InfiniteScroll
                dataLength={results.length}
                next={fetchNextPage}
                loader={
                  <div>
                    <h1 className="loading-text inline">Loading...</h1>
                  </div>
                }
                hasMore={hasMore}
                endMessage={
                  <div>
                    {getFilteredResults().length > 10 && (
                      <h1 className="loading-text inline">
                        Reached end of {getFilteredResults().length} results
                      </h1>
                    )}
                  </div>
                }
              >
                {getFilteredResults().map((result) => (
                  <Result
                    result={result}
                    key={result.imdbID}
                    openPopup={openPopup}
                  />
                ))}
              </InfiniteScroll>
            )}
          </div>
        </React.Fragment>
      ) : (
        <div>
          {resultsFound && (
            <div className="no-results">
              <h2>No results were found for "{search}"</h2>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Results;

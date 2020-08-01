import React from "react";
import Result from "./Result";
import InfiniteScroll from "react-infinite-scroll-component";

function Results({
  results,
  openPopup,
  search,
  totalResults,
  fetchNextPage,
  resultsFound,
}) {
  return (
    <section className="results">
      {totalResults > 0 ? (
        <React.Fragment>
          <div className="total-results">
            <h2>
              Showing results for "{search}" ({totalResults} results)
            </h2>
          </div>
          <div className="scroll-container">
            <InfiniteScroll
              dataLength={results.length}
              next={fetchNextPage}
              loader={
                <div>
                  <h1 className="loading-text">Loading...</h1>
                </div>
              }
              hasMore={true}
              endMessage={
                <div>
                  <h1 className="loading-text">No more results</h1>
                </div>
              }
            >
              {results.map((result) => (
                <Result
                  result={result}
                  key={result.imdbID}
                  openPopup={openPopup}
                />
              ))}
            </InfiniteScroll>
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

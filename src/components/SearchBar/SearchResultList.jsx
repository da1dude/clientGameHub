import React from "react";
import "./SearchResultList.css";
import SearchResult from "./SearchResult";

const SearchResultList = ({ results }) => {
  return (
    <div style={{ padding: '10px 20px' }}>
      {results.map((result, id) => {
        return <SearchResult key={id} result={result}/>;
      })}
      </div>
  );
};

export default SearchResultList;
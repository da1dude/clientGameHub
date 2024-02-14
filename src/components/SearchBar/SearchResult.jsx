import React from "react";
import { Link } from 'react-router-dom'
import "./SearchResult.css";


const SearchResult = ({ result }) => {
    const handleClick = () => {
        setTimeout(() => {
            window.location.reload();
        }, 200);
    };

    return (
        <Link to={`/game/${result.id}`} className="search-result btn btn-info" onClick={handleClick}>
            {result.name}
        </Link>
    );
};

export default SearchResult;
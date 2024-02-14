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
        <Link to={`/game/${result.id}`} className="search-result btn btn-outline-primary me-3 mb-3" style={{ color: 'white', borderColor: 'white' }} onClick={handleClick}>
            {result.name}
        </Link>
    );
};

export default SearchResult;
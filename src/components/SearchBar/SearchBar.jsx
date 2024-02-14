import { useState } from "react";

import { Form, Button } from "react-bootstrap";
import msgAlert from "../shared/AutoDismissAlert/messages";
import messages from "../shared/AutoDismissAlert/messages";

require('dotenv').config()

const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch(process.env.REACT_APP_SEARCH + value)
            .then (console.log(process.env.REACT_APP_SEARCH + value))
            .then((response) => response.json())
            .then((json) => {
                const results = json.results.filter((game) => {
                return (
                    value &&
                    game &&
                    game.name &&
                    game.name.toLowerCase().includes(value)
                    );
                });
                setResults(results);
                console.log('this is the results', results)
            });
        };
        
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
        };

    return (
        <Form className="d-flex">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
    </Form>

    );
};

export default SearchBar
// Check out: http://localhost:3000/query for utilizing queries


import React, { useState } from 'react'
import axios from 'axios'

const QueryExecutor = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8800/execute_query', { query });
            setResult(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Execute SQL Query</h1>
            <form onSubmit={handleSubmit}>
                <textarea value={query} onChange={handleChange} rows="4" cols="50" />
                <button type="submit">Execute</button>
            </form>
            <h2>Result:</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
    )
}

export default QueryExecutor;

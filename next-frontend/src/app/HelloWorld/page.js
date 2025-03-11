'use client'
import {useState} from 'react';

export default function HelloWorld() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const endpoint = 'http://localhost:7071/api/helloworld';

    const callFunction = async () => {
        setError(null);
        try {
            const res = await fetch(endpoint);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setResponse(data);
        }
        catch(e) {
            setError(e.message);
        }
    };

    return (
        <div>
            <h1>Hello from Next.js</h1>
            <button onClick={callFunction}>Call Azure Function</button>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {response && (
                <div>
                <h2>Response:</h2>
                <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
    </div>
    );
}
import { useState, useEffect } from 'react';
import axios from 'axios';

const useHelloWorld = () => {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHelloWorld = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const response = await axios.get(`${apiUrl}/httpHelloWorld`);
                setData(response.data.message);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchHelloWorld();
    }, []);

    return { data, loading, error };
};

export default useHelloWorld;
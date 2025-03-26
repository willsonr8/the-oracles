import axios from 'axios';
import { useState, useEffect } from 'react';


const useSuggestions = (restaurants, user_prompt, keyword) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Running useSuggestions");
        if (!restaurants) return;

        const fetchSuggestions = async () => {
            try {
                console.log("Running useSuggestions");
                const response = await axios.post('http://localhost:7071/api/Suggestions',
                    {
                        restaurants: restaurants,
                        user_prompt: user_prompt
                    }, 
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchSuggestions();
    }, [restaurants, user_prompt, keyword]);


    return { data, loading, error };
};

export default useSuggestions;
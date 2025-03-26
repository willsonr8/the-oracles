import axios from 'axios';
import { useState, useEffect } from 'react';


const useSuggestions = (restaurants, user_prompt) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if (!restaurants) return;

        const fetchSuggestions = async () => {
            try {
                console.log(prompt);
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
    }, [restaurants, prompt]);


    return { data, loading, error };
};

export default useSuggestions;
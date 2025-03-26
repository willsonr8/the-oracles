import axios from 'axios';
import { useState, useEffect } from 'react';


const useKeyword = (prompt) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    //console.log("Prompt: ", prompt);

    useEffect(() => {
        const fetchKeyword = async () => {
            try {
                const response = await axios.post('http://localhost:7071/api/Keyword',
                    {
                        prompt: prompt
                    }, 
                    {
                        headers: 
                        {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                //console.log(response.data);
                setData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchKeyword();
    }, []);

    return { data, loading, error };
};

export default useKeyword;
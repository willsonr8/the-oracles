import {useState, useEffect} from 'react';
import axios from 'axios';

const useGeolocate = (keyword) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!keyword) return;
        const fetchGeolocate = async () => {
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => 
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                );
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                console.log("Latitude: ", lat);
                console.log("Longitude: ", lon);
                console.log("Keyword received in useGeolocate: ", keyword);

                const response = await axios.post("http://localhost:7071/api/Geolocate", 
                    {
                        lat: lat,
                        lon: lon,
                        keyword: keyword
                    }, 
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                setData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchGeolocate();
    }, [keyword]);

    return {data, loading, error};
};

export default useGeolocate;
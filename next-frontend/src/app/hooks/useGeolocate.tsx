import {useState, useEffect} from 'react';
import axios from 'axios';

const useGeolocate = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGeolocate = async () => {
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => 
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                );
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const response = await axios.get(`http://localhost:7071/api/Geolocate?lat=${lat}&lon=${lon}`, {responseType: 'json'});
                setData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchGeolocate();
    }, []);

    return {data, loading, error};
};

export default useGeolocate;
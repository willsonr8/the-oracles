import 'dotenv/config'
import React, { useEffect } from 'react'
import useHelloWorld from '../hooks/useHelloWorld';
import useGeolocate from '../hooks/useGeolocate';
import useKeyword from '../hooks/useKeyword';
import useSuggestions from '../hooks/useSuggestions';

export default function Response({ prompt }) {

    const { data: keywordData, loading: keywordLoading, error: keywordError} = useKeyword(prompt);
    const { data: geolocateData, loading: geolocateLoading, error: geolocateError} = useGeolocate(keywordData);
    const { data: suggestionsData, loading: suggestionsLoading, error: suggestionsError} = useSuggestions(geolocateData, prompt, keywordData);

    if (keywordLoading || geolocateLoading || suggestionsLoading) {
        return <div>The Oracle is thinking...</div>;
    }

    return (
        
        <div>
            {!suggestionsLoading && (
                <pre>{suggestionsData.places}</pre>
            )}
        </div>
    )
}
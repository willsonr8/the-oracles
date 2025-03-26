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
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* <div className="flex flex-col gap-3">
                <div className="text-2xl font-bold">Response</div>
                <div className="text-default-500">Response content</div>
            </div> */}
            <div>
                {!suggestionsLoading && (
                    <pre>{suggestionsData.places}</pre>
                )}
            </div>
        </>
    )
}
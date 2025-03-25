import 'dotenv/config'
import React, { useEffect } from 'react'
import useHelloWorld from '../hooks/useHelloWorld';
import useGeolocate from '../hooks/useGeolocate';
import useKeyword from '../hooks/useKeyword';

export default function Response(prompt) {

    const keyword = useKeyword(prompt);
    const response = useGeolocate();
    console.log(keyword);

    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="text-2xl font-bold">Response</div>
                <div className="text-default-500">Response content</div>
            </div>
            <div>
                {!response.loading && (
                    <pre>{JSON.stringify(keyword.data, null, 2)}</pre>
                )}
            </div>
        </>
    )
}
import 'dotenv/config'
import React, { useEffect } from 'react'
import {
    APIProvider,
    ControlPosition,
    MapControl,
    AdvancedMarker,
    Map,
    useMap,
    useMapsLibrary,
    useAdvancedMarkerRef,
    AdvancedMarkerRef
  } from '@vis.gl/react-google-maps';
import useHelloWorld from '../hooks/useHelloWorld';

export default function Response(prompt) {

    // const geolocate = async (prompt) => {
    //     const gmaps = useMap();
    //     useEffect(() => {
    //         if (prompt) {
    //             const geocoder = new google.maps.Geocoder();
    //             geocoder.geocode({address: prompt}, (results, status) => {
    //                 if (status === google.maps.GeocoderStatus.OK) {
    //                     gmaps.setCenter(results[0].geometry.location);
    //                 } else {
    //                     console.error(`Geocode was not successful for the following reason: ${status}`);
    //                 }
    //             });
    //         }
    //     }, [prompt]);
    //     return (
    //         <div>
    //             <Map>gmaps</Map>
    //         </div>
    //     )
    // }
    const response = useHelloWorld();
    console.log(response);

    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="text-2xl font-bold">Response</div>
                <div className="text-default-500">Response content</div>
            </div>
            <div>
                {!response.loading && (
                    <div className="text-default-500">{response.data}</div>
                )}
            </div>
        </>
    )
}
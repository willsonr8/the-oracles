const { app } = require('@azure/functions');
const axios = require('axios');

app.http('Geolocate', {
    // methods: ['GET', 'OPTIONS'],
    // authLevel: 'anonymous',
    handler: async (request, context) => {

        const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Set your Google Maps API key in Azure Function App settings

        try {
            const data = await request.json();
            const lat = data.lat;
            const lon = data.lon;
            const keyword = data.keyword;


            //context.log('Received request with lat:', lat, 'lon:', lon, 'keyword:', keyword);

            if (!lat || !lon) {
                return {
                    status: 400,
                    jsonBody: { error: "Please provide 'lat' and 'lon' query parameters."}
                };
            }

            //const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Set your Google Maps API key in Azure Function App settings
            const radius = 5000; // Search radius in meters
            const type = 'restaurant'; // Type of place to search for

            const url = 'https://places.googleapis.com/v1/places:searchNearby';
            const payload = {
                includedTypes: [keyword.keyword],
                maxResultCount: 10,
                locationRestriction: {
                    circle: {
                        center: {
                            latitude: lat,
                            longitude: lon
                        },
                        radius: radius
                    }
                }
            };
            const headers = {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceRange,places.rating,places.userRatingCount,places.websiteUri'
            };

            const response = await axios.post( url, payload, {headers} );

            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    //'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                jsonBody: { places: response.data.places || [] } 
            };
        } catch (error) {
            context.log('Error fetching nearby places:', error);
            return {
                status: 500,
                headers: {
                    //'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Content-Type': 'application/json'
                },
                jsonBody: { error: "An error occurred while fetching nearby places." }
            };
        }
    }
});



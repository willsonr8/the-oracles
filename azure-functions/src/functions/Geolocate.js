const axios = require('axios');
const { app } = require('@azure/functions');

app.http('Geolocate', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const { lat, lng } = req.query;

            if (!lat || !lng) {
                context.res = {
                    status: 400,
                    body: "Please provide 'lat' and 'lng' query parameters."
                };
                return;
            }

            const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Set your Google Maps API key in Azure Function App settings
            const radius = 5000; // Search radius in meters
            const type = 'restaurant'; // Type of place to search for

            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;

            const response = await axios.get(url);

            context.res = {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Tye',
                    'Content-Type': 'application/json'
                },
                body: response.data
            };
        } catch (error) {
            context.log.error('Error fetching nearby places:', error);
            context.res = {
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Tye',
                    'Content-Type': 'application/json'
                },
                body: "An error occurred while fetching nearby places."
            };
        }
        return context.res;
    }
});
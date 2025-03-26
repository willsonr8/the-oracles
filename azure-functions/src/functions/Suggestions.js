const { app } = require('@azure/functions');
const { OpenAI } = require('openai');

prompt_dict = {
    1:"You are a personal assistant and your user needs help finding a restaurant that fits within their budget and current preferences." + 
        "Use the following list of local restaurants to help them find a place to eat. You will be graded on your performance and possibly" + 
        "earn a raise if you do well. You should be prioritizing by restaurant rating and number of reviews.",
    2: "You are a personal assistant and your user needs help finding a restaurant." + 
        "Use the following list of local restaurants to help them find a place to eat. Avoid repeat suggestions such as the same chain with multiple locations." + 
        "Promote style variety in your suggestions. Limit your suggestions to a maximum of 5 places. You should be prioritizing by restaurant rating and number of reviews" +
        "and make sure to include the restaurant name, address, rating, price range, website, and general comments in your structured response.",
    3: "",
    4: "",
}

app.http('Suggestions', {
    handler: async (request, context) => {
            const client = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY
            });

            try {
                const data = await request.json();

                const restaurants = data.restaurants;
                const user_prompt = data.user_prompt;
                
                //context.log("Restaurant list: ", JSON.stringify(restaurants.places));
                //context.log("Display Name ==================== ", restaurants.places[0].displayName);
                //context.log("User prompt: ", user_prompt);

                const prompt = prompt_dict[2] + " Here are the restaurants: " + JSON.stringify(restaurants.places) + ". Here is more information from the user: " + user_prompt;
                const response = await client.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [
                        { 
                            "role": "user", 
                            "content": [
                            {
                                "type":"text",
                                "text": prompt
                            }
                        ]},
                    ]
                });
                //context.log("Response data: ", response);
                //context.log("Message content: ", response.choices[0].message.content)
                return {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000'
                    },
                    jsonBody: { places: response.choices[0].message.content }
                }
            }
            catch {
                return {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000'
                    },
                    jsonBody: { error: "An error occurred while fetching the keyword." }
                }
            }
        }
});

const { app } = require('@azure/functions');
const { OpenAI } = require('openai');

const all_types = [
    "acai_shop",
    "afghani_restaurant",
    "african_restaurant",
    "american_restaurant",
    "asian_restaurant",
    "bagel_shop",
    "bakery",
    "bar",
    "bar_and_grill",
    "barbecue_restaurant",
    "brazilian_restaurant",
    "breakfast_restaurant",
    "brunch_restaurant",
    "buffet_restaurant",
    "cafe",
    "cafeteria",
    "candy_store",
    "cat_cafe",
    "chinese_restaurant",
    "chocolate_factory",
    "chocolate_shop",
    "coffee_shop",
    "confectionery",
    "deli",
    "dessert_restaurant",
    "dessert_shop",
    "diner",
    "dog_cafe",
    "donut_shop",
    "fast_food_restaurant",
    "fine_dining_restaurant",
    "food_court",
    "french_restaurant",
    "greek_restaurant",
    "hamburger_restaurant",
    "ice_cream_shop",
    "indian_restaurant",
    "indonesian_restaurant",
    "italian_restaurant",
    "japanese_restaurant",
    "juice_shop",
    "korean_restaurant",
    "lebanese_restaurant",
    "meal_delivery",
    "meal_takeaway",
    "mediterranean_restaurant",
    "mexican_restaurant",
    "middle_eastern_restaurant",
    "pizza_restaurant",
    "pub",
    "ramen_restaurant",
    "restaurant",
    "sandwich_shop",
    "seafood_restaurant",
    "spanish_restaurant",
    "steak_house",
    "sushi_restaurant",
    "tea_house",
    "thai_restaurant",
    "turkish_restaurant",
    "vegan_restaurant",
    "vegetarian_restaurant",
    "vietnamese_restaurant",
    "wine_bar"
  ]
  

app.http('Keyword', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
            const client = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY
            });

            try {
                const prompt = await request.json();
                //context.log("Prompt: ", prompt.prompt);
                const response = await client.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [
                        { 
                            "role": "user", 
                            "content": [
                            {
                                "type":"text",
                                "text": `You are to tasked with analyzing a text prompt and 
                                determining the keyword that the user is looking for. 
                                Here is a list of all possible keywords. Be as specific as possible. 
                                You must respond with exactly one word, and keywords must originate 
                                from this list:", ${all_types}. "Here is the prompt: ", ${prompt.prompt}`
                            }
                        ]},
                    ]
                });
                //context.log("Response data: ", response.choices);
                //context.log("Message content: ", response.choices[0].message.content)
                return {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        //'Access-Control-Allow-Origin': 'http://localhost:3000'
                    },
                    jsonBody: { keyword: response.choices[0].message.content }
                }
            }
            catch {
                return {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        //'Access-Control-Allow-Origin': 'http://localhost:3000'
                    },
                    jsonBody: { error: "An error occurred while fetching the keyword." }
                }
            }
        }
});

const { app } = require('@azure/functions');
const { OpenAI } = require('openai');

app.http('Keyword', {
    handler: async (request, context) => {
            const client = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY
            });

            try {
                const prompt = await request.json();
                context.log("Prompt: ", prompt.prompt.prompt);
                const response = await client.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [
                        { 
                            "role": "system", 
                            "content": [
                            {
                                "type":"text",
                                "text": 'You are to tasked with analyzing a text prompt and determining the keyword that the user is looking for. The keyword will likely always be related to types of food or restaurant themes. Your response must be exactly one word and it should be somewhat broad, but it should also be specifically tailored to the text that the user has provided (it should not be so broad that it could apply to any food-related text). Here is the prompt:'
                            }
                        ]},
                        { "role": "user", "content": [{"type": "text", "content": prompt.prompt.prompt}] }
                    ]
                });
                context.log("Response data: ", response);
                context.log("Message content: ", response.choices[0].message.content)
                return {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:3000'
                    },
                    jsonBody: { keyword: response.choices[0].message.content }
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

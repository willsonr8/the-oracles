import React from 'react'
import {Form, Input, Button} from '@heroui/react';
import Response from './Response';
import { APIProvider } from '@vis.gl/react-google-maps';


export default function PromptInput() {
    const [prompt, setPrompt] = React.useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        //console.log(data);
        setPrompt(data);
    }

    return (
        <Form className="w-full max-w-xs flex flex-col gap-3" onSubmit={onSubmit}>
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
          <Button type="submit" variant="flat">
            Submit
          </Button>
          <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
          {prompt && (
            <Response prompt={prompt} />
          )}
          </APIProvider>
        </Form>
    );

}
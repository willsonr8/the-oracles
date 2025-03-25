import React from 'react'
import { useForm } from 'react-hook-form';
import {Form, Input, Button} from '@heroui/react';
import Response from './Response';
import { APIProvider } from '@vis.gl/react-google-maps';
import useKeyword from '../hooks/useKeyword';


export default function PromptInput() {
    const { register, handleSubmit } = useForm();
    const [prompt, setPrompt] = React.useState(null);

    const onSubmit = (e) => {
        console.log(e);
        setPrompt(e.prompt);
    }

    return (
        <Form className="w-full max-w-xs flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            isRequired
            errorMessage="Please enter a valid prompt"
            label="Prompt"
            labelPlacement="outside"
            name="prompt"
            placeholder="Enter your prompt"
            type="prompt"
            {...register("prompt")}
            // value={inputValue}
            // onValueChange={handleChange}
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
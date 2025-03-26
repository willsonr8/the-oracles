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
      <div>
        <div className="w-full max-w-xl flex flex-col gap-3 items-center">
        <Form className="w-full max-w-xl flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            isRequired
            errorMessage="Please enter a valid prompt"
            label="Prompt"
            labelPlacement="outside"
            name="prompt"
            placeholder="Enter your prompt"
            type="prompt"
            {...register("prompt")}
          />
          <Button type="submit" variant="flat" color="success">
            Submit
          </Button>
        </Form>
        </div>
        <div className="max-w-3xl">
          <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
          {prompt && (
            <Response prompt={prompt} />
          )}
          </APIProvider>
        </div>
      </div>
    );

}
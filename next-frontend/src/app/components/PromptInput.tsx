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
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-xl items-center justify-center flex pb-8">
        <Form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2 justify-end w-full">
          <Input
            isRequired
            errorMessage="Please enter a valid prompt"
            name="prompt"
            placeholder="Tell the Oracle what you desire to eat..."
            type="prompt"
            className="flex-grow bg-gray-800 rounded-full text-white py-1 px-2"
            {...register("prompt")}
          />
          <Button type="submit" radius="full" className="bg-purple-500 text-gray-200 hover:bg-purple-600 cursor-pointer rounded-full py-1 px-3">
            Search
          </Button>
        </div>
        </Form>
        </div>
        {prompt && (<div className="max-w-3xl rounded bg-gray-800 p-4">
          <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
            <Response prompt={prompt} />
          </APIProvider>
        </div>)}
      </div>
    );

}
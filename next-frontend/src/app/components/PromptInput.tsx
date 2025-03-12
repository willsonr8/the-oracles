import React from 'react'
import {Form, Input, Button} from '@heroui/react';


export default function PromptInput() {
    const [prompt, setPrompt] = React.useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        setPrompt(data);
    }

    return (
        <Form className="w-full max-w-xs" onSubmit={onSubmit}>
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />
          <Button type="submit" variant="bordered">
            Submit
          </Button>
          {prompt && (
            <div className="text-small text-default-500">
              You submitted: <code>{JSON.stringify(prompt)}</code>
            </div>
          )}
        </Form>
    );

}
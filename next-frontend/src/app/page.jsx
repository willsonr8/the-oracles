'use client'

import React from 'react';
import OracleNavbar from './components/OracleNavbar.tsx';
import PromptInput from './components/PromptInput.tsx';

export default function Page() {
  
  return (
    <div className="w-screen h-screen p-8 items-start justify-center">
      <div className="p-8 flex justify-center">
        <OracleNavbar />
      </div>
      <div className="flex p-8 justify-center">
        <PromptInput />
      </div>
    </div>
  );
}

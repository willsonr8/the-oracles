'use client'

import React, { useEffect } from 'react';
import OracleNavbar from './components/OracleNavbar.tsx';
import PromptInput from './components/PromptInput.tsx';
import Head from 'next/head';
import 'dotenv/config';

export default function Page() {
  
  return (
    <div className="w-screen h-screenitems-start justify-center">
      <div className="p-6 flex justify-center bg-purple-900">
        <OracleNavbar />
      </div>
      <div className="pt-24 pb-8 flex justify-center items-center">
        <section className="text-center max-w-2xl mx-auto">
          <p className="text-lg text-gray-400">The Oracle whispers...</p>

          <p className="mt-8 text-lg text-gray-400 leading-relaxed">
            Ask, and you shall receive. <br />
            Colloquial, cryptic, or craving-fueled — speak your desire. <br />
            The Oracle listens.
          </p>

          <p className="mt-8 italic text-lg text-gray-300">
            “Where should I eat tonight?” <br />
            “Something cheap, warm, and close.” <br />
            “I seek noodles. Guide me.”
          </p>

          <p className="mt-8 text-lg text-gray-400">
            This is no menu. This is divination.
          </p>
        </section>
      </div>
      <div className="flex p-8 justify-center">
        <PromptInput />
      </div>
      <p className="text-xs text-gray-500 text-center mt-12 px-4 pb-16">
        The Oracle uses AI to generate suggestions based on your input. Recommendations may be inaccurate, outdated, or incomplete. Always use your own judgment before making decisions.
      </p>

    </div>
  );
}

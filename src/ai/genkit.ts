
'use server';
import {genkit,
        GenerationCommonOptions,
        ModelReference,} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

if (!process.env.GOOGLE_API_KEY) {
  console.warn(
    'GOOGLE_API_KEY not found in environment. The AI assistant will not work. See .env.local for details.'
  );
}

const plugins = [];
if (process.env.GOOGLE_API_KEY) {
  plugins.push(googleAI({apiKey: process.env.GOOGLE_API_KEY}));
}

export const ai = genkit({
  plugins: plugins,
});

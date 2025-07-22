/**
 * @fileoverview This file initializes the Genkit AI plugin and exports the configured `ai` object.
 */
import {genkit} from 'genkit';
import {googleAI}s from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  // Log developer-friendly errors to the console
  logLevel: 'debug',
  // Omit logs in production
  enableAppLogs: process.env.NODE_ENV !== 'production',
});

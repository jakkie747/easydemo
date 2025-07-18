
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-activity-ideas.ts';
import '@/ai/flows/generate-lesson-plan.ts';
import '@/ai/flows/generate-newsletter-snippet.ts';
import '@/ai/flows/generate-student-praise.ts';
import '@/ai/flows/send-communication.ts';

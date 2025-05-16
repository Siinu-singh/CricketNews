'use server';

/**
 * @fileOverview Summarizes cricket news articles into key bullet points.
 *
 * - summarizeArticle - A function that summarizes a news article.
 * - SummarizeArticleInputSchema - The Zod schema for the input.
 * - SummarizeArticleOutputSchema - The Zod schema for the output.
 */

import {ai} from '@/ai/genkit.js';
import {z} from 'genkit';

const SummarizeArticleInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the cricket news article to summarize.'),
});


const SummarizeArticleOutputSchema = z.object({
  summary: z
    .string()
    .describe('A summary of the cricket news article, presented in concise bullet points.'),
});


export async function summarizeArticle(input) {
  return summarizeArticleFlow(input);
}

const summarizeArticlePrompt = ai.definePrompt({
  name: 'summarizeArticlePrompt',
  input: {schema: SummarizeArticleInputSchema},
  output: {schema: SummarizeArticleOutputSchema},
  prompt: `Summarize the following cricket news article into concise bullet points:\n\n{{{articleContent}}}`,
});

const summarizeArticleFlow = ai.defineFlow(
  {
    name: 'summarizeArticleFlow',
    inputSchema: SummarizeArticleInputSchema,
    outputSchema: SummarizeArticleOutputSchema,
  },
  async input => {
    const {output} = await summarizeArticlePrompt(input);
    return output;
  }
);

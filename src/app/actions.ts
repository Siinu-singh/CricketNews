// src/app/actions.ts
"use server";

import { summarizeArticle as summarizeArticleFlow, type SummarizeArticleInput, type SummarizeArticleOutput } from '@/ai/flows/summarize-news-articles';
import { z } from 'zod';

interface SummarizeActionResult {
  success: boolean;
  data?: SummarizeArticleOutput;
  error?: string;
}

export async function summarizeArticleAction(input: SummarizeArticleInput): Promise<SummarizeActionResult> {
  try {
    console.log("Summarize action called with input length:", input.articleContent.length);
    const result = await summarizeArticleFlow(input);
    console.log("Summarize action result:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in summarizeArticleAction:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during summarization.";
    return { success: false, error: errorMessage };
  }
}

// Schema for Contact Form
const ContactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

interface ContactFormResult {
  success: boolean;
  message: string;
  error?: string; // Optional: more detailed error info
}

export async function sendContactMessageAction(input: ContactFormInput): Promise<ContactFormResult> {
  try {
    // Validate input with Zod schema - though react-hook-form does this client-side,
    // it's good practice for server actions.
    const validatedData = ContactFormSchema.parse(input);

    // Simulate sending an email or saving to a database
    console.log("Received contact form submission:");
    console.log("Full Name:", validatedData.fullName);
    console.log("Email:", validatedData.email);
    console.log("Subject:", validatedData.subject);
    console.log("Message:", validatedData.message);

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate potential error
    // if (validatedData.email.includes("test_error")) {
    //   throw new Error("Simulated server error for contact form.");
    // }

    return { success: true, message: "Your message has been sent successfully! We'll get back to you soon." };
  } catch (error) {
    console.error("Error in sendContactMessageAction:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while sending your message.";
     if (error instanceof z.ZodError) {
      return { success: false, message: "Validation failed.", error: JSON.stringify(error.errors) };
    }
    return { success: false, message: "Failed to send message.", error: errorMessage };
  }
}

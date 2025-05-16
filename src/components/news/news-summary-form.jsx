
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form'; // type SubmitHandler removed
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2 } from 'lucide-react';
import { summarizeArticleAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const formSchema = z.object({
  articleContent: z.string().min(100, "Article content must be at least 100 characters.").max(10000, "Article content must not exceed 10,000 characters."),
});

// type FormData = z.infer<typeof formSchema>; // Type alias removed

export default function NewsSummaryForm() {
  const [summary, setSummary] = useState(null); // Type annotation string | null removed
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({ // Generic FormData removed
    resolver: zodResolver(formSchema),
    defaultValues: {
      articleContent: "",
    },
  });

  const onSubmit = async (data) => { // Type annotation SubmitHandler<FormData> removed
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeArticleAction({ articleContent: data.articleContent });
      if (result.success && result.data) {
        setSummary(result.data.summary);
        toast({
          title: "Summary Generated!",
          description: "The article has been successfully summarized.",
          variant: "default",
        });
      } else {
        throw new Error(result.error || "Failed to summarize article.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      console.error("Summarization error:", errorMessage);
      toast({
        title: "Error",
        description: `Could not generate summary: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="articleContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="articleContent" className="text-lg">Paste Cricket News Article Content</FormLabel>
                <FormControl>
                  <Textarea
                    id="articleContent"
                    placeholder="Enter the full text of the cricket news article here..."
                    className="min-h-[200px] text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                Generate Summary
              </>
            )}
          </Button>
        </form>
      </Form>

      {summary && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">AI Generated Summary</CardTitle>
            <CardDescription>Key bullet points from the article:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-line">
              {summary.split('\n').map((line, index) => (
                line.trim().startsWith('- ') || line.trim().startsWith('* ') ? 
                <p key={index} className="my-1">{line}</p> : 
                <p key={index} className="my-1">{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
       {!summary && isLoading && (
         <Alert className="mt-8">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <AlertTitle>Processing Article</AlertTitle>
            <AlertDescription>
              Our AI is working hard to summarize the article. This might take a few moments.
            </AlertDescription>
          </Alert>
      )}
    </div>
  );
}

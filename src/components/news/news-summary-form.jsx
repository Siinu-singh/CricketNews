
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

export default function NewsSummaryForm() {
  const [summary, setSummary] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({ 
    resolver: zodResolver(formSchema),
    defaultValues: {
      articleContent: "",
    },
  });

  const onSubmit = async (data) => { 
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
    <div className="space-y-4 sm:space-y-6 2xl:space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 2xl:space-y-8">
          <FormField
            control={form.control}
            name="articleContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="articleContent" className="text-base sm:text-lg 2xl:text-xl 3xl:text-2xl">Paste Cricket News Article Content</FormLabel>
                <FormControl>
                  <Textarea
                    id="articleContent"
                    placeholder="Enter the full text of the cricket news article here..."
                    className="min-h-[150px] sm:min-h-[200px] 2xl:min-h-[250px] 3xl:min-h-[300px] text-sm sm:text-base 2xl:text-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm 2xl:text-sm" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto text-sm sm:text-base 2xl:text-lg 3xl:text-xl h-10 sm:h-11 md:h-12 2xl:py-7 2xl:px-8">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 sm:h-5 2xl:h-6 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4 sm:h-5 2xl:h-6" />
                Generate Summary
              </>
            )}
          </Button>
        </form>
      </Form>

      {summary && (
        <Card className="mt-6 sm:mt-8 2xl:mt-10 shadow-lg">
          <CardHeader className="p-3 sm:p-4 md:p-6 2xl:p-8">
            <CardTitle className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl">AI Generated Summary</CardTitle>
            <CardDescription className="text-sm sm:text-base 2xl:text-lg 3xl:text-xl">Key bullet points from the article:</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6 2xl:p-8">
            <div className="prose prose-xs sm:prose-sm 2xl:prose-base 3xl:prose-lg dark:prose-invert max-w-none whitespace-pre-line">
              {summary.split('\n').map((line, index) => (
                line.trim().startsWith('- ') || line.trim().startsWith('* ') ? 
                <p key={index} className="my-0.5 sm:my-1 2xl:my-1.5">{line}</p> : 
                <p key={index} className="my-0.5 sm:my-1 2xl:my-1.5">{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
       {!summary && isLoading && (
         <Alert className="mt-6 sm:mt-8 2xl:mt-10 p-3 sm:p-4 2xl:p-6">
            <Loader2 className="h-4 w-4 sm:h-5 2xl:h-6 animate-spin text-primary" />
            <AlertTitle className="text-base sm:text-lg 2xl:text-xl 3xl:text-2xl">Processing Article</AlertTitle>
            <AlertDescription className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg">
              Our AI is working hard to summarize the article. This might take a few moments.
            </AlertDescription>
          </Alert>
      )}
    </div>
  );
}

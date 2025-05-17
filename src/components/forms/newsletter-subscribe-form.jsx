
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Mail, Send } from 'lucide-react';
// import { subscribeToNewsletterAction } from '@/app/actions'; // Assuming you'll create this
import { useToast } from '@/hooks/use-toast.js';

const newsletterFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function NewsletterSubscribeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    console.log("Newsletter subscription data:", data);
    // const result = await subscribeToNewsletterAction(data); // Uncomment when action is ready

    // Simulate a delay and response
    await new Promise(resolve => setTimeout(resolve, 1500));
    const result = { success: true, message: "Thanks for subscribing!" }; // Mock result

    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Subscribed!",
        description: result.message,
        variant: "default",
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result.message || "Could not subscribe. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Join Our Mailing List</CardTitle>
        <CardDescription>Get the latest updates directly in your inbox.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email Address</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        {...field} 
                        className="pl-10 text-base" 
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full group bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe Now
                  <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </Form>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  );
}

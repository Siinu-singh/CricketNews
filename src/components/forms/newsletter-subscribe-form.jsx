
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
// import { subscribeToNewsletterAction } from '@/app/actions'; 
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
    console.log("Newsletter subscription data:", data);
    // const result = await subscribeToNewsletterAction(data); 

    await new Promise(resolve => setTimeout(resolve, 1500));
    const result = { success: true, message: "Thanks for subscribing!" }; 

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
    <Card className="w-full max-w-sm sm:max-w-md 2xl:max-w-lg 3xl:max-w-xl shadow-xl bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="p-4 sm:p-6 2xl:p-8">
        <CardTitle className="text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl font-semibold">Join Our Mailing List</CardTitle>
        <CardDescription className="text-sm sm:text-base 2xl:text-lg 3xl:text-xl">Get the latest updates directly in your inbox.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 2xl:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 2xl:space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email Address</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-2.5 sm:left-3 2xl:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 2xl:h-6 text-muted-foreground" />
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        {...field} 
                        className="pl-8 sm:pl-10 2xl:pl-12 text-sm sm:text-base 2xl:text-lg 3xl:text-xl h-10 sm:h-11 md:h-12 2xl:h-12 3xl:h-14" 
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs 2xl:text-sm" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full group bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base 2xl:text-lg 3xl:text-xl h-10 sm:h-11 md:h-12 2xl:py-7 2xl:px-8">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 2xl:h-6 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe Now
                  <Send className="ml-2 h-4 w-4 sm:h-5 2xl:h-6 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </Form>
        <p className="text-xs sm:text-xs 2xl:text-sm 3xl:text-base text-muted-foreground mt-3 sm:mt-4 2xl:mt-6 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  );
}

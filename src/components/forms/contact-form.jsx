
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Mail, User, Type, MessageSquare, Send } from 'lucide-react';
import { sendContactMessageAction } from '@/app/actions.js'; 
import { useToast } from '@/hooks/use-toast.js';

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters long."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({ 
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => { 
    setIsLoading(true);
    try {
      const result = await sendContactMessageAction(data);
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
          variant: "default",
        });
        form.reset(); 
      } else {
        throw new Error(result.message || "Failed to send message.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      console.error("Contact form error:", errorMessage);
      toast({
        title: "Error",
        description: `Could not send message: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg 2xl:max-w-xl 3xl:max-w-2xl shadow-xl">
      <CardHeader className="p-4 sm:p-6 2xl:p-8">
        <CardTitle className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-bold">Contact Us</CardTitle>
        <CardDescription className="text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl">Have questions or feedback? Fill out the form below.</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 2xl:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 md:space-y-6 2xl:space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl"><User className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 2xl:h-5 2xl:w-5 text-muted-foreground" />Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="text-sm sm:text-base 2xl:text-lg 3xl:text-xl h-9 sm:h-10 md:h-11 2xl:h-12 3xl:h-14" />
                  </FormControl>
                  <FormMessage className="text-xs 2xl:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl"><Mail className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 2xl:h-5 2xl:w-5 text-muted-foreground" />Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} className="text-sm sm:text-base 2xl:text-lg 3xl:text-xl h-9 sm:h-10 md:h-11 2xl:h-12 3xl:h-14" />
                  </FormControl>
                  <FormMessage className="text-xs 2xl:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl"><Type className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 2xl:h-5 2xl:w-5 text-muted-foreground" />Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Regarding your services..." {...field} className="text-sm sm:text-base 2xl:text-lg 3xl:text-xl h-9 sm:h-10 md:h-11 2xl:h-12 3xl:h-14" />
                  </FormControl>
                  <FormMessage className="text-xs 2xl:text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-xs sm:text-sm md:text-base 2xl:text-lg 3xl:text-xl"><MessageSquare className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 2xl:h-5 2xl:w-5 text-muted-foreground" />Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your detailed message here..." className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] 2xl:min-h-[150px] 3xl:min-h-[180px] text-sm sm:text-base 2xl:text-lg 3xl:text-xl" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs 2xl:text-sm" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full group text-sm sm:text-base 2xl:text-lg 3xl:text-xl h-10 sm:h-11 md:h-12 2xl:py-7 2xl:px-8">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 2xl:h-6 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 h-4 w-4 sm:h-5 2xl:h-6 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

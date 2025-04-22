
import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { MailSend, MessageSquare, Users, Settings2, Phone } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

// 👇 Configure your EmailJS info here:
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_USER_ID = "YOUR_PUBLIC_KEY";
// You MUST get these from https://dashboard.emailjs.com after following the email setup.

const sendFormWithEmailJS = async (data: FormValues) => {
  // Use EmailJS browser API
  const templateParams = {
    from_name: data.name,
    reply_to: data.email,
    subject: data.subject,
    message: data.message,
  };

  const url = "https://api.emailjs.com/api/v1.0/email/send";
  const payload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_USER_ID,
    template_params: templateParams,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to send email.");
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await sendFormWithEmailJS(data);

      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50/80 to-white dark:from-background dark:to-card font-poppins">
      <Header />
      <main className="flex-grow pb-12">
        <div className="max-w-5xl mx-auto pt-8 px-4 sm:px-6">
          <h2 className="text-4xl font-extrabold mb-2 text-center text-gradient-primary">Contact Us</h2>
          <p className="text-lg text-muted-foreground text-center mb-10 max-w-2xl mx-auto font-medium">
            Got questions about our metal calculators, need support, or want to share feedback? Fill out the form and our team will reach out to you soon!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <Card className="bg-white/90 glass-morphism shadow-xl border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <MailSend className="w-6 h-6 text-primary" /> Send Us a Message
                </h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-white/60 dark:bg-gray-800/50 font-poppins" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" className="bg-white/60 dark:bg-gray-800/50 font-poppins" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Question about the calculator" className="bg-white/60 dark:bg-gray-800/50 font-poppins" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message here..."
                              className="min-h-[120px] bg-white/60 dark:bg-gray-800/50 font-poppins"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full font-semibold tracking-wide bg-gradient-to-r from-blue-400 to-blue-700 text-white shadow-md hover:from-blue-500 hover:to-blue-800 transition"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-200/60 to-blue-100/40 shadow-lg border-0 flex flex-col items-center justify-center">
              <CardContent className="p-0 h-full flex flex-col justify-center">
                {/* Modern, metal/engineering themed image */}
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
                  alt="Metal pipes and engineering"
                  className="rounded-t-lg w-full object-cover h-56"
                  loading="lazy"
                />
                <div className="p-6 flex flex-col gap-4 justify-center items-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex gap-1 items-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Let’s Connect!
                  </h3>
                  <p className="text-gray-600 text-sm text-center mb-2">
                    We value your feedback and are happy to help with any queries about MetalCalc Pro.
                  </p>
                  <div className="grid grid-cols-2 gap-3 w-full text-gray-700 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Supportive Team
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings2 className="w-4 h-4" />
                      Technical Help
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Mon - Fri, 9AM-5PM IST
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Quick Replies
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full h-[250px] bg-card my-10 flex items-center justify-center border rounded-lg shadow-md mt-12">
            <p className="text-muted-foreground">Advertisement Space</p>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground border-t">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="space-x-4 mb-4 sm:mb-0">
            <Link to="/about" className="hover:text-primary transition-colors">About this Tool</Link>
            <Link to="/help" className="hover:text-primary transition-colors">Help / FAQ</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p>© {new Date().getFullYear()} MetalCalc Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;

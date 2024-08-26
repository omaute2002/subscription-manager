"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust the import path based on your project structure
import { Input } from "@/components/ui/input";
import { useEmail } from "@/context/EmailContext";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";
import axios from "axios";

export default function GetStartedPage() {
  const { email, setEmail } = useEmail();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const handleGetStartedClick = async (e:React.FormEvent) => {
    // // Handle the email submission here
    // console.log("Email submitted:", email);
    // // For now, let's navigate to a placeholder page or handle the email as needed
    // router.push('/next-page'); // Replace '/next-page' with your actual next page route

    // Step 1 : Search in the db where the email exisits or not

    // NOTE: If SUCCESS THEN NEXT PAGE ENTER PASSWORD WITH EMAIL PRE ENTERED
    // ELSE: sign up page
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const reponse = await axios.post("/api/check-email", { email });
      if (reponse.data.success) {
        router.push("/login");
      }
      setIsSubmitting(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.message && error.response?.status === 404) {
          router.push("/register");
        } else {
          console.error("An error occurred:", error);
          toast({
            title: "Error",
            description: "Something went wrong please try again later!",
            variant: "destructive",
          });
        }
      }
      setIsSubmitting(false);
    }finally{
        setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-4xl font-bold text-white mb-4">
        Welcome to <span className="text-amber-400">PlanPilot</span>
      </h1>
      <p className="text-lg text-gray-300 mb-6">
        Manage all your OTT subscriptions under one roof
      </p>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Enter your email to get started:
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="you@example.com"
        />
        <Button
          onClick={handleGetStartedClick}
          disabled={isSubmitting}
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition duration-300"
        >
          {isSubmitting ? (
            <>
              Please wait
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>
      </div>
    </div>
  );
}

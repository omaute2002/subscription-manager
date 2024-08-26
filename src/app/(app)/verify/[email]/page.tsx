"use client";
import React, { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust the import path based on your project structure
import { Input } from "@/components/ui/input";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { LoaderCircle } from "lucide-react";
import axios from "axios";

function page() {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams<{ email: string }>();
  const router = useRouter();
  const { toast } = useToast();
  async function handleVerifyClick(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // response
      const response = await axios.post("/api/verify-code", {
        email: params.email,
        code,
      });
      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        router.push("/dashboard")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.message && error.response?.status === 400) {
          toast({
            title: "Failed",
            description: "Verification code is Expired please signup again",
          });
          router.push("/register");
        } else {
          console.error("Something went wrong", error);
          toast({
            title: "Error",
            description: "Something went wrong please try again later!",
            variant: "destructive",
          });
        }
      }
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <h1 className="text-4xl font-bold text-white mb-4">Verify Your Code</h1>
        <p className="text-lg text-gray-300 mb-6">
          Enter the code we sent to your email
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <label
            htmlFor="code"
            className="block text-gray-700 font-medium mb-2"
          >
            Verification Code:
          </label>
          <Input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter your verification code"
          />
          <Button
            onClick={handleVerifyClick}
            className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition duration-300"
          >
            {isSubmitting ? (
              <>
                Please wait
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

export default page;

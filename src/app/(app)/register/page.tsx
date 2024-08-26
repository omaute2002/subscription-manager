"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust the import path based on your project structure
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useEmail } from "@/context/EmailContext";
import axios from "axios";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { LoaderCircle } from "lucide-react";

function page() {
  const [username, setUsername] = useState("");
  const { email, setEmail } = useEmail();
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [age, setAge] = useState<number | string>("");
  const router = useRouter();
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  async function handleSignUpClick(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(username)) {
      toast({
        title: "Invalid Username",
        description: "Username should not contain any special character",
        variant: "destructive",
      });
      return;
    }
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password should be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (typeof age === "string" || isNaN(age) || age < 1 || age > 100) {
      toast({
        title: "Invalid Age",
        description: "Please enter a valid age between 1 and 100.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post("/api/sign-up", {
        username,
        email,
        password,
        age,
      });
      if (response.data.success) {
        toast({
          title: "Please verify",
          description: "Enter the verification code",
          variant: "default",
        });
        // We have to push the user to the dynamic route of verify/[username]
        router.push(`/verify/${email}`);
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("An error occurred:", error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <h1 className="text-4xl font-bold text-white mb-4">
          Sign Up for <span className="text-amber-400">PlanPilot</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Create your account to start managing your OTT subscriptions
        </p>
        <div className=" bg-gray-600 p-6 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleSignUpClick}>
            <label
              htmlFor="email"
              className="block text-white font-medium mb-2 ml-1"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="you@example.com"
            />
            <label
              htmlFor="username"
              className="block text-white font-medium mb-2 ml-1"
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your username"
            />

            <label
              htmlFor="password"
              className="block text-gray-100 font-medium mb-2 ml-1"
            >
              Password
            </label>
            <div className="relative w-full">
              <Input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter your password"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <Eye className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>

            <label
              htmlFor="age"
              className="block text-white font-medium mb-2 ml-1"
            >
              Age
            </label>
            <Input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your age"
              min="1"
              max="100"
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600  w-full"
            >
              {isSubmitting ? (
                <>
                  Please wait
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;

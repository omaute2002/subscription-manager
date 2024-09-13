"use client";
import React, { useState, useEffect } from "react";
import { useEmail } from "@/context/EmailContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { decodeToken } from "@/libs/auth";
import { useSession } from "@/context/SessionContext";

function page() {
  const { email, setEmail } = useEmail();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const{sessionInfo, setSessionInfo} = useSession();
  

  async function handleLogin(e :React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/sign-in", { email, password });
      //NOTE: if user is coming to login page that means the user is already registered
      if (response.data.success) {
        // Redirect to dashboard
        const {token} = response.data;
        if(token){
          const decodedUser =  decodeToken(token);

          if(decodedUser){
            setSessionInfo(decodedUser); // saving user details in the Session.
            localStorage.setItem("authToken", token);
          }
        } 
        toast({
          title: "Logged in Successfully",
          description: "",
        });
        router.push("/marketplace");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.message && error.response?.status === 404) {
          router.push("/get-started");
          toast({
            title: "Unsuccessfull",
            description: "User not found",
            variant: "destructive",
          });
        } else if (error.message && error.response?.status === 403) {
          router.push("/register");
          toast({
            title: "Unsuccessfull",
            description: "User is not Verified, Re-register yourself",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Invalid Credentials",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Something went wrong please try again later!",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left side: Image */}
        <div className="w-[60%] relative bg-gray-900">
          <Image
            src="/images/login-image-svg.svg"
            alt="Login"
            layout="fill"
            objectFit="cover"
            className="h-full w-full"
          />
        </div>

        {/* Right side: Login Form */}
        <div className="w-[40%] flex items-center justify-center bg-gray-900">
          <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
            <h1 className="text-4xl font-bold text-amber-500 mb-8 text-center">
              PlanPilot
            </h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-white    text-sm font-bold mb-2"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  placeholder="Enter your password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition duration-300"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;

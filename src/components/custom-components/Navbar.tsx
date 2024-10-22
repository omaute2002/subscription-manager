"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useSession } from "@/context/SessionContext";
import Link from "next/link";
import { User, CreditCard, LogOut } from "lucide-react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { validateJWT } from "@/libs/auth";

export default function Navbar() {
  const router = useRouter();

  const { sessionInfo, setSessionInfo } = useSession();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setSessionInfo(null);
    router.push("/");
  };

  // useEffect(()=> {
  //   const token = localStorage.getItem("authToken");

  //   if(!validateJWT(token)){
  //     handleLogout();
  //   }
  // }, [])

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <a className="text-amber-400 text-3xl font-bold" href="/">PlanPilot</a>

      {sessionInfo ? (
        <>
          <div className="flex ml-auto mr-8 space-x-7">
            <a className="text-white " href="/marketplace">
              Discover Subscriptions
            </a>
            <a className="text-white " href="#">
              About Us
            </a>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full bg-amber-500 hover:bg-amber-600  ">
                <User className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Manage Subscription</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
        </>
      ) : (
        <>
          <div className="flex ml-auto mr-8 space-x-7">
            <a className="text-white " href="/marketplace">
              Discover Subscriptions
            </a>
            <a className="text-white " href="#">
              About Us
            </a>
          </div>

          <Link href="/get-started">
            <Button className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition duration-300">
              Get Started
            </Button>
          </Link>
        </>
      )}
    </nav>
  );
}

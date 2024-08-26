'use client'
import React from "react";
import Navbar from "@/components/custom-components/Navbar";
import { useSession } from "@/context/SessionContext";
function page(){
    const {sessionInfo, setSessionInfo} = useSession();

    // console.log(sessionInfo);
    
    return (
        <>
        <Navbar />
        <h1>Dashboard Page</h1>
        </>
    )
}

export default page;


import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/libs/dbConnect";


export async function POST(request: NextRequest){
    await dbConnect();
    try {
        
    } catch (error) {
        
    }
}
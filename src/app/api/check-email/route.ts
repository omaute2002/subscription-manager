import mongoose from "mongoose";
import dbConnect from "@/libs/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  
  try {
    // Directly destructure email from req.body
    const { email } = await req.json();

    
    // Check if user exists and is verified
    const isUserExists = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (!isUserExists) {
     return NextResponse.json({
        success: false,
        message:"User does not exists"
     }, {status:404})
    }

    return NextResponse.json({
      success: true,
      message: "Email found, login",
    },{status:200});
  } catch (error) {
    console.error("Error while finding email", error);
    return NextResponse.json({
      success: false,
      message: "Error while searching email id",
    }, {status:500});
  }
}

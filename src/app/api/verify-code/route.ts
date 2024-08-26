import mongoose from "mongoose"
import dbConnect from "@/libs/dbConnect"
import UserModel from "@/model/User"
import { NextResponse } from "next/server"

export async function POST(request: Request){
    dbConnect();
    try {
        const {email, code} = await request.json();
    
        // Decoding the username 
        const decodedUser =  decodeURIComponent(email);
        const user = await UserModel.findOne({email:decodedUser});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not found"
            },{status:404})
        }

        const isCodeMatch = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verificationExpiry) > new Date();
        if(isCodeMatch && isCodeNotExpired){
            user.isVerified = true;
            await user.save();
            return NextResponse.json({
                success: true,
                message:"User Verified Successfully",
            }, {status:200})
        }else if(!isCodeNotExpired){
            return NextResponse.json({
                success: false,
                message: "Verification code is expired please sign up again"
            }, {status: 400})
        }else{
            return NextResponse.json({
                success: false,
                message:"Code is not valid, Please try again",
            }, {status:500})
        }


    } catch (error) {
        console.log("Error while Verifying the code", error);
        NextResponse.json({
            success:false,
            message:"Cannot verify the code"
        },{status:500});
    }
}
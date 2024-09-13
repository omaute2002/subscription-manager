import dbConnect from "@/libs/dbConnect";
import mongoose from "mongoose";
import OttPlatformModel from "@/model/OttPlatform";
import { NextRequest, NextResponse } from "next/server";

const adminEmail = process.env.ADMIN_EMAIL || "";
const adminPassword = process.env.ADMIN_PASSWORD || "";

export async function POST(request: NextRequest) {
  dbConnect();
  try {
    // Verufy the user is adding the ott platform
    const { email, password, name, description, logoUrl, website } = await request.json();
    const isValidEmail = email === adminEmail;
    const isPasswordCorrect = password === adminPassword;

    //Is admin then only add the OTT platform
    const lowerCaseName = name.toLowerCase();
    const isOttExists = await OttPlatformModel.findOne({lowerCaseName});
    if(isOttExists){
        return NextResponse.json({
            success: false,
          message: "ott platform already exists",
        }, {status: 409})
    }
    if (isValidEmail && isPasswordCorrect) {
      const newOttPlatform = new OttPlatformModel({
        name : lowerCaseName,
        description,
        logoUrl,
        website,
      });
      await newOttPlatform.save();
      return NextResponse.json(
        {
          success: true,
          message: "OTT Platform added successfully",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "User is not authorized to add OTT platform",
        },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.log("Error while adding the ott platform", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to add the new OTT platform",
      },
      {
        status: 500,
      }
    );
  }
}

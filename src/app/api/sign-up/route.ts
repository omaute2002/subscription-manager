import mongoose from "mongoose";
import dbConnect from "@/libs/dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/model/User";
import  sendVerificationEmail  from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    // Getting data form the body
    const { username, email, password, age } = await request.json();

    //Check if user by username exits already and it is verified
    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (existingUserVerifiedByEmail) {
      return Response.json(
        {
          success: false,
          message: "username is already taken",
        },
        { status: 400 }
      );
    }
    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "user already exist with the email",
          },
          { status: 500 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verificationExpiry = new Date(Date.now() + 36000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        age,
        isVerified: false,
        verifyCode,
        verificationExpiry: expiryDate,
        createdAt: new Date(),
      });

      await newUser.save();
    }
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message || "Failed to send email",
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered Successfully. Please verify code",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registring user", error);
    return Response.json(
      {
        success: false,
        message: "Error while registring the user",
      },
      { status: 500 }
    );
  }
}

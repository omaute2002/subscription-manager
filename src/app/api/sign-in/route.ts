import dbConnect from "@/libs/dbConnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs';
import { generateToken } from "@/libs/auth";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { email, password } = await request.json();

        const existingUserByEmail = await UserModel.findOne({ email });

        if (!existingUserByEmail) {
            return NextResponse.json({
                success: false,
                message: "User does not exist"
            }, { status: 404 });
        }

        if (!existingUserByEmail.isVerified) {
            return NextResponse.json({
                success: false, 
                message: "User is not verified"
            }, { status: 403 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUserByEmail.password);

        if (isPasswordCorrect) {
            const token = generateToken(existingUserByEmail);
            return NextResponse.json({
                success: true,
                message: "Login successful",
                token
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials"
            }, { status: 401 });
        }
    } catch (error) {
        console.error("Error while logging in", error);
        return NextResponse.json({
            success: false,
            message: "Error while logging in the user"
        }, { status: 500 });
    }
}

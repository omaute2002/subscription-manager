import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/libs/auth";
import { JwtPayload } from 'jsonwebtoken';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({
                success:false,
                message:"No token provided"})
        }
        const decoded = verifyToken(token);
        if(!decoded){
            return res.status(401).json({
                success:false,
                message:"invalid or expired token"
            })
        }

        (req as NextApiRequest & { user?: JwtPayload }).user = decoded;

        res.status(200).json({
            success:true,
            message:"This is a protected route"
        })
    } catch (error) {
        console.log("invalid or expired token", error)
    }
}
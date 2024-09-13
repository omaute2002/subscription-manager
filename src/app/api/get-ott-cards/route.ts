import dbConnect from "@/libs/dbConnect";
import PlanModel from "@/model/Plan";
import OttPlatformModel from "@/model/OttPlatform";
import {NextResponse, NextRequest} from "next/server"
import { validateJWT } from "@/libs/auth";

export async function GET(req: NextRequest){
    // const authHeader = req.headers.get("authorization");
    // // console.log(authHeader);
    // if(!authHeader || !authHeader.startsWith("Bearer ")){
    //     return NextResponse.json({
    //         success: false,
    //         message: "Unauthorized - No token provided",
    //     }, { status: 402 });
    // }

    // const token = authHeader.split(" ")[1];

    // const user = validateJWT(token);
    // if (!user) {
    //     return NextResponse.json({
    //         success: false,
    //         message: "Unauthorized",
    //     }, { status: 401 });
    // }

    await dbConnect();
    try{
        const platformCards = await OttPlatformModel.aggregate([
            {
                $lookup:{
                    from:"plans",
                    localField:"_id",
                    foreignField:"ottPlatform",
                    as:'plans',
                },

            },
            {
                $unwind:"$plans"
            },
            {
                $match:{
                    "plans.duration": "monthly"
                },
            },
            {
                $group:{
                    _id:"$_id",
                    name:{$first:"$name"},
                    logoUrl:{$first:"$logoUrl"},
                    minPrice:{$min:"$plans.price"}
                }
            },
            {
                $project:{
                    _id:0,
                    name:1,
                    logoUrl:1,
                    minPrice:1,
                },
            },
        ]);
        if(!platformCards){
            return NextResponse.json({
                success:false,
                message:"Failed to recieve the card information"
            },{status:500})
        }
        return NextResponse.json({
            success:true,
            message:"OTT card received successfully",
            platformCards
        })
    }catch(error){
        console.error("Error getting OTT Cards info", error);
        return NextResponse.json({
            success: false,
            message: "Error getting OTT Card info"
        }, { status: 500 });
    }
}
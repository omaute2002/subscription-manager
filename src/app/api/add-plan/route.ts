import dbConnect from "@/libs/dbConnect";
import PlanModel from "@/model/Plan";
import OttPlatformModel from "@/model/OttPlatform";
import { NextResponse, NextRequest } from "next/server";

const adminEmail = process.env.ADMIN_EMAIL || "";
const adminPassword = process.env.ADMIN_PASSWORD || "";

export async function POST(request: NextRequest) {
  dbConnect();
  try {
    const { email, password, name, price, duration, ottPlatform } =
      await request.json();

    const isValidEmail = email === adminEmail;
    const isPasswordCorrect = password === adminPassword;
    const existPlan = await PlanModel.findOne({ name });
    if (existPlan) {
      return NextResponse.json(
        {
          success: false,
          message: "Plan already Exists",
        },
        {
          status: 409,
        }
      );
    }

    if (isValidEmail && isPasswordCorrect) {
      // NOTE Search OTT platform and grab its id
      const loweredOttPlatform = ottPlatform.toLowerCase();
      const findOttPlatform = await OttPlatformModel.findOne({
        name: loweredOttPlatform,
      });
      if (!findOttPlatform) {
        return NextResponse.json({
          success: false,
          message: "Required OTT Platform does not exist",
        });
      }
      const ottPlatformId = findOttPlatform?._id;
      // console.log(ottPlatformId)
      const newPlan = new PlanModel({
        name,
        price,
        duration,
        ottPlatform: [ottPlatformId],
      });
      await newPlan.save();
      findOttPlatform.plans.push(newPlan._id);

      await findOttPlatform.save();

      return NextResponse.json({
        success: true,
        message: "plan added successfully to the desired OTT plartform",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "You are unAuthorized to add a plan",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log("Error while adding the plan platform", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to add the new plan",
      },
      {
        status: 500,
      }
    );
  }
}

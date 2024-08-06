import {resend} from "@/libs/resend";
import VerificationEmail from "../../emails/VerificationEmail";

export default async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string,
){
    try {
         await resend.emails.send({
            from:'onboarding@resend.dev',
            to:email,
            subject:"Welcome to PlanPilot | Verification code",
            react:VerificationEmail({username, otp:verifyCode})
         })       

         return{
            success:true,
            message:'Verification email sent successfully',
         }
    } catch (error) {
        console.error("Error while sending verification email", error);
        return{
            success:false,
            message:"failed to send verification email"
        }
    }
}
'use client'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

if(process.env.STRIPE_PUBLIC_KEY === undefined){
    throw new Error("Next stripe public is not defiend")
}

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY) ;
export default function page(){
    return (
        <>
        </>
    )
}

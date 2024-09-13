"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/custom-components/Navbar";
import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import { validateJWT } from "@/libs/auth";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import AutoPlay from "embla-carousel-autoplay";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import OttCard from "@/components/custom-components/OttCard";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Loader } from "next/dynamic";

function page() {
  const { sessionInfo, setSessionInfo } = useSession();
  const [ottCardDetails, setOttCardDetails] = useState([]);
  const router = useRouter();
  console.log(sessionInfo);
  const { toast } = useToast();
  // console.log(sessionInfo);
  const moviePosters = [
    "https://res.cloudinary.com/doahwwtrq/image/upload/v1724847531/vfknntfoogel2tmpy2tt.webp",
    "https://res.cloudinary.com/doahwwtrq/image/upload/v1724847532/eelqsc6mwa7prnd4frq0.jpg",
    "https://res.cloudinary.com/doahwwtrq/image/upload/v1724847531/voejdgf9ciiqafcul6l8.jpg",
    "https://res.cloudinary.com/doahwwtrq/image/upload/v1724847531/yyzuzrhvo9xrxiwy3okb.webp",
    "https://res.cloudinary.com/doahwwtrq/image/upload/v1724847531/ix2aa8xtzts0lysqe1q9.webp",
  ];
  const ottCardImages = new Map();
  ottCardImages.set(
    "disney+ hotstar",
    "https://res.cloudinary.com/dhmw8d3ka/image/upload/f_auto,q_auto,fl_lossy/v1724662456/D2C%20Merchants/Disney%20Hotstar/Hotstar_yzg1pw.webp"
  );
  ottCardImages.set(
    "netflix",
    "https://res.cloudinary.com/doahwwtrq/image/upload/v1725972201/b3anhsgo8d77w067qvhn.jpg"
  );
  ottCardImages.set(
    "prime videos",
    "https://res.cloudinary.com/dhmw8d3ka/image/upload/f_auto,q_auto,fl_lossy/v1724662316/D2C%20Merchants/Amazon%20Prime/Amazon_1_zorl7t.webp"
  );
  ottCardImages.set(
    "zee5",
    "https://res.cloudinary.com/dhmw8d3ka/image/upload/f_auto,q_auto,fl_lossy/v1724662558/D2C%20Merchants/Zee5/Zee5_z7ho42.webp"
  );
  ottCardImages.set(
    "sony liv",
    "https://res.cloudinary.com/dhmw8d3ka/image/upload/f_auto,q_auto,fl_lossy/v1724662508/D2C%20Merchants/Sonyliv/Sony_Liv_mozscj.webp"
  );
  // TODO: Get OTT CARD INFORMATION FROM THE FUNCTION
  async function getOTTCardDetails() {
    try {
      const token = localStorage.getItem("authToken");
      // console.log(token);
      const response = await axios.get("/api/get-ott-cards");
      console.log(response.status);
      if (response.data.success) {
        setOttCardDetails(response.data.platformCards);
      } else if (response.status === 401) {
        toast({
          title: "User logged out",
          description: "Login again",
          variant: "destructive",
        });
        router.push("/login");
      } else {
        toast({
          title: "Failed",
          description: "Error occured while getting OTT card",
          variant: "destructive",
        });
        console.log("Error while getting the OTT card details");
      }
    } catch (error) {
      console.log("Error getting the ott card details", error);
      toast({
        title: "Failed",
        description: "Error occured while getting OTT card",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    // const authToken = localStorage.getItem("authToken");

    // if (!authToken) {
    //   router.push("/"); // Redirect to home page if not authenticated
    // }
    getOTTCardDetails();
  }, []);

  return (
    <>
      <main className="bg-gray-900 text-white min-h-screen">
        {" "}
        {/* Dark background */}
        <Navbar />
        {/* Carousel */}
        <div className="w-full">
          <Carousel plugins={[AutoPlay({ delay: 2000 })]} className="w-full">
            <CarouselContent>
              {moviePosters.map((poster, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-gray-900 border-none h-auto">
                      <CardContent className="flex aspect-square items-center justify-center rounded-lg h-96 w-full">
                        <AspectRatio ratio={16 / 8} className="bg-muted">
                          <img
                            src={poster}
                            alt={`Movie Poster ${index + 1}`}
                            className="object-cover h-auto w-full"
                          />
                        </AspectRatio>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 bg-gray-900 text-white ml-36 mr-36 mt-10">
          <h1 className="text-2xl font-semibold">
            Explore all brands, {sessionInfo?.username}
          </h1>
          <div className="flex items-center space-x-4">
            {/* Replace with dynamic username */}
            <Search />
            <Input
              type="text"
              placeholder="Search OTT"
              className="px-8 py-1.5 rounded-lg bg-gray-800 text-white border border-gray-700 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center ml-52 mr-36  bg-gray-900 ">
          {ottCardDetails.length > 0 ? (
            ottCardDetails.map((eachCard, index) => {
              let cardImage = "";
              switch (eachCard.name) {
                case "netflix":
                  cardImage = ottCardImages.get("netflix");
                  break;
                case "prime videos":
                  cardImage = ottCardImages.get("prime videos");
                  break;
                case "sony liv":
                  cardImage = ottCardImages.get("sony liv");
                  break;
                case "disney+ hotstar":
                  cardImage = ottCardImages.get("disney+ hotstar");
                  break;
                case "zee5":
                  cardImage = ottCardImages.get("zee5");
                  break;
                default:
                  cardImage = "asd";
                  break;
              }

              return (
                <OttCard
                  key={index}
                  name={eachCard.name}
                  cardImage={cardImage}
                  logoUrl={eachCard.logoUrl}
                  minPrice={eachCard.minPrice}
                />
              );
            })
          ) : (
            <>
              <div className="flex sm:flex-wrap items-center  mr-36 space-x-5 mt-5 space-y-5  bg-gray-900 pb-20">
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-64 rounded-xl bg-slate-700" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]  bg-slate-700" />
                    <Skeleton className="h-4 w-[200px]  bg-slate-700" />
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-64 rounded-xl bg-slate-700" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]  bg-slate-700" />
                    <Skeleton className="h-4 w-[200px]  bg-slate-700" />
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-64 rounded-xl bg-slate-700" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]  bg-slate-700" />
                    <Skeleton className="h-4 w-[200px]  bg-slate-700" />
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-64 rounded-xl bg-slate-700" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]  bg-slate-700" />
                    <Skeleton className="h-4 w-[200px]  bg-slate-700" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default page;

"use client";
import react from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OttCard({name, cardImage, logoUrl, minPrice}) {
  return (
    <>
      <Card className="bg-gray-900 border-none h-full w-64">
        <CardHeader>
          <img
            src={cardImage}
            alt="prime-video-cover"
            className="w-full h-25 rounded-sm"
          />
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            {/* Logo on the left */}
            <div className="flex-shrink-0">
              <img

                src={logoUrl}
                alt="Prime-video-logo"
                className="h-12 w-12 ml-2"
              />
            </div>

            {/* OTT name and price on the right */}
            <div className="flex flex-col mr-4 w-max">
              <span className="text-lg ml-4 font-semibold text-white">{name}</span>
              <span className="text-sm ml-4 text-gray-300">{minPrice}/month</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

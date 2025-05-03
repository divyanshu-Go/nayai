"use client";
import React from "react";
import { BadgeCheck, CircleUserRound, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LawyerCard = ({ lawyer }) => {
  if (!lawyer) return null;

  return (
    <Link href={`/consult-lawyer/${lawyer._id}`} className="block w-full">
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        {/* Profile Photo */}
        <div className="w-full md:w-32 h-32 relative">
          {lawyer.profilePhoto ? (
            <Image
              src={lawyer.profilePhoto}
              alt={lawyer.name}
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold uppercase">
              {lawyer.name?.[0]}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-blue-800">
              {lawyer.name}
            </h3>
            {lawyer.isVerified && (
              <span className="text-green-600" title="Verified Lawyer">
                <BadgeCheck className="w-5 h-5" />
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600">
            {lawyer.bio || "No bio available."}
          </p>

          <div className="flex flex-wrap gap-2 text-sm text-blue-700 font-medium">
            {lawyer.expertise?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="text-sm text-gray-700 space-y-1">
            {lawyer.experienceYears !== undefined && (
              <p>
                <CircleUserRound className="inline-block w-4 h-4 mr-1 text-blue-500" />
                {lawyer.experienceYears} year
                {lawyer.experienceYears > 1 ? "s" : ""} experience
              </p>
            )}
            {lawyer.availability && (
              <p>
                <Clock className="inline-block w-4 h-4 mr-1 text-blue-500" />
                Available: {lawyer.availability}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LawyerCard;

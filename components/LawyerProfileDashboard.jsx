"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, Edit, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import Loader from "./Loader";

const Label = ({ title, value }) => (
  <div>
    <p className="text-sm text-blue-900">{title}</p>
    <p className="text-base font-semibold text-blue-700">{value || "—"}</p>
  </div>
);

const LawyerProfileDashboard = ({ lawyer, handleLogout, loading }) => {
  const router = useRouter();

  if (loading || !lawyer) return <Loader text="Loading Profile" />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-1">
          Lawyer Dashboard
        </h1>
        <p className="text-sm text-blue-600 mb-6">
          Manage your profile and appointments
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full bg-blue-100 overflow-hidden flex items-center justify-center">
          {lawyer.profilePhoto ? (
            <img
              src={lawyer.profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-blue-400 text-4xl font-bold uppercase">
              {lawyer.name[0]}
            </div>
          )}
        </div>

        {/* Name & Bio */}
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-800">{lawyer.name}</h2>
          <p className="text-blue-600">{lawyer.bio || "No bio provided."}</p>
          <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {lawyer.role}
          </span>
          {lawyer.isVerified && (
            <span className="ml-2 inline-block text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
        <Label title="Email" value={lawyer.email} />
        <Label title="Phone" value={lawyer.phone} />
        <Label title="Gender" value={lawyer.gender} />
        <Label title="Age" value={lawyer.age} />
        <Label title="Location" value={lawyer.location} />
        <Label title="Languages" value={lawyer.languages?.join(", ")} />
        <Label title="Expertise" value={lawyer.expertise?.join(", ")} />
        <Label title="Experience (Years)" value={lawyer.experienceYears} />
        <Label title="Registration No" value={lawyer.RegistrationNo} />
        <Label title="Categories" value={lawyer.category?.join(", ")} />
        <Label title="Availability" value={lawyer.availability} />
        <Label
          title="Joined On"
          value={format(new Date(lawyer.createdAt), "MMMM dd, yyyy")}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 pt-4 border-t">
        <button
          onClick={() => router.push("/lawyer/profile/edit")}
          className="bg-white border border-blue-500 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
        >
          <Edit className="inline-block w-4 h-4 mr-2" />
          Edit Profile
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          <LogOut className="inline-block w-4 h-4 mr-2" />
          Logout
        </button>

        <button
          onClick={() => router.push("/lawyer/appointments")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <CalendarDays className="inline-block w-4 h-4 mr-2" />
          View Appointments
        </button>
      </div>
    </div>
  );
};

export default LawyerProfileDashboard;

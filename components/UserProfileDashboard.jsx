"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, Edit, Bookmark } from "lucide-react";
import { format } from "date-fns";
import Loader from "./Loader"; 

const Label = ({ title, value }) => (
  <div>
    <p className="text-sm text-blue-900">{title}</p>
    <p className="text-base font-semibold text-blue-700">{value || "—"}</p>
  </div>
);

const UserProfileDashboard = ({ user, handleLogout, loading }) => {
  const router = useRouter();

  if (loading || !user) return <Loader text="Loading Profile" />;

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-2xl shadow-md space-y-6">
      {/* Name and Basic Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* User Avatar */}
        <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl font-bold uppercase">
          {user.name?.[0]}
        </div>

        {/* Name + Role */}
        <div className="flex-1 space-y-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-800">{user.name}</h2>
          <p className="text-blue-600">{user.profession || "No profession added"}</p>
          <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {user.role}
          </span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
        <Label title="Email" value={user.email} />
        <Label title="Gender" value={user.gender} />
        <Label title="Age" value={user.age} />
        <Label title="Region" value={user.region} />
        <Label title="Religion" value={user.religion} />
        <Label title="Profession" value={user.profession} />
        {/* <Label
          title="Saved Articles"
          value={user.savedArticles?.length ? `${user.savedArticles.length} articles` : "None"}
        /> */}
        <Label title="Joined On" value={format(new Date(user.createdAt), "MMMM dd, yyyy")} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 pt-4 border-t">
        <button
          onClick={() => router.push("/user/profile/edit")}
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
          onClick={() => router.push("/user/appointments")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Bookmark className="inline-block w-4 h-4 mr-2" />
          Appointments
        </button>
      </div>
    </div>
  );
};

export default UserProfileDashboard;

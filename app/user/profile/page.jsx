"use client";

import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import UserProfileDashboard from "@/components/UserProfileDashboard";
import { useRouter } from "next/navigation";
import axios from "axios";
import UserAppointmentsDashboard from "@/components/UserAppointmentDashboard";

const UserProfilePage = () => {
  const router = useRouter();
  const { user, userLoading, fetchUser } = useUser();

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/user/auth/logout");
      if (res.status === 200) {
        fetchUser();
        router.push("/login");
      } else {
        console.error("Logout failed:", res.data);
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <UserProfileDashboard
        user={user}
        handleLogout={handleLogout}
        loading={userLoading}
      />

      <UserAppointmentsDashboard />
    </div>
  );
};

export default UserProfilePage;

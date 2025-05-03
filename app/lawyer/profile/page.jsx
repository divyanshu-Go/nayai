"use client"

import LawyerProfileDashboard from '@/components/LawyerProfileDashboard'
import { useLawyer } from '@/context/LawyerContext'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import React from 'react'

const LawyerProfile = () => {
    const router = useRouter()
    const {loggedinLawyer, lawyerLoading, fetchLoggedinLawyer} = useLawyer();
    console.log(loggedinLawyer?.name)
    const handleLogout= async()=>{
        try {
            const res = await axios.post("/api/lawyer/auth/logout");
            if(res.status == 200 ){
              fetchLoggedinLawyer();
                router.push("/lawyer/login")
            } else {
                console.error("Logout failed:", res.data);
            }
        } catch (error) {
            console.error("Logout error:", error.response?.data || error.message);
        }

    }

  return (
    <div>
      <LawyerProfileDashboard lawyer={loggedinLawyer} handleLogout={handleLogout} loading={lawyerLoading}/>
    </div>
  )
}

export default LawyerProfile

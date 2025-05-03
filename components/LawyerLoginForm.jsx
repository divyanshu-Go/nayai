"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLawyer } from "@/context/LawyerContext";
import {FormInput, AuthButton} from './LawyerSignupForm'

export const LawyerLoginForm = () => {
  const router = useRouter();
  const {fetchLoggedinLawyer} = useLawyer();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/lawyer/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      fetchLoggedinLawyer();
      router.push("/lawyer/profile");
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-blue-200 shadow-md rounded-lg mx-auto my-16 max-w-[800px] w-full px-8 py-6">
      <h2 className="text-3xl text-center font-semibold text-blue-800 mb-6">
        Lawyer Login
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          error={errors.email}
        />

        <FormInput
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={errors.password}
        />

        {errors.submit && (
          <div className="px-4 py-2 bg-red-100 text-red-600 rounded-md text-sm">
            {errors.submit}
          </div>
        )}

        <AuthButton isLoading={isLoading}>Log In</AuthButton>

        <p className="text-center text-sm font-normal text-gray-600">
          Don&apos;t have a lawyer account?{" "}
          <Link
            href="/lawyer/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

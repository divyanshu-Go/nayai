"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useLawyer } from "@/context/LawyerContext";

const categories = [
  "Employment Rights",
  "Housing & Tenant Rights",
  "Consumer Protection",
  "Women's Rights",
  "Senior Citizen Rights",
  "LGBTQ+ Rights",
  "SC/ST/OBC Rights",
  "Cyber Laws",
  "Marriage & Family Laws",
  "Criminal Law Basics",
  "RTI & Citizen Rights",
  "Property & Inheritance Laws",
  "Religious & Personal Laws",
  "Legal Aid & Procedure",
];

export const AuthButton = ({ children, isLoading }) => (
  <button
    type="submit"
    className="w-full bg-blue-600 text-white font-semibold text-sm py-2.5 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-70"
    disabled={isLoading}
  >
    {isLoading ? (
      <div className="flex items-center justify-center gap-2">
        Please wait <LoaderCircle className="animate-spin h-4 w-4" />
      </div>
    ) : (
      children
    )}
  </button>
);

export const FormInput = ({ label, type = "text", value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-gray-800">{label}</label>
        {error && (
          <p className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded">
            {error}
          </p>
        )}
      </div>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type }
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2.5 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export const LawyerSignupForm = () => {
  const router = useRouter();
  const { fetchLoggedinLawyer } = useLawyer();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    languages: "",
    expertise: "",
    experienceYears: "",
    RegistrationNo: "",
    gender: "",
    age: "",
    category: [],
    bio: "",
    availability: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "email",
      "password",
      "confirmPassword",
      "phone",
      "location",
      "languages",
      "expertise",
      "experienceYears",
      "RegistrationNo",
      "gender",
      "age",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = "Required";
    });

    if (formData.password && formData.password.length < 8)
      newErrors.password = "Min 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/lawyer/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          languages: formData.languages.split(",").map((s) => s.trim()),
          expertise: formData.expertise.split(",").map((s) => s.trim()),
          category: formData.category,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Signup failed");
      fetchLoggedinLawyer();
      router.push("/");
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto my-12 w-full max-w-3xl bg-white shadow-md rounded-xl p-8 border border-blue-100">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Lawyer Signup
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <FormInput
          label="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        <FormInput
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />
        <FormInput
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
        />
        <FormInput
          label="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          error={errors.location}
        />
        <FormInput
          label="Languages (comma-separated)"
          value={formData.languages}
          onChange={(e) =>
            setFormData({ ...formData, languages: e.target.value })
          }
          error={errors.languages}
        />
        <FormInput
          label="Expertise (comma-separated)"
          value={formData.expertise}
          onChange={(e) =>
            setFormData({ ...formData, expertise: e.target.value })
          }
          error={errors.expertise}
        />
        <FormInput
          label="Years of Experience"
          type="number"
          value={formData.experienceYears}
          onChange={(e) =>
            setFormData({ ...formData, experienceYears: e.target.value })
          }
          error={errors.experienceYears}
        />
        <FormInput
          label="Registration Number"
          value={formData.RegistrationNo}
          onChange={(e) =>
            setFormData({ ...formData, RegistrationNo: e.target.value })
          }
          error={errors.RegistrationNo}
        />
        <div className=" space-y-1">
          <label className="text-sm font-semibold text-gray-800">Gender</label>
          <div className="flex gap-3">
            {["Male", "Female", "Other"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormData({ ...formData, gender: option })}
                className={`px-4 py-2 rounded-md text-sm font-medium border ${
                  formData.gender === option
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300"
                } hover:bg-blue-50`}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.gender && (
            <p className="text-xs text-red-600 bg-red-100 inline-block mt-1 px-2 py-0.5 rounded">
              {errors.gender}
            </p>
          )}
        </div>
        <FormInput
          label="Age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          error={errors.age}
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
        <FormInput
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          error={errors.confirmPassword}
        />

        <div className="col-span-full space-y-1">
          <label className="text-sm font-semibold text-gray-800 ">
            Select Categories
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const isSelected = formData.category.includes(cat);
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      category: isSelected
                        ? prev.category.filter((c) => c !== cat)
                        : [...prev.category, cat],
                    }));
                  }}
                  className={`px-3 py-2 text-sm rounded-md border transition ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300"
                  } hover:bg-blue-50`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          {errors.category && (
            <p className="text-xs text-red-600 mt-1 bg-red-100 inline-block px-2 py-0.5 rounded">
              {errors.category}
            </p>
          )}
        </div>

        <div className="col-span-full">
          <label
            htmlFor="bio"
            className="block text-sm font-semibold text-gray-800 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell us about your background, values, or legal approach..."
            className="w-full px-4 py-2.5 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        {errors.submit && (
          <div className="col-span-full px-3 py-2 bg-red-100 text-red-600 rounded-md text-sm">
            {errors.submit}
          </div>
        )}

        <div className="col-span-full mt-4">
          <AuthButton isLoading={isLoading}>Register</AuthButton>
        </div>
        <p className="col-span-full text-center text-sm font-normal text-gray-600 ">
          Already have an account?{" "}
          <Link
            href="/lawyer/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

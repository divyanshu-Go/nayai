import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";

// Button component
const AuthButton = ({ children, isLoading }) => (
  <button
    className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md font-medium text-sm hover:bg-blue-700 transition-all disabled:opacity-70"
    disabled={isLoading}
  >
    {isLoading ? (
      <div className="flex items-center justify-center gap-2">
        Please wait
        <LoaderCircle className="h-4 w-4 animate-spin" />
      </div>
    ) : (
      children
    )}
  </button>
);

// Input field
const FormInput = ({ label, type, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-800">{label}</label>
        {error && (
          <p className="text-xs font-medium bg-red-100 py-1 px-2 rounded text-red-600">
            {error}
          </p>
        )}
      </div>
      <div className="relative">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2.5 rounded-md border text-sm focus:outline-none transition-all ${
            error
              ? "border-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-blue-400"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

// Login form
export const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
    const { fetchUser } = useUser();
  

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
      const response = await fetch("/api/user/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      fetchUser();

      if (data.user.role === "admin") {
        router.push('/admin-profile');
      } else {
        router.push('/'); 
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-blue-200 shadow-md rounded-lg mx-auto my-16 max-w-[800px] w-full px-8 py-6">
      <h2 className="text-3xl text-center font-semibold text-blue-800 mb-6">
        Welcome Back
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
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};


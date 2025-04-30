import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";

// Auth button
const AuthButton = ({ children, isLoading }) => (
  <button
    className="w-full bg-blue-600 text-white font-semibold text-sm py-2.5 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-70"
    disabled={isLoading}
  >
    {isLoading ? (
      <div className="flex items-center justify-center gap-2">
        Please wait
        <span className="animate-spin">
          <LoaderCircle className="h-4 w-4" />
        </span>
      </div>
    ) : (
      children
    )}
  </button>
);

// Input field with label and validation
const FormInput = ({ label, type, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-gray-800">{label}</label>
        {error && (
          <p className="text-xs bg-red-100 px-2 py-1 rounded text-red-600 font-medium">
            {error}
          </p>
        )}
      </div>
      <div className="relative">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
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
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
    const { fetchUser } = useUser();
  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/user/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      fetchUser();

      router.push('/');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto my-12 w-full max-w-lg bg-white shadow-md rounded-xl p-8 border border-blue-100">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Join Nayai
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />

        <FormInput
          label="Email Address"
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

        <FormInput
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          error={errors.confirmPassword}
        />

        <p className="text-sm text-gray-500">
          Password must contain at least 8 characters.
        </p>

        {errors.submit && (
          <div className="px-3 py-2 bg-red-100 text-red-600 rounded-md text-sm">
            {errors.submit}
          </div>
        )}

        <AuthButton isLoading={isLoading}>Sign Up</AuthButton>

        <p className="text-center text-sm text-gray-600 mt-2">
          Already registered?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

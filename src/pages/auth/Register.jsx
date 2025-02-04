import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css"; // Import Font Awesome Icons
import backgroundImage from "../../assets/library_background_resized.png"; // Import image

// Validation schema
const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email!!!" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();
  const [passwordScore, setPasswordScore] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    const password = watch().password || "";
    return zxcvbn(password).score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch("password")]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://book-store-api-coral.vercel.app/api/register", data);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg || "Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // ใช้ภาพเดียวกับหน้า Login
      }}
    >
      <div
        className="w-full shadow-md p-8 max-w-md rounded"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 className="text-3xl text-center my-4 font-bold">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                {...register("email")}
                placeholder="Enter your email"
                className={`border w-full px-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email && "border-red-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
                <i className="fa fa-lock"></i>
              </span>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password (min 6 characters)"
                className={`border w-full px-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password && "border-red-500"
                }`}
              />
              <span
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fa fa-eye-slash"></i>
                ) : (
                  <i className="fa fa-eye"></i>
                )}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
                <i className="fa fa-lock"></i>
              </span>
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className={`border w-full px-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword && "border-red-500"
                }`}
              />
              <span
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <i className="fa fa-eye-slash"></i>
                ) : (
                  <i className="fa fa-eye"></i>
                )}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-full font-bold hover:bg-blue-600 shadow"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Section */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <button
            className="text-red-500 hover:text-red-700 font-medium mt-2"
            onClick={() => navigate("/login")}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

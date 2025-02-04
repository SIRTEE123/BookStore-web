import React, { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/library_background_resized.png"; // นำเข้าภาพพื้นหลัง

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  console.log("user from zustand", user);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Welcome Back!");
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg || "Login failed. Please try again.");
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center font-sans"
      style={{
        backgroundImage: `url(${backgroundImage})`, // ใช้ภาพที่นำเข้า
      }}
    >
      <div
        className="w-full shadow-md p-8 max-w-md rounded"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 className="text-2xl text-center my-4 font-bold text-gray-700">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
                <i className="fas fa-user"></i>
              </span>
              <input
                placeholder="Enter your email"
                className="border w-full px-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleOnChange}
                name="email"
                type="email"
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
                <i className="fas fa-lock"></i>
              </span>
              <input
                placeholder="Enter your password"
                className="border w-full px-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleOnChange}
                name="password"
                type={showPassword ? "text" : "password"}
              />
              <span
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </span>
            </div>

            <button
              className="bg-blue-500 rounded-full w-full text-white font-bold py-3 shadow hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            className="text-red-500 hover:text-red-700 font-medium mt-2"
            onClick={navigateToRegister}
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

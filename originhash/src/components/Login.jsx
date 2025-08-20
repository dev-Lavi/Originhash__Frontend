import { FaUser, FaLock } from "react-icons/fa";
import illustration from "../assets/illustarion.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import axiosInstance from '../api/axiosInstance';


const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");

  // State hooks for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);

  // Submit handler
const handleSubmit = async (e) => { 
  e.preventDefault();

  if (lockoutTime && Date.now() < lockoutTime) {
    toast.error("Login disabled for 1 hour due to too many failed attempts.");
    return;
  }

  if (!email || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  const payload = { email, password };

  try {
    setLoading(true);

    const res = await axiosInstance.post("/api/v1/users/login", payload);
    const { token, user } = res.data;

    if (token) {
      localStorage.setItem("authToken", token);
      toast.success("Login successful!");
      setWrongAttempts(0);
      setLockoutTime(null);
      setTimeout(() => {
        navigate("/services");
      }, 1000);
    } else {
      setWrongAttempts(prev => {
        const attempts = prev + 1;
        if (attempts >= 5) {
          setLockoutTime(Date.now() + 60 * 60 * 1000); // 1 hour lockout
          toast.error("Too many attempts. Login disabled for 1 hour.");
        }
        return attempts;
      });
      toast.error("Login failed.");
    }
  } catch (err) {
    setWrongAttempts(prev => {
      const attempts = prev + 1;
      if (attempts >= 5) {
        setLockoutTime(Date.now() + 60 * 60 * 1000); // 1 hour lockout
        toast.error("Too many attempts. Login disabled for 1 hour.");
      }
      return attempts;
    });
    toast.error(err.response?.data?.message || "Login failed.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6C4CFF]/50 to-[#edeef7]/60 p-4 relative">
      {/* Circles only visible on laptop/desktop */}
      <span className="forgot-circle absolute z-0"
        style={{
          width: '9vw',
          height: '9vw',
          minWidth: '60px',
          minHeight: '60px',
          maxWidth: '120px',
          maxHeight: '120px',
          borderRadius: '50%',
          background: 'white',
          opacity: 0.8,
          boxShadow: '0 0 40px 0 #e0e7ff',
          top: '19%',
          left: '15%',
          transform: 'translate(-110%, -110%)'
        }}
      ></span>
      <span className="forgot-circle absolute z-0"
        style={{
          width: '9vw',
          height: '9vw',
          minWidth: '60px',
          minHeight: '60px',
          maxWidth: '120px',
          maxHeight: '120px',
          borderRadius: '50%',
          background: '#735FFF',
          opacity: 0.7,
          boxShadow: '0 0 40px 0 #7568ff44',
          bottom: '19%',
          right: '15%',
          transform: 'translate(110%, 110%)'
        }}
      ></span>
      
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden relative z-10 mt-0 ">


                {/* Right Illustration Section */}
        <div className="bg-[#735fff] hidden md:flex items-center justify-center relative">
          <img
            src={illustration}
            alt="Illustration"
            className="w-[60%] max-w-md drop-shadow-xl rounded-2xl"
          />
        </div>

        {/* Left Form Section */}
        <div className="flex flex-col justify-center p-10">
          {/* Sign In / Sign Up Switch */}
          <div className="flex bg-gray-100 rounded-xl mb-8 w-full max-w-xs mx-auto">
            <button
              className={`flex-1 py-2 rounded-xl font-semibold transition ${
                activeTab === "signin"
                  ? "bg-white text-gray-900 shadow border border-gray-300"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("signin")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 rounded-xl font-semibold transition ${
                activeTab === "signup"
                  ? "bg-white text-gray-900 shadow border border-gray-300"
                  : "text-gray-400"
              }`}
              onClick={() => {
                setActiveTab("signup");
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">Welcome back!</h2>
          <p className="text-center text-gray-500 mb-6">
            Please enter your credentials to Login
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl">
              <FaUser className="text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                placeholder="Enter your Password"
                className="bg-transparent w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={
                loading ||
                (lockoutTime && Date.now() < lockoutTime) ||
                wrongAttempts >= 5
              }
              className="w-full bg-[#6C4CFF] hover:bg-[#5c3fe0] text-white py-3 rounded-xl shadow-md font-semibold transition"
            >
              {(lockoutTime && Date.now() < lockoutTime)
                ? "Login disabled for 1 hour"
                : wrongAttempts >= 5
                  ? "Too many attempts"
                  : loading
                    ? "Logging in..."
                    : "Login Now"}
            </button>
          </form>

          <div className="my-6 flex items-center justify-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 font-semibold text-gray-600 text-sm">
              Login with Others
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Login with google button */}
          <div className="space-y-3">
          <button
          onClick={() => {
          window.location.href = "https://originhash-backend.onrender.com/api/v1/auth/google";
          }}
          className="google-login-btn w-full border border-gray-300 flex items-center justify-center gap-3 py-2 rounded-xl hover:bg-gray-50 transition"
          >
          <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg"
          alt="Google"
          className="w-6 h-6"
         />
         <span className="text-base font-medium text-center">Login with Google</span>
          </button>
          </div>

          {/* Additional Links Section */}
          <div className="mt-8 flex flex-col items-center space-y-3">
            <button
              className="text-[#6C4CFF] font-semibold hover:underline transition"
              type="button"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot password?
            </button>
            <p className="text-gray-600">
              Don't have an account yet?
              <button
                className="ml-2 text-[#6C4CFF] font-semibold hover:underline transition"
                type="button"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </p>
          </div>
        </div>


      </div>
      <ToastContainer />
    </div>
    
  );
};

export default Login;

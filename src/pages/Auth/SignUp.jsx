import React, { useState } from "react";
import Passwordinput from "../../components/input/Passwordinput";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utilis/helper";
import axiosInstance from "../../utilis/axiosinstance";
import imageSrc from "../../assets/images/sea1.jpg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email,
        password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
        
        {/* Image Section */}
        <div className="w-full md:w-2/5 h-60 md:h-auto">
          <img
            src={imageSrc}
            alt="Signup visual"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-3/5 p-6 sm:p-10 md:p-16 flex items-center justify-center">
          <form onSubmit={handleSignUp} className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-cyan-600 mb-8 text-center">
              Create Account
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              className="mb-4 px-4 py-3 border rounded-full text-sm w-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="mb-4 px-4 py-3 border rounded-full text-sm w-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <Passwordinput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full mt-6 py-3 text-sm font-semibold text-white bg-cyan-500 rounded-full hover:bg-cyan-600 transition duration-300"
            >
              CREATE ACCOUNT
            </button>

            <p className="text-xs text-gray-400 text-center my-4">Or</p>

            <button
              type="button"
              className="w-full py-3 text-sm font-semibold text-cyan-500 border border-cyan-500 rounded-full hover:bg-cyan-50 transition duration-300"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

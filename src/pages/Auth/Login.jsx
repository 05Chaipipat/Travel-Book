import React, { useState } from "react";
import Passwordinput from "../../components/input/Passwordinput";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utilis/helper";
import axiosInstance from "../../utilis/axiosinstance";
import mou from "../../assets/images/mou.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Plase enter the password");
      return;
    }

    setError("");

    // Login api call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Handle successful login response
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
//     <div className="h-screen bg-cyan-300 overflow-hidden relative ">
//       <div className="container flex items-center justify-center mx-auto">
//         <div className="w-3/5 h-[90vh] flex items-end  bg-cover bg-center rounded-lg p-10 z-50 ">
//           <div>
//             <img src={mou} alt=""  className=""/>
//           </div>
//           <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
//             <form onSubmit={handleLogin}>
//               <h4 className="text-2xl font-semibold mb-7">Login</h4>

//               <input
//                 type="text"
//                 placeholder="Email"
//                 className="input-box"
//                 value={email}
//                 onChange={({ target }) => {
//                   setEmail(target.value);
//                 }}
//               />
//               <Passwordinput
//                 value={password}
//                 onChange={({ target }) => {
//                   setPassword(target.value);
//                 }}
//               />

//               {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

//               <button
//                 type="submit"
//                 className="w-full text-sm font-medium text-white bg-cyan-500 shadow-lg shadow-cyan-200/50 p-[10px] rounded-full my-1 hover:bg-cyan-100 hover:bg-cyan-500"
//               >
//                 LOGIN
//               </button>

//               <p className="text-xs text-slate-500 text-center my-4">Or</p>

//               <button
//                 type="submit"
//                 className="w-full text-sm font-medium text-white bg-cyan-500 shadow-lg shadow-cyan-200/50 p-[10px] rounded-full my-1 hover:bg-cyan-100 hover:bg-cyan-500"
//                 onClick={() => {
//                   navigate("/signUp");
//                 }}
//               >
//                 CREATE ACCOUNT
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
<div className="min-h-screen bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center p-4">
  <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
    
    {/* Image section - responsive positioning */}
    <div className="w-full md:w-2/5 h-60 md:h-auto">
      <img
        src={mou}
        alt="Login visual"
        className="w-full h-full object-cover object-center"
      />
    </div>

    {/* Login form section */}
    <div className="w-full md:w-3/5 p-6 sm:p-10 md:p-16 flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-cyan-600 mb-8 text-center">Welcome</h2>

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
          LOGIN
        </button>

        <p className="text-xs text-gray-400 text-center my-4">Or</p>

        <button
          type="button"
          className="w-full py-3 text-sm font-semibold text-cyan-500 border border-cyan-500 rounded-full hover:bg-cyan-50 transition duration-300"
          onClick={() => navigate("/signUp")}
        >
          CREATE ACCOUNT
        </button>
      </form>
    </div>
  </div>
</div>

  );
};

export default Login;

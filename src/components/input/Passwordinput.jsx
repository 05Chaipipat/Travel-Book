import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Passwordinput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsPassword(!isShowPassword);
  };
  return (
    <div className="flex items-center px-4 rounded-full text-sm w-full border ">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        type={isShowPassword ? "text" : "password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-cyan-500 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-cyan-500 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
};

export default Passwordinput;

import React from "react";

const EmptyCard = ({imgSrc, message}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 h-auto ">
      <img src={imgSrc} alt="No notes" className="w-1/4 max-w-xs sm:max-w-sm md:max-w-md" />

      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;

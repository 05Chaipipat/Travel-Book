import moment from "moment/moment";
import React from "react";
import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";

const TravelStoryCard = ({
  imgUrl,
  title,
  date,
  story,
  visitedLocation,
  isFavourite,
  onFavouriteClick,
  onClick,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer  m-5">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-40 sm:h-48 md:h-60 object-cover rounded-lg"
        onClick={onClick}
      />

      <button
        className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4"
        onClick={onFavouriteClick} // เพิ่ม onFavouriteClick เพื่อเรียกฟังก์ชันที่ส่งมาจาก props
      >
        <FaHeart
          className={`text-[22px] cursor-pointer hover:text-red-500 ${
            isFavourite ? "text-red-500" : "text-white"
          }`} // เปลี่ยนสีของหัวใจตามสถานะ isFavourite
        />
      </button>

      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3 ">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">
              {date && moment(date).isValid() ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-2">{story?.slice(0, 60)}</p>

        <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/70 rounded mt-3 px-2 py-1">
          <GrMapLocation className="text-sm" />
          {visitedLocation.map((item, index) =>
            visitedLocation.length == index + 1 ? `${item}` : `${item}`
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelStoryCard;

import moment from "moment";
import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";

const ViewTravelStory = ({
  storyInfo,
  onClose,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            <button
              className="flex items-center gap-1 text-xs font-medium bg-cyan-50 text-blue-500 shadow-cyan-100/0 border-cyan-100 hover:bg-blue-500 hover:text-white rounded px-3 py-[3px]"
              onClick={onEditClick}
            >
              <MdUpdate className="text-lg" /> Update Story
            </button>
            <button
              className="flex items-center gap-1 text-xs font-medium bg-rose-50  text-rose-500 shadow-rose-100/0 border-rose-100 hover:bg-rose-500 hover:text-white rounded px-3 py-[3px]"
              onClick={onDeleteClick}
            >
              <MdDeleteOutline className="text-lg" /> Delete
            </button>

            {/* <button className="flex items-center gap-1 text-xs font-medium bg-rose-50  text-rose-500 shadow-rose-100/0 border-rose-100 hover:bg-rose-500 hover:text-white rounded px-3 py-[3px] ">
                        <MdDeleteOutline className="text-xl "/> DELETE
                        </button> */}

            <button
              className="flex items-center gap-1 font-medium bg-cyan-50 text-blue-300 shadow-cyan-100/0 border border-cyan-100 hover:bg-red-500 hover:text-white rounded px-3 py-[3px]"
              onClick={onClose}
            >
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
          <h1 className="text-2xl text-slate-950">
            {storyInfo && storyInfo.title}
          </h1>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
            </span>

            <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1">
              <GrMapLocation className="text-sm" />
              {storyInfo &&
                storyInfo.visitedLocation.map((item, index) =>
                  storyInfo.visitedLocation.length === index + 1
                    ? `${item}`
                    : `${item},`
                )}
            </div>
          </div>
        </div>
        <img
          src={storyInfo && storyInfo.imageUrl}
          alt="Selected"
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <div className="mt-4">
                <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">{storyInfo.story}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;

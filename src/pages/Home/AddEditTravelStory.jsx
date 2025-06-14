import React, { useState } from "react";
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";
import DateSelector from "../../components/input/DateSelector";
import ImageSelector from "../../components/input/ImageSelector";
import TagInput from "../../components/input/TagInput";
import axiosInstance from "../../utilis/axiosinstance";
import moment from "moment";
import uploadImage from "../../utilis/uploadImage";
import { toast } from "react-toastify";
import axios from "axios";

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [title, settitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setVisitedlocation] = useState(
    storyInfo?.visitedLocation || []
  );
  const [visitedDate, setVisitedDate] = useState(
    storyInfo?.visitedDate || null
  );

  const [error, setError] = useState("");

  // Add new Travel story
  const addNewTravelStory = async () => {
    try {
      let imageUrl = "";
      // Upload image if present
      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg);
        // Get image url
        imageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post("/add-travel-story", {
        title,
        story,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      });

      if (response.data && response.data.story) {
        toast.success("Story Added Successfully");
        // Refresh Story
        getAllTravelStories();
        // Close modal or form
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        // Handle unexpected errors
        setError("An unexpected error occurred. Please try again");
      }
    }
  };

  // Update Travel story
  const updateTravelStory = async () => {
    const storyId = storyInfo._id;

    try {
      let imageUrl = "";

      let postData = {
        title,
        story,
        imageUrl: storyInfo.imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
      };

      if (typeof storyImg === "object") {
        // UPLOAD new image
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || "";

        postData = {
          ...postData,
          imageUrl: imageUrl,
        };
      }

      const response = await axiosInstance.put(
        "/edit-story/" + storyId,
        postData
      );

      if (response.data && response.data.story) {
        toast.success("Story Update Successfully");
        // Refresh Story
        getAllTravelStories();
        // Close modal or form
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        // Handle unexpected errors
        setError("An unexpected error occurred. Please try again");
      }
    }
  };

  const handleAddOrUpdateClick = () => {
    console.log("Input Data:", {
      title,
      storyImg,
      story,
      visitedLocation,
      visitedDate,
    });
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!story) {
      setError("Please enter the story");
      return;
    }
    setError("");

    if (type === "edit") {
      updateTravelStory();
    } else {
      addNewTravelStory();
    }
  };
  // Delect imgae and update story
  const handleDeleteStoryImg = async () => {
    // Deleting the Image
    const deleteImgRes = await axiosInstance.delete("/delete-image", {
      params: {
        imageUrl: storyInfo.imageUrl,
      },
    });
    if (deleteImgRes.data) {
      const storyId = storyInfo._id;

      const postData = {
        title,
        story,
        visitedLocation,
        visitedDate: moment().valueOf(),
        imageUrl: "",
      };

      // Updating story
      const response = await axiosInstance.put(
        "/edit-story/" + storyId,
        postData
      );
      setStoryImg(null);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button
                className="flex items-center bg-cyan-50 text-blue-600 justify-center rounded-xl "
                onClick={handleAddOrUpdateClick}
              >
                <MdAdd className="text-lg" />
                Add Story
              </button>
            ) : (
              <>
                <button
                  className="flex items-center gap-1 text-xs font-medium bg-cyan-50 text-blue-500 shadow-cyan-100/0 border-cyan-100 hover:bg-blue-500 hover:text-white rounded px-3 py-[3px]"
                  onClick={handleAddOrUpdateClick}
                >
                  <MdUpdate className="text-lg" /> Add Story
                </button>

                {/* <button className="flex items-center gap-1 text-xs font-medium bg-rose-50  text-rose-500 shadow-rose-100/0 border-rose-100 hover:bg-rose-500 hover:text-white rounded px-3 py-[3px] ">
                <MdDeleteOutline className="text-xl "/> DELETE
                </button> */}
              </>
            )}

            <button
              className="flex items-center gap-1 font-medium bg-cyan-50 text-blue-300 shadow-cyan-100/0 border border-cyan-100 hover:bg-red-500 hover:text-white rounded px-3 py-[3px]"
              onClick={onClose}
            >
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="text-xs text-slate-400">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="A Day at the Great Wall"
            value={title}
            onChange={({ target }) => settitle(target.value)}
          />
          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector
            image={storyImg}
            setImage={setStoryImg}
            handleDeleteImg={handleDeleteStoryImg}
          />

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-xs text-slate-400">STORY</label>

            <textarea
              type="text"
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              placeholder="Your Story"
              rows={10}
              value={story}
              onChange={({ target }) => setStory(target.value)}
            />
          </div>

          <div className="pt-3">
            <label className="text-xs text-slate-400">VISITED LOCATIONS</label>
            <TagInput tags={visitedLocation} setTags={setVisitedlocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;

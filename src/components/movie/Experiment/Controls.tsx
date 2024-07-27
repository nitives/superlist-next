import React from "react";
import { VideoSeekSlider } from "react-video-seek-slider";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import "./control.css";

export const Controls = ({
  title,
  onPlayPause,
  currentTime,
  setCurrentTime,
  videoDuration,
  bufferTime,
  playing,
  toggleFullscreen,
}: {
  title: string;
  onPlayPause: () => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  videoDuration: number;
  bufferTime: number;
  playing: boolean;
  toggleFullscreen: () => void;
}) => {
  return (
    <div className="absolute bottom-0 top-0 right-0 left-0 z-10 flex flex-col justify-between p-4">
      <div className="flex justify-end space-x-2">
        <button className="">
          <MdFullscreen onClick={toggleFullscreen} color="white" size={24} />
        </button>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <button onClick={onPlayPause} className="p-2">
          {playing ? (
            <FaPause color="white" size={24} />
          ) : (
            <FaPlay color="white" size={24} />
          )}
        </button>
        <div className="w-full relative bottom-2">
          <VideoSeekSlider
            max={videoDuration * 1000} // Convert to milliseconds
            currentTime={currentTime * 1000} // Convert to milliseconds
            bufferTime={bufferTime * 1000} // Convert to milliseconds
            onChange={(time) => setCurrentTime(time / 1000)} // Convert from milliseconds
            secondsPrefix="00:00:"
            minutesPrefix="00:"
          />
        </div>
      </div>
      {/* <div className="flex justify-end space-x-2">
        <button className="bg-black bg-opacity-50 p-2 rounded-full">
          <FaShareAlt color="white" size={24} />
          <span className="text-white/25">Share</span>
        </button>
      </div> */}
    </div>
  );
};

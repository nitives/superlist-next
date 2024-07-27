import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { VideoSeekSlider } from "react-video-seek-slider";
import { FaPlay, FaPause } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";
import "./control.css";
import { motion } from "framer-motion";
import FullscreenIn from "./Icons/FullscreenIn";
import SkipForwards from "./Icons/SkipForwards";
import SkipBackwards from "./Icons/SkipBackwards";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullscreenOut from "./Icons/FullScreenOut";

export const Controls = ({
  timeOut,
  children,
  title,
  season,
  episode,
  episodeName,
  onPlayPause,
  currentTime,
  setCurrentTime,
  videoDuration,
  bufferTime,
  playing,
  toggleFullscreen,
  volume,
  setVolume,
}: {
  timeOut: number;
  children: React.ReactNode;
  title: string;
  season: string;
  episode: string;
  episodeName: string;
  onPlayPause: () => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  videoDuration: number;
  bufferTime: number;
  playing: boolean;
  toggleFullscreen: () => void;
  volume: number;
  setVolume: (value: number) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [showRemaining, setShowRemaining] = useState(false);
  const timerRef = useRef<number | undefined>();
  const idleTimerRef = useRef<number | undefined>();

  const formatTime = (seconds: number) => {
    const sign = seconds < 0 ? "-" : "";
    seconds = Math.abs(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const formattedH = h > 0 ? `${h}:` : "";
    const formattedM = h > 0 ? m.toString().padStart(2, "0") : m;
    const formattedS = s.toString().padStart(2, "0");
    return `${sign}${formattedH}${formattedM}:${formattedS}`;
  };

  const handle = useFullScreenHandle();

  const toggleTimeDisplay = () => {
    setShowRemaining(!showRemaining);
  };

  const handleSkipForwards = () => {
    setCurrentTime(Math.min(currentTime + 10, videoDuration));
  };

  const handleSkipBackwards = () => {
    setCurrentTime(Math.max(currentTime - 10, 0));
  };

  const hoverTimeOut = timeOut * 1000;

  useEffect(() => {
    if (visible) {
      clearTimeout(timerRef.current);
    } else {
      timerRef.current = setTimeout(() => setVisible(false), hoverTimeOut);
    }

    return () => clearTimeout(timerRef.current);
  }, [visible]);

  useEffect(() => {
    if (isIdle) {
      setVisible(false);
    }
  }, [isIdle]);

  const handleMouseEnter = () => {
    setVisible(true);
    clearTimeout(timerRef.current);
    clearTimeout(idleTimerRef.current);
    setIsIdle(false);
    idleTimerRef.current = setTimeout(() => setIsIdle(true), hoverTimeOut);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setVisible(false), hoverTimeOut);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.valueAsNumber;
    setVolume(newValue);
    document.documentElement.style.setProperty(
      "--seek-value",
      `${newValue * 100}%`
    );
    localStorage.setItem("videoVolume", newValue.toString());
  };

  const getPreviewScreenUrl = (hoverTimeValue: number) => {
    // Replace this with your logic to get the preview image URL based on the hover time
    return `https://via.placeholder.com/140x60?time=${hoverTimeValue}`;
  };

  return (
    <>
      {/* {children} */}
      <FullScreen handle={handle}>
        {children}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseEnter}
          className="size-full absolute bottom-0 top-0 right-0 left-0 z-10 flex flex-col justify-between p-4 text-[#fafafa] rounded-[14px]"
          style={{ height: "100%" }} // Ensure the div takes full height
        >
          <motion.div
            className="absolute bottom-0 top-0 right-0 left-0 z-10 flex flex-col justify-between p-4 rounded-[14px] bg-gradient-to-t to-30% from-[rgba(0,0,0,0.75)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end space-x-2">
              <div className="volume-container">
                <motion.input
                  whileHover={{ scaleY: 1.5 }}
                  whileTap={{ scaleY: 0.995 }}
                  className="apple-slider seek-slider"
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full h-[75%] z-10 relative">
              <motion.button
                className="p-2 z-20 relative"
                onClick={handleSkipBackwards}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <SkipBackwards color="white" size={24} />
              </motion.button>
              <motion.button
                className="p-2 z-20 relative"
                onClick={onPlayPause}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {playing ? (
                  <FaPause color="white" size={35} />
                ) : (
                  <FaPlay color="white" size={35} />
                )}
              </motion.button>
              <motion.button
                className="p-2 z-20 relative"
                onClick={handleSkipForwards}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <SkipForwards color="white" size={24} />
              </motion.button>
            </div>
            <div>
              <div className="w-full py-2 flex justify-between">
                <div>
                  {episodeName && (
                    <div>
                      <p className="text-sm">
                        S{season}, E{episode} · {episodeName}
                      </p>
                    </div>
                  )}
                  <p className="text-xl font-bold">{title}</p>
                </div>
                <div className="pr-2">
                  <button onClick={handle.active ? handle.exit : handle.enter}>
                    {handle.active ? (
                      <FullscreenOut color="white" size={16} />
                    ) : (
                      <FullscreenIn color="white" size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-4">
                <div className="w-full relative bottom-2">
                  <VideoSeekSlider
                    max={videoDuration * 1000} // Convert to milliseconds
                    currentTime={currentTime * 1000} // Convert to milliseconds
                    bufferTime={bufferTime * 1000} // Convert to milliseconds
                    onChange={(time) => setCurrentTime(time / 1000)} // Convert from milliseconds
                    secondsPrefix="00:00:"
                    minutesPrefix="00:"
                    getPreviewScreenUrl={getPreviewScreenUrl}
                  />
                </div>
              </div>
              <div className="w-full bg-red-500/0 pt-2 flex justify-between text-xs">
                <p>{formatTime(currentTime)}</p>
                <motion.div
                  className="select-none cursor-pointer w-12 text-end"
                  onClick={toggleTimeDisplay}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p>
                    {showRemaining
                      ? `-${formatTime(videoDuration - currentTime)}`
                      : `${formatTime(videoDuration)}`}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </FullScreen>
    </>
  );
};

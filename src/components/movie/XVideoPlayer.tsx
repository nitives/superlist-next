// "use client";
// import React, { useState, useRef, ChangeEvent, useEffect } from "react";
// import ReactPlayer from "react-player";
// import screenfull from "screenfull";
// import { FaPlay, FaPause } from "react-icons/fa";
// import { MdFullscreen } from "react-icons/md";
// import { motion } from "framer-motion";

// export default function XVideoPlayer({
//   className,
//   width,
//   height,
//   maxWidth,
//   url,
// }: {
//   className?: string;
//   width?: string;
//   height?: string;
//   maxWidth?: string;
//   url: string;
// }) {
//   const [videoSrc, setVideoSrc] = useState<string>(url);
//   const [playing, setPlaying] = useState<boolean>(false);
//   const [volume, setVolume] = useState<number>(0.8); // default volume set to 0.8
//   const [played, setPlayed] = useState<number>(0); // default played set to 0
//   const [duration, setDuration] = useState<number>(0); // duration of the video
//   const playerRef = useRef<ReactPlayer>(null);

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setVideoSrc(event.target.value);
//   };

//   const handlePlayPause = () => {
//     setPlaying((prevPlaying) => !prevPlaying);
//   };

//   const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const newValue = parseFloat(e.target.value);
//     if (playerRef.current) {
//       playerRef.current.seekTo(newValue);
//       setPlayed(newValue);
//       document.documentElement.style.setProperty(
//         "--seek-value",
//         `${newValue * 100}%`
//       );
//     }
//   };

//   const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const newValue = parseFloat(e.target.value);
//     setVolume(newValue);
//     document.documentElement.style.setProperty(
//       "--volume-value",
//       `${newValue * 100}%`
//     );
//   };

//   const handleFullscreen = () => {
//     if (screenfull.isEnabled && playerRef.current) {
//       screenfull.request(playerRef.current.wrapper);
//     }
//   };

//   const handleProgress = (state: { played: number }) => {
//     setPlayed(state.played);
//     document.documentElement.style.setProperty(
//       "--seek-value",
//       `${state.played * 100}%`
//     );
//   };

//   const handleDuration = (duration: number) => {
//     setDuration(duration);
//   };

//   const formatTime = (seconds: number) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = Math.floor(seconds % 60);
//     return hours > 0
//       ? `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
//           secs < 10 ? "0" : ""
//         }${secs}`
//       : `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   useEffect(() => {
//     document.documentElement.style.setProperty(
//       "--seek-value",
//       `${played * 100}%`
//     );
//   }, [played]);

//   useEffect(() => {
//     document.documentElement.style.setProperty(
//       "--volume-value",
//       `${volume * 100}%`
//     );
//   }, [volume]);

//   return (
//     <>
//       <div className={`${className}`} style={{ width: `${width}` }}>
//         <div className="flex fitfit">
//           <ReactPlayer
//             ref={playerRef}
//             url={videoSrc}
//             width="100%"
//             height="100%"
//             playing={playing}
//             volume={volume}
//             onPlay={() => console.log("onPlay")}
//             onPause={() => console.log("onPause")}
//             onProgress={handleProgress}
//             onDuration={handleDuration}
//           />
//         </div>
//         <div
//           style={{ width: `${width}`, bottom: `calc(${width}-440px` }}
//           className="fitfit relative bottom-[560px] px-2 py-2 bg-transparent aspect-video flex flex-col justify-between gap-2"
//         >
//           <motion.div
//             transition={{
//               duration: 0.25,
//               delay: 1,
//             }}
//             initial={{
//               opacity: 1,
//             }}
//             animate={{
//               opacity: 0,
//             }}
//             whileHover={{
//               opacity: 1,
//               transition: {
//                 delay: 0,
//                 duration: 0.25,
//               },
//             }}
//             className="flex justify-end items-center"
//           >
//             <div>
//               <motion.input
//                 whileHover={{ scaleY: 1.5 }}
//                 whileTap={{ scaleY: 0.995 }}
//                 className="apple-slider volume-slider !w-[100px]"
//                 type="range"
//                 min={0}
//                 max={1}
//                 step="any"
//                 value={volume} // ensure the slider reflects the current volume state
//                 onChange={handleVolumeChange}
//               />
//             </div>
//           </motion.div>
//           <div className="flex gap-2 justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full">
//             <button className="size-6" onClick={handlePlayPause}>
//               {playing ? (
//                 <motion.div
//                   transition={{
//                     duration: 0.25,
//                     delay: 1,
//                   }}
//                   initial={{
//                     opacity: 1,
//                   }}
//                   animate={{
//                     opacity: 0,
//                   }}
//                   whileHover={{
//                     opacity: 1,
//                     transition: {
//                       delay: 0,
//                       duration: 0.25,
//                     },
//                   }}
//                 >
//                   <FaPause className="size-full drop-shadow-sm" />
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   transition={{
//                     duration: 0.25,
//                     delay: 1,
//                   }}
//                   initial={{
//                     opacity: 1,
//                   }}
//                   animate={{
//                     opacity: 0,
//                   }}
//                   whileHover={{
//                     opacity: 1,
//                     transition: {
//                       delay: 0,
//                       duration: 0.25,
//                     },
//                   }}
//                 >
//                   <FaPlay className="size-full drop-shadow-sm" />
//                 </motion.div>
//               )}
//             </button>
//           </div>
//           <motion.div
//             transition={{
//               duration: 0.25,
//               delay: 1,
//             }}
//             initial={{
//               opacity: 1,
//             }}
//             animate={{
//               opacity: 0,
//             }}
//             whileHover={{
//               opacity: 1,
//               transition: {
//                 delay: 0,
//                 duration: 0.25,
//               },
//             }}
//           >
//             <div className="flex justify-end">
//               <button
//                 className="size-8 hover:bg-white/10 mx-2 p-1 rounded-full"
//                 onClick={handleFullscreen}
//               >
//                 <MdFullscreen className="size-full drop-shadow-sm" />
//               </button>
//             </div>
//             <motion.input
//               whileHover={{ scaleY: 1.5 }}
//               whileTap={{ scaleY: 0.995 }}
//               className="apple-slider seek-slider"
//               type="range"
//               min={0}
//               max={1}
//               step="any"
//               value={played} // ensure the slider reflects the current seek state
//               onChange={handleSeekChange}
//             />
//             <div className="flex justify-between text-xs select-none">
//               <p className="glow">{formatTime(played * duration)}</p>
//               <p className="glow">
//                 -{formatTime(duration - played * duration)}
//               </p>
//             </div>
//           </motion.div>
//         </div>

//         {/* <button onClick={handleFullscreen}>
//           <MdFullscreen />
//         </button> */}
//       </div>
//     </>
//   );
// }

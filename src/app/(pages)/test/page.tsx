"use client";
import React from "react";
import ReactPlayer from "react-player";

export default function Test() {
  const proxy = "https://cors.consumet.stream/";
  const url =
    "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8";
  console.log("URL:", proxy + url);
  return (
    <div className="pt-10 flex flex-col items-center justify-center gap-4">
      <p>Player</p>
      <ReactPlayer playing={true} controls={true} url={url} />
    </div>
  );
}

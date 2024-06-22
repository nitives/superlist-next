"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import ReactPlayer from "react-player";

export default function M3U8VideoPlayer({
  className,
  width,
  height,
}: {
  className: string;
  width: string;
  height?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const src = `https://vidsrc.to/embed/movie/${id}`;
  const url = `https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={className} style={{ width, height }}>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Skeleton className="w-full aspect-video rounded-2xl px-2" />
        </div>
      )}
      {/* <iframe
        className={`aspect-video rounded-2xl ${isLoading ? "hidden" : "block"}`}
        src={src}
        width={width}
        height={height}
        onLoad={handleLoad}
        allowFullScreen
      ></iframe> */}
      <ReactPlayer forceHLS playing url={url} />
    </div>
  );
}

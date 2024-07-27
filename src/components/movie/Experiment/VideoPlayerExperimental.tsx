"use client";
import ReactPlayer from "react-player";

export default function VideoPlayerExperimental({
  className,
  width,
  height,
  src,
}: {
  className: string;
  width?: string;
  height?: string;
  src: any;
}) {
  return (
    <div className={className} style={{ width, height }}>
      <ReactPlayer
        autoplay={true}
        config={{
          file: {
            forceHLS: true,
          },
        }}
        controls={true}
        src={src}
        width={width}
        height={height}
      />
    </div>
  );
}

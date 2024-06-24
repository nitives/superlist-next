"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

export default function VideoPlayer({
  className,
  width,
  height,
  selectedSource,
}: {
  className: string;
  width: string;
  height?: string;
  selectedSource: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const getSourceUrl = (id: string) => {
    const baseUrl =
      selectedSource === "vidsrc"
        ? "https://vidsrc.to/embed/movie"
        : selectedSource === "vidsrc.pro"
        ? "https://vidsrc.pro/embed/movie"
        : selectedSource === "vidsrc.icu"
        ? "https://vidsrc.icu/embed/movie"
        : "https://vidsrc.me/embed/movie";
    return `${baseUrl}/${id}`;
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const movieId = Array.isArray(id) ? id[0] : id;

  return (
    <div className={className} style={{ width, height }}>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Skeleton className="w-full aspect-video rounded-2xl px-2" />
        </div>
      )}
      <iframe
        className={`aspect-video rounded-2xl ${isLoading ? "hidden" : "block"}`}
        src={getSourceUrl(movieId)}
        width={width}
        height={height}
        onLoad={handleLoad}
        allowFullScreen
      ></iframe>
    </div>
  );
}

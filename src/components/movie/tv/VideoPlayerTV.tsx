import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "../../ui/skeleton";

export default function VideoPlayerTV({
  className,
  width,
  height,
  episodeUrl,
  selectedSource,
}: {
  className: string;
  width: string;
  height?: string;
  episodeUrl: string | null;
  selectedSource: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true); // Set loading state when episodeUrl changes
  }, [episodeUrl, selectedSource]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const getSourceUrl = (url: string | null) => {
    if (!url) {
      const baseUrl =
        selectedSource === "vidsrc.pro"
          ? "https://vidsrc.pro/embed/tv"
          : selectedSource === "vidsrc.to"
          ? "https://vidsrc.to/embed/tv"
          : selectedSource === "vidsrc.icu"
          ? "https://vidsrc.icu/embed/tv"
          : "https://vidsrc.me/embed/tv";
      return `${baseUrl}/${id}/1/1`;
    }
    const baseUrl =
      selectedSource === "vidsrc.pro"
        ? "https://vidsrc.pro/embed/tv"
        : selectedSource === "vidsrc.to"
        ? "https://vidsrc.to/embed/tv"
        : selectedSource === "vidsrc.icu"
        ? "https://vidsrc.icu/embed/tv"
        : "https://vidsrc.me/embed/tv";
    return url.replace(/https:\/\/vidsrc\.(pro|to|icu|me)\/embed\/tv/, baseUrl);
  };

  return (
    <div className={className} style={{ width, height }}>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Skeleton className="w-full aspect-video rounded-2xl px-2" />
        </div>
      )}
      <iframe
        className={`aspect-video rounded-2xl ${isLoading ? "hidden" : "block"}`}
        src={getSourceUrl(episodeUrl)}
        width={width}
        height={height}
        onLoad={handleLoad}
        allowFullScreen
      ></iframe>
    </div>
  );
}

"use client";
import { Controls } from "@/components/movie/Experiment/Controls";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useFullScreenHandle } from "react-full-screen";

export default function MoviesTest({
  className,
  type,
  id,
  episodeNumber,
  seasonNumber,
  episodeTitle,
}: {
  className?: string;
  type: string;
  id: any;
  episodeNumber?: any;
  seasonNumber?: any;
  episodeTitle?: any;
}) {
  const videoPlayerRef = useRef<ReactPlayer | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [media, setMediaData] = useState<any | null>(null);
  const [initialTimeSet, setInitialTimeSet] = useState<boolean>(false);
  const [savedTime, setSavedTime] = useState<number>(0);
  const [currentTimePercentage, setCurrentTimePercentage] = useState<number>(0);

  const getInitialVolume = () => {
    if (typeof window !== "undefined") {
      const savedVolume = localStorage.getItem("videoVolume");
      if (savedVolume !== null) {
        const parsedVolume = parseFloat(savedVolume);
        document.documentElement.style.setProperty(
          "--seek-value",
          `${parsedVolume * 100}%`
        );
        return parsedVolume;
      }
    }
    return 0.5;
  };

  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: getInitialVolume(),
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
  });

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [bufferTime, setBufferTime] = useState<number>(0);

  const { playing, muted, volume, playbackRate, played, seeking, buffer } =
    videoState;

  const handle = useFullScreenHandle();

  const fetchVideoUrl = async () => {
    try {
      const response = await fetch(
        `https://superlist-consumet-api.vercel.app/meta/tmdb/info/${id}?type=${type}`
      );
      const data = await response.json();
      setMediaData(data);
      const imdbId = data.mappings.imdb;
      if (imdbId) {
        const videoUrl =
          type === "tv"
            ? `https://warezcdn-js.vidsrcproxy.workers.dev/${imdbId}?ss=${seasonNumber}&ep=${episodeNumber}`
            : `https://warezcdn-js.vidsrcproxy.workers.dev/${imdbId}`;

        const videoResponse = await fetch(videoUrl);
        const videoData = await videoResponse.json();
        const txtFileUrl = videoData?.videoSource;
        if (txtFileUrl) {
          const txtResponse = await fetch(txtFileUrl);
          const txtData = await txtResponse.text();
          const videoLinkMatch = txtData.match(/https:\/\/[^\s]+/);
          if (videoLinkMatch) {
            setVideoUrl(videoLinkMatch[0]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching video URL:", error);
    }
  };

  useEffect(() => {
    fetchVideoUrl();
  }, [id, type, seasonNumber, episodeNumber]);

  useEffect(() => {
    const savedTimeStr = localStorage.getItem(
      `videoTime-${id}-S${seasonNumber}-E${episodeNumber}`
    );
    if (savedTimeStr && !initialTimeSet) {
      const savedTime = parseFloat(savedTimeStr);
      setSavedTime(savedTime);
      setInitialTimeSet(true);
    }
  }, [id, seasonNumber, episodeNumber, initialTimeSet]);

  useEffect(() => {
    if (savedTime && duration > 0) {
      const percentage = savedTime / duration;
      setCurrentTimePercentage(percentage);
      if (videoPlayerRef.current && currentTimePercentage > 0) {
        videoPlayerRef.current.seekTo(currentTimePercentage);
      }
    }
  }, [savedTime, duration, currentTimePercentage]);

  // console.log("media", media);

  useEffect(() => {
    const saveCurrentTime = () => {
      if (currentTime > 30) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            `videoTime-${id}-S${seasonNumber}-E${episodeNumber}`,
            currentTime.toString()
          );
          localStorage.setItem(`videoType-${id}`, type);
          if (media?.title) {
            localStorage.setItem(`videoTitle-${id}`, media.title);
          }
          if (media?.cover) {
            localStorage.setItem(`videoPoster-${id}`, media.cover);
          }
          if (duration > 0) {
            localStorage.setItem(`videoDuration-${id}`, duration.toString());
          }
          if (type === "tv") {
            localStorage.setItem(`videoSeason-${id}`, seasonNumber);
            localStorage.setItem(`videoEpisode-${id}`, episodeNumber);
            localStorage.setItem(`videoEpisodeTitle-${id}`, episodeTitle);
          }
        }
      }
    };

    const interval = setInterval(saveCurrentTime, 10000);

    return () => {
      clearInterval(interval);
      saveCurrentTime();
    };
  }, [
    id,
    type,
    currentTime,
    media?.title,
    duration,
    seasonNumber,
    episodeNumber,
    episodeTitle,
    media?.cover,
  ]);

  const playPauseHandler = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const seekHandler = (newTime: number) => {
    setCurrentTime(newTime);
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(newTime, "seconds");
    }
  };

  const volumeHandler = (newVolume: number) => {
    setVideoState({ ...videoState, volume: newVolume });
    if (typeof window !== "undefined") {
      localStorage.setItem("videoVolume", newVolume.toString());
    }
  };

  const handleReady = () => {
    setTimeout(() => {
      if (videoPlayerRef.current) {
        const duration = videoPlayerRef.current.getDuration();
        setDuration(duration);
      }
    }, 7000);
  };

  return (
    <div className={cn(className, "relative")} suppressHydrationWarning={true}>
      <Controls
        title={media?.title}
        season={seasonNumber}
        episode={episodeNumber}
        episodeName={episodeTitle}
        videoDuration={duration}
        onPlayPause={playPauseHandler}
        setCurrentTime={seekHandler}
        currentTime={currentTime}
        bufferTime={bufferTime}
        playing={playing}
        volume={volume}
        setVolume={volumeHandler}
        timeOut={1.5}
      >
        <ReactPlayer
          className="min-h-full min-w-screen video-player"
          ref={videoPlayerRef}
          height="100%"
          width="100%"
          config={{
            file: {
              forceHLS: true,
            },
          }}
          controls={false}
          url={videoUrl}
          volume={volume}
          playing={playing}
          onProgress={({ playedSeconds, loadedSeconds }) => {
            setCurrentTime(playedSeconds);
            setBufferTime(loadedSeconds);
          }}
          onReady={handleReady}
        />
      </Controls>
    </div>
  );
}

"use client";
import { Controls } from "@/components/movie/Experiment/Controls";
import { cn, FetchDetailsTMDB, FetchMoreDetailsTMDB } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useFullScreenHandle } from "react-full-screen";
import toast from "react-hot-toast";
import { IoWarning } from "react-icons/io5";
import Hls from "hls.js";

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [media, setMediaData] = useState<any | null>(null);
  const [initialTimeSet, setInitialTimeSet] = useState<boolean>(false);
  const [savedTime, setSavedTime] = useState<number>(0);
  const [currentTimePercentage, setCurrentTimePercentage] = useState<number>(0);
  const [tracks, setTracks] = useState<any[]>([]);

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

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const setMediaSessionMetadata = (media: any) => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: media.title || "Unknown Title",
        artist: media.ex.production_companies[0].name || "Unknown Publisher",
        artwork: [
          {
            src:
              media.image ||
              `https://image.tmdb.org/t/p/w500${media.ex.poster_path}`,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (playing && media) {
      setMediaSessionMetadata(media);
      console.log(
        "MOVIETEST | setMediaSessionMetadata:",
        media.title,
        media.image,
        media.ex.production_companies[0].name,
        formatDate(media.releaseDate)
      );
    }
  }, [media, playing]);

  useEffect(() => {
    const fetchVideoUrlAlt = async () => {
      try {
        const response = await fetch(
          `https://superlist-consumet-api.vercel.app/meta/tmdb/info/${id}?type=${type}`
        );
        const extraData = await FetchDetailsTMDB(`${id}`, type);
        const superlistData = await response.json();
        const data = {
          ...superlistData,
          ex: extraData,
        };
        setMediaData(data);
        setMediaSessionMetadata(data);
        const provider = "soaper"; // soaper, warezcdn, frembed, autoembed, faselhd
        if (id) {
          const videoUrl =
            type === "tv"
              ? `https://vidjoy.vidsrcproxy.workers.dev/fetch/${provider}/${id}?ss=${seasonNumber}&ep=${episodeNumber}`
              : `https://vidjoy.vidsrcproxy.workers.dev/fetch/${provider}/${id}`;
          const videoResponse = await fetch(videoUrl);

          if (videoResponse.status === 500) {
            const providers = ["soaper", "warezcdn", "frembed", "faselhd"];
            let validVideoUrl = null;
            for (const provider of providers) {
              const videoUrl =
                type === "tv"
                  ? `https://vidjoy.vidsrcproxy.workers.dev/fetch/${provider}/${id}?ss=${seasonNumber}&ep=${episodeNumber}`
                  : `https://vidjoy.vidsrcproxy.workers.dev/fetch/${provider}/${id}`;

              const videoResponse = await fetch(videoUrl);
              if (videoResponse.status !== 500) {
                validVideoUrl = videoUrl;
                break;
              }
            }

            if (!validVideoUrl) {
              console.error(
                "File is unavailable for all providers. Please switch to another player."
              );
              toast(
                <div className="flex items-center gap-3">
                  <IoWarning className="text-[#f8102f]" size={24} />
                  <span className="text-left w-full">
                    <p className="select-none text-muted-foreground">
                      <b className="text-[#f8102f]">Error</b> File is
                      unavailable for all providers. Please switch to another
                      player.
                    </p>
                  </span>
                </div>,
                {
                  id: "playerissue",
                }
              );
              return;
            }

            const videoData = await (await fetch(validVideoUrl)).json();
            console.log("MOVIETEST | videoData:", videoData);
            const videoFile = videoData?.url;
            console.log("MOVIETEST | videoFile:", videoFile);
            if (videoFile[0].link) {
              setVideoUrl(videoFile[0].link);
            }
            if (videoData.tracks) {
              const languageMap: { [key: string]: string } = {
                en: "English",
                es: "Español",
                fr: "Français",
                it: "Italiano",
                de: "Deutsch",
                pt: "Português",
                nl: "Dutch",
                th: "ภาษาไทย",
                zh: "中文",
              };
              const formattedTracks = videoData.tracks
                .filter((track: any) => track.url !== undefined)
                .map((track: any) => ({
                  kind: "captions",
                  src: track.url,
                  srcLang: track.srcLang,
                  label: track.lang,
                  default: track.default,
                }));
              console.log("MOVIETEST | formattedTracks:", formattedTracks);
              setTracks(formattedTracks);
            }
          }

          const videoData = await videoResponse.json();
          console.log("MOVIETEST | videoData:", videoData);
          const videoFile = videoData?.url;
          console.log("MOVIETEST | videoFile:", videoFile);
          if (videoFile[0].link) {
            setVideoUrl(videoFile[0].link);
          }
          if (videoData.tracks) {
            const languageMap: { [key: string]: string } = {
              en: "English",
              es: "Español",
              fr: "Français",
              it: "Italiano",
              de: "Deutsch",
              pt: "Português",
              nl: "Dutch",
              th: "ภาษาไทย",
              zh: "中文",
            };
            const formattedTracks = videoData.tracks.map(
              (track: any, index: number) => ({
                kind: "captions",
                src: track.url,
                srcLang: track.lang,
                label: track.lang,
                default: index === 0,
              })
            );
            console.log("MOVIETEST | formattedTracks:", formattedTracks);
            setTracks(formattedTracks);
            console.log("MOVIETEST | tracks after setTracks:", tracks);
          }
        }
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    fetchVideoUrlAlt();
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

  const LoadingScreen = () => (
    <div
      style={{
        backgroundColor: "black",
        height: "100%",
        width: "100%",
        content: "Loading...",
        color: "white",
      }}
    />
  );

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      });
    } else if (
      videoRef.current &&
      videoRef.current.canPlayType("application/vnd.apple.mpegurl")
    ) {
      videoRef.current.src = videoUrl;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current?.play();
      });
    }
  }, [videoUrl]);

  return (
    <div className={cn(className, "relative")} suppressHydrationWarning={true}>
      {typeof window !== "undefined" && /iPhone/.test(navigator.userAgent) ? (
        <div className="aspect-[1.85/1] !w-[95vw] video-player bg-black rounded-[14px] overflow-hidden">
          <video
            ref={videoRef}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            controls={true}
            autoPlay={true}
            playsInline={true}
            crossOrigin="anonymous"
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onProgress={(e) => {
              const buffered = e.currentTarget.buffered;
              if (buffered.length > 0) {
                setBufferTime(buffered.end(buffered.length - 1));
              }
            }}
          >
            {tracks.map((track, index) => (
              <track
                key={index}
                kind={track.kind}
                src={track.src}
                srcLang={track.srcLang}
                label={track.label}
                default={track.default == true}
              />
            ))}
            <p>Your browser does not support the video tag.</p>
          </video>
        </div>
      ) : (
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
            className="aspect-[1.85/1] !w-[85vw] video-player bg-black rounded-[14px]"
            ref={videoPlayerRef}
            height="100%"
            width="100%"
            config={{
              file: {
                forceHLS: true,
                tracks: tracks,
              },
            }}
            playsinline
            controls={false}
            url={videoUrl}
            fallback={<LoadingScreen />}
            volume={volume}
            playing={playing}
            onProgress={({ playedSeconds, loadedSeconds }) => {
              setCurrentTime(playedSeconds);
              setBufferTime(loadedSeconds);
            }}
            onReady={handleReady}
          />
        </Controls>
      )}
    </div>
  );
}

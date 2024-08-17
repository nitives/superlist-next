"use client";
import React, { useEffect, useState } from "react";
import VideoPlayerTV from "@/components/movie/tv/VideoPlayerTV";
import MediaDetailsTV from "@/components/movie/tv/MediaDetailsTV";
import MediaRecommendationsTV from "@/components/movie/tv/MediaRecommendationsTV";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";
import MoviesTest from "@/components/movie/Experiment/MoviesTest";
import { useParams } from "next/navigation";
import { FetchMoreDetailsTMDB } from "@/lib/utils";

const notify = () =>
  toast(
    <div className="flex items-center gap-3">
      <AiFillInfoCircle className="text-[#10b3f8]" size={24} />
      <span className="text-left w-full">
        <p className="select-none text-muted-foreground">
          <b className="text-[#10b3f8]">Info</b> If the player isn&apos;t
          working properly, try switching players.
        </p>
      </span>
    </div>,
    {
      id: "playerissue",
    }
  );

export default function TVShows() {
  const { id } = useParams();
  const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState<string | null>(
    null
  );
  const [selectedSource, setSelectedSource] = useState<string>("superlist");
  const [toastShown, setToastShown] = useState<boolean>(false);
  const [episodeTitle, setEpisodeTitle] = useState<string>("----");

  useEffect(() => {
    const getTVDetails = async () => {
      if (id) {
        await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms wait
        const data = await FetchMoreDetailsTMDB(`${id}`, "tv");
        // console.log(
        //   "getTVDetails - 50",
        //   data.seasons[seasonNumber - 1].episodes[episodeNumber - 1].title
        // );
        const firstEpisodeTitle = data.seasons[0].episodes[0].title;
        setEpisodeTitle(firstEpisodeTitle);
      }
    };

    getTVDetails();
  }, [id]);

  const handleEpisodeClick = (episodeUrl: string, episodeTitle: string) => {
    setSelectedEpisodeUrl(episodeUrl);
    setEpisodeTitle(episodeTitle);
  };

  const handleSourceChange = (value: string) => {
    setSelectedSource(value);
  };

  console.log("selectedEpisodeUrl", selectedEpisodeUrl);

  useEffect(() => {
    if (selectedSource === "superlist" && !toastShown) {
      const shouldShowToast = Math.random() < 0.3; // 1 in 5 chance
      if (shouldShowToast) {
        setTimeout(() => {
          notify();
          setToastShown(true);
        }, 10000);
      }
    }
  }, [selectedSource, toastShown]);

  // Function to extract season and episode numbers from the URL
  const extractSeasonAndEpisode = (url: string) => {
    const parts = url.split("/");
    const seasonNumber = parts[parts.length - 2];
    const episodeNumber = parts[parts.length - 1];
    return { seasonNumber, episodeNumber };
  };

  const { seasonNumber, episodeNumber } = selectedEpisodeUrl
    ? extractSeasonAndEpisode(selectedEpisodeUrl)
    : { seasonNumber: "1", episodeNumber: "1" };

  console.log(
    "Season:",
    seasonNumber,
    "| Episode:",
    episodeNumber,
    "| Title:",
    episodeTitle
  );

  return (
    <>
      <div className="p-4 lg:px-20 px-[0.3rem] pt-10">
        <div className="flex flex-col gap-2">
          <div className="px-2 w-full flex flex-col items-center justify-center gap-10">
            {selectedSource === "superlist" ? (
              <MoviesTest
                id={id}
                type="tv"
                episodeNumber={episodeNumber}
                seasonNumber={seasonNumber}
                episodeTitle={episodeTitle}
              />
            ) : (
              <VideoPlayerTV
                className="aspect-video rounded-2xl max-h-[50rem] w-full flex video-player"
                episodeUrl={selectedEpisodeUrl}
                selectedSource={selectedSource}
                height="100%"
                width="100%"
              />
            )}
            <div className="flex gap-2 mb-4 flex-col justify-center items-center">
              <Select onValueChange={handleSourceChange} value={selectedSource}>
                <SelectTrigger className="w-[18rem] rounded-xl">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem className="rounded-[0.7rem]" value="superlist">
                    Superlist Player (Experimental)
                  </SelectItem>
                  <SelectItem className="rounded-[0.7rem]" value="vidsrc.pro">
                    vidsrc.pro
                  </SelectItem>
                  <SelectItem className="rounded-[0.7rem]" value="vidsrc.to">
                    vidsrc.to
                  </SelectItem>
                  <SelectItem className="rounded-[0.7rem]" value="vidsrc.icu">
                    vidsrc.icu
                  </SelectItem>
                  <SelectItem className="rounded-[0.7rem]" value="vidsrc.me">
                    vidsrc.me
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs hover:opacity-100 opacity-0 transition-opacity duration-200 select-none">
                If the content isn&apos;t playing try switching players
              </p>
              <Toaster
                toastOptions={{
                  style: {
                    width: "100%",
                    background: "hsl(var(--card))",
                    color: "var(--foreground-x)",
                    padding: ".5rem",
                    paddingRight: "1rem",
                    fontSize: "1rem",
                    borderRadius: "0.875rem",
                  },
                  className: "bg-blue-500",
                  duration: 5000,
                }}
                position="bottom-right"
              >
                {(t) => (
                  <ToastBar toast={t}>
                    {({ icon, message }) => (
                      <>
                        {icon}
                        {message}
                        {t.type !== "loading" && (
                          <button onClick={() => toast.dismiss(t.id)}>
                            <IoClose
                              fill="var(--foreground-x)"
                              className="opacity-50"
                              size={24}
                            />
                          </button>
                        )}
                      </>
                    )}
                  </ToastBar>
                )}
              </Toaster>
            </div>
          </div>
          <MediaDetailsTV onEpisodeClick={handleEpisodeClick} />
          <MediaRecommendationsTV />
        </div>
      </div>
    </>
  );
}

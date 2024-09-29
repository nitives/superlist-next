"use client";
import React, { useState, useEffect } from "react";
import MediaDetails from "@/components/movie/MediaDetails";
import MediaRecommendations from "@/components/movie/MediaRecommendations";
import VideoPlayer from "@/components/movie/VideoPlayer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MoviesTest from "@/components/movie/Experiment/MoviesTest";
import { useParams } from "next/navigation";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";
import Head from "next/head";
import { FetchDetailsTMDB } from "@/lib/utils";

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

export default function Movies() {
  const { id } = useParams();
  const [selectedSource, setSelectedSource] = useState<string>("superlist");
  const [toastShown, setToastShown] = useState<boolean>(false);
  const [movie, setMovie] = useState<{
    title: string;
    poster_path: string;
    overview: string;
  } | null>(null);

  const handleSourceChange = (value: string) => {
    setSelectedSource(value);
  };

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

  useEffect(() => {
    const getMovieDetails = async () => {
      if (id) {
        await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms wait
        const data = await FetchDetailsTMDB(`${id}`, "movie");
        console.log("Dynamic Data", data);
        document.title = `Superlist - ${data.title}`;
        const metaDescription = document.querySelector(
          "meta[name='description']"
        );
        if (metaDescription) {
          metaDescription.setAttribute(
            "content",
            `Superlist | ${data.title} | ${data.overview}`
          );
        }

        const metaOgTitle = document.querySelector("meta[property='og:title']");
        if (metaOgTitle) {
          metaOgTitle.setAttribute("content", `Superlist - ${data.title}`);
        }

        const metaOgDescription = document.querySelector(
          "meta[property='og:description']"
        );
        if (metaOgDescription) {
          metaOgDescription.setAttribute(
            "content",
            `Superlist | ${data.title} | ${data.overview}`
          );
        }

        const metaOgImage = document.querySelector("meta[property='og:image']");
        if (metaOgImage) {
          metaOgImage.setAttribute(
            "content",
            `https://image.tmdb.org/t/p/w500${data.poster_path}` ||
              "/images/meta/meta-image.png"
          );
        }
        setMovie(data);
      }
    };
    getMovieDetails();
  }, [id]);

  return (
    <>
      <Head>
        <title>{`SuperlistXX - ${movie?.title}` || "Superlist"}</title>
        <meta
          name="description"
          content={
            `Superlist | ${movie?.title} | ${movie?.overview}` ||
            "Superlist Movies"
          }
        />
        <meta
          property="og:title"
          content={`Superlist - ${movie?.title}` || "Superlist"}
        />
        <meta
          property="og:description"
          content={
            `Superlist | ${movie?.title} | ${movie?.overview}` ||
            "Superlist Movies"
          }
        />
        <meta
          property="og:image"
          content={
            `https://image.tmdb.org/t/p/w500${movie?.poster_path}` ||
            "/images/meta/meta-image.png"
          }
        />
        <meta
          property="og:url"
          content={`https://superlist.cc/movies/movie/${id}`}
        />
      </Head>
      <div
        className="p-4 lg:px-20 px-[0.3rem] pt-10"
        suppressHydrationWarning={true}
      >
        <div className="flex flex-col gap-2">
          <div className="px-2 w-full flex flex-col items-center justify-center gap-10">
            {selectedSource === "superlist" ? (
              <MoviesTest id={id} type="movie" />
            ) : (
              <VideoPlayer
                className="aspect-video rounded-2xl max-h-[50rem] w-full flex video-player"
                selectedSource={selectedSource}
                width="100%"
                height="100%"
              />
            )}
            <div className="flex gap-2 mb-4 flex-col justify-center items-center">
              <p className="text-xs select-none text-muted-foreground">
                Players
              </p>
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
          <MediaDetails />
          <MediaRecommendations />
        </div>
      </div>
    </>
  );
}

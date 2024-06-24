"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FetchDetailsTMDB } from "@/lib/utils";
import { TimeConvert } from "../TimeConvert";
import { Skeleton } from "../ui/skeleton";
import { PLACEHOLDER_IMG_LIGHT, PLACEHOLDER_IMG_DARK } from "./placeholder";
import { useTheme } from "next-themes";
import DurationConvert from "./DurationConvert";

export default function MediaDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      if (id) {
        await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms wait
        const data = await FetchDetailsTMDB(`${id}`, "movie");
        setMovie(data);
      }
    };

    getMovieDetails();
  }, [id]);

  const { theme } = useTheme();
  const placeholderImage =
    theme === "dark" || "system"
      ? `${PLACEHOLDER_IMG_DARK}`
      : `${PLACEHOLDER_IMG_LIGHT}`;

  if (!movie) {
    return (
      <div className="flex max-sm:flex-col pt-[1rem] max-sm:pt-[2rem] px-[10rem] max-sm:px-[1rem] w-full h-auto gap-4 justify-center">
        <div>
          <Skeleton
            id="movie.poster_path"
            className="w-[500px] h-[600px] mb-2 border rounded-2xl max-w-[400px]"
          />
        </div>
        <div className="max-w-[50rem] pt-[5rem]">
          <Skeleton
            id="movie.release_date"
            className="w-[10rem] h-5 rounded-md my-0.5"
          />
          <div className="flex items-center">
            <Skeleton
              id="movie.title.skeleton"
              className="w-[10rem] h-8 rounded-md my-0.5"
            />
          </div>
          <div className="flex gap-1 items-center py-1 select-none">
            <Skeleton
              id="movie.genres.skeleton"
              className="w-[15rem] h-7 rounded-md my-0.5"
            />
          </div>
          <Skeleton
            id="movie.overview.skeleton"
            className="w-[40rem] h-10 rounded-md my-0.5"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-sm:flex-col pt-[1rem] max-sm:pt-[2rem] px-[10rem] max-sm:px-[1rem] w-full h-auto gap-4 justify-center">
      <div className="max-sm:w-full flex items-center justify-center">
        <Image
          draggable={false}
          width={400}
          height={600}
          placeholder={`data:image/${placeholderImage}`}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/public/images/bg-dark-texture1.png"
          }
          alt={movie.title}
          className="border rounded-2xl w-[35rem] lg:max-w-[400px] max-sm:w-[80rem] max-sm:max-w-[85vw] select-none"
        />
      </div>
      <div className="max-w-[50rem] pt-[5rem] max-sm:flex-col max-sm:pt-[0rem]">
        <p className="text-sm text-muted dark:text-muted-foreground">
          <TimeConvert>{movie.release_date}</TimeConvert> ·{" "}
          <DurationConvert duration={movie.runtime} />
        </p>
        <div className="flex">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          {movie.adult ? (
            <p className="select-none bg-foreground/[0.025] pt-[0.2rem] pb-[0.3rem] pl-[0.38rem] pr-[.4rem] leading-3 ml-1 border rounded-md flex text-xs size-fit items-center justify-center">
              E
            </p>
          ) : null}
        </div>

        <div className="flex gap-1 items-center py-1 select-none">
          {movie.genres.map((category: any, index: number) => (
            <p
              key={index}
              className="bg-foreground/5 p-1 border rounded-md flex text-xs w-fit"
            >
              {category.name}
            </p>
          ))}
          <span className="text-sm text-muted">|</span>
          <p className="bg-foreground p-1 rounded-md flex text-xs min-w-6w text-background">
            {movie.vote_average.toFixed(1)}
          </p>
        </div>

        <p className="max-w-[40rem] text-neutral-400">{movie.overview}</p>
      </div>
    </div>
  );
}

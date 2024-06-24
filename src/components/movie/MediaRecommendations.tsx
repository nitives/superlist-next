"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FetchRecommendationsTMDB } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import DurationConvert from "./DurationConvert";
import Link from "next/link";

export default function MediaRecommendations() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const PosterSrc = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const getMovieDetails = async () => {
      if (id) {
        const data = await FetchRecommendationsTMDB(`${id}`, "movie");
        setMovie(data);
      }
    };

    getMovieDetails();
  }, [id]);

  const RecommendationCard = () => (
    <div className="">
      <Skeleton className="mb-1 border rounded-[8px] aspect-[2/3] w-[252px] object-cover" />
      <Skeleton className="h-10 rounded-[8px] mb-1" />
    </div>
  );

  if (!movie) {
    return (
      <>
        <p className="mt-10 text-3xl font-bold px-2">Recommended Movies</p>
        <div className="flex w-full h-auto pt-[.5rem] px-1 gap-4 justify-center">
          <div className="recommendation-grid">
            {Array.from({ length: 10 }).map((_, index) => (
              <RecommendationCard key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  // console.log(movie.results[0].title);
  // console.log('IDs:', movie.results.map((recommendation: any) => recommendation.id));

  return (
    <>
      <p className="mt-10 text-3xl font-bold px-2">Recommended Movies</p>
      <div className="flex w-full h-auto pt-[.5rem] px-1 gap-4 justify-center">
        <div className="recommendation-grid">
          {movie.results.map((recommendation: any) => (
            <Link
              className="w-fit"
              href={`./${recommendation.id}`}
              key={recommendation.id}
            >
              <Image
                draggable={false}
                width={500}
                height={750}
                src={PosterSrc + recommendation.poster_path}
                alt={recommendation.title}
                className="mb-2 border rounded-xl movie-card-image select-none"
              />
              <div className="max-h-fit flex *:flex justify-between text-sm text-muted dark:text-muted-foreground gap-1 items-baseline">
                <div className="w-auto max-w-[75%] ">
                  <p className="truncate whitespace-normal">
                    {recommendation.title}
                  </p>
                </div>

                <div className="max-h-fit flex gap-1">
                  <p className="bg-foreground/5 px-1 py-0.5 border rounded-md flex text-xs w-fit">
                    {recommendation.media_type.charAt(0).toUpperCase() +
                      recommendation.media_type.slice(1)}
                  </p>
                  <p className="bg-foreground/5 px-1 py-0.5 border rounded-md flex text-xs w-fit">
                    {recommendation.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

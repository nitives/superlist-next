"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FetchRecommendationsTMDB, FetchMoreDetailsTMDB } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import DurationConvert from "../DurationConvert";
import { TimeConvert } from "@/components/TimeConvert";

export default function MediaRecommendationsTV() {
  const { id } = useParams();
  const [tv, setTV] = useState<any>(null);
  const [tvX, setTVX] = useState<any>(null);
  const PosterSrc = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const getMovieDetails = async () => {
      if (id) {
        const data = await FetchRecommendationsTMDB(`${id}`, "tv");
        const details = await FetchMoreDetailsTMDB(`${id}`, "tv");
        setTV(data);
        setTVX(details);
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

  if (!tv) {
    return (
      <>
        <p className="mt-10 text-3xl font-bold px-2">Recommended TV Shows</p>
        <div className="flex  h-auto pt-[.5rem] px-1 gap-4 justify-center">
          <div className="recommendation-grid">
            {Array.from({ length: 10 }).map((_, index) => (
              <RecommendationCard key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="mt-10 text-3xl font-bold px-2">Recommended TV Shows</p>
      <div className="flex  h-auto pt-[.5rem] px-1 gap-4 justify-center">
        <div className="recommendation-grid">
          {tv.results.map((recommendation: any) => (
            <Link href={`./${recommendation.id}`} key={recommendation.id}>
              <Image
                draggable={false}
                width={500}
                height={750}
                src={PosterSrc + recommendation.poster_path}
                alt={recommendation.name}
                className="mb-2 border rounded-xl movie-card-image select-none"
              />
              <h3 className="text-lg font-bold">{recommendation.title}</h3>
              <div className="max-h-fit flex *:flex justify-between text-sm text-muted dark:text-muted-foreground gap-1 items-center">
                <div className="w-auto max-w-[75%] ">
                  <p className="truncate whitespace-normal">
                    {recommendation.name}
                  </p>
                </div>

                <div className="max-h-fit flex gap-1">
                  <p className="bg-foreground/5 px-1 py-0.5 border rounded-md flex text-xs w-fit">
                    {recommendation.media_type.toUpperCase()}
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

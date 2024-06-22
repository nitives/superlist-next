"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorPage } from "@/components";
import VideoPlayer from "@/components/movie/VideoPlayer";
import MediaDetails from "@/components/movie/MediaDetails";
import MediaRecommendations from "@/components/movie/MediaRecommendations";

interface Recommendation {
  id: string;
  title: string;
  image: string;
  duration: string;
  type: string;
}

interface MovieDetails {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string;
  description: string;
  geners: string[];
  type: string;
  casts: string[];
  tags: string[];
  production: string;
  duration: string;
  recommendations: Recommendation[];
  episodes: {
    id: string;
    url: string;
    title: string;
    number: number;
    season: number;
  }[];
}

export default function TVShows() {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      console.log("ID:", id);
      if (id) {
        try {
          const url = `https://superlist-api-m.vercel.app/movies/flixhq/info?id=tv/${id}`;
          //                     https://api.consumet.org/movies/flixhq/info?id=tv/watch-the-toy-box-31781
          const { data } = await axios.get(url);
          setMovie(data);
        } catch (error) {
          console.error("Failed to fetch movie details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 px-20 pt-10">
        <div className="flex gap-[2rem]">
          <div className="grid max-w-96">
            <Skeleton className="rounded-2xl w-[400px] h-[600px] mb-2" />
            <Skeleton className="rounded-2xl w-[400px] h-10" />
            <Skeleton className="rounded-2xl w-[400px] h-10" />
            <Skeleton className="rounded-2xl w-[400px] h-10" />
          </div>
          <Skeleton className="w-full px-2 pl-8 aspect-video rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <ErrorPage
        className="p-2 py-20"
        img="/images/emojis/apple/construction.png"
        returnLink="/"
      >
        TV Show not found.
      </ErrorPage>
    );
  }

  return (
    <>
      <div className="p-4 px-20 pt-10">
        <div className="grid gap-2">
          <div className="px-2 w-full flex items-center justify-center">
            <VideoPlayer
              height="100%"
              width="100%"
              className="aspect-video rounded-2xl h-[50rem] video-player"
            />
          </div>
          <MediaDetails />
          <MediaRecommendations />
        </div>
      </div>
    </>
  );
}

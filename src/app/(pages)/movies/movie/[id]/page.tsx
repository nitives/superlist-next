"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorPage, TimeConvert } from "@/components";
import DurationConvert from "@/components/DurationConvert";

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

const MovieDetailsPage: React.FC = () => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add state for error message
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      console.log("ID:", id);
      if (id) {
        try {
          const url = `https://superlist-api-m.vercel.app/movies/flixhq/info?id=movie/${id}`;
          //                     https://api.consumet.org/movies/flixhq/info?id=tv/watch-the-toy-box-31781
          const { data } = await axios.get(url);
          setMovie(data);
        } catch (error: any) {
          console.error("Failed to fetch movie details:", error);
          setError(error.message); // Set the error message
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
        Movie not found.
      </ErrorPage>
    );
  }

  if (error) {
    return (
      <ErrorPage
        className="p-2 py-20"
        img="/images/emojis/apple/construction.png"
        returnLink="/"
      >
        Error loading movie.
        {error}
      </ErrorPage>
    );
  }

  return (
    <div className="p-4 px-20 pt-10">
      <div className="flex gap-2">
        <div className="grid max-w-96">
          <Image
            width={250}
            height={400}
            src={movie.image}
            alt={movie.title}
            className="mb-2 border rounded-2xl"
          />
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p className="text-sm text-muted dark:text-muted-foreground">
            <TimeConvert>{movie.releaseDate}</TimeConvert>
          </p>
          <p className="opacity-90">{movie.description}</p>
        </div>

        <div className="px-2 w-full">
          <iframe
            // src={movie.url}
            src="https://www.youtube.com/embed/hPt1gUE1zAc"
            width="100%"
            className="aspect-video rounded-2xl"
          ></iframe>
        </div>
      </div>
      <div>
        <div className="mt-36">
          <h2 className="text-2xl font-semibold mb-4">
            Recommended Shows/Movies
          </h2>
        </div>
        <div className="recommendation-grid">
          {movie.recommendations.map((recommendation) => (
            <div key={recommendation.id} className="">
              <Image
                width={200}
                height={300}
                src={recommendation.image}
                alt={recommendation.title}
                className="mb-2 border rounded-xl !h-[500px] movie-card-image"
              />
              <h3 className="text-lg font-bold">{recommendation.title}</h3>
              <div className="flex">
                <p className="text-sm text-muted dark:text-muted-foreground flex gap-1">
                  <DurationConvert duration={recommendation.duration} />· {""}
                  {recommendation.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;

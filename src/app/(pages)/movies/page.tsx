"use client";
import React, { useEffect, useState, useContext, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { SearchContext } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface Movie {
  id: string;
  url: string;
  title: string;
  image: string;
  releaseDate: string;
  type: string;
}

const MoviesList: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate a delay
        const url = `https://superlist-api-m.vercel.app/movies/flixhq/${searchQuery}`;
        const { data } = await axios.get(url, { params: { page: 1 } });
        setMovies(data.results);
        console.log("Fetched movies:", data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchMovies();
    }
  }, [searchQuery]);

  return (
    <div className="movie-grid">
      {loading
        ? Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="movie-card">
              <Skeleton className="w-auto h-[300px]" />
            </div>
          ))
        : movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link href={`/movies/${movie.id}`}>
                <Image
                  width={200}
                  height={300}
                  src={movie.image}
                  alt={movie.title}
                  className="movie-card-image"
                />
                <div className="movie-card-info">
                  <h2 className="movie-card-title">{movie.title}</h2>
                  <p className="movie-card-release">{movie.releaseDate}</p>
                  {/* <p className="movie-card-release">{movie.id}</p> */}
                </div>
              </Link>
            </div>
          ))}
    </div>
  );
};

const Movies: React.FC = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const searchParams = useSearchParams();
  const queryFromURL = searchParams.get("search");

  useEffect(() => {
    if (queryFromURL && queryFromURL !== searchQuery) {
      setSearchQuery(queryFromURL);
    }
  }, [queryFromURL, searchQuery, setSearchQuery]);

  return (
    <main className="p-2 pt-10">
      <Suspense fallback={<div>Loading...</div>}>
        <MoviesList searchQuery={searchQuery || ""} />
      </Suspense>
    </main>
  );
};

export default Movies;

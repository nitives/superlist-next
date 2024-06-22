"use client";
import React, { useEffect, useState, useContext, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { SearchContext } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/customui/Button";

interface Movie {
  id: string;
  url: string;
  title: string;
  poster_path: string;
  release_date: string;
  type: string;
}

const TMDBkey = process.env.TMDB_API_KEY;

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const searchParams = useSearchParams();
  const queryFromURL = searchParams.get("search");

  useEffect(() => {
    if (queryFromURL && queryFromURL !== searchQuery) {
      setSearchQuery(queryFromURL);
    }
  }, [queryFromURL, searchQuery, setSearchQuery]);

  useEffect(() => {
    if (searchQuery) {
      fetchMovies(1);
    }
  }, [searchQuery]);

  const fetchMovies = async (page: number) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 5)); // Simulate a delay
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${TMDBkey}`;
      const { data } = await axios.get(url, { params: { page } });
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
      setHasMore(data.results.length > 0);
      setPage(page);
      console.log("Fetched movies:", data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchMovies(page + 1);
  };

  return (
    <main className="p-2 pt-10">
      <div className="movie-grid">
        <Suspense fallback={<div>Loading...</div>}>
          {loading && page === 1
            ? Array.from({ length: 24 }).map((_, index) => (
                <div key={index} className="movie-card">
                  <Skeleton className="w-auto h-[300px]" />
                </div>
              ))
            : movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <Link href={`/movies/movie/${movie.id}`}>
                    <Image
                      width={200}
                      height={300}
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/public/images/bg-dark-texture1.png"
                      }
                      alt={movie.title}
                      className="movie-card-image"
                    />
                    <div className="movie-card-info">
                      <h2 className="movie-card-title">{movie.title}</h2>
                      <p className="movie-card-release">
                        {movie.release_date.slice(0, 4)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
        </Suspense>
      </div>
      {hasMore && (
        <div className="flex justify-center mt-10">
          <Button
            variant={"subtle"}
            className="hover:!bg-foreground/10 active:!bg-foreground/25"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </main>
  );
}

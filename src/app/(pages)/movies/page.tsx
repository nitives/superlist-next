"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/customui/Button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LucideSettings2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SearchContext } from "@/components/SearchContext";

const TMDBkey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

interface Media {
  id: string;
  url: string;
  title: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  type: string;
}

interface ContinueWatchingItem {
  id: string;
  type: string;
  title: string;
  name?: string;
  poster_path: string;
  currentTime: number;
  duration: number;
  seasonNumber?: string;
  episodeNumber?: string;
  episodeTitle?: string;
}

export default function Discover() {
  const { searchQuery } = useContext(SearchContext);
  const [mediaType, setMediaType] = useState<string>("movie");
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    sort_by: "popularity.desc",
    year: "",
  });

  const fetchMedia = async (page: number, filters: any, mediaType: string) => {
    setLoading(true);
    try {
      const yearFilter =
        mediaType === "movie" ? "primary_release_year" : "first_air_date_year";
      const sortByFilter = filters.sort_by.startsWith("release_date")
        ? mediaType === "movie"
          ? filters.sort_by
          : filters.sort_by.replace("release_date", "first_air_date")
        : filters.sort_by;
      const params = {
        ...filters,
        [yearFilter]: filters.year,
        sort_by: sortByFilter,
      };
      delete params.year;

      let url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${TMDBkey}&page=${page}`;
      if (searchQuery) {
        url = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${TMDBkey}&query=${searchQuery}&page=${page}`;
      }
      const { data } = await axios.get(url, { params });
      if (page === 1) {
        setMedia(data.results);
      } else {
        setMedia((prevMedia) => [...prevMedia, ...data.results]);
      }
      setHasMore(data.results.length > 0);
      setPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContinueWatching = (): ContinueWatchingItem[] => {
    const items: ContinueWatchingItem[] = [];
    if (typeof window !== "undefined") {
      console.log("Fetching continue watching items from localStorage...");
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("videoTime-")) {
          const id = key.replace("videoTime-", "").split("-")[0]; // Extract the id part
          const currentTime = parseFloat(localStorage.getItem(key) || "0");
          if (currentTime > 30) {
            const type = localStorage.getItem(`videoType-${id}`) || "";
            const title = localStorage.getItem(`videoTitle-${id}`) || "";
            const poster_path = localStorage.getItem(`videoPoster-${id}`) || "";
            const duration = parseFloat(
              localStorage.getItem(`videoDuration-${id}`) || "0"
            );
            const seasonNumber =
              localStorage.getItem(`videoSeason-${id}`) || "";
            const episodeNumber =
              localStorage.getItem(`videoEpisode-${id}`) || "";
            const episodeTitle =
              localStorage.getItem(`videoEpisodeTitle-${id}`) || "";
            items.push({
              id,
              type,
              title,
              poster_path,
              currentTime,
              duration,
              seasonNumber,
              episodeNumber,
              episodeTitle,
            });
          }
        }
      }
      console.log("Fetched items:", items);
    }
    return items;
  };

  useEffect(() => {
    fetchMedia(1, filters, mediaType);
  }, [filters, mediaType, searchQuery]);

  const handleLoadMore = () => {
    fetchMedia(page + 1, filters, mediaType);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleMediaTypeChange = (value: string) => {
    setMediaType(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      year: "", // Reset year filter when changing media type
    }));
  };

  const continueWatchingItems = fetchContinueWatching();
  // console.log("continueWatchingItems:", continueWatchingItems);

  const calculatePercentageWatched = (
    currentTime: number,
    duration: number
  ) => {
    if (duration === 0) return 0;
    return (currentTime / duration) * 100;
  };

  const handleClearLocalStorage = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("video")) {
        localStorage.removeItem(key);
      }
    });
  };

  return (
    <main className="p-2 pt-10">
      <div>
        {continueWatchingItems.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Continue Watching</h2>
            <div className="continue-grid">
              {continueWatchingItems.map((item) => (
                <div key={item.id}>
                  <Link href={`movies/${item.type}/${item.id}`}>
                    <div className="continue-card">
                      <Image
                        width={200}
                        height={300}
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "/public/images/bg-dark-texture1.png"
                        }
                        alt={item.title || item.name || ""}
                        className="continue-card-image-main"
                        loading="lazy"
                        unoptimized
                      />
                      <div className="continue-card-info">
                        {item.type === "tv" && (
                          <p className="text-xs text-white text-left drop-shadow-lg">
                            {`S${item.seasonNumber}, E${item.episodeNumber}`} ·
                            {""}
                            {` ${item.episodeTitle} `}
                          </p>
                        )}
                        <p className="text-left pb-1 drop-shadow-lg">
                          {item.title}
                        </p>
                        <Progress
                          value={calculatePercentageWatched(
                            item.currentTime,
                            item.duration
                          )}
                        />
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-start pt-1"></div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <AlertDialog>
                <AlertDialogTrigger>
                  <span className="w-full bg-muted/50 active:bg-card hover:muted/20 cursor-pointer px-2 py-1 text-sm rounded-[14px]">
                    Delete Local Movie Data
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent className="!rounded-[14px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      local data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="!rounded-[14px]">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearLocalStorage}
                      className="!rounded-[14px]"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        )}
      </div>
      <div className="flex max-sm:justify-between justify-end gap-2 mb-4 max-sm:h-[50%]">
        <Popover>
          <PopoverTrigger className="flex h-10 py-2 px-4 text-sm max-sm:h-8 max-sm:py-1 max-sm:px-2 max-sm:text-xs items-center justify-between rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-fit">
            <LucideSettings2 size={16} className="mr-1" />
            Filter
          </PopoverTrigger>
          <PopoverContent align="end" className="pt-3 px-0">
            <p className="text-sm font-medium px-4">Filter</p>
            <hr className="border-t my-2 w-full" />
            <div className="flex flex-col gap-2 px-4 py-2">
              <div className="text-sm font-medium w-full flex justify-between">
                <p>Media Type</p>
              </div>
              <Select onValueChange={handleMediaTypeChange} value={mediaType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Media Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="movie">Movies</SelectItem>
                  <SelectItem value="tv">TV Shows</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <hr className="border-t my-2 w-full" />
            <div className="flex flex-col gap-2 px-4 py-2">
              <div className="text-sm font-medium w-full flex justify-between">
                <p>Year</p>
                <p
                  className="text-xs dark:text-muted-foreground text-muted cursor-pointer"
                  onClick={() => handleFilterChange("year", "")}
                >
                  Reset
                </p>
              </div>
              <Input
                type="number"
                placeholder="Year"
                className="w-full px-4"
                value={filters.year}
                onChange={(e) => handleFilterChange("year", e.target.value)}
              />
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger className="flex h-10 py-2 px-4 text-sm max-sm:h-8 max-sm:py-1 max-sm:px-2 max-sm:text-xs items-center justify-between rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-fit">
            <LucideSettings2 size={16} className="mr-1" />
            Sort By
          </PopoverTrigger>
          <PopoverContent align="end" className="pt-3 pb-6">
            <p className="text-sm font-medium">Sort By</p>
            <hr className="border-t my-2 w-[calc(100% + 10px)] relative right-[25px] px-[58%]" />
            <div className="flex flex-col gap-2">
              <RadioGroup
                onValueChange={(value) => handleFilterChange("sort_by", value)}
                value={filters.sort_by}
                defaultValue="popularity.asc"
              >
                <div className="text-sm font-medium w-full flex justify-between">
                  <p>Popularity</p>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="popularity.desc" />
                  <p className="text-sm font-medium">Ascending</p>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="popularity.asc" />
                  <p className="text-sm font-medium">Descending</p>
                </div>
              </RadioGroup>
              <hr className="border-t my-2 w-full" />
              <RadioGroup
                onValueChange={(value) => handleFilterChange("sort_by", value)}
                value={filters.sort_by}
                defaultValue="popularity.asc"
              >
                <div className="text-sm font-medium w-full flex justify-between">
                  <p>Release Date</p>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="release_date.desc" />
                  <p className="text-sm font-medium">Ascending</p>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="release_date.asc" />
                  <p className="text-sm font-medium">Descending</p>
                </div>
              </RadioGroup>
              <hr className="border-t my-2 w-full" />
              <RadioGroup
                onValueChange={(value) => handleFilterChange("sort_by", value)}
                value={filters.sort_by}
                defaultValue="popularity.asc"
              >
                <div className="text-sm font-medium w-full flex justify-between">
                  <p>Vote Average</p>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vote_average.desc" />
                  <p className="text-sm font-medium">Ascending</p>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vote_average.asc" />
                  <p className="text-sm font-medium">Descending</p>
                </div>
              </RadioGroup>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="movie-grid">
        {loading && page === 1
          ? Array.from({ length: 24 }).map((_, index) => (
              <div key={index} className="movie-card">
                <Skeleton className="w-auto aspect-[2/3]" />
              </div>
            ))
          : media.map((item) => (
              <div key={item.id} className="movie-card">
                <Link href={`movies/${mediaType}/${item.id}`}>
                  <Image
                    width={200}
                    height={300}
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "/public/images/bg-dark-texture1.png"
                    }
                    alt={item.title || item.name || ""}
                    className="movie-card-image-main"
                    loading="lazy"
                    unoptimized
                  />
                  <div className="movie-card-info">
                    <h2 className="movie-card-title">
                      {item.title || item.name}
                    </h2>
                    <p className="movie-card-release">
                      {item.release_date
                        ? item.release_date.slice(0, 4)
                        : item.first_air_date?.slice(0, 4)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-10">
          <Button
            variant={"subtle"}
            className="hover:!bg-foreground/10 active:!bg-foreground/25 max-sm:text-sm max-sm:px-2 max-sm:py-1"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </main>
  );
}

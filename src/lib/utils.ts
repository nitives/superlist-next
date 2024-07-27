"use client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SearchContext } from "@/components";
import { useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TMDBkey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function FetchSearchTMDB(id: string, type: string) {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const searchParams = useSearchParams();
  const queryFromURL = searchParams.get("search");
  useEffect(() => {
    if (queryFromURL && queryFromURL !== searchQuery) {
      setSearchQuery(queryFromURL);
    }
  }, [queryFromURL, searchQuery, setSearchQuery]);
  try {
    const url = new URL(
      `https://api.themoviedb.org/3/search/movie?query='${searchQuery}'api_key=${TMDBkey}`
    );
    const response = await fetch(url.toString(), { cache: "no-cache" });
    if (!response.ok) throw new Error("FetchSearchTMDB | Failed to fetch data");
    const data = await response.json();
    console.log("FetchSearchTMDB data:", data);
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function FetchDetailsTMDB(id: string, type: string) {
  try {
    const url = new URL(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDBkey}`
    );
    const response = await fetch(url.toString(), { cache: "no-cache" });
    if (!response.ok)
      throw new Error("FetchDetailsTMDB | Failed to fetch data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function FetchRecommendationsTMDB(id: string, type: string) {
  try {
    const url = new URL(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${TMDBkey}`
    );
    const response = await fetch(url.toString(), { cache: "no-cache" });
    if (!response.ok)
      throw new Error("FetchRecommendationsTMDB | Failed to fetch data");
    const data = await response.json();
    // console.log("FetchRecommendationsTMDB data:", data);
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function FetchMoreDetailsTMDB(id: string, type: string) {
  try {
    const url = new URL(
      `https://superlist-consumet-api.vercel.app/meta/tmdb/info/${id}?type=${type}?api_key=${TMDBkey}`
    );
    const response = await fetch(url.toString(), { cache: "no-cache" });
    if (!response.ok)
      throw new Error("FetchMoreDetailsTMDB | Failed to fetch data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function FetchTVDetailsTMDB(
  id: string,
  season: string,
  language?: string
) {
  try {
    const url = new URL(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${TMDBkey}`
    );
    const response = await fetch(url.toString(), { cache: "no-cache" });
    if (!response.ok)
      throw new Error("FetchTVDetailsTMDB | Failed to fetch data");
    const data = await response.json();
    console.log("FetchTVDetailsTMDB data:", data);
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

// export async function fetchVidSrc(
//   type: string,
//   id: string,
//   season?: number,
//   episode?: number,
//   callback?: any
// ) {
//   const apiBaseUrl = "https://vidsrc.to/embed/";
//   const baseURL =
//     type === "movie"
//       ? `${apiBaseUrl}/${type}/${id}`
//       : `${apiBaseUrl}/${type}/${id}?s=${season}&e=${episode}`;
//   try {
//     const res = await fetch(baseURL);
//     const data = await res.json();
//     console.log("Data:", data);
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }

import { create } from "zustand";
import { FetchMoreDetailsTMDB, FetchDetailsTMDB } from "@/lib/utils";
import { Movie } from "@/lib/types";

interface MediaState {
  mediaDetails: Movie | null;
  loading: boolean;
  error: string | null;
  fetchMediaDetails: (id: string, type: "movie" | "tv") => Promise<void>;
}

const measurePerformance = async (label: string, fn: () => Promise<any>) => {
  console.log(
    `%c[Superlist Speed Insights]%c Fetching... | "${label}"`,
    "color: rgb(33, 254, 96)",
    "color: inherit"
  );
  const startTime = performance.now();
  const result = await fn();
  const endTime = performance.now();
  const timeTaken = (endTime - startTime) / 1000; // time in seconds
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  if (minutes === 0) {
    console.log(
      `%c[Superlist Speed Insights]%c ${label} took ${seconds.toFixed(
        2
      )} seconds`,
      "color: rgb(33, 254, 96)",
      "color: inherit"
    );
  } else {
    console.log(
      `%c[Superlist Speed Insights]%c ${label} took ${minutes} minutes and ${seconds.toFixed(
        2
      )} seconds`,
      "color: rgb(33, 254, 96)",
      "color: inherit"
    );
  }
  return result;
};

export const useMediaStore = create<MediaState>((set) => ({
  mediaDetails: null,
  loading: false,
  error: null,
  fetchMediaDetails: async (id: string, type: "movie" | "tv") => {
    set({ loading: true, error: null });
    try {
      const mediaDetails = await measurePerformance("FetchDetailsTMDB", () =>
        FetchDetailsTMDB(id, type)
      );
      const moreDetails = await measurePerformance("FetchMoreDetailsTMDB", () =>
        FetchMoreDetailsTMDB(id, type)
      );
      set({
        mediaDetails: { ...mediaDetails, extra: moreDetails },
        loading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: String(error), loading: false });
      }
    }
  },
}));

import { create } from "zustand";
import { FetchMoreDetailsTMDB, FetchDetailsTMDB } from "@/lib/utils";
import { Movie } from "@/lib/types";

interface MediaState {
  mediaDetails: Movie | null;
  loading: boolean;
  error: string | null;
  fetchMediaDetails: (id: string, type: "movie" | "tv") => Promise<void>;
}

export const useMediaStore = create<MediaState>((set) => ({
  mediaDetails: null,
  loading: false,
  error: null,
  fetchMediaDetails: async (id: string, type: "movie" | "tv") => {
    set({ loading: true, error: null });
    try {
      const mediaDetails = {
        ...(await FetchDetailsTMDB(id, type)),
        ...(await FetchMoreDetailsTMDB(id, type)),
      };
      set({ mediaDetails, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: String(error), loading: false });
      }
    }
  },
}));

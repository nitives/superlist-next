"use client";
import React, { useState, useContext, Suspense } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { SearchContext } from "@/components";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSearchQuery } = useContext(SearchContext); // Use the context
  const router = useRouter();

  const handleSearch = () => {
    setSearchQuery(searchTerm); // Set the search query in context
    router.push(`/movies?search=${searchTerm}`); // Redirect to the movies page with search term
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="hidden sm:inline-flex bg-background/50 main-border items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64">
          <span className="hidden lg:inline-flex">Search...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border border-black/10 bg-muted/20 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
        <div className="sm:hidden block">
          <FaSearch className="dark:fill-neutral-200 fill-foreground" />
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center bg-background/50 backdrop-blur-md p-2 !rounded-[1rem] search-con pl-5 gap-1">
        <FaSearch className="dark:fill-neutral-200 fill-foreground" />
        <Suspense>
          <input
            id="searchInput"
            className="bg-transparent block w-full h-12 px-3 py-1 transition-colors leading-tight placeholder:text-neutral-500 outline-2 outline-none text-xl"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

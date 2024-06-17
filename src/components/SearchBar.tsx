"use client";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  return (
    <Dialog>
      <DialogTrigger className="bg-background/50 main-border inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64">
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </DialogTrigger>
      <DialogContent className="flex items-center bg-background/50 backdrop-blur-md p-2 !rounded-[1rem] search-con pl-5 gap-1">
        <FaSearch className="fill-neutral-200" />
        <input
          id="searchInput"
          className="bg-transparent block w-full h-12 px-3 py-1 transition-colors leading-tight placeholder:text-neutral-500 outline-2 outline-none text-xl"
          type="search"
          placeholder="Search..."
        />
      </DialogContent>
    </Dialog>
  );
};

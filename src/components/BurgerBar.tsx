"use client";
import { Cross as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";

export const BurgerBar = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <SearchBar />
        <div className="scale-[0.6]">
          <Hamburger size={24} toggled={isOpen} toggle={toggleMenu} />
        </div>
      </div>
      <div
        className={`menu bg-background ${
          isOpen ? "!h-[1000vh] !py-[120px] !px-[25px]" : "!h-0"
        }`}
      >
        <ul
          className={`menu-text relative flex flex-col text-xl text-foreground z-10 gap-2 ${
            isOpen ? "!opacity-100" : "!opacity-0"
          }`}
        >
          <Link href="/bookmarks">Bookmarks</Link>
          <Link href="/downloads">Downloads</Link>
          <Link href="/movies">Movies</Link>
        </ul>
      </div>
    </div>
  );
};

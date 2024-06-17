"use client";
import { Cross as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export const BurgerBar = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
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
      <div className="flex items-center justify-center scale-[0.8]">
        <Hamburger size={24} toggled={isOpen} toggle={toggleMenu} />
      </div>
      <div
        className={`menu bg-background ${
          isOpen ? "!h-[1000vh] !py-[120px] !px-[25px]" : "!h-0"
        }`}
      >
        <ul
          className={`menu-text relative flex flex-col text-foreground z-10 gap-2 text-3xl ${
            isOpen ? "!opacity-100" : "!opacity-0"
          }`}
        >
          <Link href="/downloads">Downloads</Link>
          <Link href="/bookmarks">Bookmarks</Link>
        </ul>
      </div>
    </div>
  );
};

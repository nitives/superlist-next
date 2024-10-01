"use client";
import { Cross as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";

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
      document.documentElement.classList.add("globalnav-noscroll");
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("globalnav-noscroll");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("globalnav-noscroll");
    };
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      height: "100dvh",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.75,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const MainContainerVariants = {
    hidden: { height: "0dvh" },
    show: {
      opacity: 1,
      height: "100dvh",
    },
    exit: { opacity: 0, height: "0dvh", transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5, transition: { stiffness: 100 } },
    show: { opacity: 1, y: 0, transition: { stiffness: 100 } },
    exit: { opacity: 0, y: -5, transition: { stiffness: 100 } },
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <SearchBar />
        <div className="scale-[0.6] z-10 relative">
          <Hamburger size={24} toggled={isOpen} toggle={toggleMenu} />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu bg-background"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={MainContainerVariants}
          >
            <motion.div className="pt-[75px]">
              <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="menu-text relative flex flex-col text-xl text-foreground z-10 gap-2"
              >
                <motion.li variants={itemVariants} onClick={closeMenu}>
                  <Link href="/bookmarks">Bookmarks</Link>
                </motion.li>
                <motion.li variants={itemVariants} onClick={closeMenu}>
                  <Link href="/downloads">Downloads</Link>
                </motion.li>
                <motion.li variants={itemVariants} onClick={closeMenu}>
                  <Link href="/movies">Movies</Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

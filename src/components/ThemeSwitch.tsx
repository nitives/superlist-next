"use client";
import * as React from "react";
import { FaMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitch() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hidden md:flex gap-3 items-center cursor-pointer">
          <LuSunMedium
            size={20}
            className="hover:opacity-70 duration-300 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <FaMoon
            size={20}
            className="hover:opacity-70 duration-300 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// export const ThemeSwitch = () => {
//   return (
//     <>
//       <div className="hidden md:flex gap-3 items-center">
//         <p>a</p>
//       </div>
//     </>
//   );
// };

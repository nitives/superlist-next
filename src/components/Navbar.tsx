import {
  Logo1,
  VersionSwitch,
  SearchBar,
  Socials,
  BurgerBar,
} from "@/components";
import Link from "next/link";
export const Navbar = () => {
  return (
    <div className="grayscale sticky top-4 z-20 inset-0 h-[60px] bg-black/10 dark:bg-black/ main-border backdrop-blur-[5px] w-[95%] mx-auto rounded-[15px] flex max-w-[90rem] min-w-1 items-center justify-between p-5 px-2 lg:px-8">
      <div className="flex">
        <a href="./" className="px-2 items-center flex w-12">
          <Logo1 />
        </a>
        <VersionSwitch />
      </div>
      <div className="w-full px-5 text-sm gap-4 hidden text-muted-foreground sm:flex *:transition-all *:ease-in *:duration-300">
        <Link className="hover:text-primary" href={"/bookmarks"}>
          Bookmarks
        </Link>
        <Link className="hover:text-primary" href={"/downloads"}>
          Downloads
        </Link>
        <Link className="hover:text-primary" href={"/movies"}>
          Movies
        </Link>
      </div>
      <div className="gap-4 max-sm:hidden flex">
        <SearchBar />
        <Socials />
      </div>
      <div className="sm:hidden">
        <BurgerBar />
      </div>
    </div>
  );
};

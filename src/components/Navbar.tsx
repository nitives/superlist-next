import { Logo1, VersionSwitch, SearchBar, Socials } from "@/components";

export const Navbar = () => {
  return (
    <nav className="sticky top-4 z-10 inset-0 h-[60px] bg-black/10 dark:bg-black/ main-border backdrop-blur-[5px] w-[95%] mx-auto rounded-[15px] flex max-w-[90rem] min-w-1 items-center justify-between p-5 lg:px-8">
      <div className="flex">
        <a href="./" className="px-2 items-center flex">
          <Logo1 />
        </a>
        <VersionSwitch />
      </div>
      <div className="gap-4 hidden sm:flex">
        <SearchBar />
        <Socials />
      </div>
    </nav>
  );
};

import { Site, SiteContainer, FilterBar } from "@/components";
import sitesData from "./content/siteData.json"; // Adjust the path as needed
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

interface SiteData {
  name: string;
  categories: string[];
  imageSrc: string;
  link: string;
}

export default function Home() {
  return (
    <main className="p-2">
      <div className="w-full mx-auto my-0 ">
        <div className="mt-5 my-5 items-center flex-col flex ">
          <div className="*:transition-colors *:duration-500 *:fill-foreground/50 hover:*:fill-foreground/90">
            <a
              className="bg-neutral-800/10 dark:bg-white/10 hover:dark:bg-white/15 hover:bg-neutral-800/50 text-foreground/50 hover:text-background dark:text-foreground/50 flex items-center h-7 main-border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2"
              rel="noopener"
              href="./og"
            >
              <p className="select-none">Superlist 3.7</p>
              <ChevronRightIcon className=" size-4 relative left-[2px]" />
            </a>
          </div>

          <div className="uppercase text-center">
            {/* <Suspense fallback={<Skeleton />}>
              <h1 className="text-[6em] font-bold text-center">Superlist.cc</h1>
            </Suspense> */}

            <a className="text-foreground md:text-[4em] text-[2.3em] md:leading-[3.3rem] leading-[1.9rem] md:max-w-[600px] max-w-[300px] font-bold text-center  align-middle  tracking-tighter inline-block mt-5">
              Websites curated from the{" "}
              <span className="text-[1em] opacity-50">dark side</span> of the
              web
            </a>
          </div>
        </div>
      </div>

      <FilterBar />

      <SiteContainer>
        <Suspense fallback={<Skeleton />}>
          {sitesData.map((site: SiteData, index: number) => (
            <Site
              key={index}
              name={site.name}
              categories={site.categories}
              imageSrc={site.imageSrc}
              link={site.link}
            />
          ))}
        </Suspense>
      </SiteContainer>
    </main>
  );
}

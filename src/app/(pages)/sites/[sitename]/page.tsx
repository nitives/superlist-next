"use client";
import React from "react";
import { usePathname } from "next/navigation";
import sitesData from "../../../../../public/data/siteData.json";
import Image from "next/image";
import { Button } from "@/components/customui/Button";
import { BookmarkIcon } from "@heroicons/react/24/outline";
// import ReadMoreReact from "read-more-react";

export default function SiteDetails() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop()?.replace(/-/g, " "); // Replace dashes with spaces
  const site = sitesData.find(
    (site) => site.name.toLowerCase() === lastSegment
  );
  console.log(
    "Hey you're on the",
    site?.name,
    "page right now, what are you doing here in the console?"
  );

  return (
    <main className="md:p-8 p-4 md:pt-24 pt-7 pb-[10vw] flex justify-center min-h-[3rem]">
      {site ? (
        <div className="md:flex grid justify-center md:gap-9 gap-2 lg:max-w-6xl lg:min-w-[72rem] ">
          <div className="grid justify-end w-full">
            <Image
              priority
              className="page-site border rounded-[10px]"
              src={site.imageSrc}
              height={300}
              width={500}
              alt={`Photo of the site ${site.name}`}
            />
          </div>

          <div className="w-full justify-start">
            <h1 className="font-bold md:text-[3rem] text-[2.5rem] md:pb-0 pb-2">
              {site.name}
            </h1>
            <div className="w-fit flex gap-1 -mt-2 mb-[0.3rem]">
              {site.categories.map((category, index) => (
                <p
                  key={index}
                  className="bg-foreground/5 p-1 border rounded-md flex text-xs"
                >
                  {category}
                </p>
              ))}
            </div>
            <div className="z-0 md:text-[0.8rem] text-[1rem] max-w-96 opacity-60 pb-2">
              <p>{site.description}</p>
              {/* <ReadMoreReact
                min={80}
                ideal={100}
                max={200}
                readMoreText={
                  <a className="text-foreground/60 text-sm cursor-pointer z-20 relative">
                    Read more
                  </a>
                }
                text={site.description}
              /> */}
            </div>

            <div className="w-fit flex gap-1 py-2">
              {site.important && (
                <p className="max-w-[24rem] opacity-50 bg-destructive/10 p-1 border border-destructive text-destructive-foreground rounded-md flex text-xs">
                  {site.important}
                </p>
              )}
            </div>
            <div className="gap-5 flex z-10 relative md:w-auto w-full justify-evenly">
              <Button
                size="lg"
                href={site.link}
                className="items-center z-[inherit] w-full"
              >
                Visit
              </Button>

              <Button
                disabled
                variant="disabled"
                size="lg"
                className="z-[inherit] w-full justify-center items-center gap-2 px-5 bg-foreground/5 hover:bg-foreground/5 active:bg-foreground/10 text-foreground"
              >
                <BookmarkIcon className="stroke-foreground w-4 stroke-[2px]" />{" "}
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p>Site not found</p>
      )}
    </main>
  );
}

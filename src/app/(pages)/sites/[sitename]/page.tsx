"use client";
import { usePathname } from "next/navigation";
import sitesData from "../../../content/siteData.json";
import Image from "next/image";
import { Button } from "@/components/customui/Button";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import ReadMoreReact from "read-more-react";

export default function SiteDetails() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const site = sitesData.find(
    (site) => site.name.toLowerCase() === lastSegment
  );
  console.log(
    "Hey you're on the",
    site?.name,
    "page right now, what are you doing here in the console?"
  );

  return (
    <main className="p-8 pt-24 pb-[10vw]">
      {site ? (
        <div className="flex justify-center gap-9">
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

          <div className="w-full grid justify-start">
            <section>
              <h1 className="font-bold text-[3vw]">{site.name}</h1>
              <div className="w-fit flex gap-1 -mt-2 mb-1">
                {site.categories.map((category, index) => (
                  <p
                    key={index}
                    className="bg-foreground/5 p-1 border rounded-md flex text-xs"
                  >
                    {category}
                  </p>
                ))}
              </div>
              <div className="z-0 text-[0.8vw] max-w-96 opacity-60 pb-2">
                <ReadMoreReact
                  readMoreText={
                    <a className="text-foreground/60 text-sm cursor-pointer z-20 relative">
                      Read more
                    </a>
                  }
                  text={site.description}
                />
              </div>

              <div className="w-fit flex gap-1 py-2">
                {site.important && (
                  <p className="max-w-[24rem] opacity-50 bg-destructive/10 p-1 border border-destructive text-destructive-foreground rounded-md flex text-xs">
                    {site.important}
                  </p>
                )}
              </div>
              <div className="gap-5 flex z-10 relative top-[-28px]">
                <Button
                  size="lg"
                  href={site.link}
                  className="mt-4 items-center z-[inherit]"
                >
                  Visit
                </Button>

                <Button
                  disabled
                  variant="disabled"
                  size="lg"
                  className="z-[inherit] mt-4 justify-center items-center gap-2 px-5 bg-foreground/5 hover:bg-foreground/5 active:bg-foreground/10 text-foreground"
                >
                  <BookmarkIcon className="stroke-foreground w-4 stroke-[2px]" />{" "}
                  Save
                </Button>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <p>Site not found</p>
      )}
    </main>
  );
}

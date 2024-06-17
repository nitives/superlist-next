import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SiteProps {
  name: string;
  categories: string[];
  imageSrc: string;
  link: string;
}

export const Site = ({ name, categories, imageSrc, link }: SiteProps) => {
  return (
    <>
      <div className="site-h rounded-[26px] size-fit p-4 gap-2 grid transition-all duration-250">
        {/* <a href={link}> */}

        <a
          href={`/sites/${encodeURIComponent(
            name.toLowerCase().replace(/\s+/g, "-")
          )}`}
        >
          <Suspense
            fallback={
              <Skeleton className="site rounded-[10px] h-[18.83rem] !w-auto" />
            }
          >
            <div className="rounded-[10px] overflow-hidden flex items-center align-middle justify-center size-fit border-2 dark:border-white/10">
              <Image
                loading="lazy"
                className="site"
                src={imageSrc}
                height={300}
                width={500}
                alt={`Photo of the site ${name}`}
              />
            </div>
          </Suspense>
        </a>
        <Suspense fallback={<Skeleton className="h-6" />}>
          <div className="flex justify-between content-center items-center flex-none h-min overflow-visible p-0 relative w-full">
            <div className="flex gap-1 cursor-pointer hover:opacity-70 transition-opacity duration-250">
              <a className="font-bold">{name}</a>
              <a>·</a>
              <a>{categories.length > 0 ? categories[0] : "No Category"}</a>
            </div>
            <div className="flex gap-1 cursor-pointer hover:opacity-70 transition-opacity duration-250">
              <Link href={link}>
                <ArrowUpRightIcon className="w-4 stroke-foreground/50 stroke-2 mr-1" />
              </Link>
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
};

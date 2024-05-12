import Image from "next/image";

interface SiteProps {
  name: string;
  categories: string[];
  imageSrc: string;
  link: string;
}

export const Site = ({ name, categories, imageSrc }: SiteProps) => {
  return (
    <>
      <div className="site-h rounded-[26px] size-fit p-4 gap-2 grid transition-all duration-250">
        {/* <a href={link}> */}
        <a
          href={`/sites/${encodeURIComponent(
            name.toLowerCase().replace(/\s+/g, "-")
          )}`}
        >
          <div className="rounded-[10px] overflow-hidden flex items-center align-middle justify-center size-fit border-2 dark:border-white/10">
            <Image
              className="site"
              src={imageSrc}
              height={300}
              width={500}
              alt={`Photo of ${name}`}
            />
          </div> 
        </a>

        <div className="flex content-center items-center flex-none h-min overflow-visible p-0 relative w-full">
          <div className="flex gap-1 cursor-pointer hover:opacity-70 transition-opacity duration-250">
            <a className="font-bold">{name}</a>
            <a>·</a>
            <a>{categories.length > 0 ? categories[0] : "No Category"}</a>
          </div>
        </div>
      </div>
    </>
  );
};

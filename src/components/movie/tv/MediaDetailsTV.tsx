"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FetchDetailsTMDB, FetchMoreDetailsTMDB } from "@/lib/utils";
import { TimeConvert } from "../../TimeConvert";
import { Skeleton } from "../../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PLACEHOLDER_IMG_LIGHT, PLACEHOLDER_IMG_DARK } from "../placeholder";
import { useTheme } from "next-themes";
import MediaPickerTV from "./MediaPickerTV";
import Head from "next/head";

export default function MediaDetailsTV({
  onEpisodeClick,
}: {
  onEpisodeClick: (url: string) => void;
}) {
  const { id } = useParams();
  const [tv, setTV] = useState<any>(null);
  const [tvX, setTVX] = useState<any>(null);

  useEffect(() => {
    const getTVDetails = async () => {
      if (id) {
        await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms wait
        const data = await FetchDetailsTMDB(`${id}`, "tv");
        const details = await FetchMoreDetailsTMDB(`${id}`, "tv");
        setTV(data);
        setTVX(details);
      }
    };

    getTVDetails();
  }, [id]);

  const { theme } = useTheme();
  const placeholderImage =
    theme === "dark" || "system"
      ? `${PLACEHOLDER_IMG_DARK}`
      : `${PLACEHOLDER_IMG_LIGHT}`;

  useEffect(() => {
    if (tv) {
      document.title = "Superlist - " + tv.name;
    }
  });

  if (!tv || !tvX) {
    return (
      <div className="flex max-sm:flex-col pt-[1rem] max-sm:pt-[2rem] px-[10rem] max-md:px-[3rem] max-sm:px-[1rem] w-full h-auto gap-4 justify-center">
        <div className="max-sm:w-full flex items-center justify-center">
          <Skeleton
            id="tv.poster_path"
            className="w-[500px] h-[600px] mb-2 border rounded-2xl max-w-[400px]"
          />
        </div>
        <div className="max-w-[50rem] pt-[5rem]">
          <Skeleton
            id="tv.release_date"
            className="w-[10rem] h-5 rounded-md my-0.5"
          />
          <div className="flex items-center">
            <Skeleton
              id="tv.name.skeleton"
              className="w-[10rem] h-8 rounded-md my-0.5"
            />
          </div>
          <div className="flex gap-1 items-center py-1 select-none flex-wrap">
            <Skeleton
              id="tv.genres.skeleton"
              className="w-[15rem] h-7 rounded-md my-0.5"
            />
          </div>
          <Skeleton
            id="tv.overview.skeleton"
            className="w-[40rem] h-40 rounded-md my-0.5 mb-3"
          />
          <Skeleton
            id="tv.seasons"
            className="w-[40rem] h-60 rounded-md my-0.5"
          />
        </div>
      </div>
    );
  }

  const handleEpisodeClick = (episodeUrl: string) => {
    onEpisodeClick(episodeUrl);
  };

  return (
    <>
      <Head>
        <title>Superlist - {tv.name}</title>{" "}
      </Head>
      <div className="flex max-sm:flex-col pt-[1rem] max-sm:pt-[2rem] px-[10rem] max-md:px-[3rem] max-sm:px-[1rem] w-full h-auto gap-4 justify-center">
        <div className="max-sm:w-full flex items-center justify-center">
          <Image
            draggable={false}
            width={400}
            height={600}
            placeholder={`data:image/${placeholderImage}`}
            src={
              tv.poster_path
                ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                : "/public/images/bg-dark-texture1.png"
            }
            alt={tv.name}
            className="border rounded-2xl w-[35rem] lg:max-w-[400px] max-sm:w-[80rem] max-sm:max-w-[85vw] min-w-48 select-none"
            loading="lazy"
          />
        </div>
        <div className="max-w-[50rem] max-h-[50rem] pt-[5rem] max-sm:flex-col max-sm:pt-[0rem]">
          <p className="text-sm text-muted dark:text-muted-foreground">
            <TimeConvert>{tv.first_air_date}</TimeConvert> -{" "}
            <TimeConvert>{tv.last_air_date}</TimeConvert>
          </p>
          <div className="flex">
            <h1 className="text-4xl font-bold">{tv.name}</h1>
            {tv.adult !== false ? (
              <p className="select-none bg-foreground/[0.025] pt-[0.2rem] pb-[0.3rem] pl-[0.42rem] pr-[.45rem] leading-3 ml-1 border rounded-md flex text-xs size-fit items-center justify-center">
                Adult
              </p>
            ) : null}
          </div>

          <div className="flex gap-1 items-center py-1 select-none flex-wrap">
            {tv.genres.map((category: any, index: number) => (
              <p
                key={index}
                className="bg-foreground/5 p-1 border rounded-md flex text-xs w-fit flex-wrap"
              >
                {category.name}
              </p>
            ))}
            <span className="text-sm text-muted">|</span>
            <p className="bg-foreground p-1 rounded-md flex text-xs min-w-6w text-background">
              {tv.vote_average.toFixed(1)}
            </p>
          </div>
          <p className="max-w-[40rem] text-muted-foreground">{tv.overview}</p>
          <Tabs
            defaultValue={tvX.seasons[0]?.season?.toString()}
            className="w-full mt-2"
          >
            <TabsList className="bg-muted/25 dark:bg-muted/100">
              {tvX.seasons.map((season: any) => (
                <TabsTrigger
                  key={season.season}
                  value={season.season.toString()}
                >
                  Season {season.season}
                </TabsTrigger>
              ))}
            </TabsList>
            {tvX.seasons.map((season: any) => (
              <TabsContent key={season.season} value={season.season.toString()}>
                <MediaPickerTV className="bg-transparent">
                  {season.episodes ? (
                    season.episodes.map((episode: any, index: number) => (
                      <button
                        onClick={() =>
                          handleEpisodeClick(
                            `https://vidsrc.to/embed/tv/${id}/${season.season}/${episode.episode}`
                          )
                        }
                        key={index}
                        className="bg-muted/25 dark:bg-muted/100 hover:bg-muted-foreground/40 py-1.5 rounded-md flex text-xs w-12 px-1 text-foreground items-center justify-center"
                      >
                        {episode.episode}
                      </button>
                    ))
                  ) : (
                    <p>No episodes available.</p>
                  )}
                </MediaPickerTV>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
}

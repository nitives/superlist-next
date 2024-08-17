"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FetchDetailsTMDB,
  FetchMoreDetailsTMDB,
  FetchTVDetailsTMDB,
} from "@/lib/utils";
import { TimeConvert } from "../../TimeConvert";
import { Skeleton } from "../../ui/skeleton";
import { PLACEHOLDER_IMG_LIGHT, PLACEHOLDER_IMG_DARK } from "../placeholder";
import { useTheme } from "next-themes";
import MediaPickerTV from "./MediaPickerTV";
import Head from "next/head";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SeasonPicker from "./SeasonPicker";

export default function MediaDetailsTV({
  onEpisodeClick,
}: {
  onEpisodeClick: (url: string, title: string) => void;
}) {
  const { id } = useParams();
  const [tv, setTV] = useState<any>(null);
  const [tvX, setTVX] = useState<any>(null);
  const [stills, setTVStills] = useState<any>(null);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);

  console.log("useEffect to getTVDetails | ID:", id);

  useEffect(() => {
    const getTVDetails = async () => {
      if (id) {
        await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms wait
        const data = await FetchDetailsTMDB(`${id}`, "tv");
        const details = await FetchMoreDetailsTMDB(`${id}`, "tv");
        const imgdata = await FetchTVDetailsTMDB(`${id}`, `${selectedSeason}`);
        setTV(data);
        setTVX(details);
        setTVStills(imgdata);

        // Automatically select the first season and first episode
        if (details.seasons.length > 0) {
          const firstSeason = details?.seasons[0]?.season;
          console.log("firstSeason", firstSeason);
          setSelectedSeason(firstSeason);
          const firstEpisode = details?.seasons[0]?.episodes[0].episode;
          console.log("firstEpisode", firstEpisode);
          setSelectedEpisode(firstEpisode);
          onEpisodeClick(
            `https://vidsrc.pro/embed/tv/${id}/${firstSeason}/${firstEpisode}`,
            details?.seasons[0]?.episodes[0].title
          );
          console.log(
            "onEpisodeClick - ",
            `https://vidsrc.pro/embed/tv/${id}/${firstSeason}/${firstEpisode}`,
            details?.seasons[0]?.episodes[0].title
          );
        }
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

  const handleEpisodeClick = (episode: any) => {
    setSelectedEpisode(episode);
    onEpisodeClick(
      `https://vidsrc.pro/embed/tv/${id}/${selectedSeason}/${episode.episode}`,
      episode.title
    );
  };

  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

  if (tvX) {
    console.log("tvX:", tvX);
  }

  // if (stills) {
  //   console.log("FetchTVDetailsTMDB Path:", stills.episodes[0].still_path);
  //   console.log("FetchTVDetailsTMDB:", stills);
  //   console.log("FetchTVDetailsTMDB Selected Seasons:", selectedSeason);
  // }

  if (!tv || !tvX) {
    return (
      <div className="flex max-sm:flex-col pt-[1rem] max-sm:pt-[2rem] px-[10rem] max-md:px-[3rem] max-sm:px-[1rem] w-full h-auto gap-4 justify-center">
        <div className="max-sm:w-full flex items-start justify-center">
          <Skeleton
            id="tv.poster_path"
            className="aspect-[2/3] mb-2 border rounded-2xl w-[35rem] lg:max-w-[400px] max-sm:w-[80rem] max-sm:max-w-[85vw] min-w-48 select-none"
          />
        </div>
        <div className="max-w-[50rem] max-h-[50rem] max-sm:flex-col max-sm:pt-[0rem] flex gap-1 flex-col">
          <Skeleton
            id="tv.release_date"
            className="w-[10rem] max-sm:w-full h-5 rounded-md"
          />
          <div className="flex items-center">
            <Skeleton
              id="tv.name.skeleton"
              className="w-[10rem] max-sm:w-full h-8 rounded-md"
            />
          </div>
          <div className="flex items-center select-none flex-wrap">
            <Skeleton
              id="tv.genres.skeleton"
              className="w-[15rem] max-sm:w-full h-7 rounded-md"
            />
          </div>
          <Skeleton
            id="tv.overview.skeleton"
            className="w-[40rem] max-md:w-full h-40 rounded-2xl"
          />
          <Skeleton
            id="tv.seasons"
            className="w-[40rem] max-md:w-full h-[56.5%] rounded-2xl"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Superlist - {tv.name}</title>{" "}
      </Head>
      <div className="flex max-sm:flex-col pt-[1rem] max-sm:pt-[2rem] px-[10rem] max-md:px-[3rem] max-sm:px-[1rem] w-full h-auto gap-4 justify-center">
        <div className="max-sm:w-full flex items-start justify-center">
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
            unoptimized
          />
        </div>
        <div className="max-w-[50rem] max-h-[50rem] max-sm:flex-col max-sm:pt-[0rem]">
          <p className="text-sm text-muted dark:text-muted-foreground">
            <TimeConvert>{tv.first_air_date}</TimeConvert> -{" "}
            <TimeConvert>{tv.last_air_date}</TimeConvert>
          </p>
          <div className="flex">
            <h1 className="text-4xl font-bold">{tv.name}</h1>
            {tv.adult !== false ? (
              <p className="select-none bg-foreground/[0.025] pt-[0.2rem] pb-[0.3rem] pl/[.45rem] leading-3 ml-1 border rounded-md flex text-xs size-fit items-center justify-center">
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

          <Drawer>
            <DrawerContent className="rounded-t-2xl px-5 pb-5">
              <div className="mx-auto w-full max-w-sm ">
                <DrawerHeader className="">
                  <DrawerTitle>{tv.name}</DrawerTitle>
                  <DrawerDescription>Description</DrawerDescription>
                </DrawerHeader>
                <p>{tv.overview}</p>
                <DrawerClose asChild className="mt-4">
                  <button className="w-full bg-muted active:bg-muted/50 cursor-pointer px-4 py-2 rounded-xl">
                    Cancel
                  </button>
                </DrawerClose>
              </div>
            </DrawerContent>
            <div className="flex gap-1 items-end">
              <p className="max-w-[40rem] text-muted-foreground h-20 max-sm:w-[110%] sm:hidden line-clamp-2 max-sm:max-h-12">
                {tv.overview}
              </p>
              <DrawerTrigger asChild className="sm:hidden">
                <button className="font-bold right-[0.5rem] relative">
                  More
                </button>
              </DrawerTrigger>
            </div>
          </Drawer>

          <p className="max-w-[40rem] text-muted-foreground max-sm:hidden">
            {tv.overview}
          </p>

          <Tabs
            defaultValue={selectedSeason?.toString()}
            onValueChange={(value) => handleSeasonChange(parseInt(value))}
            className="w-full mt-2"
          >
            <SeasonPicker className="bg-transparent">
              <TabsList className="bg-muted/25 dark:bg-muted/50 backdrop-blur-md rounded-lg">
                {tvX.seasons.map((season: any) => (
                  <TabsTrigger
                    key={season.season}
                    value={season.season.toString()}
                  >
                    Season {season.season}
                  </TabsTrigger>
                ))}
              </TabsList>
            </SeasonPicker>

            {tvX.seasons.map((season: any) => (
              <TabsContent key={season.season} value={season.season.toString()}>
                <MediaPickerTV className="bg-transparent">
                  {season.episodes ? (
                    season.episodes.map((episode: any, index: number) => (
                      <div key={index}>
                        <button
                          aria-label={`${episode.episode} - ${episode.title}`}
                          onClick={() => handleEpisodeClick(episode)}
                          key={index}
                          className="size-fit"
                        >
                          <div className="flex flex-col items-start max-sm:w-full">
                            <div className="overlay-outline-container hover:scale-[1.02] transition-all ease duration-300 bg-[#0f0f0f] rounded-2xl">
                              {/* <Image
                                draggable={false}
                                width={330}
                                height={600}
                                placeholder={`data:image/${placeholderImage}`}
                                src={
                                  stills
                                    ? `https://image.tmdb.org/t/p/w500${
                                        stills?.episodes[episode.episode - 1]
                                          ?.still_path
                                      }`
                                    : `data:image/${placeholderImage}`
                                }
                                alt={tv.name}
                                title={`${episode.episode} - ${episode.title}`}
                                className={`rounded-2xl w-[20rem] min-w-[20rem] max-sm:w-[15rem] max-sm:min-w-[15rem] justify-start select-none aspect-video album-cover-img outline-[2px] outline outline-foreground/0 outline-offset-2 ${
                                  selectedEpisode?.episode ===
                                    episode.episode &&
                                  selectedSeason === season.season
                                    ? "outline dark:!outline-foreground/15 !outline-[#0a0a0a]/15 outline-offset-2"
                                    : ""
                                } ${
                                  stills?.episodes[`${episode.episode}`]
                                    ?.still_path
                                    ? "object-cover"
                                    : "object-contain"
                                }`}
                                loading="eager"
                                unoptimized
                              /> */}
                              <Image
                                draggable={false}
                                width={330}
                                height={600}
                                placeholder={`data:image/${placeholderImage}`}
                                src={
                                  episode.img
                                    ? `https://image.tmdb.org/t/p/w500${episode.img.hd}`
                                    : `data:image/${placeholderImage}`
                                }
                                alt={tv.name}
                                title={`${episode.episode} - ${episode.title}`}
                                className={`rounded-2xl w-[20rem] min-w-[20rem] max-sm:w-[15rem] max-sm:min-w-[15rem] justify-start select-none aspect-video album-cover-img outline-[2px] outline outline-foreground/0 outline-offset-2 ${
                                  selectedEpisode?.episode ===
                                    episode.episode &&
                                  selectedSeason === season.season
                                    ? "outline dark:!outline-foreground/15 !outline-[#0a0a0a]/15 outline-offset-2"
                                    : ""
                                } ${
                                  episode?.img?.hd
                                    ? "object-cover"
                                    : "object-contain"
                                }`}
                                loading="eager"
                                unoptimized
                              />
                              <div className="img-border rounded-2xl" />
                            </div>
                          </div>
                          <div className="w-full flex flex-col items-start pt-1">
                            <p
                              className="text-xs text-muted-foreground text-left"
                              title={`Season ${selectedSeason}, Episode ${episode.episode}`}
                            >
                              {`EPISODE ${episode.episode}`}
                            </p>
                            <p className="text-sm text-left">{episode.title}</p>
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="w-[20rem] max-sm:w-[15rem]">
                                  <p className="text-xs text-muted-foreground text-left truncate">
                                    {episode.description}
                                  </p>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80 overflow-scroll h-40 border rounded-2xl bg-background/25 backdrop-blur-xl">
                                <p>{episode.description}</p>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </button>
                      </div>
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

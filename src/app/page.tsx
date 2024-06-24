"use client";
import {
  Site,
  SiteContainer,
  FilterBar,
  AniBG,
  Popular,
  Filter,
} from "@/components";
import { FramerTest, Pill } from "@/components/customui";
import sitesData from "./content/siteData.json";
import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import getConfig from "./content/localization/manager";
import { Config } from "./content/localization/types/config";
import { Button } from "@/components/customui/Button";
import { motion } from "framer-motion";

interface SiteData {
  name: string;
  categories: string[];
  imageSrc: string;
  link: string;
}

export default function Home() {
  const [language, setLanguage] = useState<string>("en");
  const [config, setConfig] = useState<Config | null>(null);
  const [isHover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLanguage(navigator.language);
    }
  }, []);

  useEffect(() => {
    setConfig(getConfig(language));
  }, [language]);

  if (!config) {
    return (
      <main className="p-2">
        <div className="w-full mx-auto my-0 ">
          <div className="mt-10 my-5 items-center flex-col flex ">
            <Pill href="./" className="">
              Superlist 3.7
            </Pill>
            <motion.div
              initial={{
                opacity: 0,
                translateY: -10,
                filter: "blur(5px)",
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="uppercase text-center z-10">
                <a className="grayscale hero-text text-foreground font-bold *:font-bold text-center align-middle tracking-tighter inline-block mt-5">
                  WEBSITES CURATED FROM THE
                  <span className="text-[1em] opacity-50"> DARK SIDE</span> OF
                  THE WEB
                </a>
              </div>
            </motion.div>
            <AniBG />
          </div>
        </div>

        <div className="w-full mx-auto px-5 py-5 justify-between flex">
          <Button variant={"subtle"}>Popular</Button>
          <Button variant={"subtle"}>Filter</Button>
        </div>
        {/* <p>DEV - Current language is: {language}</p> */}
        <SiteContainer>
          {sitesData.map((site: SiteData, index: number) => (
            <Site
              key={index}
              name={site.name}
              categories={site.categories}
              imageSrc={site.imageSrc}
              link={site.link}
            />
          ))}
        </SiteContainer>
      </main>
    );
  }

  return (
    <main className="p-2">
      <div className="w-full mx-auto my-0 ">
        <div className="mt-10 my-5 items-center flex-col flex ">
          <Pill href="./" className="">
            <p>Superlist 3.7</p>
          </Pill>
          <motion.div
            animate={{
              opacity: 1,
              translateY: 0,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.55 }}
          >
            <div className="uppercase text-center z-10">
              <a className="grayscale hero-text text-foreground font-bold *:font-bold text-center align-middle tracking-tighter inline-block mt-5">
                {config.heroTitle[1]}{" "}
                <span className="text-[1em] opacity-50">
                  {config.heroTitle[2]}
                </span>{" "}
                {config.heroTitle[3]}
              </a>
            </div>
          </motion.div>
          <AniBG />
        </div>
      </div>

      <FilterBar />
      {/* <p>DEV - Current language is: {language}</p> */}
      <SiteContainer>
        {sitesData.map((site: SiteData, index: number) => (
          <Site
            key={index}
            name={site.name}
            categories={site.categories}
            imageSrc={site.imageSrc}
            link={site.link}
          />
        ))}
      </SiteContainer>
    </main>
  );
}

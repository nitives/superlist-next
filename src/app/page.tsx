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
import sitesData from "../../public/data/siteData.json";
import React, { useEffect, useState, useMemo } from "react";
import getConfig from "./content/localization/manager";
import { Config } from "./content/localization/types/config";
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLanguage(navigator.language);
    }
  }, []);

  useEffect(() => {
    setConfig(getConfig(language));
  }, [language]);

  const filteredSites = useMemo(() => {
    return selectedCategories.length === 0
      ? sitesData
      : sitesData.filter((site) =>
          selectedCategories.every((category) =>
            site.categories.includes(category)
          )
        );
  }, [selectedCategories]);

  const transition = useMemo(() => ({ duration: 0.55 }), []);

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

        <FilterBar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <SiteContainer>
          {filteredSites.length > 0 ? (
            filteredSites.map((site: SiteData, index: number) => (
              <Site
                key={index}
                name={site.name}
                categories={site.categories}
                imageSrc={site.imageSrc}
                link={site.link}
              />
            ))
          ) : (
            <div className="text-center text-xl font-semibold text-muted-foreground">
              No sites
            </div>
          )}
        </SiteContainer>
      </main>
    );
  }

  return (
    <main className="p-2">
      <div className="w-full mx-auto my-0 ">
        <div className="mt-10 my-5 items-center flex-col flex ">
          <Pill href="/archive/v3.7/index.html" className="">
            <p>Superlist 3.7</p>
          </Pill>
          <motion.div
            animate={{
              opacity: 1,
              translateY: 0,
              filter: "blur(0px)",
            }}
            transition={transition}
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

      <FilterBar
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <SiteContainer>
        {filteredSites.length > 0 ? (
          filteredSites.map((site: SiteData, index: number) => (
            <Site
              key={index}
              name={site.name}
              categories={site.categories}
              imageSrc={site.imageSrc}
              link={site.link}
            />
          ))
        ) : (
          <div className="absolute w-full text-center text-xl font-semibold text-muted-foreground">
            No sites
          </div>
        )}
      </SiteContainer>
    </main>
  );
}

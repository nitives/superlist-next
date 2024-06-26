"use client";
import downloadsData from "../../content/downloadsData.json";
import Image from "next/image";
import { useEffect, useState } from "react";
import ColorThief from "colorthief";

export default function Downloads() {
  const [colors, setColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const colorThief = new ColorThief();
    const newColors: { [key: string]: string } = {};

    downloadsData.forEach((download) => {
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.src = download.image;

      img.onload = () => {
        const palette = colorThief.getPalette(img); // Get an array of colors
        const vibrantColor = getMostVibrantColor(palette);
        newColors[download.name] = `rgba(${vibrantColor.join(",")}, 0.25)`; // Set opacity here
        if (Object.keys(newColors).length === downloadsData.length) {
          setColors(newColors);
        }
      };
    });
  }, []);

  const getMostVibrantColor = (palette: number[][]) => {
    let maxVibrancy = 0;
    let vibrantColor = palette[0];
    palette.forEach((color) => {
      const [r, g, b] = color;
      const vibrancy = Math.max(r, g, b) - Math.min(r, g, b); // Simple vibrancy measure
      if (vibrancy > maxVibrancy) {
        maxVibrancy = vibrancy;
        vibrantColor = color;
      }
    });
    return vibrantColor;
  };

  return (
    <main className="p-2 pt-12">
      <h1 className="text-center text-4xl mb-8 font-bold">Downloads</h1>
      <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {downloadsData.map((download) => (
          <div
            key={download.name}
            className="p-4 rounded-[24px] bg-ambient hover:bg-[--bg-color] transition-colors duration-300 ease-in-out"
            style={
              {
                "--bg-color": colors[download.name] || "transparent",
              } as React.CSSProperties
            }
          >
            <div className="overflow-hidden flex items-center align-middle justify-center size-fit w-auto h-auto">
              <Image
                src={download.image}
                alt={`${download.name} image`}
                width={500}
                height={300}
                className="rounded-lg mb-2 object-cover aspect-video border"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold truncate max-w-[80%]">
                  {download.name}
                </h2>
                <p className="text-sm font-bold text-muted-foreground truncate text-left">
                  {download.version}
                </p>
              </div>
              <div className="relative group">
                <p className="mt-1 opacity-70 truncate description">
                  {download.description}
                </p>
                {download.description && (
                  <div className="absolute left-0 w-full p-2 bg-background text-opacity-70 rounded-md shadow-lg border group-hover:block description-tooltip">
                    {download.description}
                  </div>
                )}
              </div>
              {download.important && (
                <p className="mt-2 bg-destructive/10 p-2 border border-destructive text-destructive-foreground rounded-md text-xs">
                  {download.important}
                </p>
              )}
              <a
                href={download.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-center bg-primary hover:bg-primary/95 text-primary-foreground py-2 px-4 rounded-lg"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

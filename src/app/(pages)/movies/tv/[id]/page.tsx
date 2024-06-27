"use client";
import React, { useState } from "react";
import VideoPlayerTV from "@/components/movie/tv/VideoPlayerTV";
import MediaDetailsTV from "@/components/movie/tv/MediaDetailsTV";
import MediaRecommendationsTV from "@/components/movie/tv/MediaRecommendationsTV";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TVShows() {
  const [selectedEpisodeUrl, setSelectedEpisodeUrl] = useState<string | null>(
    null
  );
  const [selectedSource, setSelectedSource] = useState<string>("vidsrc");

  const handleEpisodeClick = (episodeUrl: string) => {
    setSelectedEpisodeUrl(episodeUrl);
  };

  const handleSourceChange = (value: string) => {
    setSelectedSource(value);
  };

  return (
    <>
      <div className="p-4 lg:px-20 px-[0.3rem] pt-10">
        <div className="grid gap-2">
          <div className="px-2 w-full flex flex-col items-center justify-center gap-10">
            <VideoPlayerTV
              className="aspect-video rounded-2xl max-h-[50rem] w-full flex video-player"
              episodeUrl={selectedEpisodeUrl}
              selectedSource={selectedSource}
              height="100%"
              width="100%"
              Responsiveness
            />
            <div className="flex gap-2 mb-4">
              <Select onValueChange={handleSourceChange} value={selectedSource}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vidsrc">vidsrc.to</SelectItem>
                  <SelectItem value="vidsrc.pro">vidsrc.pro</SelectItem>
                  <SelectItem value="vidsrc.icu">vidsrc.icu</SelectItem>
                  <SelectItem value="vidsrc.me">vidsrc.me</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <MediaDetailsTV onEpisodeClick={handleEpisodeClick} />
          <MediaRecommendationsTV />
        </div>
      </div>
    </>
  );
}

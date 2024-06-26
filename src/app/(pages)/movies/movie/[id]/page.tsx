"use client";
import React, { useState } from "react";
import MediaDetails from "@/components/movie/MediaDetails";
import MediaRecommendations from "@/components/movie/MediaRecommendations";
import VideoPlayer from "@/components/movie/VideoPlayer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Movies() {
  const [selectedSource, setSelectedSource] = useState<string>("vidsrc");

  const handleSourceChange = (value: string) => {
    setSelectedSource(value);
  };

  return (
    <>
      <div className="p-4 lg:px-20 px-[0.3rem] pt-10">
        <div className="grid gap-2">
          <div className="px-2 w-full flex flex-col items-center justify-center gap-10">
            <VideoPlayer
              className="aspect-video rounded-2xl h-[50rem] video-player"
              selectedSource={selectedSource}
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
          <MediaDetails />
          <MediaRecommendations />
        </div>
      </div>
    </>
  );
}

"use client";
import React from "react";
import XVideoPlayer from "@/components/movie/XVideoPlayer";

const urlx =
  "https://aa.bigtimedelivery.net/_v13/86ce5a9d8cc1667aae5aa9a2a7915e456859528ab99c91f09ed33b45371be9019e9195a64df138b750bb2c34eb88600ab2c597fd10f78591a8679bdda0c68df9bb2140010df508da921986a910d7bc8a41ca7c38d763f0f2fd9ae336a632784c2fdbaa03294b5debc683e08f6f296e5a65305f93b459aba9140766b90635c58be054f888edb1c64210cc6c2bd7ee4754/720/index.m3u8";

export default function Test() {
  return (
    <div className="flex items-center justify-center p-4 pt-40">
      <XVideoPlayer className="h-full" url={urlx} width="1000px" />
    </div>
  );
}

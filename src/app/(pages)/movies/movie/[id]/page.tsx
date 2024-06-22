import MediaDetails from "@/components/movie/MediaDetails";
import MediaRecommendations from "@/components/movie/MediaRecommendations";
import VideoPlayer from "@/components/movie/VideoPlayer";

export default async function Movies() {
  return (
    <>
      <div className="p-4 px-20 pt-10">
        <div className="grid gap-2">
          <div className="px-2 w-full flex items-center justify-center">
            <VideoPlayer
              height="100%"
              width="100%"
              className="aspect-video rounded-2xl h-[50rem] video-player"
            />
          </div>
          <MediaDetails />
          <MediaRecommendations />
        </div>
      </div>
    </>
  );
}

// 385687

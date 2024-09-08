// API response data
const apiResponse = {
  status: 200,
  info: "success",
  sources: [
    {
      name: "Filemoon",
      data: {
        stream:
          "https://be6721.rcr72.waw04.cdn112.com/hls2/01/00385/enbd6kvl2xel_x/master.m3u8?t=0lNCcJdYjiWT9KLXIujrDs51MvD_iU0bWN5aNNan3LQ&s=1719321028&e=43200&f=1929547&srv=14&asn=14618&sp=5500",
        subtitle: [
          {
            lang: "French",
            file: "https://rapidcdn.cc/sub/cache/subtitle/13823647.vtt",
          },
          {
            lang: "Hebrew",
            file: "https://rapidcdn.cc/sub/cache/subtitle/13823654.vtt",
          },
          {
            lang: "Turkish",
            file: "https://rapidcdn.cc/sub/cache/subtitle/13823651.vtt",
          },
        ],
      },
    },
  ],
};

// Extract the stream link from the API response
const streamLink = apiResponse.sources[0].data.stream;

// Your application URL
const appUrl = "https://rabbitstream.net/";

// Encode the stream link and construct the proxy URL
const proxyUrl = `https://m3u8proxy.xx.workers.dev/?url=${encodeURIComponent(
  streamLink
)}&referer=${encodeURIComponent(appUrl)}&origin=${encodeURIComponent(appUrl)}`;

console.log(proxyUrl);

const type = "movie";
const id = "634649";
const keyword = "deadpool";
const TMDBkey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// const tmdb = async () => {
//   const response = await fetch(
    // `https://api.consumet.org/movies/flixhq/watch?episodeId=10766&mediaId=tv/watch-rick-and-morty-39480&server=vidcloud`
    // `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDBkey}`
    // https://superlist-api-m.vercel.app/movies/flixhq/watch?episodeId=10766&mediaId=tv/watch-rick-and-morty-39480&server=upcloud
//   );
//   const data = await response.json();
//   console.log(data);
// };
// tmdb();

// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWE1NDRlZWM1ZmQxMDE0ODQ3NzhiZTcyNTk1ZTYwOSIsIm5iZiI6MTcxOTA1MzY4My4yNjMxOTQsInN1YiI6IjY1YjlmN2UyNzM5MGMwMDE3Y2QwNDVkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xmr2Rd9xEmEnLOvS88DxbBi5t6kNL1aTRKTSeXIvr5U",
//   },
// };

// fetch(
//   `https://api.themoviedb.org/3/search/keyword?query=${keyword}&page=1`,
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

export interface MovieDetails {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string;
  description: string;
  genres: string[];
  rating: string;
  type: string;
  actors: string[];
  tags: string[];
  production: string;
  duration: string;
  recommendations: Recommendation[];
  adult: boolean;
  episodes: {
    id: string;
    url: string;
    title: string;
    number: number;
    season: number;
  }[];
}

export interface Recommendation {
  id: string;
  title: string;
  poster_path: string;
}

export interface TVSeries {
  adult: boolean;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  extra: Extra;
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  networks: {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[];
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | Collection;
  budget: number;
  extra: Extra;
  genres: string[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Extra {
  actors: string[];
  cover: string;
  description: string;
  directors: string[];
  duration: number;
  episodeId: string;
  genres: string[];
  id: string;
  image: string;
  logos: string[];
  mappings: Mappings;
  rating: number;
  recommendations: Recommendation[];
  releaseDate: string;
  similar: SimilarMovie[];
  title: string;
  totalEpisodes: number | string | undefined;
  totalSeasons: number | string | undefined;
  trailer: Trailer;
  translations: Translation[];
  type: string;
  writers: string[];
}

export interface Mappings {
  imdb: string;
  tmdb: number;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Logo {
  id: string;
  url: string;
}

export interface Mappings {
  imdb: string;
  tmdb: number;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SimilarMovie {
  id: string;
  title: string;
  poster_path: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface Trailer {
  id: string;
  site: string;
  url: string;
}

export interface Translation {
  iso_639_1: string;
  name: string;
  data: {
    title: string;
    overview: string;
    homepage: string;
  };
}

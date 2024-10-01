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

export interface Movie {
  actors: string[];
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | Collection;
  budget: number;
  cover: string;
  description: string;
  directors: string[];
  duration: number;
  episodeId: string;
  genres: string[];
  homepage: string;
  id: string;
  image: string;
  imdb_id: string;
  logos: Logo[];
  mappings: Mappings;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  rating: number;
  recommendations: Recommendation[];
  releaseDate: string;
  release_date: string;
  revenue: number;
  runtime: number;
  similar: SimilarMovie[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  trailer: Trailer;
  translations: Translation[];
  type: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  writers: string[];
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

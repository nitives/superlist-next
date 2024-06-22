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
  casts: string[];
  tags: string[];
  production: string;
  duration: string;
  recommendations: Recommendation[];
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

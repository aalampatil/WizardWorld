import axios from "axios";

export type Movie = {
  id: string;
  type: "movie";
  attributes: {
    slug: string;
    box_office: string | null;
    budget: string | null;
    cinematographers: string[];
    directors: string[];
    distributors: string[];
    editors: string[];
    music_composers: string[];
    poster: string | null;
    producers: string[];
    rating: string | null;
    release_date: string;
    running_time: string | null;
    screenwriters: string[];
    summary: string;
    title: string;
    trailer: string | null;
    wiki: string;
  };
  links: {
    self: string;
  };
};

export const fetchMovies = async () => {
  const response = await axios.get(`https://api.potterdb.com/v1/movies`);
  return response.data.data;
};

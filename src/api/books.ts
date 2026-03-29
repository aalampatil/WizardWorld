import axios from "axios";

export type ChapterRef = {
  id: string;
  type: "chapter";
};

export type Book = {
  id: string;
  type: "book";
  attributes: {
    slug: string;
    author: string;
    cover: string;
    dedication: string;
    pages: number;
    release_date: string; // ISO date string
    summary: string;
    title: string;
    wiki: string;
  };
  relationships: {
    chapters: {
      data: ChapterRef[];
    };
  };
  links: {
    self: string;
  };
};

export const fetchBooks = async () => {
  const response = await axios.get("https://api.potterdb.com/v1/books");
  return response.data.data;
};

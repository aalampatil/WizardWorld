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
  const response = await axios.get(`https://api.potterdb.com/v1/books`, {});
  return response.data.data;
};

export type Chapter = {
  id: string;
  type: "chapter";
  attributes: {
    slug: string;
    order: number;
    summary: string | null;
    title: string;
  };
};

export const fetchChapters = async (bookId: string) => {
  const response = await axios.get(
    `https://api.potterdb.com/v1/books/${bookId}/chapters`,
  );
  return response.data.data as Chapter[];
};

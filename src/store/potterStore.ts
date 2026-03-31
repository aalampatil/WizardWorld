import { create } from "zustand";
import { type Book, fetchBooks } from "../api/books";
import { type Spell, fetchSpells } from "../api/spells";
import { type Potion, fetchPotions } from "../api/potions";
import { type Movie, fetchMovies } from "../api/movies";
import { type Character, fetchCharacters } from "../api/characters";

type BookStore = {
  books: Book[];
  loading: boolean;
  fetchBooks: () => Promise<void>;
};

type MovieStore = {
  movies: Movie[];
  loading: boolean;
  fetchMovies: () => Promise<void>;
};

type SpellStore = {
  spells: Spell[];
  page: number;
  loading: boolean;
  fetchSpells: () => Promise<void>;
};

type PotionStore = {
  potions: Potion[];
  page: number;
  loading: boolean;
  fetchPotions: () => Promise<void>;
};

type CharacterStore = {
  characters: Character[];
  page: number;
  loading: boolean;
  fetchCharacters: () => Promise<void>;
};

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  loading: false,
  fetchBooks: async () => {
    set({ loading: true });
    try {
      const books = await fetchBooks();
      set({ books, loading: false });
    } catch (error) {
      console.log("Book fetch error:", error);
      set({ loading: false });
    }
  },
}));

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  loading: false,
  fetchMovies: async () => {
    set({ loading: true });
    try {
      const movies = await fetchMovies();
      set({ movies, loading: false });
    } catch (error) {
      console.log("Movie fetch error:", error);
      set({ loading: false });
    }
  },
}));

export const useSpellStore = create<SpellStore>((set, get) => ({
  spells: [],
  page: 1,
  loading: false,
  fetchSpells: async () => {
    const { page, spells, loading } = get();
    if (loading) return;

    set({ loading: true });
    try {
      const res = await fetchSpells(page);
      set({
        spells: [...spells, ...res.data],
        page: page + 1,
        loading: false,
      });
    } catch (error) {
      console.log("Spell fetch error:", error);
      set({ loading: false });
    }
  },
}));

export const usePotionStore = create<PotionStore>((set, get) => ({
  potions: [],
  page: 1,
  loading: false,
  fetchPotions: async () => {
    const { page, potions, loading } = get();
    if (loading) return;

    set({ loading: true });
    try {
      const res = await fetchPotions(page);
      set({
        potions: [...potions, ...res.data],
        page: page + 1,
        loading: false,
      });
    } catch (error) {
      console.log("Potion fetch error:", error);
      set({ loading: false });
    }
  },
}));

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  characters: [],
  page: 1,
  loading: false,
  fetchCharacters: async () => {
    const { page, characters, loading } = get();
    if (loading) return;

    set({ loading: true });
    try {
      const res = await fetchCharacters(page);
      set({
        characters: [...characters, ...res.data],
        page: page + 1,
        loading: false,
      });
    } catch (error) {
      console.log("Character fetch error:", error);
      set({ loading: false });
    }
  },
}));

// import { create } from "zustand";
// import { type Book, fetchBooks } from "../api/books";
// import { type Spell, fetchSpells } from "../api/spells";
// import { type Potion, fetchPotions } from "../api/potions";
// import { type Movie, fetchMovies } from "../api/movies";
// import { type Character, fetchCharacters } from "../api/characters";

// type BookStore = {
//   books: Book[];
//   setBooks: (books: Book[]) => void;
//   fetchBooks: () => Promise<void>;
// };

// type Moviestore = {
//   movies: Movie[];
//   setMovies: (movies: Movie[]) => void;
//   fetchMovies: () => Promise<void>;
// };

// type SpellStore = {
//   spells: Spell[];
//   setSpells: (spells: Spell[]) => void;
//   page: number;
//   loading: boolean;
//   fetchSpells: () => Promise<void>;
// };

// type PotionStore = {
//   potions: Potion[];
//   setPotions: (potions: Potion[]) => void;
//   page: number;
//   loading: boolean;
//   fetchPotions: () => Promise<void>;
// };

// type CharacterStore = {
//   characters: Character[];
//   page: number;
//   loading: boolean;
//   setCharacters: (characters: Character[]) => void;
//   fetchCharacters: () => Promise<void>;
// };

// export const useBookStore = create<BookStore>((set) => ({
//   books: [],

//   setBooks: (books) => set({ books }),

//   fetchBooks: async () => {
//     const books = await fetchBooks();
//     set({ books });
//   },
// }));

// export const useMovieStore = create<Moviestore>((set) => ({
//   movies: [],
//   setMovies: (movies) => set({ movies }),
//   fetchMovies: async () => {
//     const movies = await fetchMovies();
//     set({ movies });
//   },
// }));

// export const useSpellStore = create<SpellStore>((set, get) => ({
//   spells: [],
//   page: 1,
//   loading: false,
//   setSpells: (spells) => set({ spells }),
//   fetchSpells: async () => {
//     const { page, spells, loading } = get();
//     if (loading) return;

//     set({ loading: true });
//     try {
//       const res = await fetchSpells(page);

//       set({
//         spells: [...spells, ...res.data],
//         page: page + 1,
//         loading: false,
//       });
//     } catch (error) {
//       console.log("Character fetch error:", error);
//       set({ loading: false });
//     }
//   },
// }));

// export const usePotionStore = create<PotionStore>((set, get) => ({
//   potions: [],
//   page: 1,
//   loading: false,
//   setPotions: (potions) => set({ potions }),
//   fetchPotions: async () => {
//     const { page, potions, loading } = get();
//     if (loading) return;

//     set({ loading: true });
//     try {
//       const res = await fetchPotions(page);

//       set({
//         potions: [...potions, ...res.data],
//         page: page + 1,
//         loading: false,
//       });
//     } catch (error) {
//       console.log("Potion fetch error:", error);
//       set({ loading: false });
//     }
//   },
// }));

// export const useCharacterStore = create<CharacterStore>((set, get) => ({
//   characters: [],
//   page: 1,
//   loading: false,

//   setCharacters: (characters) => set({ characters }),

//   fetchCharacters: async () => {
//     const { page, characters, loading } = get();

//     if (loading) return;

//     set({ loading: true });

//     try {
//       const res = await fetchCharacters(page);

//       set({
//         characters: [...characters, ...res.data],
//         page: page + 1,
//         loading: false,
//       });
//     } catch (error) {
//       console.log("Character fetch error:", error);
//       set({ loading: false });
//     }
//   },
// }));

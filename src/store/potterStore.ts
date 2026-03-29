import { create } from "zustand";
import { type Book, fetchBooks } from "../api/books";
import { type Spell, fetchSpells } from "../api/spells";
import { type Potion, fetchPotions } from "../api/potions";
import { type Movie, fetchMovies } from "../api/movies";
import { type Character, fetchCharacters } from "../api/characters";

type BookStore = {
  books: Book[];
  setBooks: (books: Book[]) => void;
  fetchBooks: () => Promise<void>;
};

type SpellStore = {
  spells: Spell[];
  setSpells: (spells: Spell[]) => void;
  fetchSpells: () => Promise<void>;
};

type PotionStore = {
  potions: Potion[];
  setPotions: (potions: Potion[]) => void;
  fetchPotions: () => Promise<void>;
};

type Moviestore = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  fetchMovies: () => Promise<void>;
};

type CharacterStore = {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  fetchCharacters: () => Promise<void>;
};

export const useBookStore = create<BookStore>((set) => ({
  books: [],

  setBooks: (books) => set({ books }),

  fetchBooks: async () => {
    const books = await fetchBooks();
    set({ books });
  },
}));

export const useSpellStore = create<SpellStore>((set) => ({
  spells: [],
  setSpells: (spells) => set({ spells }),
  fetchSpells: async () => {
    const spells = await fetchSpells();
    set({ spells });
  },
}));

export const usePotionStore = create<PotionStore>((set) => ({
  potions: [],
  setPotions: (potions) => set({ potions }),
  fetchPotions: async () => {
    const potions = await fetchPotions();
    set({ potions });
  },
}));

export const useMovieStore = create<Moviestore>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  fetchMovies: async () => {
    const movies = await fetchMovies();
    set({ movies });
  },
}));

export const useCharacterStore = create<CharacterStore>((set) => ({
  characters: [],
  setCharacters: (characters) => set({ characters }),
  fetchCharacters: async () => {
    const characters = await fetchCharacters();
    set({ characters });
  },
}));

// const { movies, fetchMovies } = useMovieStore()
//   const { fetchBooks } = useBookStore();
//   const { fetchCharacters } = useCharacterStore();
//   const { fetchSpells } = useSpellStore()
//   const { fetchPotions } = usePotionStore()

//   useEffect(() => {
//     fetchMovies()
//     fetchBooks()
//     fetchCharacters()
//     fetchSpells()
//     fetchPotions()
//   }, [])

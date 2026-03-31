# ⚡ WizardWorld

> A React Native Encyclopedia of the Wizarding World

![Expo](https://img.shields.io/badge/Expo-55.0.9-000020?style=flat-square&logo=expo)
![React Native](https://img.shields.io/badge/React_Native-0.83.4-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Zustand](https://img.shields.io/badge/Zustand-5.0.12-orange?style=flat-square)
![React Navigation](https://img.shields.io/badge/react-navigation)

---

## 📖 Overview

WizardWorld is a mobile encyclopedia app for the Wizarding World universe, built with React Native and Expo and React Navigation. It surfaces rich data across five categories — **Books, Movies, Characters, Spells, and Potions** — all sourced from the open WizardWorld API. The app features real-time search, category filtering, per-screen detail views, and a polished dark-gold aesthetic consistent with the magical theme.

---

## ✨ Features

### Five Content Screens

- **Books** — Cover art, page count, release year, summary, dedication, and direct wiki link.
- **Movies** — Poster, cast & crew, box office, budget, running time, trailer, and rating badge.
- **Characters** — Search by name or alias, filter by Hogwarts house with per-house colour pills.
- **Spells** — Search by name or incantation, filter by category (Charm, Curse, Hex, etc.).
- **Potions** — 2-column grid, search by name or effect, filter by difficulty level.

### Universal Search & Filter Pattern

- Live text search powered by `useMemo` — zero network requests after initial fetch
- Horizontal pill filters with active-state highlighting
- Result count badge that updates in real time
- Empty-state fallback when no results match

### Premium Home Screen

- Animated hero section with floating gold particles
- Horizontal stat pills showing live counts from each store
- Horizontal book and movie carousels with gradient overlays
- 2-column quick-nav grid with per-section accent colours

### Architecture & DX

- **Zustand stores** — one per content type, all following the same fetch/state pattern
- **TypeScript throughout** — typed `Book`, `Movie`, `Character`, `Spell`, `Potion` models
- **`StyleSheet.create`** on every screen — no inline style objects at render time
- **Pagination** via `onEndReached` on Characters and Potions screens

---

## 🛠 Tech Stack

| Category   | Library / Tool               | Version  |
| ---------- | ---------------------------- | -------- |
| Framework  | React Native                 | 0.83.4   |
| Runtime    | Expo                         | ~55.0.9  |
| Language   | TypeScript                   | ~5.9.2   |
| Navigation | @react-navigation/native     | ^7.2.2   |
| State      | Zustand                      | ^5.0.12  |
| HTTP       | Axios                        | ^1.14.0  |
| Animation  | react-native-reanimated      | 4.2.1    |
| Blur / FX  | expo-blur                    | ^55.0.10 |
| Gradients  | expo-linear-gradient         | ~55.0.9  |
| Gesture    | react-native-gesture-handler | ~2.30.0  |
| Icons      | @expo/vector-icons           | ^15.0.3  |

---

## 📁 Project Structure

```
wizardworld/
├── .expo/
├── assets/
├── navigation/
│   └── navigator/
│       └── TabNavigators.tsx        # Bottom tab navigator config
├── screens/
│   ├── BookSection/
│   │   ├── Book.tsx                 # Book detail view
│   │   ├── BookCard.tsx             # Book list card component
│   │   ├── BooksScreen.tsx          # Book list + search
│   │   └── BookStack.tsx            # Book stack navigator
│   ├── CharacterSection/
│   │   ├── Character.tsx            # Character detail view
│   │   ├── CharacterCard.tsx        # Character list card component
│   │   ├── CharactersScreen.tsx     # Characters + house filter
│   │   └── CharacterStack.tsx       # Character stack navigator
│   ├── MovieSection/
│   │   ├── Movie.tsx                # Movie detail view
│   │   ├── MovieCard.tsx            # Movie list card component
│   │   ├── MoviesScreen.tsx         # Movie list + search
│   │   └── MovieStack.tsx           # Movie stack navigator
│   ├── PotionSection/
│   │   ├── Potion.tsx               # Potion detail view
│   │   ├── PotionCard.tsx           # Potion grid card component
│   │   ├── PotionsScreen.tsx        # Potions grid + difficulty filter
│   │   └── PotionStack.tsx          # Potion stack navigator
│   ├── SpellSection/
│   │   ├── Spell.tsx                # Spell detail view
│   │   ├── SpellCard.tsx            # Spell list card component
│   │   ├── SpellsScreen.tsx         # Spells + category filter
│   │   └── SpellStack.tsx           # Spell stack navigator
│   └── HomeScreen.tsx               # Hero + carousels + quick-nav
├── src/
│   ├── api/
│   │   ├── books.ts                 # Books API calls
│   │   ├── characters.ts            # Characters API calls
│   │   ├── movies.ts                # Movies API calls
│   │   ├── potions.ts               # Potions API calls
│   │   └── spells.ts                # Spells API calls
│   ├── hooks/
│   │   └── useSearch.ts             # Reusable search + filter hook
│   └── store/
│       └── potterStore.ts           # All Zustand stores
├── App.tsx
├── app.json
├── index.ts
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo — `npm create-expo-app@latest .`
- iOS Simulator, Android Emulator, or the **Expo Go** app on a physical device

### Installation

```bash
git clone https://github.com/aalampatil/WizardWorld
cd WizardWorld
npm install
```

### Running the App

| Command           | Platform        |
| ----------------- | --------------- |
| `npm start`       | Expo dev server |
| `npm run android` | Android         |
| `npm run ios`     | iOS             |
| `npm run web`     | Browser         |

---

## 📱 Screens & Navigation

Navigation uses a bottom tab bar (`@react-navigation/bottom-tabs`) with five primary tabs. Each list screen pushes to a detail screen via a native stack (`@react-navigation/native-stack`). A drawer navigator (`@react-navigation/drawer`) is available for an optional side menu.

| Screen             | Description                                                                   |
| ------------------ | ----------------------------------------------------------------------------- |
| `HomeScreen`       | Animated hero, live stat pills, book carousel, movie carousel, quick-nav grid |
| `BooksScreen`      | Searchable flat list of all Harry Potter books                                |
| `CharactersScreen` | Searchable + house-filtered list with infinite scroll                         |
| `SpellsScreen`     | Search by name/incantation, filter by spell category via dynamic pills        |
| `PotionScreen`     | 2-column grid, search by name/effect, filter by difficulty                    |
| `MoviesScreen`     | Searchable list of all Wizarding World films                                  |

---

## 🗃 State Management

Each content type has its own Zustand store exported from `src/store/potterStore.ts`. All stores follow an identical shape.

```ts
interface SpellStore {
  spells: Spell[];
  fetchSpells: () => Promise<void>;
}

export const useSpellStore = create<SpellStore>((set) => ({
  spells: [],
  fetchSpells: async () => {
    const res = await axios.get("https://api.potterdb.com/v1/spells?");
    set({ spells: res.data });
  },
}));
```

**Available stores:** `useBookStore` · `useMovieStore` · `useCharacterStore` · `useSpellStore` · `usePotionStore`

---

## 🔍 Search & Filter Pattern

All five list screens share the same three-part pattern. Filtering is done entirely client-side via `useMemo` — no extra network requests after the initial fetch.

### 1 · TextInput for free-text search

```tsx
const [query, setQuery] = useState<string>('')

<TextInput value={query} onChangeText={setQuery} placeholder="Search..." />
```

### 2 · Horizontal pill bar for category / house / difficulty

```tsx
const [activeCategory, setActiveCategory] = useState<string>('All')

<ScrollView horizontal>
  {CATEGORIES.map(cat => (
    <Pressable key={cat} onPress={() => setActiveCategory(cat)}
      style={[styles.pill, activeCategory === cat && styles.pillActive]}>
      <Text>{cat}</Text>
    </Pressable>
  ))}
</ScrollView>
```

### 3 · useMemo combining both filters

```tsx
const filtered = useMemo(() => {
  const q = query.toLowerCase().trim();
  return items.filter((item) => {
    const matchesQuery = !q || item.attributes.name?.toLowerCase().includes(q);
    const matchesFilter =
      activeCategory === "All" || item.attributes.category === activeCategory;
    return matchesQuery && matchesFilter;
  });
}, [query, activeCategory, items]);
```

---

## 📐 Data type/Models

### `Book`

`id` · `slug` · `author` · `cover` · `dedication` · `pages` · `release_date` · `summary` · `title` · `wiki`

### `Movie`

`id` · `slug` · `title` · `summary` · `poster` · `release_date` · `running_time` · `rating` · `box_office` · `budget` · `directors` · `producers` · `screenwriters` · `cinematographers` · `editors` · `music_composers` · `distributors` · `trailer` · `wiki`

### `Character`

`id` · `name` · `alias_names[]` · `house` · `born` · `died` · `gender` · `species` · `height` · `weight` · `hair_color` · `eye_color` · `skin_color` · `blood_status` · `nationality` · `animagus` · `boggart` · `patronus` · `wand`

### `Spell`

`id` · `name` · `incantation` · `category` · `effect` · `light` · `creator` · `wiki`

### `Potion`

`id` · `name` · `effect` · `side_effects` · `characteristics` · `difficulty` · `ingredients[]` · `inventors[]` · `manufacturers[]` · `wiki`

---

## 🔧 Possible Improvements

### Code Quality

- Replace all `any` prop types with proper TypeScript interfaces
- Extract inline styles to `StyleSheet.create` in `BookCard` and `CharacterCard`
- Add loading spinners and error boundary components to each screen
- Create a shared `<SearchBar>` and `<PillFilter>` component to remove duplication

### UX / Features

- Persist favourite characters / spells with `AsyncStorage` or MMKV
- Add a global search screen that queries all five categories at once
- Implement sort controls (A–Z, newest, difficulty ascending)
- Add haptic feedback on card press with `expo-haptics`
- Offline support with `react-query` and stale-while-revalidate caching

### Performance

- Paginate API calls instead of fetching all records upfront
- Use `expo-image` instead of `Image` for automatic caching and blurhash placeholders
- Memoize card components with `React.memo` to avoid unnecessary re-renders

---

## 🌐 API Reference

Powered by **[PotterDB](https://potterdb.com/)** — free to use, no authentication required.

- **Base URL:** `https://api.potterdb.com`
- **Current version:** `v1`

### Books

| Endpoint                                | Description                            |
| --------------------------------------- | -------------------------------------- |
| `GET /v1/books`                         | Retrieve a list of all books           |
| `GET /v1/books/{id}`                    | Retrieve a single book by its ID       |
| `GET /v1/books/{book_id}/chapters`      | Retrieve all chapters for a given book |
| `GET /v1/books/{book_id}/chapters/{id}` | Retrieve a single chapter by its ID    |

### Characters

| Endpoint                  | Description                           |
| ------------------------- | ------------------------------------- |
| `GET /v1/characters`      | Retrieve a list of all characters     |
| `GET /v1/characters/{id}` | Retrieve a single character by its ID |

### Movies

| Endpoint              | Description                       |
| --------------------- | --------------------------------- |
| `GET /v1/movies`      | Retrieve a list of all movies     |
| `GET /v1/movies/{id}` | Retrieve a single movie by its ID |

### Potions

| Endpoint               | Description                        |
| ---------------------- | ---------------------------------- |
| `GET /v1/potions`      | Retrieve a list of all potions     |
| `GET /v1/potions/{id}` | Retrieve a single potion by its ID |

### Spells

| Endpoint              | Description                       |
| --------------------- | --------------------------------- |
| `GET /v1/spells`      | Retrieve a list of all spells     |
| `GET /v1/spells/{id}` | Retrieve a single spell by its ID |

---

## 📄 License

MIT License — feel free to fork, extend, and ship your own Wizarding World app.

---

<p align="center">Made with <a href="https://github.com/aalampatil">aalampatil</a> · Powered by the WizardWorld API</p>

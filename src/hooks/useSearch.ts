// src/hooks/useSearch.ts
import { useState, useMemo } from "react";

export function useSearch<T>(items: T[], searchFields: (item: T) => string[]) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    return items.filter((item) =>
      searchFields(item).some((field) => field.toLowerCase().includes(q)),
    );
  }, [query, items]);

  return { query, setQuery, filtered };
}

// // Books
// const { query, setQuery, filtered } = useSearch(books, b => [b.attributes.title, b.attributes.author])

// // Characters
// const { query, setQuery, filtered } = useSearch(characters, c => [c.attributes.name, c.attributes.house])

// // Spells
// const { query, setQuery, filtered } = useSearch(spells, s => [s.attributes.name, s.attributes.incantation])

//////////////////////////////

const SPELL_TYPES = ["All", "Charm", "Curse", "Hex", "Jinx", "Transfiguration"];

// Inside component:
// const [activeType, setActiveType] = useState("All")

// const filtered = useMemo(() => {
//   return spells.filter(spell => {
//     const matchesQuery = spell.attributes.name.toLowerCase().includes(query.toLowerCase())
//     const matchesType = activeType === "All" || spell.attributes.type === activeType
//     return matchesQuery && matchesType
//   })
// }, [query, activeType, spells])

// In JSX, above the FlatList:
// <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
//   {SPELL_TYPES.map(type => (
//     <Pressable
//       key={type}
//       onPress={() => setActiveType(type)}
//       style={{
//         paddingHorizontal: 14, paddingVertical: 6,
//         backgroundColor: activeType === type ? "#FFD700" : "#1a1a25",
//         borderRadius: 20, marginRight: 8,
//       }}
//     >
//       <Text style={{ color: activeType === type ? "#000" : "#aaa", fontWeight: "600" }}>
//         {type}
//       </Text>
//     </Pressable>
//   ))}
// </ScrollView>

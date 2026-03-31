import { View, FlatList, StyleSheet, TextInput, Pressable, ScrollView, Text } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { useCharacterStore } from "../../../src/store/potterStore";
import CharacterCard from "./CharacterCard";

const HOUSES = ["All", "Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];

const CharactersScreen = ({ navigation }: any) => {
  const { characters, fetchCharacters } = useCharacterStore();
  const [query, setQuery] = useState<string>("")
  const [activeHouse, setActiveHouse] = useState<string>("All")

  useEffect(() => {
    fetchCharacters();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return characters.filter((character) => {
      const attrs = character.attributes
      const matchesQuery =
        !q ||
        attrs.name?.toLowerCase().includes(q) ||
        attrs.alias_names?.some((a: string) => a.toLowerCase().includes(q))
      const matchesHouse =
        activeHouse === "All" || attrs.house === activeHouse
      return matchesQuery && matchesHouse
    })
  }, [query, activeHouse, characters])

  return (
    <View style={styles.container}>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or alias..."
        placeholderTextColor="#555"
        value={query}
        onChangeText={setQuery}
      />

      {/* House Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillRow}
      >
        {HOUSES.map((house) => (
          <Pressable
            key={house}
            onPress={() => setActiveHouse(house)}
            style={[styles.pill, activeHouse === house && styles.pillActive,
            // Per-house accent color on active
            activeHouse === house && HOUSE_COLORS[house] && { backgroundColor: HOUSE_COLORS[house], borderColor: HOUSE_COLORS[house] }
            ]}
          >
            <Text style={[styles.pillText, activeHouse === house && styles.pillTextActive]}>
              {house}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Result Count */}
      <Text style={styles.resultCount}>
        {filtered.length} character{filtered.length !== 1 ? "s" : ""} found
      </Text>

      {/* Character List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No characters match your search.</Text>
        }
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            navigation={navigation}
          />
        )}
        onEndReached={fetchCharacters}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

export default CharactersScreen;

// Each house gets its own signature color when active
const HOUSE_COLORS: Record<string, string> = {
  Gryffindor: "#8B0000",
  Slytherin: "#1a4d2e",
  Hufflepuff: "#e3a400",
  Ravenclaw: "#0e2d6b",
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f14",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    backgroundColor: "#1a1a25",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#FFD700",
    marginBottom: 12,
  },
  pillRow: {
    marginBottom: 12,
    flexGrow: 0,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 0,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "##000",
    height: 40
  },
  pillActive: {
    backgroundColor: "#FFD700",
    borderColor: "#FFD700",
  },
  pillText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 13,
  },
  pillTextActive: {
    color: "#000",
  },
  resultCount: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 10,
  },
  empty: {
    color: "#555",
    textAlign: "center",
    marginTop: 60,
    fontSize: 15,
  },
});
// import { View, FlatList, StyleSheet } from "react-native";
// import React, { useEffect } from "react";
// import { useCharacterStore } from "../../../src/store/potterStore";
// import CharacterCard from "./CharacterCard";

// const CharactersScreen = ({ navigation }: any) => {
//   const { characters, fetchCharacters } = useCharacterStore();

//   useEffect(() => {
//     fetchCharacters();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={characters}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <CharacterCard
//             character={item}
//             navigation={navigation}
//           />
//         )}
//         showsVerticalScrollIndicator={true}
//         onEndReached={fetchCharacters}
//         onEndReachedThreshold={1}
//       />
//     </View>
//   );
// };

// export default CharactersScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0f0f14",
//     padding: 16,
//   },
// });
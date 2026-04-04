import { FlatList, View, TextInput, Pressable, ScrollView, Text, StyleSheet } from "react-native";
import { useEffect, useState, useMemo } from "react";
import PotionCard from "./PotionCard";
import { usePotionStore } from "../../../src/store/potterStore";

const DIFFICULTIES = ["All", "Advanced", "Beginner", "Moderate", "OWL", "NEWT"];

const PotionScreen = ({ navigation }: any) => {
  const { potions, fetchPotions } = usePotionStore()
  const [query, setQuery] = useState<string>("")
  const [activeDifficulty, setActiveDifficulty] = useState<string>("All")

  useEffect(() => {
    fetchPotions();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return potions.filter((potion) => {
      const attrs = potion.attributes
      const matchesQuery =
        !q ||
        attrs.name?.toLowerCase().includes(q) ||
        attrs.effect?.toLowerCase().includes(q)
      const matchesDifficulty =
        activeDifficulty === "All" || attrs.difficulty === activeDifficulty
      return matchesQuery && matchesDifficulty
    })
  }, [query, activeDifficulty, potions])

  return (
    <View style={styles.container}>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or effect..."
        placeholderTextColor="#555"
        value={query}
        onChangeText={setQuery}
      />

      {/* Difficulty Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillRow}
      >
        {DIFFICULTIES.map((diff) => (
          <Pressable
            key={diff}
            onPress={() => setActiveDifficulty(diff)}
            style={[styles.pill, activeDifficulty === diff && styles.pillActive]}
          >
            <Text style={[styles.pillText, activeDifficulty === diff && styles.pillTextActive]}>
              {diff}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Result Count */}
      <Text style={styles.resultCount}>
        {filtered.length} potion{filtered.length !== 1 ? "s" : ""} found
      </Text>

      {/* Potion Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <Text style={styles.empty}>No potions match your search.</Text>
        }
        renderItem={({ item }) => (
          <PotionCard
            potion={item}
            onPress={() => navigation.navigate("Potion", { potion: item })}
          />
        )}
        onEndReached={fetchPotions}
        onEndReachedThreshold={0.4}
      />
    </View>
  );
};

export default PotionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f14",
    paddingHorizontal: 16,
    paddingTop: 20,
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
    borderColor: "#000",
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
    marginTop: 12,
    marginBottom: 12,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  empty: {
    color: "#fff",
    textAlign: "center",
    marginTop: 60,
    fontSize: 15,
  },
})


import { View, Text, FlatList, TextInput, Pressable, ScrollView, StyleSheet } from "react-native"
import React, { useEffect, useState, useMemo } from "react"
import { useSpellStore } from "../../../src/store/potterStore"

const SpellsScreen = ({ navigation }: any) => {
  const { spells, fetchSpells } = useSpellStore()
  // (s) => s.spells
  // const fetchSpells = useSpellStore((s) => s.fetchSpells)
  const [query, setQuery] = useState<string>("")
  const [activeCategory, setActiveCategory] = useState<any>("All")

  useEffect(() => {
    fetchSpells()
  }, [])

  const SPELL_CATEGORIES = useMemo(() => {
    const cats = spells
      .map((s) => s.attributes.category)
      .filter(Boolean)
    // console.log(cats)
    return ["All", ...Array.from(new Set(cats))]
  }, [spells])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return spells.filter((spell) => {
      const attrs = spell.attributes
      const matchesQuery =
        !q ||
        attrs.name?.toLowerCase().includes(q) ||
        attrs.incantation?.toLowerCase().includes(q)
      const matchesCategory =
        activeCategory === "All" || attrs.category === activeCategory
      return matchesQuery && matchesCategory
    })
  }, [query, activeCategory, spells])

  return (
    <View style={styles.container}>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or incantation..."
        placeholderTextColor="#666"
        value={query}
        onChangeText={setQuery}
      />

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillRow}
      >
        {SPELL_CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[
              styles.pill,
              activeCategory === cat && styles.pillActive,
            ]}
          >
            <Text
              style={[
                styles.pillText,
                activeCategory === cat && styles.pillTextActive,
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Result Count */}
      <Text style={styles.resultCount}>
        {filtered.length} spell{filtered.length !== 1 ? "s" : ""} found
      </Text>

      {/* Spell List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No spells match your search.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Spell", { spell: item })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.spellName}>{item.attributes.name}</Text>
              {item.attributes.category ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.attributes.category}</Text>
                </View>
              ) : null}
            </View>

            {item.attributes.incantation ? (
              <Text style={styles.incantation}>✨ {item.attributes.incantation}</Text>
            ) : null}

            {item.attributes.effect ? (
              <Text style={styles.effect} numberOfLines={2}>
                {item.attributes.effect}
              </Text>
            ) : null}
          </Pressable>
        )}
      />
    </View>
  )
}

export default SpellsScreen

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
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#1a1a25",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a2a35",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  spellName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFD700",
    flex: 1,
    marginRight: 8,
  },
  badge: {
    backgroundColor: "#2a2a45",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: "#9b8fd4",
    fontSize: 11,
    fontWeight: "600",
  },
  incantation: {
    color: "#a78bfa",
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 4,
  },
  effect: {
    color: "#888",
    fontSize: 13,
    lineHeight: 18,
  },
  empty: {
    color: "#555",
    textAlign: "center",
    marginTop: 60,
    fontSize: 15,
  },
})



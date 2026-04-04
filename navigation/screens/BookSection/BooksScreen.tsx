import { View, FlatList, TextInput, StyleSheet } from "react-native"
import React, { useEffect, useState, useMemo } from "react"
import { useBookStore } from "../../../src/store/potterStore"
import BookCard from "./BookCard"

const BooksScreen = ({ navigation }: any) => {
  const { fetchBooks, books } = useBookStore()
  const [query, setQuery] = useState("")

  useEffect(() => { fetchBooks() }, [])

  // Filter runs locally on already-fetched data
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return books
    return books.filter(book =>
      book.attributes.title.toLowerCase().includes(q) ||
      book.attributes.author.toLowerCase().includes(q)
    )
  }, [query, books])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by title or author..."
        placeholderTextColor="#666"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookCard book={item} onPress={() => navigation.navigate("Book", { book: item })} />
        )}
      />
    </View>
  )
}

export default BooksScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f14", paddingHorizontal: 16, paddingTop: 20 },
  searchBar: {
    backgroundColor: "#1a1a25",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#fff",
    marginBottom: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
})
import { View, FlatList } from "react-native"
import React, { useEffect } from "react"
import { useBookStore } from "../../../src/store/potterStore"
import BookCard from "./BookCard"

const BooksScreen = ({ navigation }: any) => {
  const { fetchBooks, books } = useBookStore()

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f0f14",
        paddingHorizontal: 16,
        paddingTop: 20
      }}
    >
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onPress={() =>
              navigation.navigate("Book", { book: item })
            }
          />
        )}
      />
    </View>
  )
}

export default BooksScreen
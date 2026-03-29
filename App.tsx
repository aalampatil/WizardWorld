import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from "react";
import { useBookStore, useCharacterStore, useMovieStore, usePotionStore, useSpellStore } from './src/store/potterStore';



export default function App() {

  const { movies, fetchMovies } = useMovieStore()
  const { fetchBooks } = useBookStore();
  const { fetchCharacters } = useCharacterStore();
  const { fetchSpells } = useSpellStore()
  const { fetchPotions } = usePotionStore()

  useEffect(() => {
    fetchMovies()
    fetchBooks()
    fetchCharacters()
    fetchSpells()
    fetchPotions()
  }, [])

  return (
    <ScrollView style={styles.container}>
      {movies?.map((movie) => (
        <View key={movie.id} style={styles.card}>
          <Text style={styles.title}>{movie.attributes.title}</Text>
        </View>
      ))}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});

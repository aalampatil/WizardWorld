import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import MovieCard from "./MovieCard";
import { useMovieStore } from "../../../src/store/potterStore";

const MoviesScreen = ({ navigation }: any) => {
  const { movies, fetchMovies } = useMovieStore();
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard movie={item} navigation={navigation} />
        )}
        horizontal
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MoviesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f14",
  },
});
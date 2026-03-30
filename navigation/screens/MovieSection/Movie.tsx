import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { Image } from "expo-image";

const Movie = ({ route }: any) => {
  const { movie } = route.params;
  const a = movie.attributes;

  return (
    <ScrollView style={styles.container}>
      {a.poster && (
        <Image
          source={{ uri: a.poster }}
          style={styles.poster}
          contentFit="cover"
        />
      )}

      <Text style={styles.title}>{a.title}</Text>

      <Text style={styles.info}>
        Release: {a.release_date}
      </Text>

      <Text style={styles.info}>
        Rating: {a.rating || "N/A"}
      </Text>

      <Text style={styles.info}>
        Running Time: {a.running_time || "Unknown"}
      </Text>

      <Text style={styles.section}>Summary</Text>
      <Text style={styles.text}>{a.summary}</Text>

      <Text style={styles.section}>Directors</Text>
      <Text style={styles.text}>{a.directors.join(", ")}</Text>

      <Text style={styles.section}>Producers</Text>
      <Text style={styles.text}>{a.producers.join(", ")}</Text>

      <Text style={styles.section}>Music</Text>
      <Text style={styles.text}>
        {a.music_composers.join(", ")}
      </Text>

      <Text style={styles.section}>Budget</Text>
      <Text style={styles.text}>{a.budget || "Unknown"}</Text>

      <Text style={styles.section}>Box Office</Text>
      <Text style={styles.text}>
        {a.box_office || "Unknown"}
      </Text>
    </ScrollView>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f14",
    padding: 16,
  },

  poster: {
    width: "100%",
    height: 420,
    borderRadius: 16,
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
  },

  info: {
    color: "#ccc",
    marginBottom: 6,
  },

  section: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },

  text: {
    color: "#aaa",
    marginTop: 4,
  },
});